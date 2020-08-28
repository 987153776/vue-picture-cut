import createAnimation from './animation';
import PhotoRoot from './PhotoRoot';
import PhotoMain from './PhotoMain';
import $tool from './tool';
import {
  Rect,
  Point,
  PhotoBasic,
  TouchePoint,
  AnimationInterface,
  ClipResult, RectFull
} from './interface';

export interface Draw{
  (maskRect: Rect, touchePosition: boolean, mask: PhotoMask): void;
}

const cursorConfig = new Map([
  ['Top Left', 'nw-resize'],
  ['Top Right', 'ne-resize'],
  ['Bottom Left', 'sw-resize'],
  ['Bottom Right', 'se-resize'],
  ['Top', 'n-resize'],
  ['Left', 'w-resize'],
  ['Right', 'e-resize'],
  ['Bottom', 's-resize']
]);

/**
 * 遮罩
 */
export default class PhotoMask implements PhotoBasic {

  className = 'PhotoMask';

  readonly root: PhotoRoot;
  // 裁剪框宽高比例
  width!: number;
  height!: number;
  // 是否圆形裁剪
  private _isRound = false;
  // 是否可以调整比例
  private resize: boolean;
  // 触点容错：5个像素
  private readonly faultTolerant: number;
  private maskRect: Rect;
  private _maskRect?: Rect;
  // 当前触点
  private touche: TouchePoint | null = null;
  private touchePosition: string | undefined = undefined;

  private animation: AnimationInterface | undefined = undefined;

  private readonly _draw: Draw;

  /**
   * 构造函数
   * @param root    PhotoRoot引用
   * @param width   裁剪框宽
   * @param height  裁剪框高
   * @param resize  是否可以调整比例
   * @param draw
   */
  constructor(root: PhotoRoot,
              width: number,
              height: number,
              resize: boolean,
              draw: Draw) {
    root.addEventList(this);
    this.root = root;
    this.width = width || 1;
    this.height = height || 1;
    this.resize = resize;
    this.faultTolerant = 8 * root.magnification;
    const mr = this.maskRect = this._getMaskRect();
    this._draw = draw;
    draw(this.maskRect, false, this);
    const photoMain = this.root.getEventList<PhotoMain>('PhotoMain');
    if (photoMain) {
      photoMain.loadImgEd.set(
        this.className,
        (newObj = {}, animation: boolean) =>
          this._reset(photoMain, newObj, animation)
      );
      photoMain.setMoveRange(mr.x, mr.y, mr.x + mr.w, mr.y + mr.h);
    }
  }

  getmaskRect(): Rect {
    return this.maskRect;
  }

  /**
   * 重新设置裁剪框宽高比例
   * @param photoMain   // 原PhotoMain对象
   * @param newObj      // 该json会与photoMain合并
   * @param animation   // 改变图片的矩形是否经过动画
   * @private
   */
  private _reset(photoMain: PhotoMain, newObj = {}, animation = false) {
    const newPhotoMain = Object.assign({}, photoMain, newObj) as PhotoMain;
    const r = this._getMaskRect();
    const showRect = newPhotoMain.showRect;
    const newRect = this._isRound ?
      $tool.getEllipseRectByRect(r.w, r.h, showRect.r) :
      $tool.getRectByRect(r.w, r.h, showRect.r);
    const [offX, offY, offW, offH] = photoMain.setMoveRange(
      newRect.x,
      newRect.y,
      newRect.x + newRect.w,
      newRect.y + newRect.h
    );
    if (animation) {
      photoMain.doAnimation(offX, offY, offW, offH, showRect.r - photoMain.showRect.r);
    } else {
      photoMain.setShowRect({
        x: showRect.x + offX,
        y: showRect.y + offY,
        w: showRect.w + offW,
        h: showRect.h + offH,
        r: showRect.r,
        sV: showRect.sV,
        sH: showRect.sH
      });
    }
  }

  /**
   * 重新设置裁剪框宽高比例
   * @param width
   * @param height
   */
  reset(width: number, height: number): void {
    this.width = width || 1;
    this.height = height || 1;
    const r = this._getMaskRect();
    const offX = r.x - this.maskRect.x;
    const offY = r.y - this.maskRect.y;
    const offW = r.w - this.maskRect.w;
    const offH = r.h - this.maskRect.h;
    const photoMain = this.root.getEventList<PhotoMain>('PhotoMain');
    if (photoMain) {
      const showRect = photoMain.showRect;
      const zoom: number = r.w / this.maskRect.w;
      const rotatePoint: Point = $tool.rotatePoint(
        this.maskRect.x + this.maskRect.w / 2,
        this.maskRect.y + this.maskRect.h / 2,
        -showRect.r
      );
      const offPoint: Point = {
        x: (showRect.x - rotatePoint.x) * zoom,
        y: (showRect.y - rotatePoint.y) * zoom,
      };
      const newRect = this._isRound ?
        $tool.getEllipseRectByRect(r.w, r.h, showRect.r) :
        $tool.getRectByRect(r.w, r.h, showRect.r);
      const [offX, offY, offW, offH] = photoMain.setMoveRange(newRect.x, newRect.y, newRect.x + newRect.w, newRect.y + newRect.h, offPoint, zoom);
      photoMain.doAnimation(offX, offY, offW, offH, 0);
    }
    this._animation(offX, offY, offW, offH);
  }


  get isRound(): boolean {
    return this._isRound;
  }

  set isRound(value: boolean) {
    this._isRound = value;
    this._draw(this.maskRect, false, this);
    this.reset(this.maskRect.w, this.maskRect.h);
  }

  /**
   * 设置是否可拖动改变裁剪框比例
   * @param value
   */
  setResize(value: boolean): void {
    if (!value) {
      this.touchEnd();
    }
    this.resize = value;
    this._draw(this.maskRect, false, this);
  }

  getResize(): boolean {
    return this.resize;
  }

  /**
   * 裁剪
   * @maxPixel          裁剪长边像素
   * @encoderOptions    裁剪压缩率(仅jpg)
   * @format            裁剪格式
   */
  clip(maxPixel?: number, encoderOptions?: number, format?: string): ClipResult | null {
    const photoMain = this.root.getEventList<PhotoMain>('PhotoMain');
    if (!photoMain || !photoMain.originalImg || !photoMain.img) {
      return null;
    }
    const originalImg = photoMain.originalImg;
    const showRect = photoMain.showRect;
    const maskRect = this.maskRect;
    let r; // 缩放比例
    if (maxPixel) {
      const k = maskRect.w / maskRect.h;
      if (k < 1) {
        r = maxPixel * k / maskRect.w;
      } else {
        r = maxPixel / maskRect.w;
      }
    } else {
      r = originalImg.width / showRect.w;
    }
    const nmw = Math.round(maskRect.w * r);
    const nmh = Math.round(maskRect.h * r);
    const newShow: RectFull = {
      x: (showRect.x - showRect.w / 2) * r,
      y: (showRect.y - showRect.h / 2) * r,
      w: showRect.w * r,
      h: showRect.h * r,
      r: showRect.r,
      sV: showRect.sV,
      sH: showRect.sH
    }
    const base64 = this._isRound ?
      $tool.clipByRound(originalImg, nmw, nmh, newShow, encoderOptions, format) :
      $tool.clipBy(originalImg, nmw, nmh, newShow, encoderOptions, format);
    return {
      src: base64,
      file: $tool.base64ToBlob(base64)
    }
  }

  /**
   * 计算裁剪框矩形
   */
  private _getMaskRect(): Rect {
    const k1 = this.width / this.height;
    const k2 = this.root.drawWidth / this.root.drawHeight;
    let w, h;
    if (k1 < k2) {
      h = this.root.drawHeight * 0.75;
      w = k1 * h;
    } else {
      w= this.root.drawWidth * 0.75;
      h = w / k1;
    }
    return {
      x: -w / 2,
      y: -h / 2,
      w,
      h
    }
  }

  /**
   * 动画
   * @private
   */
  _animation(offX: number, offY: number, offW: number, offH: number): void {
    if (!offX && !offY && !offW && !offH) {
      return;
    }
    const {x, y, w, h} = this.maskRect;
    this.maskRect = {
      x: x + offX,
      y: y + offY,
      w: w + offW,
      h: h + offH
    }
    this.animation = createAnimation({
      duration: 300,
      timing: 'ease-in-out',
      change: (j, i) => {
        this._maskRect = {
          x: x + i * offX,
          y: y + i * offY,
          w: w + i * offW,
          h: h + i * offH
        }
        this._draw(this._maskRect, false, this);
      },
      end: () => {
        if (this._maskRect) {
          this.maskRect = this._maskRect;
          this._maskRect = undefined;
        }
      }
    }).start();
  }

  /**
   * 指定坐标与裁剪框边框的碰撞检测
   * @param x
   * @param y
   * @private
   * @return 返回碰撞位置
   */
  _isHover (x: number, y: number): string | undefined {
    const ft = this.faultTolerant;
    const lw = 2;
    const {x: mx, y: my, w: mw, h: mh} = this.maskRect;
    if (x >= mx - ft - lw && x <= mx + ft && y >= my - ft - lw && y <= my + ft) {
      return 'Top Left';
    } else if (x >= mx + mw - ft - lw && x <= mx + mw + ft && y >= my - ft - lw && y <= my + ft) {
      return 'Top Right';
    } else if (x >= mx - ft - lw && x <= mx + ft && y >= my + mh - ft - lw && y <= my + mh + ft) {
      return 'Bottom Left';
    } else if (x >= mx + mw - ft - lw && x <= mx + mw + ft && y >= my + mh - ft - lw && y <= my + mh + ft) {
      return 'Bottom Right';
    } else if (x >= mx && x <= mx + mw && y >= my - ft - lw && y <= my + ft) {
      return 'Top';
    } else if (x >= mx - ft - lw && x <= mx + ft && y >= my && y <= my + mh) {
      return 'Left';
    } else if (x >= mx + mw - ft - lw && x <= mx + mw + ft && y >= my && y <= my + mh) {
      return 'Right';
    } else if (x >= mx && x <= mx + mw && y >= my + mh - ft - lw && y <= my + mh + ft) {
      return 'Bottom';
    }
  }

  touchStart(tps: TouchePoint[]): void {
    if (this.resize && this.touche === null) {
      const tp = tps[0];
      this.touchePosition = this._isHover(tp.x, tp.y);
      if (this.touchePosition) {
        this.root.setPriority(this);
        this.touche = tp;
        this._draw(this.maskRect, true, this);
      }
    }
  }

  touchEnd(): void {
    if (this.touche !== null && this.touchePosition) {
      this.touche = null;
      if (this.maskRect.w < 0) {
        this.maskRect.x += this.maskRect.w;
        this.maskRect.w *= -1;
      }
      if (this.maskRect.h < 0) {
        this.maskRect.y += this.maskRect.h;
        this.maskRect.h *= -1;
      }
      this.reset(this.maskRect.w, this.maskRect.h);
      this.root.deletePriority(this.className);
      this.touchePosition = undefined;
      this._draw(this.maskRect, false, this);
      this.root.cursor = 'default';
    }
  }

  touchMove(tps: TouchePoint[]): void {
    if (this.resize && this.touche !== null && this.touchePosition) {
      const toucheId = this.touche.id;
      const tp = tps.find(t => t.id === toucheId);
      if (tp) {
        this.touchePosition.split(' ').forEach(str => {
          switch (str) {
            case 'Top': this._moveTop(tp); break;
            case 'Bottom': this._moveBottom(tp); break;
            case 'Left': this._moveLeft(tp); break;
            case 'Right': this._moveRight(tp); break;
          }
        });
        this.touche = tp;
        this._draw(this.maskRect, true, this);
      }
    } else if (this.resize) {
      const touchePosition = this._isHover(tps[0].x, tps[0].y);
      this.root.cursor = touchePosition && cursorConfig.get(touchePosition) || 'move';
    }
  }

  wheelStart(): void {
    return;
  }
  wheelEnd(): void {
    return;
  }
  wheelChange(): void {
    return;
  }

  private _moveTop (tp: TouchePoint) {
    const _y = tp.y - (this.touche as TouchePoint).y;
    this.maskRect.y += _y;
    this.maskRect.h -= _y;
  }

  private _moveBottom (tp: TouchePoint) {
    const _y = tp.y - (this.touche as TouchePoint).y;
    this.maskRect.h += _y;
  }

  private _moveLeft (tp: TouchePoint) {
    const _x = tp.x - (this.touche as TouchePoint).x;
    this.maskRect.x += _x;
    this.maskRect.w -= _x;
  }

  private _moveRight (tp: TouchePoint) {
    const _x = tp.x - (this.touche as TouchePoint).x;
    this.maskRect.w += _x;
  }
}
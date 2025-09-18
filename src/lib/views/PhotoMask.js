import createAnimation from './animation';
import $tool from './tool';

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
export default class PhotoMask {

  className = 'PhotoMask';

  _root;
  // 裁剪框宽高比例
  width;
  height;
  // 是否圆形裁剪
  _isRound = false;
  // 是否可以调整比例
  _resize;
  // 触点容错：5个像素
  _faultTolerant;
  _maskRect;
  __maskRect;
  // 当前触点
  _touche = null;
  _touchePosition = undefined;

  __animation = undefined;

  _draw;

  /**
   * 构造函数
   * @param root    PhotoRoot引用
   * @param width   裁剪框宽
   * @param height  裁剪框高
   * @param resize  是否可以调整比例
   * @param draw
   */
  constructor(root, width, height, resize, draw) {
    root.addEventList(this);
    this._root = root;
    this.width = width || 1;
    this.height = height || 1;
    this._resize = resize;
    this._faultTolerant = 8 * root.magnification;
    const mr = this._maskRect = this._getMaskRect();
    this._draw = draw;
    draw(this._maskRect, false, this);
    const photoMain = this._root.getEventList('PhotoMain');
    if (photoMain) {
      photoMain.loadImgEd.set(
        this.className,
        (newObj = {}, animation) =>
          this._reset(photoMain, newObj, animation)
      );
      photoMain.setMoveRange(mr.x, mr.y, mr.x + mr.w, mr.y + mr.h);
    }
  }

  getmaskRect() {
    return this._maskRect;
  }

  /**
   * 重新设置裁剪框宽高比例
   * @param photoMain   // 原PhotoMain对象
   * @param newObj      // 该json会与photoMain合并
   * @param animation   // 改变图片的矩形是否经过动画
   * @private
   */
  _reset(photoMain, newObj = {}, animation = false) {
    const newPhotoMain = Object.assign({}, photoMain, newObj);
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
  reset(width, height) {
    this.width = width || 1;
    this.height = height || 1;
    const r = this._getMaskRect();
    const offX = r.x - this._maskRect.x;
    const offY = r.y - this._maskRect.y;
    const offW = r.w - this._maskRect.w;
    const offH = r.h - this._maskRect.h;
    const photoMain = this._root.getEventList('PhotoMain');
    if (photoMain) {
      const showRect = photoMain.showRect;
      const zoom = r.w / this._maskRect.w;
      const rotatePoint = $tool.rotatePoint(
        this._maskRect.x + this._maskRect.w / 2,
        this._maskRect.y + this._maskRect.h / 2,
        -showRect.r
      );
      const offPoint = {
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


  get isRound() {
    return this._isRound;
  }

  set isRound(value) {
    this._isRound = value;
    this._draw(this._maskRect, false, this);
    this.reset(this._maskRect.w, this._maskRect.h);
  }

  /**
   * 设置是否可拖动改变裁剪框比例
   * @param value
   */
  setResize(value) {
    if (!value) {
      this.touchEnd();
    }
    this._resize = value;
    this._draw(this._maskRect, false, this);
  }

  getResize() {
    return this._resize;
  }

  /**
   * 裁剪
   * @maxPixel          裁剪长边像素
   * @encoderOptions    裁剪压缩率(仅jpg)
   * @format            裁剪格式
   */
  clip(maxPixel, encoderOptions, format) {
    const photoMain = this._root.getEventList('PhotoMain');
    if (!photoMain || !photoMain.originalImg || !photoMain.img) {
      return null;
    }
    const originalImg = photoMain.originalImg;
    const showRect = photoMain.showRect;
    const maskRect = this._maskRect;
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
    const newShow = {
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
  _getMaskRect() {
    const k1 = this.width / this.height;
    const k2 = this._root.drawWidth / this._root.drawHeight;
    let w, h;
    if (k1 < k2) {
      h = this._root.drawHeight * 0.75;
      w = k1 * h;
    } else {
      w= this._root.drawWidth * 0.75;
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
  _animation(offX, offY, offW, offH) {
    if (!offX && !offY && !offW && !offH) {
      return;
    }
    const {x, y, w, h} = this._maskRect;
    this.__maskRect = this._maskRect;
    this._maskRect = {
      x: x + offX,
      y: y + offY,
      w: w + offW,
      h: h + offH
    };
    this.__animation = createAnimation({
      duration: 300,
      timing: 'ease-in-out',
      change: (i, j) => {
        this.__maskRect = {
          x: x + j * offX,
          y: y + j * offY,
          w: w + j * offW,
          h: h + j * offH
        }
        this._draw(this.__maskRect, false, this);
      },
      end: () => {
        if (this.__maskRect) {
          this._maskRect = this.__maskRect;
          this.__maskRect = undefined;
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
  _isHover (x, y) {
    const ft = this._faultTolerant;
    const lw = 2;
    const {x: mx, y: my, w: mw, h: mh} = this._maskRect;
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

  touchStart(tps) {
    if (this._resize && this._touche === null) {
      const tp = tps[0];
      this._touchePosition = this._isHover(tp.x, tp.y);
      if (this._touchePosition) {
        this._root.setPriority(this);
        this._touche = tp;
        this._draw(this._maskRect, true, this);
      }
    }
  }

  touchEnd() {
    if (this._touche !== null && this._touchePosition) {
      this._touche = null;
      if (this._maskRect.w < 0) {
        this._maskRect.x += this._maskRect.w;
        this._maskRect.w *= -1;
      }
      if (this._maskRect.h < 0) {
        this._maskRect.y += this._maskRect.h;
        this._maskRect.h *= -1;
      }
      this.reset(this._maskRect.w, this._maskRect.h);
      this._root.deletePriority(this.className);
      this._touchePosition = undefined;
      this._draw(this.__maskRect ||this._maskRect, false, this);
      this._root.cursor = 'default';
    }
  }

  touchMove(tps) {
    if (this._resize && this._touche !== null && this._touchePosition) {
      const toucheId = this._touche.id;
      const tp = tps.find(t => t.id === toucheId);
      if (tp) {
        this._touchePosition.split(' ').forEach(str => {
          switch (str) {
            case 'Top': this._moveTop(tp); break;
            case 'Bottom': this._moveBottom(tp); break;
            case 'Left': this._moveLeft(tp); break;
            case 'Right': this._moveRight(tp); break;
          }
        });
        this._touche = tp;
        this._draw(this._maskRect, true, this);
      }
    } else if (this._resize) {
      const touchePosition = this._isHover(tps[0].x, tps[0].y);
      this._root.cursor = touchePosition && cursorConfig.get(touchePosition) || 'move';
    }
  }

  wheelStart() {}
  wheelEnd() {}
  wheelChange() {}

  _moveTop (tp) {
    const _y = tp.y - this._touche.y;
    this._maskRect.y += _y;
    this._maskRect.h -= _y;
  }

  _moveBottom (tp) {
    const _y = tp.y - this._touche.y;
    this._maskRect.h += _y;
  }

  _moveLeft (tp) {
    const _x = tp.x - this._touche.x;
    this._maskRect.x += _x;
    this._maskRect.w -= _x;
  }

  _moveRight (tp) {
    const _x = tp.x - this._touche.x;
    this._maskRect.w += _x;
  }
}
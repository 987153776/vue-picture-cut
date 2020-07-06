import createAnimation from './animation';
import $tool from './tool';
import PhotoRoot from './PhotoRoot';
import {
  AnimationInterface,
  DoubleToucheEvent,
  PhotoBasic,
  Point,
  Rect,
  Rect2,
  RectFull,
  TouchePoint
} from './interface';

/**
 * 主画布
 */
export default class PhotoMain implements PhotoBasic{

  className = 'PhotoMain';

  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  readonly root: PhotoRoot;
  // 当前展示的图片的源src
  private src: string | undefined;
  // 当前展示的图片（原始未处理的）
  originalImg: HTMLImageElement | undefined;
  // 当前展示的图片（已被处理成宽高小于1500像素）
  img: HTMLImageElement | undefined;
  // 图片矩形
  imgRect: Rect = { x: 0, y: 0, w: 0, h: 0};
  // 显示矩形
  showRect: RectFull = { x: 0, y: 0, w: 0, h: 0, r: 0, sV: false, sH: false };
  private _showRect?: RectFull;
  // 图片可移动范围
  private moveRect: Rect2 = { minX: null, minY: null, maxX: null, maxY: null };
  // 当前触点
  private touchList: TouchePoint [] = [];
  // 当前状态
  private status: string | null = null;
  // 单指(或双指中心)初始偏移量
  private touchstartPoint: Point = {x: 0, y: 0};
  // 初始触点记录
  private touchstartEvent: DoubleToucheEvent = $tool.doubleTouche({x: 0, y: 0, id: 0});

  private animation: AnimationInterface | undefined = undefined;

  private scaleTimer: number | null = null

  private loadingEvent?: (loading: boolean) => void;

  /**
   * 供外部使用，注入的方法会在每次加载图片后执行
   */
  loadImgEd = new Map<string, {(...arg: any[]): void}>();

  /**
   * 构造函数
   * @param el
   * @param root
   */
  constructor(el: HTMLCanvasElement,
              root: PhotoRoot){
    el.width = root.drawWidth;
    el.height = root.drawHeight;
    root.addEventList(this);
    this.root = root;
    this.canvas = el;
    this.ctx = el.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.translate(this.root.core.x, this.root.core.y);
  }

  /**
   * 载入图片
   * @param src
   * @param angle
   * @param _n
   */
  setSrc(src: string, angle = this.showRect.r, _n = 0): void {
    this.clear();
    this.src = src;
    this.loadingEvent && this.loadingEvent(true);
    $tool.loadImg(src).then((img: HTMLImageElement) => {
      if (!_n) {
        this.originalImg = img;
      }
      const result = $tool.clipByMax(img, 1500, .7);
      if (result) {
        this.setSrc(result.src, angle, ++_n);
        return;
      }
      this.img = img;
      this._initRect();
      this.showRect.r = angle;
      if (!this.moveRect.minX || !this.moveRect.minY) {
        this._initMoveRange();
      } else {
        this.loadImgEd.forEach(v => {
          v && v();
        });
        const { x, y, w, h, r, sV, sH } = this.showRect;
        const range = this._checkRange({x, y, w, h, r, sV, sH});
        this.showRect = {
          x: x + range[0],
          y: y + range[1],
          w: w + range[2],
          h: h + range[3],
          r,
          sV,
          sH
        };
      }
      this._draw(this.imgRect, this.showRect);
      this.showRect.r = angle;
      this.loadingEvent && this.loadingEvent(false);
    }, () => {
      this.loadingEvent && this.loadingEvent(false);
    });
  }

  /**
   * 设置图片可移动范围
   * @param minX
   * @param minY
   * @param maxX
   * @param maxY
   * @param offPoint  中心偏移量
   * @param zoom      放大系数
   * @return          计算之后的图片坐标偏移量
   */
  setMoveRange(minX: number, minY: number,
               maxX: number, maxY: number,
               offPoint?: Point, zoom?: number):
    [number, number, number, number] {

    this._initMoveRange(minX, minY, maxX, maxY);
    if (!this.img) return [0, 0, 0, 0];
    if (offPoint && zoom) {
      const { x, y, w, h, r, sV, sH } = this.showRect;
      const offX = offPoint.x - x;
      const offY = offPoint.y - y;
      const offW = w * zoom - w;
      const offH = h * zoom - h;
      const range = this._checkRange({
        ...offPoint,
        w: w * zoom,
        h: h * zoom,
        r,
        sV,
        sH
      });
      return [
        offX + range[0],
        offY + range[1],
        offW + range[2],
        offH + range[3]
      ];
    } else {
      const [offX, offY, offW, offH] = this._checkRange();
      return [offX, offY, offW, offH];
    }
  }

  /**
   * 设置旋转角度
   * @param angle       // 角度
   * @param animation   // 是否动画
   */
  setAngle (angle: number, animation = false): void {
    if (this.img) {
      if (animation && this.animation) {
        this.animation.abort();
      }
      this.loadImgEd.forEach(v => {
        v && v({
          showRect: {
            ...this.showRect,
            r: angle
          }
        }, animation);
      });
    } else {
      this.showRect.r = angle;
    }
  }

  /**
   * 设置图片翻折
   * @param sV  垂直翻折
   * @param sH  水平翻折
   */
  setFlip (sV: boolean, sH: boolean): void {
    const sh = this.showRect.sH;
    const sv = this.showRect.sV;
    if (sh === sH && sv === sV) return;
    this.showRect.sV = sV;
    this.showRect.sH = sH;
    if (sh !== sH) {
      this.showRect.x *= -1;
    }
    if (sv === sV) {
      this.showRect.y *= -1;
    }
    if (this.img) {
      this._draw(this.imgRect, this.showRect);
    }
  }

  /**
   * 设置图片垂直翻折
   * @param sV  垂直翻折
   */
  setFlipV (sV: boolean): void {
    const sv = this.showRect.sV;
    if (sv === sV) return;
    this.showRect.sV = sV;
    this.showRect.y *= -1;
    if (this.img) {
      this._draw(this.imgRect, this.showRect);
    }
  }

  /**
   * 设置图片水平翻折
   * @param sH  水平翻折
   */
  setFlipH (sH: boolean): void {
    const sh = this.showRect.sH;
    if (sh === sH) return;
    this.showRect.sH = sH;
    this.showRect.x *= -1;
    if (this.img) {
      this._draw(this.imgRect, this.showRect);
    }
  }

  /**
   * 缩放
   * @param zoom  缩放系数，大于1(放大)，大于0小于1(缩小)
   */
  scale(zoom: number): void{
    if (!this.img || zoom < 0 || zoom === 1) return;
    this.scaleTimer !== null && clearTimeout(this.scaleTimer);
    this.animation?.abort();
    this.touchstartPoint = {x: 0, y: 0};
    const offPoint = this._changePointByCanvas(this.showRect);
    this._scaleByZoom(zoom, offPoint);
    this._draw(this.imgRect, this.showRect);
    this.scaleTimer = setTimeout(() => {
      const [offX, offY, offW, offH] = this._checkRange();
      this.doAnimation(offX, offY, offW, offH, 0);
    }, 500);
  }

  /**
   * 监听图片加载过程
   * @param callback
   */
  onLoading(callback: (loading: boolean) => void): void{
    this.loadingEvent = callback;
  }

  /**
   * 设置图片矩形
   * @param showRect
   */
  setShowRect (showRect: RectFull): void {
    if (this.img) {
      this.showRect = showRect;
      this._draw(this.imgRect, this.showRect);
    }
  }

  /**
   * 将图片上的坐标映射到画布上
   * @param point
   */
  private _changePointByCanvas (point: Point): Point{
    const { r, sV, sH } = this.showRect;
    point.x *= sH ? -1 : 1;
    point.y *= sV ? -1 : 1;
    return $tool.rotatePoint(point.x, point.y, r);
  }
  /**
   * 将画布上的坐标映射到图片上
   * @param point
   */
  private _changePointByImage (point: Point): Point{
    const { r, sV, sH } = this.showRect;
    const offPoint = $tool.rotatePoint(point.x, point.y, -r);
    offPoint.x *= sH ? -1 : 1;
    offPoint.y *= sV ? -1 : 1;
    return offPoint;
  }

  /**
   * 初始化矩形
   * @private
   */
  private _initRect(): void {
    const img = this.img;
    if (!img) return;
    const pw = this.root.drawWidth;
    const ph = this.root.drawHeight;
    const dw = img.width / pw;
    const dh = img.height / ph;
    const d = (dw < dh) ? dh : dw;
    const cw = img.width / d;
    const ch = img.height / d;
    this.imgRect = {
      x: 0,
      y: 0,
      w: img.width,
      h: img.height
    };
    this.showRect = {
      x: 0,
      y: 0,
      w: cw,
      h: ch,
      r: this.showRect.r,
      sV: this.showRect.sV,
      sH: this.showRect.sH
    };
  }

  /**
   * 初始化图片可移动范围
   * @private
   */
  private _initMoveRange(minX: number | null = null, minY: number | null = null, maxX: number | null = null, maxY: number | null = null): void {
    if (minX === null || minY === null || maxX === null || maxY === null) {
      const {w, h} = this.imgRect;
      if (w === 0) return;
      const pw = this.root.drawWidth;
      const ph = this.root.drawHeight;
      const d1 = pw / ph;
      const d2 = w / h;
      if (d1 > d2) {
        const nw = ph * d2;
        const nh = ph;
        minX = -nw / 2;
        minY = -nh / 2;
      } else {
        const nw = pw;
        const nh = pw / d2;
        minX = -nw / 2;
        minY = -nh / 2;
      }
      maxX = -minX;
      maxY = -minY;
      this.moveRect = { minX, minY, maxX, maxY };
    } else {
      this.moveRect = { minX, minY, maxX, maxY };
    }
  }

  /**
   *
   * @param imgRect   图片矩形
   * @param showRect  将要显示的矩形
   * @private
   */
  private _draw(imgRect: Rect, showRect: RectFull): void {
    this.clear();
    if (this.img) {
      const { x, y, w, h, r, sV, sH} = showRect;
      const ctx = this.ctx;
      ctx.save();
      ctx.rotate(-r * Math.PI / 180);
      ctx.scale(sH ? -1 : 1,sV ? -1 : 1);

      ctx.drawImage(this.img,
        imgRect.x, imgRect.y, imgRect.w, imgRect.h,
        x - w / 2, y - h /2, w, h);

      ctx.scale(sH ? 1 : -1,sV ? 1 : -1);

      if (this.root.debug) {
        ctx.strokeStyle = '#0f0';
        ctx.lineWidth = 2;
        for (let i = 0; i < this.root.drawHeight / 200; i++) {
          ctx.beginPath();
          ctx.moveTo(-this.root.core.x,i * 100 + 50);
          ctx.lineTo(this.root.core.x,i * 100 + 50);
          ctx.stroke();
          ctx.closePath();
          ctx.beginPath();
          ctx.moveTo(-this.root.core.x,-i * 100 - 50);
          ctx.lineTo(this.root.core.x,-i * 100 - 50);
          ctx.stroke();
          ctx.closePath();
        }
        for (let i = 0; i < this.root.drawWidth / 200; i++) {
          ctx.beginPath();
          ctx.moveTo(i * 100 + 50, -this.root.core.y);
          ctx.lineTo(i * 100 + 50, this.root.core.y);
          ctx.stroke();
          ctx.closePath();
          ctx.beginPath();
          ctx.moveTo(-i * 100 - 50, -this.root.core.y);
          ctx.lineTo(-i * 100 - 50, this.root.core.y);
          ctx.stroke();
          ctx.closePath();
        }

        if (this.moveRect.minX !== null &&
          this.moveRect.maxX !== null &&
          this.moveRect.minY !== null &&
          this.moveRect.maxY !== null) {
          ctx.strokeStyle = '#00f';
          ctx.fillStyle = 'rgba(0,0,0,0)';
          ctx.lineWidth = 2;
          ctx.strokeRect(
            this.moveRect.minX,
            this.moveRect.minY,
            this.moveRect.maxX - this.moveRect.minX,
            this.moveRect.maxY - this.moveRect.minY);
        }

        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.arc(0, 0, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }

      ctx.restore();
    }
  }

  /**
   * 清除画布
   */
  clear (): void {
    this.ctx.clearRect(
      -this.root.core.x,
      -this.root.core.y,
      this.root.drawWidth,
      this.root.drawHeight);
  }

  touchEnd(tps: TouchePoint[]): void {
    if (!this.img) return;
    if (!this.touchList.length) {
      return;
    }
    tps = this.touchList.filter(v => v.id !== tps[0].id);
    if (tps.length === 0) {
      this.wheelEnd();
    } else if (tps.length === 1) {
      this._touchStart1(tps[0]);
    }
    this.touchList = tps;
  }

  touchMove(tps: TouchePoint[]): void {
    if (!this.img) return;
    if (tps.length === 1) {
      this._touchMove1(tps[0]);
    } else if (tps.length === 2) {
      this._touchMove2(tps[0], tps[1]);
    } else if (tps.length > 2) {
      const ids = this.touchList.map(v => v.id);
      tps = tps.filter(v => (ids.indexOf(v.id) > -1));
      if (tps.length === 2) {
        this._touchMove2(tps[0], tps[1]);
      }
    }
  }

  touchStart(tps: TouchePoint[]): void {
    if (!this.img) return;
    this.animation?.abort();

    const tp = tps[0];
    if (!this.touchList.length) {

      this.touchList.push(tp);
      this._touchStart1(tp);

    } else if (this.touchList.length === 1) {
      // 判断触点是否重复
      if (this.touchList[0].id !== tp.id) {
        this.touchList.push(tp);
        this._touchStart2(this.touchList[0], this.touchList[1]);
      }

    }
  }

  wheelStart(zoom: number, point: Point): void {
    if (!this.img) return;
    this.status = 'scale';
    this.wheelChange(zoom, point);
  }

  wheelChange(zoom: number, point: Point): void {
    if (!this.img) return;
    this.animation?.abort();

    this.touchstartEvent = $tool.doubleTouche(point);
    const core = this.touchstartEvent.core;
    const offPoint = this._changePointByImage(core);
    this.touchstartPoint = this._getPointerLocation(offPoint);
    this.root.setPriority(this);

    zoom = 1 + zoom * 0.0005;
    zoom = zoom > 1.08 ? 1.08 : zoom < 0.92593 ? 0.92593 : zoom;
    this._scaleByZoom(zoom, point);
    this._draw(this.imgRect, this.showRect);
  }

  wheelEnd(): void {
    if (!this.img) return;
    this.status = null;
    this.touchstartEvent = $tool.doubleTouche({x: 0, y: 0, id: 0});
    this.touchstartPoint = {x: 0, y: 0};
    const [offX, offY, offW, offH] = this._checkRange();
    this.doAnimation(offX, offY, offW, offH, 0);
    this.root.deletePriority(this.className);
  }

  private _touchStart1(tp: TouchePoint) {
    this.status = 'move';
    this.touchstartEvent = $tool.doubleTouche(tp);
    const offPoint = this._changePointByImage(tp);
    this.touchstartPoint = this._getPointerLocation(offPoint);
  }

  private _touchStart2(tp1: TouchePoint, tp2: TouchePoint) {
    const { sV, sH } = this.showRect;
    this.status = 'scale';
    if ((!sV && sH) || (sV && !sH)) {
      this.touchstartEvent = $tool.doubleTouche(tp2, tp1);
    } else {
      this.touchstartEvent = $tool.doubleTouche(tp1, tp2);
    }
    const core = this.touchstartEvent.core;
    const offPoint = this._changePointByImage(core);
    this.touchstartPoint = this._getPointerLocation(offPoint);
    this.root.setPriority(this);
  }

  private _touchMove1(tp: TouchePoint) {
    if (this.status === 'move') {
      this.root.setPriority(this);
      this.touchList[0] = tp;
      this._move(tp);
      this._draw(this.imgRect, this.showRect);
    }
  }

  private _touchMove2(tp1: TouchePoint, tp2: TouchePoint) {
    if (this.status === 'scale') {
      this.touchList = [tp1, tp2];
      const doubleToucheEvent = $tool.doubleTouche(tp1, tp2);
      this._scaleByLocation(doubleToucheEvent)
      this._draw(this.imgRect, this.showRect);
    }
  }

  /**
   * 获取core相对图片的位置
   * @param core
   * @private
   */
  private _getPointerLocation(core: Point): Point {
    return {x: core.x - this.showRect.x, y: core.y - this.showRect.y};
  }

  /**
   * 移动图片
   * @private
   */
  private _move(core: Point): void {
    const pl = this.touchstartPoint;
    const offPoint = this._changePointByImage(core);
    this.showRect.x = offPoint.x - pl.x;
    this.showRect.y = offPoint.y - pl.y;
  }

  /**
   * 缩放图片
   * @param e
   * @private
   */
  private _scaleByLocation(e: DoubleToucheEvent): void{
    let zoom = e.length / this.touchstartEvent.length;
    zoom = (zoom < 0.9091) ? 0.9091 : zoom;
    zoom = (zoom > 1.1) ? 1.1 : zoom;
    this._scaleByZoom(zoom, e.core);
    this.touchstartEvent = e;
  }

  /**
   * 缩放图片
   * @param zoom
   * @param core
   * @param angle
   * @private
   */
  private _scaleByZoom(zoom = 1, core: Point, angle = 0) {
    let pl = this.touchstartPoint;
    this.touchstartPoint = { x: pl.x * zoom, y: pl.y * zoom};
    pl = this.touchstartPoint;
    const {w, h, r, sV, sH} = this.showRect;
    const offPoint = this._changePointByImage(core);
    this.showRect = {
      x: offPoint.x - pl.x,
      y: offPoint.y - pl.y,
      w: w * zoom,
      h: h * zoom,
      r: r + angle,
      sV,
      sH
    };
  }

  /**
   * 检查图片是否在可移动范围内
   * @param showRect
   * @private
   * @return    坐标偏移量
   */
  private _checkRange(showRect = this.showRect): [number, number, number, number] {
    let { x: cx, y: cy } = showRect;
    const { w: cw, h: ch } = showRect;
    cx -= cw / 2;
    cy -= ch / 2;
    let { minX, minY, maxX, maxY } = this.moveRect;
    minX = minX || 0;
    minY = minY || 0;
    maxX = maxX || 0;
    maxY = maxY || 0;
    let nx = cx, ny = cy, nw = cw, nh = ch;
    let rl = this._getPohtoByRangeLocation([cx, cy, cw, ch]);
    const imgOff = cw / ch;
    if (rl[4] <= 0) {
      nw = maxX - minX;
      nh = nw / imgOff;
      nx = cx + (cw - nw) / 2;
      ny = cy + (ch - nh) / 2;
    }
    rl = this._getPohtoByRangeLocation([nx, ny, nw, nh]);
    if (rl[5] <= 0) {
      nh = maxY - minY;
      nw = nh * imgOff;
      nx = cx + (cw - nw) / 2;
      ny = cy + (ch - nh) / 2;
    }
    rl = this._getPohtoByRangeLocation([nx, ny, nw, nh]);
    if (rl[0] > 0) nx -= rl[0];
    if (rl[1] > 0) ny -= rl[1];
    if (rl[2] < 0) nx -= rl[2];
    if (rl[3] < 0) ny -= rl[3];
    const offW = nw - cw, offH = nh - ch;
    return [
      nx - cx + offW / 2,
      ny - cy + offH / 2,
      offW,
      offH
    ];
  }

  /**
   * 获取图片相对可移动范围的各边坐标的偏移量
   * @param newLocation
   * @private
   */
  private _getPohtoByRangeLocation(newLocation?: [number, number, number, number]):
    [number, number, number, number, number, number] {
    let { x, y, w, h } = this.showRect;
    const { minX, minY, maxX, maxY } = this.moveRect;
    if (newLocation) {
      x = newLocation[0];
      y = newLocation[1];
      w = newLocation[2];
      h = newLocation[3];
    }
    return [
      x - (minX || 0),
      y - (minY || 0),
      x + w - (maxX || 0),
      y + h - (maxY || 0),
      w - (maxX || 0) + (minX || 0),
      h - (maxY || 0) + (minY || 0)
    ];
  }

  /**
   * 动画
   * @param offX 偏移量
   * @param offY 偏移量
   * @param offW 偏移量
   * @param offH 偏移量
   * @param offR 偏移量
   * @param endCallback 结束回调
   * @private
   */
  doAnimation(offX: number, offY: number, offW: number, offH: number, offR: number, endCallback?: {(...arg: any[]): void}): void {
    if (!offX && !offY && !offW && !offH && !offR) {
      return;
    }
    const { x, y, w, h, r, sV, sH} = this.showRect;
    this.showRect = {
      x: x + offX,
      y: y + offY,
      w: w + offW,
      h: h + offH,
      r: r + offR,
      sV,
      sH
    };
    this.animation = createAnimation({
      duration: 300,
      timing: 'ease-in-out',
      change: i => {
        this._showRect = {
          x: x + i * offX,
          y: y + i * offY,
          w: w + i * offW,
          h: h + i * offH,
          r: r + i * offR,
          sV,
          sH
        }
        // 重新绘制画布
        this._draw(this.imgRect, this._showRect);
      },
      end: () => {
        if (this._showRect) {
          this.showRect = this._showRect;
          this._showRect = undefined;
        }
        endCallback && endCallback();
      }
    }).start();
  }
}
import createAnimation from './animation';
import $tool from './tool';

/**
 * 主画布
 * @class {module:vue-picture-cut.PhotoMain} PhotoMain
 */
export default class PhotoMain{

  className = 'PhotoMain';

  /**
   * @type {HTMLCanvasElement}
   * @private
   */
  _canvas;
  /**
   * @type {CanvasRenderingContext2D}
   * @private
   */
  _ctx;
  /**
   * @type {module:vue-picture-cut.PhotoRoot}
   * @private
   */
  _root;
  /**
   * 当前展示的图片的源src
   * @type {string | undefined}
   * @private
   */
  _src;
  /**
   * 当前展示的图片（原始未处理的）
   * @type {HTMLImageElement | undefined}
   * @private
   */
  originalImg;
  /**
   * 当前展示的图片（已被处理成宽高小于1500像素）
   * @type {HTMLImageElement | undefined}
   * @private
   */
  img;
  /**
   * 图片矩形
   * @type {module:vue-picture-cut.Rect}
   */
  imgRect = { x: 0, y: 0, w: 0, h: 0};
  /**
   * 显示矩形
   * @type {module:vue-picture-cut.RectFull}
   */
  showRect = { x: 0, y: 0, w: 0, h: 0, r: 0, sV: 1, sH: 1 };
  /**
   * @type {module:vue-picture-cut.RectFull}
   * @private
   */
  _showRect;
  /**
   * 图片可移动范围
   * @type {module:vue-picture-cut.Rect2}
   * @private
   */
  _moveRect = { minX: null, minY: null, maxX: null, maxY: null };
  /**
   * 当前触点
   * @type {module:vue-picture-cut.TouchePoint[]}
   * @private
   */
  _touchList= [];
  /**
   * 当前状态
   * @type {string | null}
   * @private
   */
  _status = null;
  /**
   * 单指(或双指中心)初始偏移量
   * @type {module:vue-picture-cut.Point}
   * @private
   */
  _touchstartPoint = {x: 0, y: 0};
  /**
   * 初始触点记录
   * @type {module:vue-picture-cut.DoubleToucheEvent}
   * @private
   */
  _touchstartEvent = $tool.doubleTouche({x: 0, y: 0, id: 0});

  /**
   * @type {module:vue-picture-cut.Animation|undefined}
   * @private
   */
  _animation = undefined;

  /**
   * @type {number | null}
   * @private
   */
  _scaleTimer = null

  /**
   * @type {module:vue-picture-cut.LoadImgCallback|undefined}
   * @private
   */
  _loadingEvent = undefined;

  /**
   * 供外部使用，注入的方法会在每次加载图片后执行
   * @type {module:vue-picture-cut.LoadImgCallbackMap}
   */
  loadImgEd = new Map();

  /**
   * 构造函数
   * @param {HTMLCanvasElement} el - canvas画布
   * @param {module:vue-picture-cut.PhotoRoot} root
   */
  constructor(el, root) {
    el.width = root.drawWidth;
    el.height = root.drawHeight;
    root.addEventList(this);
    this._root = root;
    this._canvas = el;
    // @ts-ignore
    this._ctx = el.getContext('2d');
    this._ctx.translate(this._root.core.x, this._root.core.y);
  }

  /**
   * 载入图片
   * @param {string} src - 图片地址
   * @param {number} angle - 图片旋转角度
   * @param {number} _n - 递归次数
   */
  setSrc(src, angle = this.showRect.r, _n = 0) {
    this.clear();
    this._src = src;
    this._loadingEvent && this._loadingEvent(true);
    $tool.loadImg(src).then((img) => {
      if (!_n) {
        this.originalImg = img;
      }
      const result = $tool.clipByMax(img, 1500);
      if (result) {
        this.setSrc(result.src, angle, ++_n);
        return;
      }
      this.img = img;
      this._initRect();
      this.showRect.r = angle;
      if (!this._moveRect.minX || !this._moveRect.minY) {
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
      this._loadingEvent && this._loadingEvent(false);
    }, () => {
      this._loadingEvent && this._loadingEvent(false);
    });
  }

  /**
   * 重置状态
   */
  reset() {
    if (this.img) {
      this._initRect();
      this.showRect.r = 0;
      this.showRect.sV = 1;
      this.showRect.sH = 1;
      if (!this._moveRect.minX || !this._moveRect.minY) {
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
    }
  }

  /**
   * 设置图片可移动范围
   * @param {number} minX
   * @param {number} minY
   * @param {number} maxX
   * @param {number} maxY
   * @param {module:vue-picture-cut.Point} [offPoint] - 中心偏移量
   * @param {number} [zoom] - 放大系数
   * @return {[number, number, number, number]} - 计算之后的图片坐标偏移量
   */
  setMoveRange(minX, minY, maxX, maxY, offPoint, zoom) {

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
   * @param {number} angle - 角度
   * @param {boolean} animation=false - 是否动画
   */
  setAngle (angle, animation = false) {
    if (this.img) {
      if (animation && this._animation) {
        this._animation.abort();
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
   * @param {boolean} sV - 垂直翻折
   * @param {boolean} sH - 水平翻折
   * @param {boolean} animation=false - 是否动画
   */
  setFlip (sV, sH, animation = false) {
    const sh = this.showRect.sH === -1;
    const sv = this.showRect.sV === -1;
    if (sh === sH && sv === sV) return;
    if (this.img) {
      if (!animation) {
        this.showRect.sV = sV ? -1 : 1;
        this.showRect.sH = sH ? -1 : 1;
        this._draw(this.imgRect, this.showRect);
      } else {
        this._animation?.abort();
        this.doAnimation(0, 0, 0, 0, 0, sV, sH);
      }
    }
  }

  /**
   * 设置图片垂直翻折
   * @param {boolean} sV - 垂直翻折
   * @param {boolean} animation=false - 是否动画
   */
  setFlipV (sV, animation = false) {
    const sv = this.showRect.sV === -1;
    if (sv === sV) return;
    if (this.img) {
      if (!animation) {
        this.showRect.sV = sV ? -1 : 1;
        this._draw(this.imgRect, this.showRect);
      } else {
        this._animation?.abort();
        this.doAnimation(0, 0, 0, 0, 0, sV);
      }
    }
  }

  /**
   * 设置图片水平翻折
   * @param {boolean} sH - 水平翻折
   * @param {boolean} animation=false - 是否动画
   */
  setFlipH (sH, animation = false) {
    const sh = this.showRect.sH === -1;
    if (sh === sH) return;
    if (this.img) {
      if (!animation) {
        this.showRect.sH = sH ? -1 : 1;
        this._draw(this.imgRect, this.showRect);
      } else {
        this._animation?.abort();
        this.doAnimation(0, 0, 0, 0, 0, undefined, sH);
      }
    }
  }

  /**
   * 缩放
   * @param {number} zoom - 缩放系数，大于1(放大)，大于0小于1(缩小)
   */
  scale (zoom) {
    if (!this.img || zoom < 0 || zoom === 1) return;
    this._scaleTimer !== null && clearTimeout(this._scaleTimer);
    this._animation?.abort();
    this._touchstartPoint = {x: 0, y: 0};
    const offPoint = this._changePointByCanvas(this.showRect);
    this._scaleByZoom(zoom, offPoint);
    this._draw(this.imgRect, this.showRect);
    this._scaleTimer = setTimeout(() => {
      this.emitCheckRange();
    }, 500);
  }

  /**
   * 监听图片加载过程
   * @param {(loading: boolean) => void} callback
   */
  onLoading (callback) {
    this._loadingEvent = callback;
  }

  /**
   * 设置图片矩形
   * @param {module:vue-picture-cut.RectFull} showRect - 矩形
   */
  setShowRect (showRect) {
    if (this.img) {
      this.showRect = showRect;
      this._draw(this.imgRect, this._showRect || this.showRect);
    }
  }

  /**
   * 将图片上的坐标映射到画布上
   * @param {module:vue-picture-cut.Point} point
   * @returns {module:vue-picture-cut.Point}
   * @private
   */
  _changePointByCanvas (point){
    const { r } = this.showRect;
    return $tool.rotatePoint(point.x, point.y, r);
  }

  /**
   * 将画布上的坐标映射到图片上
   * @param {module:vue-picture-cut.Point} point
   * @returns {module:vue-picture-cut.Point}
   * @private
   */
  _changePointByImage (point){
    const { r } = this.showRect;
    return $tool.rotatePoint(point.x, point.y, -r);
  }

  /**
   * 初始化矩形
   * @private
   */
  _initRect() {
    const img = this.img;
    if (!img) return;
    const pw = this._root.drawWidth;
    const ph = this._root.drawHeight;
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
   * @param {number | null} minX=null
   * @param {number | null} minY=null
   * @param {number | null} maxX=null
   * @param {number | null} maxY=null
   * @private
   */
  _initMoveRange (minX = null, minY = null, maxX = null, maxY = null) {
    if (minX === null || minY === null || maxX === null || maxY === null) {
      const {w, h} = this.imgRect;
      if (w === 0) return;
      const pw = this._root.drawWidth;
      const ph = this._root.drawHeight;
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
      this._moveRect = { minX, minY, maxX, maxY };
    } else {
      this._moveRect = { minX, minY, maxX, maxY };
    }
  }

  /**
   * 绘制画布
   * @param {module:vue-picture-cut.Rect} imgRect - 图片矩形
   * @param {module:vue-picture-cut.RectFull} showRect - 将要显示的矩形
   * @private
   */
  _draw(imgRect, showRect) {
    this.clear();
    if (this.img) {
      const { x, y, w, h, r, sV, sH} = showRect;
      const ctx = this._ctx;
      ctx.save();
      ctx.rotate(-r * Math.PI / 180);

      ctx.translate(x , y);
      ctx.scale(sH, sV);

      ctx.drawImage(
        this.img,
        imgRect.x,
        imgRect.y,
        imgRect.w,
        imgRect.h,
        -w / 2,
        -h /2,
        w,
        h
      );

      ctx.scale(-sH, -sV);
      ctx.translate(-x, -y);

      if (this._root.debug) {
        let {x: coreX, y: coreY} = this._root.core;
        let {minX, minY, maxX, maxY} = this._moveRect;
        ctx.strokeStyle = '#0f0';
        ctx.lineWidth = 2;
        for (let i = 0; i < this._root.drawHeight / 200; i++) {
          ctx.beginPath();
          ctx.moveTo(-coreX, i * 100 + 50);
          ctx.lineTo(coreX, i * 100 + 50);
          ctx.stroke();
          ctx.closePath();
          ctx.beginPath();
          ctx.moveTo(-coreX, -i * 100 - 50);
          ctx.lineTo(coreX, -i * 100 - 50);
          ctx.stroke();
          ctx.closePath();
        }
        for (let i = 0; i < this._root.drawWidth / 200; i++) {
          ctx.beginPath();
          ctx.moveTo(i * 100 + 50, -coreY);
          ctx.lineTo(i * 100 + 50, coreY);
          ctx.stroke();
          ctx.closePath();
          ctx.beginPath();
          ctx.moveTo(-i * 100 - 50, -coreY);
          ctx.lineTo(-i * 100 - 50, coreY);
          ctx.stroke();
          ctx.closePath();
        }

        if (minX !== null &&
          maxX !== null &&
          minY !== null &&
          maxY !== null) {
          ctx.strokeStyle = '#00f';
          ctx.fillStyle = 'rgba(0,0,0,0)';
          ctx.lineWidth = 2;
          ctx.strokeRect(
            minX,
            minY,
            maxX - minX,
            maxY - minY);
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
  clear () {
    this._ctx.clearRect(
      -this._root.core.x,
      -this._root.core.y,
      this._root.drawWidth,
      this._root.drawHeight);
  }

  touchEnd(tps) {
    if (!this.img) return;
    if (!this._touchList.length) {
      return;
    }
    tps = this._touchList.filter(v => v.id !== tps[0].id);
    if (tps.length === 0) {
      this.wheelEnd();
    } else if (tps.length === 1) {
      this._touchStart1(tps[0]);
    }
    this._touchList = tps;
  }

  touchMove(tps) {
    if (!this.img) return;
    if (tps.length === 1) {
      this._touchMove1(tps[0]);
    } else if (tps.length === 2) {
      this._touchMove2(tps[0], tps[1]);
    } else if (tps.length > 2) {
      const ids = this._touchList.map(v => v.id);
      tps = tps.filter(v => (ids.indexOf(v.id) > -1));
      if (tps.length === 2) {
        this._touchMove2(tps[0], tps[1]);
      }
    }
  }

  touchStart(tps) {
    if (!this.img) return;
    this._animation?.abort();

    const tp = tps[0];
    if (!this._touchList.length) {

      this._touchList.push(tp);
      this._touchStart1(tp);

    } else if (this._touchList.length === 1) {
      // 判断触点是否重复
      if (this._touchList[0].id !== tp.id) {
        this._touchList.push(tp);
        this._touchStart2(this._touchList[0], this._touchList[1]);
      }

    }
  }

  wheelStart(zoom, point) {
    if (!this.img) return;
    this._status = 'scale';
    this.wheelChange(zoom, point);
  }

  wheelChange(zoom, point) {
    if (!this.img) return;
    this._animation?.abort();

    this._touchstartEvent = $tool.doubleTouche(point);
    const core = this._touchstartEvent.core;
    const offPoint = this._changePointByImage(core);
    this._touchstartPoint = this._getPointerLocation(offPoint);
    this._root.setPriority(this);

    let {w, h} = this.showRect;
    let size = Math.max(w, h);
    zoom = 1 + zoom * 0.0005;
    zoom = (size - 700 + 700 * zoom) / size;
    zoom = zoom > 1.08 ? 1.08 : zoom < 0.92593 ? 0.92593 : zoom;
    this.__scaleByZoom(zoom, point);
    this._draw(this.imgRect, this.showRect);
  }

  wheelEnd() {
    if (!this.img) return;
    this._status = null;
    this._touchstartEvent = $tool.doubleTouche({x: 0, y: 0, id: 0});
    this._touchstartPoint = {x: 0, y: 0};
    this.emitCheckRange();
    this._root.deletePriority(this.className);
  }

  _touchStart1(tp) {
    this._status = 'move';
    this._touchstartEvent = $tool.doubleTouche(tp);
    const offPoint = this._changePointByImage(tp);
    this._touchstartPoint = this._getPointerLocation(offPoint);
  }

  _touchStart2(tp1, tp2) {
    const { sV, sH } = this.showRect;
    this._status = 'scale';
    if ((!sV && sH) || (sV && !sH)) {
      this._touchstartEvent = $tool.doubleTouche(tp2, tp1);
    } else {
      this._touchstartEvent = $tool.doubleTouche(tp1, tp2);
    }
    const core = this._touchstartEvent.core;
    const offPoint = this._changePointByImage(core);
    this._touchstartPoint = this._getPointerLocation(offPoint);
    this._root.setPriority(this);
  }

  _touchMove1(tp) {
    if (this._status === 'move') {
      this._root.setPriority(this);
      this._touchList[0] = tp;
      this._move(tp);
      this._draw(this.imgRect, this.showRect);
    }
  }

  _touchMove2(tp1, tp2) {
    if (this._status === 'scale') {
      this._touchList = [tp1, tp2];
      const doubleToucheEvent = $tool.doubleTouche(tp1, tp2);
      this._scaleByLocation(doubleToucheEvent)
      this._draw(this.imgRect, this.showRect);
    }
  }

  /**
   * 获取core相对图片的位置
   * @param {module:vue-picture-cut.Point} core
   * @returns {module:vue-picture-cut.Point}
   * @private
   */
  _getPointerLocation(core) {
    return {x: core.x - this.showRect.x, y: core.y - this.showRect.y};
  }

  /**
   * 移动图片
   * @param {module:vue-picture-cut.Point} core
   * @private
   */
  _move(core) {
    const pl = this._touchstartPoint;
    const offPoint = this._changePointByImage(core);
    this.showRect.x = offPoint.x - pl.x;
    this.showRect.y = offPoint.y - pl.y;
  }

  /**
   * 缩放图片
   * @param {module:vue-picture-cut.DoubleToucheEvent} e
   * @private
   */
  _scaleByLocation(e) {
    let zoom = e.length / this._touchstartEvent.length;
    zoom = (zoom < 0.9091) ? 0.9091 : zoom;
    zoom = (zoom > 1.1) ? 1.1 : zoom;
    this._scaleByZoom(zoom, e.core);
    this._touchstartEvent = e;
  }

  /**
   * 缩放图片
   * @param {number} zoom=1
   * @param {module:vue-picture-cut.Point} core
   * @param {number} [angle=0]
   * @private
   */
  __scaleByZoom = $tool.throttle(this._scaleByZoom, 16);

  /**
   * 缩放图片
   * @param {number} zoom
   * @param {module:vue-picture-cut.Point} core
   * @param {number} [angle=0]
   * @private
   */
  _scaleByZoom(zoom, core, angle = 0) {

    let pl = this._touchstartPoint;
    this._touchstartPoint = { x: pl.x * zoom, y: pl.y * zoom};
    pl = this._touchstartPoint;
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
   * 触发边缘检测
   */
  emitCheckRange() {
    const [offX, offY, offW, offH] = this._checkRange();
    this.doAnimation(offX, offY, offW, offH, 0);
  }

  /**
   * 检查图片是否在可移动范围内
   * @param {module:vue-picture-cut.RectFull} showRect
   * @returns {[number, number, number, number]}
   * @private
   */
  _checkRange(showRect = this.showRect) {
    let { x: cx, y: cy } = showRect;
    const { w: cw, h: ch } = showRect;
    cx -= cw / 2;
    cy -= ch / 2;
    let { minX, minY, maxX, maxY } = this._moveRect;
    minX = minX || 0;
    minY = minY || 0;
    maxX = maxX || 0;
    maxY = maxY || 0;
    let nx = cx, ny = cy, nw = cw, nh = ch;
    let rl = this._getPhotoByRangeLocation([cx, cy, cw, ch]);
    const imgOff = cw / ch;
    if (rl[4] <= 0) {
      nw = maxX - minX;
      nh = nw / imgOff;
      nx = cx + (cw - nw) / 2;
      ny = cy + (ch - nh) / 2;
    }
    rl = this._getPhotoByRangeLocation([nx, ny, nw, nh]);
    if (rl[5] <= 0) {
      nh = maxY - minY;
      nw = nh * imgOff;
      nx = cx + (cw - nw) / 2;
      ny = cy + (ch - nh) / 2;
    }
    rl = this._getPhotoByRangeLocation([nx, ny, nw, nh]);
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
   * @param {[number, number, number, number]} [newLocation]
   * @returns {[number, number, number, number, number, number]} - 坐标偏移量
   * @private
   */
  _getPhotoByRangeLocation(newLocation) {
    let {edgeDetection} = this._root;
    let { x, y, w, h } = this.showRect;
    const { minX, minY, maxX, maxY } = this._moveRect;
    if (newLocation) {
      [x, y, w, h] = newLocation;
    }
    if (edgeDetection) {
      return [
        x - (minX || 0),
        y - (minY || 0),
        x + w - (maxX || 0),
        y + h - (maxY || 0),
        w - (maxX || 0) + (minX || 0),
        h - (maxY || 0) + (minY || 0)
      ];
    } else {
      return [
        x - (maxX || 0),
        y - (maxY || 0),
        x + w - (minX || 0),
        y + h - (minY || 0),
        w - (minX || 0) + (maxX || 0),
        h - (minY || 0) + (maxY || 0)
      ];
    }
  }

  /**
   * 动画
   * @param {number} offX - 偏移量
   * @param {number} offY - 偏移量
   * @param {number} offW - 偏移量
   * @param {number} offH - 偏移量
   * @param {number} offR - 偏移量
   * @param {boolean} [offSV] - 偏移量
   * @param {boolean} [offSH] - 偏移量
   * @param {Function} [endCallback] - 结束时的回调
   */
  doAnimation(offX, offY, offW, offH, offR, offSV, offSH, endCallback) {
    if (!offX && !offY && !offW && !offH && !offR && offSV === undefined && offSH === undefined) {
      return;
    }
    const { x, y, w, h, r, sV, sH} = this.showRect;
    offSV = offSV === void 0 ? sV === -1 : offSV;
    offSH = offSH === void 0 ? sH === -1 : offSH;
    const showRect = {
      x: x + offX,
      y: y + offY,
      w: w + offW,
      h: h + offH,
      r: r + offR,
      sV: offSV ? -1 : 1,
      sH: offSH ? -1 : 1,
    };
    const _offSV = showRect.sV - sV;
    const _offSH = showRect.sH - sH;
    if (!offX && !offY && !offW && !offH && !offR && !_offSH && !_offSV) {
      return;
    }
    this._showRect = this.showRect;
    this.showRect = showRect;
    this._animation = createAnimation({
      duration: 300,
      timing: 'ease-in-out',
      change: (i, j) => {
        this._showRect = {
          x: x + j * offX,
          y: y + j * offY,
          w: w + j * offW,
          h: h + j * offH,
          r: r + j * offR,
          sV: sV + j * _offSV,
          sH: sH + j * _offSH
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
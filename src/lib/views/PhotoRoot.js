import $tool from './tool';

/**
 @class {module:vue-picture-cut.PhotoRoot} PhotoRoot
 */
export default class PhotoRoot{

  /**
   * @type {boolean}
   */
  debug = false;
  /**
   * 是否是火狐
   * @type {boolean}
   */
  isFirefox = navigator.userAgent.indexOf("Firefox") > 0;
  /**
   * 最外层dom
   * @type {HTMLElement|null}
   */
  root = null;
  /**
   * 画布宽
   * @type {number}
   */
  width = 0;
  /**
   * 画布高
   * @type {number}
   */
  height = 0;
  /**
   * 绘制宽
   * @type {number}
   */
  drawWidth = 0;
  /**
   * 绘制高
   * @type {number}
   */
  drawHeight = 0;
  /**
   * 缩放率
   * @type {number}
   */
  magnification = window.devicePixelRatio;
  /**
   * 开启边缘检测
   * @type {boolean}
   */
  _edgeDetection = false;
  /**
   * 画布中心
   * @type {module:vue-picture-cut.Point}
   */
  core;
  /**
   * 事件队列
   * @type {module:vue-picture-cut.EventList}
   * @private
   */
  eventList = new Map();
  /**
   * 事件优先队列
   * @type {module:vue-picture-cut.PhotoBasic|null}
   */
  priorityEvent = null;
  /**
   * 记录滚轮触发时间
   * @type {number}
   * @private
   */
  _wheelTime = 0;
  /**
   * 记录滚轮触发时间
   * @type {number}
   * @private
   */
  _wheelTimeOut = 0;
  /**
   * 记录滚轮状态
   * @type {boolean}
   * @private
   */
  _wheelStatus = false;

  get edgeDetection() {
    return this._edgeDetection;
  }

  set edgeDetection(value) {
    this._edgeDetection = value;
    const photoMain = this.getEventList('PhotoMain');
    if (photoMain) {
      photoMain.emitCheckRange();
    }
  }

  /**
   * 鼠标样式
   * @param {string} value
   */
  set cursor(value) {
    if (!this.root) return;
    this.root.style.cursor = value;
  }

  constructor() {}

  /**
   * 初始化
   * @param {HTMLDivElement} el
   * @param {module:vue-picture-cut.PhotoRootInitParams} [options={}]
   */
  init (el, options = {}) {
    let magnification = options.magnification || 1.5;
    let edgeDetection = !!options.edgeDetection || false;
    this.root = el;
    this.width = el.offsetWidth;
    this.height = el.offsetHeight;
    this.drawWidth = Math.floor(this.width * magnification);
    this.drawHeight = Math.floor(this.height * magnification);
    this.magnification = magnification;
    this.edgeDetection = edgeDetection;
    this.core = {
      x: Math.floor(this.drawWidth / 2),
      y: Math.floor(this.drawHeight / 2)
    };
    this._eventInit();
  }


  /**
   * 添加对象到事件队列中
   * @param {module:vue-picture-cut.PhotoBasic} pe
   */
  addEventList(pe) {
    this.eventList.set(pe.className, pe);
  }

  /**
   * 从事件队列中获取对象
   * @param {string} className
   * @returns {any|null}
   */
  getEventList(className) {
    const t = this.eventList.get(className);
    if (t) {
      return t;
    }
    return null;
  }

  /**
   * 从事件队列中移除对象
   * @param {string} className
   */
  deleteEventList(className) {
    this.eventList.delete(className);
  }

  /**
   * 添加对象到事件优先队列
   * @param {module:vue-picture-cut.PhotoBasic} pe
   */
  setPriority(pe) {
    if (!this.priorityEvent) {
      this.priorityEvent = pe;
    }
  }

  /**
   * 从事件优先队列中获取对象
   * @returns {module:vue-picture-cut.PhotoBasic|null}
   */
  getPriority() {
    if (this.priorityEvent) {
      return this.priorityEvent;
    }
    return null;
  }

  /**
   * 从事件优先队列中移除对象
   * @param className
   */
  deletePriority(className) {
    if (this.priorityEvent && this.priorityEvent.className === className) {
      this.priorityEvent = null;
    }
  }

  /**
   * 事件初始化
   * @private
   */
  _eventInit () {
    if (!this.root) return;
    this.root.addEventListener('touchstart', event =>  {
      const e = event || window.event;
      e.preventDefault();
      const touches = e.changedTouches;
      this._touchStart(touches);
    }, false);
    this.root.addEventListener('touchend', event => {
      const e = event || window.event;
      e.preventDefault();
      const touches = e.changedTouches;
      this._touchEnd(touches);
    }, false);
    this.root.addEventListener('touchmove', event => {
      const e = event || window.event;
      e.preventDefault();
      const touches = e.changedTouches;
      this._touchMove(touches);
    }, false);
    this.root.addEventListener('mousedown', event => {
      const e = event || window.event;
      e.preventDefault();
      this._mouseDown(e);
    }, false);
    this.root.addEventListener('mouseup', event => {
      const e = event || window.event;
      e.preventDefault();
      this._mouseUp(e);
    }, false);
    this.root.addEventListener('mouseleave', event => {
      const e = event || window.event;
      e.preventDefault();
      this._mouseUp(e);
    }, false);
    this.root.addEventListener('mousemove', event => {
      const e = event || window.event;
      e.preventDefault();
      this._mouseMove(e);
    }, false);
    this.isFirefox ?
      this.root.addEventListener('DOMMouseScroll', event => {
        /**
         * 鼠标滚轮事件
         * @type {WheelEvent}
         */
        // @ts-ignore
        const e = event || window.event;
        e.preventDefault();
        const delta = e.detail * -40;
        this._mouseWheel(delta, {
          x: e.layerX * this.magnification - this.core.x,
          y: e.layerY * this.magnification - this.core.y
        });
      }, false) :
      this.root.addEventListener('mousewheel', event => {
        /**
         * 鼠标滚轮事件
         * @type {WheelEvent}
         */
        // @ts-ignore
        const e = event || window.event;
        e.preventDefault();
        // @ts-ignore
        const delta = e.wheelDelta || e.detail;
        this._mouseWheel(delta, {
          x: e.offsetX * this.magnification - this.core.x,
          y: e.offsetY * this.magnification - this.core.y
        });
      }, false);
  }

  /**
   * 触摸事件
   * @param {TouchList} touches
   * @private
   */
  _touchStart(touches) {
    const cts = Array.from(touches).map(t => this._getTouchePoint(t));
    if (this.priorityEvent) {
      this.priorityEvent.touchStart($tool.cloneJSON(cts));
    } else {
      const _pes = [];
      for (const pe of this.eventList.values()) {
        pe.touchStart($tool.cloneJSON(cts));
        if (!this.priorityEvent) {
          _pes.push(pe);
        } else {
          break;
        }
      }
      if (this.priorityEvent) {
        _pes.forEach(pe => pe.touchEnd($tool.cloneJSON(cts)));
      }
    }
  }

  /**
   * 触摸事件
   * @param {TouchList} touches
   * @private
   */
  _touchEnd (touches) {
    const cts = Array.from(touches).map(t => this._getTouchePoint(t));
    if (this.priorityEvent) {
      this.priorityEvent.touchEnd($tool.cloneJSON(cts));
    } else {
      this.eventList.forEach(pe => pe.touchEnd($tool.cloneJSON(cts)));
    }
  }

  /**
   * 触摸事件
   * @param {TouchList} touches
   * @private
   */
  _touchMove (touches) {
    const cts = Array.from(touches).map(t => this._getTouchePoint(t));
    if (this.priorityEvent) {
      this.priorityEvent.touchMove($tool.cloneJSON(cts));
    } else {
      this.eventList.forEach(pe => pe.touchMove($tool.cloneJSON(cts)));
    }
  }

  /**
   * 鼠标事件
   * @param {MouseEvent} e
   * @private
   */
  _mouseDown (e) {
    const cts = [this._getMousePoint(e)];
    if (this.priorityEvent) {
      this.priorityEvent.touchStart($tool.cloneJSON(cts));
    } else {
      const _pes = [];
      for (const pe of this.eventList.values()) {
        pe.touchStart($tool.cloneJSON(cts));
        if (!this.priorityEvent) {
          _pes.push(pe);
        } else {
          break;
        }
      }
      if (this.priorityEvent) {
        _pes.forEach(pe => pe.touchEnd($tool.cloneJSON(cts)));
      }
    }
  }

  /**
   * 鼠标事件
   * @param {MouseEvent} e
   * @private
   */
  _mouseUp (e) {
    const cts = [this._getMousePoint(e)];
    if (this.priorityEvent) {
      this.priorityEvent.touchEnd($tool.cloneJSON(cts));
    } else {
      this.eventList.forEach(pe => pe.touchEnd($tool.cloneJSON(cts)));
    }
  }

  /**
   * 鼠标事件
   * @param {MouseEvent} e
   * @private
   */
  _mouseMove (e) {
    const cts = [this._getMousePoint(e)];
    if (this.priorityEvent) {
      this.priorityEvent.touchMove($tool.cloneJSON(cts));
    } else {
      this.eventList.forEach(pe => pe.touchMove($tool.cloneJSON(cts)));
    }
  }

  /**
   * 鼠标滚轮事件
   * @param {number} zoom
   * @param {module:vue-picture-cut.Point} point
   * @private
   */
  _mouseWheel (zoom, point) {
    clearTimeout(this._wheelTimeOut);
    const now = Date.now();
    const isStart = now - this._wheelTime > 400 && !this._wheelStatus;
    if (isStart) {
      // 滚轮开始
      this._wheelStatus = true;
      this._wheelStart(zoom, point);
    }
    this._wheelTime = now;
    this._wheelTimeOut = setTimeout(() => {
      // 滚轮结束
      this._wheelStatus = false;
      this._wheelEnd(zoom, point);
    }, 400);
    isStart || this._wheelChange(zoom, point);
  }

  /**
   * 滚轮事件
   * @param {number} zoom
   * @param {module:vue-picture-cut.Point} point
   * @private
   */
  _wheelStart(zoom, point) {
    if (this.priorityEvent) {
      this.priorityEvent.wheelStart(zoom, $tool.cloneJSON(point));
    } else {
      const _pes = [];
      for (const pe of this.eventList.values()) {
        pe.wheelStart(zoom, $tool.cloneJSON(point));
        if (!this.priorityEvent) {
          _pes.push(pe);
        } else {
          break;
        }
      }
      if (this.priorityEvent) {
        _pes.forEach(pe => pe.wheelEnd(zoom, $tool.cloneJSON(point)));
      }
    }
  }

  /**
   * 滚轮事件
   * @param {number} zoom
   * @param {module:vue-picture-cut.Point} point
   * @private
   */
  _wheelChange(zoom, point) {
    if (this.priorityEvent) {
      this.priorityEvent.wheelChange(zoom, $tool.cloneJSON(point));
    } else {
      this.eventList.forEach(pe => pe.wheelChange(zoom, $tool.cloneJSON(point)));
    }
  }

  /**
   * 滚轮事件
   * @param {number} zoom
   * @param {module:vue-picture-cut.Point} point
   * @private
   */
  _wheelEnd(zoom, point) {
    if (this.priorityEvent) {
      this.priorityEvent.wheelEnd(zoom, $tool.cloneJSON(point));
    } else {
      this.eventList.forEach(pe => pe.wheelEnd(zoom, $tool.cloneJSON(point)));
    }
  }

  /**
   * 获取手指
   * @param {Touch} ct
   * @returns {module:vue-picture-cut.TouchePoint|void}
   * @private
   */
  _getTouchePoint (ct) {
    if (!this.root) return;
    const elOffset = this._getClientPosition(this.root, {x: 0, y: 0});
    return {
      x: (ct.clientX - elOffset.x) * this.magnification - this.core.x,
      y: (ct.clientY - elOffset.y) * this.magnification - this.core.y,
      id: ct.identifier
    };
  }

  /**
   * 获取鼠标
   * @param {MouseEvent} ct
   * @returns {module:vue-picture-cut.TouchePoint}
   * @private
   */
  _getMousePoint (ct) {
    return {
      x: (this.isFirefox ? ct.layerX : ct.offsetX) * this.magnification - this.core.x,
      y: (this.isFirefox ? ct.layerY : ct.offsetY) * this.magnification - this.core.y,
      id: 0
    };
  }

  /**
   * 计算dom元素相对于网页左上角的绝对坐标
   * @param {HTMLElement} el
   * @param {module:vue-picture-cut.Point} p
   * @returns {module:vue-picture-cut.Point}
   * @private
   */
  _getClientPosition (el, p) {
    // const rect = el.getClientRects()[0];
    const rect = el.getBoundingClientRect();
    p.x += rect.left;
    p.y += rect.top;
    return p;
  }
}
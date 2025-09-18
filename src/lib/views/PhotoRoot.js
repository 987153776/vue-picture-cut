import $tool from './tool';

export default class PhotoRoot{

  debug = false;
  // 是否是火狐
  isFirefox = navigator.userAgent.indexOf("Firefox") > 0;
  // 最外层dom
  root;
  // 画布宽高
  width;
  height;
  // 绘制宽高
  drawWidth;
  drawHeight;
  // 缩放率
  magnification;
  // 画布中心
  core;
  // 事件队列
  eventList = new Map();
  // 事件优先队列
  priorityEvent = null;
  // 记录滚轮触发时间
  _wheelTime = 0;
  wheelTimeOut = 0;
  // 记录滚轮状态
  wheelstatus = false;

  init (el, magnification = 1.5) {
    this.root = el;
    this.width = el.offsetWidth;
    this.height = el.offsetHeight;
    this.drawWidth = Math.floor(this.width * magnification);
    this.drawHeight = Math.floor(this.height * magnification);
    this.magnification = magnification;
    this.core = {
      x: Math.floor(this.drawWidth / 2),
      y: Math.floor(this.drawHeight / 2)
    };
    this._eventInit();
  }

  /**
   * 鼠标样式
   */
  set cursor(value) {
    this.root.style.cursor = value;
  }

  /**
   * 添加对象到事件队列中
   * @param pe
   */
  addEventList(pe) {
    this.eventList.set(pe.className, pe);
  }

  /**
   * 从事件队列中获取对象
   * @param className
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
   * @param className
   */
  deleteEventList(className) {
    this.eventList.delete(className);
  }

  /**
   * 添加对象到事件优先队列
   * @param pe
   */
  setPriority(pe) {
    if (!this.priorityEvent) {
      this.priorityEvent = pe;
    }
  }

  /**
   * 从事件优先队列中获取对象
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
        const e = event || window.event;
        e.preventDefault();
        const delta = e.detail * -40;
        this._mouseWheel(delta, {
          x: e.layerX * this.magnification - this.core.x,
          y: e.layerY * this.magnification - this.core.y
        });
      }, false) :
      this.root.addEventListener('mousewheel', event => {
        const e = event || window.event;
        e.preventDefault();
        const delta = e.wheelDelta || e.detail;
        this._mouseWheel(delta, {
          x: e.offsetX * this.magnification - this.core.x,
          y: e.offsetY * this.magnification - this.core.y
        });
      }, false);
  }

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

  _touchEnd (touches) {
    const cts = Array.from(touches).map(t => this._getTouchePoint(t));
    if (this.priorityEvent) {
      this.priorityEvent.touchEnd($tool.cloneJSON(cts));
    } else {
      this.eventList.forEach(pe => pe.touchEnd($tool.cloneJSON(cts)));
    }
  }

  _touchMove (touches) {
    const cts = Array.from(touches).map(t => this._getTouchePoint(t));
    if (this.priorityEvent) {
      this.priorityEvent.touchMove($tool.cloneJSON(cts));
    } else {
      this.eventList.forEach(pe => pe.touchMove($tool.cloneJSON(cts)));
    }
  }

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

  _mouseUp (e) {
    const cts = [this._getMousePoint(e)];
    if (this.priorityEvent) {
      this.priorityEvent.touchEnd($tool.cloneJSON(cts));
    } else {
      this.eventList.forEach(pe => pe.touchEnd($tool.cloneJSON(cts)));
    }
  }

  _mouseMove (e) {
    const cts = [this._getMousePoint(e)];
    if (this.priorityEvent) {
      this.priorityEvent.touchMove($tool.cloneJSON(cts));
    } else {
      this.eventList.forEach(pe => pe.touchMove($tool.cloneJSON(cts)));
    }
  }

  _mouseWheel (zoom, point) {
    clearTimeout(this._wheelTimeOut);
    const now = Date.now();
    const isStart = now - this._wheelTime > 400 && !this._wheelstatus;
    if (isStart) {
      // 滚轮开始
      this._wheelstatus = true;
      this._wheelStart(zoom, point);
    }
    this._wheelTime = now;
    this._wheelTimeOut = setTimeout(() => {
      // 滚轮结束
      this._wheelstatus = false;
      this._wheelEnd(zoom, point);
    }, 400);
    isStart || this._wheelChange(zoom, point);
  }

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

  _wheelChange(zoom, point) {
    if (this.priorityEvent) {
      this.priorityEvent.wheelChange(zoom, $tool.cloneJSON(point));
    } else {
      this.eventList.forEach(pe => pe.wheelChange(zoom, $tool.cloneJSON(point)));
    }
  }

  _wheelEnd(zoom, point) {
    if (this.priorityEvent) {
      this.priorityEvent.wheelEnd(zoom, $tool.cloneJSON(point));
    } else {
      this.eventList.forEach(pe => pe.wheelEnd(zoom, $tool.cloneJSON(point)));
    }
  }

  /**
   * 获取手指
   * @param ct
   * @private
   */
  _getTouchePoint (ct) {
    console.log(ct)
    const elOffset = this._getClientPosition(this.root, {x: 0, y: 0});
    return {
      x: (ct.clientX - elOffset.x) * this.magnification - this.core.x,
      y: (ct.clientY - elOffset.y) * this.magnification - this.core.y,
      id: ct.identifier
    };
  }

  /**
   * 获取鼠标
   * @param ct
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
   * @param el
   * @param p
   * @private
   */
  _getClientPosition (el, p) {
    // const rect = el.getClientRects()[0];
    const rect = el.getBoundingClientRect();
    console.log(rect.top)
    p.x += rect.left;
    p.y += rect.top;
    return p;
  }
}
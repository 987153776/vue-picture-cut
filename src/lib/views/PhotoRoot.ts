import {
  WheelEvent2,
  TouchePoint,
  Point,
  PhotoBasic,
  // TouchList
} from './interface';

export default class PhotoRoot{

  debug = false;
  // 最外层dom
  root!: HTMLElement;
  // 画布宽高
  width!: number;
  height!: number;
  // 绘制宽高
  drawWidth!: number;
  drawHeight!: number;
  // 缩放率
  magnification!: number;
  // 画布中心
  core!: Point;
  // 事件队列
  eventList: Map<string, PhotoBasic> = new Map<string, PhotoBasic>();
  // 事件优先队列
  priorityList: Map<string, PhotoBasic> = new Map<string, PhotoBasic>();
  // 记录滚轮触发时间
  private wheelTime = 0;
  private wheelTimeOut = 0;
  // 记录滚轮状态
  private wheelstatus = false;

  init (el: HTMLDivElement, magnification = 1.5) {
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
  set cursor(value: string) {
    this.root.style.cursor = value;
  }

  /**
   * 添加对象到事件队列中
   * @param pe
   */
  addEventList(pe: PhotoBasic) {
    this.eventList.set(pe.className, pe);
  }

  /**
   * 从事件队列中获取对象
   * @param className
   */
  getEventList<T>(className: string): T | null {
    const t = this.eventList.get(className);
    if (t) {
      return t as unknown as T;
    }
    return null;
  }

  /**
   * 从事件队列中移除对象
   * @param className
   */
  deleteEventList(className: string) {
    this.eventList.delete(className);
  }

  /**
   * 添加对象到事件优先队列
   * @param pe
   */
  addPriorityList(pe: PhotoBasic) {
    this.priorityList.set(pe.className, pe);
  }

  /**
   * 从事件优先队列中获取对象
   * @param className
   */
  getPriorityList<T>(className: string): T | null {
    const t = this.priorityList.get(className);
    if (t) {
      return t as unknown as T;
    }
    return null;
  }

  /**
   * 从事件优先队列中移除对象
   * @param className
   */
  deletePriorityList(className: string) {
    this.priorityList.delete(className);
  }

  /**
   * 事件初始化
   * @private
   */
  private _eventInit () {
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
    this.root.addEventListener('mousewheel', event => {
      const e = (event || window.event) as unknown as WheelEvent2;
      const delta = e.wheelDelta || e.detail;
      this._mouseWheel(delta as number, {
        x: e.offsetX * this.magnification - this.core.x,
        y: e.offsetY * this.magnification - this.core.y
      });
    }, false);
  }

  private _touchStart(touches: TouchList) {
    const cts = Array.from(touches).map((t: Touch) => this._getTouchePoint(t));
    if (this.priorityList.size) {
      this.priorityList.forEach(pe => pe.touchStart(cts));
    } else {
      const _pes: PhotoBasic[] = [];
      for (const pe of this.eventList.values()) {
        pe.touchStart(cts);
        if (!this.priorityList.has(pe.className)) {
          _pes.push(pe);
        }
      }
      if (_pes.length < this.eventList.size) {
        _pes.forEach(pe => pe.touchEnd(cts));
      }
    }
  }

  private _touchEnd (touches: TouchList) {
    const cts = Array.from(touches).map((t: Touch) => this._getTouchePoint(t));
    if (this.priorityList.size) {
      this.priorityList.forEach(pe => pe.touchEnd(cts));
    } else {
      this.eventList.forEach(pe => pe.touchEnd(cts));
    }
  }

  private _touchMove (touches: TouchList) {
    const cts = Array.from(touches).map((t: Touch) => this._getTouchePoint(t));
    if (this.priorityList.size) {
      this.priorityList.forEach(pe => pe.touchMove(cts));
    } else {
      this.eventList.forEach(pe => pe.touchMove(cts));
    }
  }

  private _mouseDown (e: MouseEvent) {
    const cts = [this._getMousePoint(e)];
    if (this.priorityList.size) {
      this.priorityList.forEach(pe => pe.touchStart(cts));
    } else {
      const _pes: PhotoBasic[] = [];
      for (const pe of this.eventList.values()) {
        pe.touchStart(cts);
        if (!this.priorityList.has(pe.className)) {
          _pes.push(pe);
        }
      }
      if (_pes.length < this.eventList.size) {
        _pes.forEach(pe => pe.touchEnd(cts));
      }
    }
  }

  private _mouseUp (e: MouseEvent) {
    const cts = [this._getMousePoint(e)];
    if (this.priorityList.size) {
      this.priorityList.forEach(pe => pe.touchEnd(cts));
    } else {
      this.eventList.forEach(pe => pe.touchEnd(cts));
    }
  }

  private _mouseMove (e: MouseEvent) {
    const cts = [this._getMousePoint(e)];
    if (this.priorityList.size) {
      this.priorityList.forEach(pe => pe.touchMove(cts));
    } else {
      this.eventList.forEach(pe => pe.touchMove(cts));
    }
  }

  private _mouseWheel (zoom: number, point: Point) {
    clearTimeout(this.wheelTimeOut);
    const now = Date.now();
    const isStart = now - this.wheelTime > 350 && !this.wheelstatus;
    if (isStart) {
      // 滚轮开始
      this.wheelstatus = true;
      this._wheelStart(zoom, point);
    }
    this.wheelTime = now;
    this.wheelTimeOut = setTimeout(() => {
      // 滚轮结束
      this.wheelstatus = false;
      this._wheelEnd(zoom, point);
    }, 350);
    isStart || this._wheelChange(zoom, point);
  }

  private _wheelStart(zoom: number, point: Point) {
    if (this.priorityList.size) {
      this.priorityList.forEach(pe => pe.wheelStart(zoom, point));
    } else {
      const _pes: PhotoBasic[] = [];
      for (const pe of this.eventList.values()) {
        pe.wheelStart(zoom, point);
        if (!this.priorityList.has(pe.className)) {
          _pes.push(pe);
        }
      }
      if (_pes.length < this.eventList.size) {
        _pes.forEach(pe => pe.wheelEnd(zoom, point));
      }
    }
  }

  private _wheelChange(zoom: number, point: Point) {
    if (this.priorityList.size) {
      this.priorityList.forEach(pe => pe.wheelChange(zoom, point));
    } else {
      this.eventList.forEach(pe => pe.wheelChange(zoom, point));
    }
  }

  private _wheelEnd(zoom: number, point: Point) {
    if (this.priorityList.size) {
      this.priorityList.forEach(pe => pe.wheelEnd(zoom, point));
    } else {
      this.eventList.forEach(pe => pe.wheelEnd(zoom, point));
    }
  }

  /**
   * 获取手指
   * @param ct
   * @private
   */
  private _getTouchePoint (ct: Touch): TouchePoint {
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
  private _getMousePoint (ct: MouseEvent): TouchePoint {
    return {
      x: ct.offsetX * this.magnification - this.core.x,
      y: ct.offsetY * this.magnification - this.core.y,
      id: 0
    };
  }

  /**
   * 计算dom元素相对于网页左上角的绝对坐标
   * @param el
   * @param p
   * @private
   */
  private _getClientPosition (el: HTMLElement, p: Point): Point {
    p.x += el.offsetLeft;
    p.y += el.offsetTop;
    if (el.tagName === 'HTML' || el.offsetParent === null) {
      return p;
    } else {
      return this._getClientPosition(el.offsetParent as HTMLElement, p);
    }
  }
}
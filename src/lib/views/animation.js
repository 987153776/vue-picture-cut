import Bezier, { BEZIER } from './Bezier';

(function() {
  let lastTime = 0;
  const vendors = ['webkit', 'moz'];
  for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
      window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      const id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
}());

/**
 * 主画布
 * @class {module:vue-picture-cut.Animation} Animation
 */
class Animation {
  /**
   * 贝塞尔曲线
   * @type {module:vue-picture-cut.Bezier}
   * @private
   */
  _bezier = new Bezier();
  /**
   * 动画持续时间，单位毫秒，
   * 默认1000毫秒。
   * @type {number}
   */
  _duration = 1000;
  /**
   * 动画的过渡类型：
   * linear(线性过渡)；
   * ease(默认，平滑过渡)；
   * ease-in(由慢到快)；
   * ease-out(由快到慢)；
   * ease-in-out(由慢到快再到慢)；
   * [[x1,y1],[x1,y1]...](数组,[x1,y1]表示点1的坐标,[x2,y2]表示点2的坐标)。
   * @type {module:vue-picture-cut.Bezier|string}
   */
  _timing = [];
  /**
   * 动画的延迟时间，单位毫秒，
   * 默认0毫秒。
   * @type {number}
   */
  _delay = 0
  /**
   * 动画循环次数，infinite为无限循环
   * 默认1次。
   * @type {number | string}
   */
  _iteration = 1;
  /**
   * 动画在循环中是否反向运动：
   * normal(默认，正向运动)；
   * reverse(反向运行)；
   * alternate(先正向，后反向，并交替)；
   * alternate-reverse(先反向，后正向，并交替)。
   * @type {string}
   */
  _direction = 'normal';
  /**
   * 回调函数，接收参数x，x在0~1之间
   * @type {module:vue-picture-cut.AnimationParamsChange}
   */
  _change = () => false;
  /**
   * 回调函数，动画结束时执行
   * @type {module:vue-picture-cut.AnimationParamsEnd}
   */
  _end = () => undefined;
  /**
   * 包含循环的总的时间
   * @type {number}
   */
  _times;
  /**
   * 动画开始时的时间
   * @type {number}
   */
  _startTime = 0;
  /**
   * 动画状态
   * @type {number}
   */
  _id = 0;

  /**
   * 构造函数
   * @param {module:vue-picture-cut.AnimationParams} option
   */
  constructor(option) {
    if (option.duration !== void 0) this._duration = option.duration;
    if (option.timing !== void 0) {
      if (typeof option.timing === "string") {
        this._timing = BEZIER[option.timing] || BEZIER['linear'];
      } else {
        this._timing = option.timing;
      }
    }
    if (option.delay !== void 0) this._delay = option.delay;
    if (option.iteration !== void 0) this._iteration = option.iteration;
    if (option.direction !== void 0) this._direction = option.direction;
    if (option.change !== void 0) this._change = option.change;
    if (option.end !== void 0) this._end = option.end;

    // 包含循环的总的时间
    // @ts-ignore
    const times = (this._iteration === 'infinite') ? Infinity : (this._iteration * this._duration);
    // 如果动画正反向交替进行，则总时间乘以2
    this._times = (this._direction === 'alternate' || this._direction === 'alternate-reverse') ? (2 * times) : times;

    this._bezier.setOpt(this._timing);
  }

  /**
   * 开始动画
   */
  start () {
    // 动画开始时的时间
    this._startTime = 0;
    // 判断延迟执行
    if (this._delay) {
      setTimeout(() => {
        this._startTime = Date.now();
        this._do();
      }, this._delay);
    } else {
      this._startTime = Date.now();
      this._do();
    }
    return this;
  }

  _do() {
    this._id = requestAnimationFrame(() => {
      // 动画运行的时间，毫秒
      const difT = Date.now() - this._startTime;

      let difT2 = difT / this._duration;
      // 运行的次数
      const n = parseInt(String(difT2));

      difT2 = difT2 - n;

      switch (this._direction) {
        case 'normal': // 正向运行
          difT2 = (difT < this._times) ? difT2 : 1;
          break;
        case 'reverse': // 反向运行
          difT2 = (difT < this._times) ? (1 - difT2) : 0;
          break;
        case 'alternate': // 先正向，后反向，并交替
          if (n % 2) difT2 = (difT < this._times) ? (1 - difT2) : 0;
          else difT2 = (difT < this._times) ? difT2 : 1;
          if (n / 2 === this._iteration) difT2 = 0;
          break;
        case 'alternate-reverse': // 先反向，后正向，并交替
          if (n % 2) difT2 = (difT < this._times) ? difT2 : 1;
          else difT2 = (difT < this._times) ? (1 - difT2) : 0;
          if (n / 2 === this._iteration) difT2 = 1;
          break;
      }
      const { x, y } = this._bezier.getPoint(difT2);
      const c = this._change(x, y);
      console.log(c, difT, this._times);
      if (c !== false && difT < this._times) {
        this._do();
      } else this._end();
    });
  }

  /**
   * 中止动画
   * @param {boolean} doEnd 是否执行动画结束时的回调
   */
  abort (doEnd = false) {
    this._id > 0 && cancelAnimationFrame(this._id);
    this._id = 0;
    doEnd && this._end();
  }
}

export default function createAnimation(option) {
  return new Animation(option);
}
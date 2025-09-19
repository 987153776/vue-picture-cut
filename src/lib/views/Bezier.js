/**
 * 常用贝塞尔预设
 */
export const BEZIER = {
  'linear': [[0, 0], [1, 1]], // 线性过渡
  'ease': [[0, 0], [0.25, 0.1], [1, 1]], // 平滑过渡
  'ease-in': [[0, 0], [0.42, 0], [1, 1]], // 由慢到快
  'ease-out': [[0, 0], [0.58, 1], [1, 1]], // 由快到慢
  'ease-in-out': [[0, 0], [0.42, 0], [0.58, 1], [1, 1]], // 由慢到快再到慢
}

/**
 * n次贝塞尔
 * @class {module:vue-picture-cut.Bezier} PhotoMain
 */
export default class Bezier {

  /**
   * 贝塞尔曲线控制点
   * @type {[number, number][]}
   * @private
   */
  _bezierCtrlNodesArr = [];

  constructor(){}

  /**
   * 设置贝塞尔曲线控制点
   * @param {[number, number][]} Nodes
   * @returns {module:vue-picture-cut.Bezier}
   */
  setOpt(Nodes = []) {
    this._bezierCtrlNodesArr = Nodes;
    return this;
  }

  /**
   * 获取贝塞尔曲线点
   * @param {number} t 时间
   * @returns {module:vue-picture-cut.Point}
   */
  getPoint(t) {
    const bezierCtrlNodesArr = this._bezierCtrlNodesArr,
      n = bezierCtrlNodesArr.length - 1;
    let x = 0, y = 0;
    bezierCtrlNodesArr.forEach((item, index) => {
      if (!index) {
        x += item[0] * Math.pow((1 - t), n - index) * Math.pow(t, index)
        y += item[1] * Math.pow((1 - t), n - index) * Math.pow(t, index)
      } else {
        x += this._factorial(n) / this._factorial(index) / this._factorial(n - index) * item[0] * Math.pow((1 - t), n - index) * Math.pow(t, index)
        y += this._factorial(n) / this._factorial(index) / this._factorial(n - index) * item[1] * Math.pow((1 - t), n - index) * Math.pow(t, index)
      }
    });
    return {
      x: x,
      y: y
    }
  }

  /**
   * 递归阶乘
   * @param {number} num
   * @returns {number}
   * @private
   */
  _factorial(num) { //递归阶乘
    if (num <= 1) {
      return 1;
    } else {
      return num * this._factorial(num - 1);
    }
  }
}
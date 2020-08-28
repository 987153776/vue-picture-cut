import {
  Point,
  BEZIERInterface,
  BezierInterface
} from './interface';

/**
 * 常用贝塞尔预设
 */
export const BEZIER: BEZIERInterface = {
  'linear': [[0, 0], [1, 1]], // 线性过渡
  'ease': [[0, 0], [0.25, 0.1], [1, 1]], // 平滑过渡
  'ease-in': [[0, 0], [0.42, 0], [1, 1]], // 由慢到快
  'ease-out': [[0, 0], [0.58, 1], [1, 1]], // 由快到慢
  'ease-in-out': [[0, 0], [0.42, 0], [0.58, 1], [1, 1]], // 由慢到快再到慢
}

/**
 * n次贝塞尔
 */
export default class Bezier implements BezierInterface {
  
  private bezierCtrlNodesArr: [number, number][] = [];

  setOpt(Nodes: [number, number][] = []): this {
    this.bezierCtrlNodesArr = Nodes;
    return this;
  }

  getPoint(t: number): Point {
    const bezierCtrlNodesArr = this.bezierCtrlNodesArr,
      n = bezierCtrlNodesArr.length - 1;
    let x = 0, y = 0;
    bezierCtrlNodesArr.forEach((item, index) => {
      if (!index) {
        x += item[0] * Math.pow((1 - t), n - index) * Math.pow(t, index)
        y += item[1] * Math.pow((1 - t), n - index) * Math.pow(t, index)
      } else {
        x += this.factorial(n) / this.factorial(index) / this.factorial(n - index) * item[0] * Math.pow((1 - t), n - index) * Math.pow(t, index)
        y += this.factorial(n) / this.factorial(index) / this.factorial(n - index) * item[1] * Math.pow((1 - t), n - index) * Math.pow(t, index)
      }
    });
    return {
      x: x,
      y: y
    }
  }

  /**
   * 递归阶乘
   * @param num
   */
  private factorial(num: number): number { //递归阶乘
    if (num <= 1) {
      return 1;
    } else {
      return num * this.factorial(num - 1);
    }
  }
}
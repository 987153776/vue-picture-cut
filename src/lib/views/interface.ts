export class Win extends Window {
  BlobBuilder?: any;
  WebKitBlobBuilder?: any;
  MozBlobBuilder?: any;
  MSBlobBuilder?: any;
}

export interface Point {
  x: number;
  y: number;
}

export interface TouchePoint extends Point {
  id: number;
}

export interface Rect extends Point {
  w: number;
  h: number;
}

export interface RectFull extends Rect {
  /**
   * 旋转角度
   */
  r: number;
}

export interface Round extends Point {
  /**
   * 半径
   */
  r: number;
}

export interface Rect2 {
  minX: number | null;
  minY: number | null;
  maxX: number | null;
  maxY: number | null;
}

export interface WheelEvent2 {
  offsetX: number;
  offsetY: number;
  wheelDelta?: number; // chrome & ie
  detail?: number; // firefox
  preventDefault (): void;
}

export interface ParamsInterface {
  [index: number]: number;
  length: number;
}

export interface ClipResult {
  src: string;
  file: Blob;
}

export interface CubeInterface {
  setOpt(arg: string | ParamsInterface): this;
  setOptByString(arg: string): this;
  setOptByArr(p1x: number, p1y: number, p2x: number, p2y: number): this;
  getPoint(time: number): number;
}

export interface BezierInterface {
  [name: string]: number[];
}

export interface AnimationParamsChange {
  (i: number): boolean | void;
}

export interface AnimationParamsEnd {
  (): void;
}

export interface AnimationParams {
  change: AnimationParamsChange;
  duration?: number;
  timing?: string | number[];
  delay?: number;
  iteration?: number | string;
  direction?: string;
  end?: AnimationParamsEnd;
}

export interface AnimationInterface {
  start(): this;
  abort(): void;
}

export interface PhotoBasic {
  className: string;
  touchStart(tps: TouchePoint[]): void;
  touchMove(tps: TouchePoint[]): void;
  touchEnd(tps: TouchePoint[]): void;
  wheelStart(zoom: number, point: Point): void;
  wheelEnd(zoom: number, point: Point): void;
  wheelChange(zoom: number, point: Point): void;
}

/**
 * 移动端双指事件
 */
export interface DoubleToucheEvent{
  /**
   * 中心坐标
   */
  core: Point;
  /**
   * x轴双指间距
   */
  lengthX: number;
  /**
   * y轴双指间距
   */
  lengthY: number;
  /**
   * 双指间距
   */
  length: number;
  /**
   * 弧度值 (0 ~ PI)
   */
  angle: number;
}
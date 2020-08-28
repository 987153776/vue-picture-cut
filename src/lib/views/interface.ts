import PhotoRoot from './PhotoRoot';

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
  /**
   * 垂直翻转
   * 1：表示原始
   * -1： 表示翻转
   */
  sV: number;
  /**
   * 水平翻转
   * 1：表示原始
   * -1： 表示翻转
   */
  sH: number;
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
  file: Blob | null;
}

export interface CubeInterface {
  setOpt(arg: string | ParamsInterface): this;
  setOptByString(arg: string): this;
  setOptByArr(p1x: number, p1y: number, p2x: number, p2y: number): this;
  getPoint(time: number): number;
}

/**
 * 贝塞尔预设值
 */
export interface BEZIERInterface {
  [name: string]: [number, number][]
}

/**
 * n次贝塞尔
 */
export interface BezierInterface {

  /**
   * 设置曲线点
   */
  setOpt(Nodes: [number, number][]): this;

  /**
   * 计算公式
   * @param time
   */
  getPoint(time: number): Point;
}

export interface AnimationParamsChange {
  (x: number, y: number): boolean | void;
}

export interface AnimationParamsEnd {
  (): void;
}

export interface AnimationParams {
  change: AnimationParamsChange;
  duration?: number;
  timing?: [number, number][] | string;
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

/**
 *
 */
export interface PathDone {
  (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void;
}

export interface CutInterface {
  photoRoot: PhotoRoot;
}

interface CanvasOptions {
  width: number;          // 画布宽
  height: number;         // 画布高
  drawWidth: number;      // 画布绘制的逻辑宽
  drawHeight: number;     // 画布绘制的逻辑高
  magnification: number;  // 逻辑宽与画布宽的比例
}

interface imgOptions {
  src: string;          // 原图片链接
  width: number;        // 原图片宽
  height: number;       // 原图片高
  showRect: RectFull;   // 图片绘制在画布上参数
}

interface maskOptions extends Rect{
  isRound: boolean;     // 是否是圆形
}

export interface CutOptions {
  canvas: CanvasOptions;
  img: imgOptions | {};
  mask: maskOptions | {};
}
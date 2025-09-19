declare module 'vue-picture-cut' {
    export type LoadImgCallback = (loading: boolean) => void;
    export type LoadImgCallbackMap = Map<string, LoadImgCallback>;
    export type EventList = Map<string, PhotoBasic>;

    export interface Window {
        BlobBuilder?: any;
        WebKitBlobBuilder?: any;
        MozBlobBuilder?: any;
        MSBlobBuilder?: any;
    }

    export interface Draw{
        (maskRect: Rect, touchePosition: boolean, mask: PhotoMask): void;
    }

    export class Bezier {
        private _bezierCtrlNodesArr: [number, number][];
        constructor();
        setOpt(Nodes: [number, number][]): this;
        getPoint(t: number): Point;
        private factorial(num: number): number;
    }

    export class Animation implements AnimationInterface{
        private _bezier: Bezier;
        private _duration: number;
        private readonly _timing: [number, number][];
        private _delay: number;
        private readonly _iteration: number | string;
        private _direction: number;
        private readonly _change: AnimationParamsChange;
        private readonly _end: AnimationParamsEnd;
        private readonly _times: number;
        private _startTime: number;
        private _id: number;

        constructor(option: AnimationParams);
        start (): this;
        private _do(): void;
        abort (doEnd: boolean): void;
    }

    export class PhotoMain implements PhotoBasic {
        className: string
        readonly _canvas: HTMLCanvasElement;
        readonly _ctx: CanvasRenderingContext2D;
        readonly _root: PhotoRoot;
        private _src: string | undefined;
        originalImg: HTMLImageElement | undefined;
        img: HTMLImageElement | undefined;
        imgRect: Rect;
        showRect: RectFull;
        private _showRect?: RectFull;
        private _moveRect: Rect2;
        private _touchList: TouchePoint [];
        private _status: string | null;
        private _touchstartPoint: Point;
        private _touchstartEvent: DoubleToucheEvent;
        private _animation: AnimationInterface | undefined;
        private _scaleTimer: number | null;
        private _loadingEvent: (loading: boolean) => void | undefined;
        loadImgEd: LoadImgCallbackMap;

        constructor(el: HTMLCanvasElement, root: PhotoRoot);
        setSrc(src: string, angle: number, _n: number): void;
        reset(): void;
        setMoveRange(minX: number, minY: number, maxX: number, maxY: number, offPoint?: Point, zoom?: number): [number, number, number, number];
        setAngle (angle: number, animation: boolean): void;
        setFlip (sV: boolean, sH: boolean, animation: boolean): void;
        setFlipV (sV: boolean, animation: boolean): void;
        setFlipH (sH: boolean, animation: boolean): void;
        scale(zoom: number): void;
        onLoading(callback: (loading: boolean) => void): void;
        setShowRect (showRect: RectFull): void;
        private _changePointByCanvas (point: Point): Point;
        private _changePointByImage (point: Point): Point;
        private _initRect(): void;
        private _initMoveRange(minX: number | null, minY: number | null, maxX: number | null, maxY: number | null): void;
        private _draw(imgRect: Rect, showRect: RectFull): void;
        clear (): void;
        touchEnd(tps: TouchePoint[]): void;
        touchMove(tps: TouchePoint[]): void;
        touchStart(tps: TouchePoint[]): void;
        wheelStart(zoom: number, point: Point): void;
        wheelChange(zoom: number, point: Point): void;
        wheelEnd(): void;
        private _touchStart1(tp: TouchePoint);
        private _touchStart2(tp1: TouchePoint, tp2: TouchePoint);
        private _touchMove1(tp: TouchePoint);
        private _touchMove2(tp1: TouchePoint, tp2: TouchePoint);
        private _getPointerLocation(core: Point): Point;
        private _move(core: Point): void;
        private _scaleByLocation(e: DoubleToucheEvent): void;
        private _scaleByZoom(zoom: number, core: Point, angle: number): void;
        private _checkRange(showRect: RectFull): [number, number, number, number];
        private _getPhotoByRangeLocation(newLocation?: [number, number, number, number]): [number, number, number, number, number, number];
        doAnimation(offX: number, offY: number, offW: number, offH: number, offR: number, offSV?: boolean, offSH?: boolean, endCallback?: {(...arg: any[]): void}): void;
    }

    export class PhotoMask implements PhotoBasic {
        className: string;
        readonly _root: PhotoRoot;
        width: number;
        height: number;
        private _isRound: boolean;
        private _resize: boolean;
        private readonly _faultTolerant: number;
        private _maskRect: Rect;
        private __maskRect?: Rect;
        private _touche: TouchePoint | null;
        private _touchePosition: string | undefined;
        private __animation: AnimationInterface | undefined;
        private readonly _draw: Draw;

        constructor(root: PhotoRoot, width: number, height: number, resize: boolean, draw: Draw);

        getMaskRect(): Rect;
        private _reset(photoMain: PhotoMain, newObj: {}, animation: boolean);
        reset(width: number, height: number): void;
        get isRound(): boolean;
        set isRound(value: boolean);
        setResize(value: boolean): void;
        getResize(): boolean;
        clip(maxPixel?: number, encoderOptions?: number, format?: string): ClipResult | null;
        private _getMaskRect(): Rect;
        _animation(offX: number, offY: number, offW: number, offH: number): void;
        _isHover (x: number, y: number): string | void;
        touchEnd(tps: TouchePoint[]): void;

        touchMove(tps: TouchePoint[]): void;

        touchStart(tps: TouchePoint[]): void;

        wheelChange(zoom: number, point: Point): void;

        wheelEnd(zoom: number, point: Point): void;

        wheelStart(zoom: number, point: Point): void;

        private _moveTop (tp: TouchePoint): void;
        private _moveBottom (tp: TouchePoint): void;
        private _moveLeft (tp: TouchePoint): void;
        private _moveRight (tp: TouchePoint): void;
    }

    export class PhotoRoot {
        debug: boolean;
        isFirefox: boolean;
        root: HTMLElement | null;
        width: number;
        height: number;
        drawWidth: number;
        drawHeight: number;
        magnification: number;
        core: Point;
        eventList: EventList;
        priorityEvent: PhotoBasic | null;
        private _wheelTime: number;
        private _wheelTimeOut: number;
        private _wheelStatus: boolean;

        constructor();

        init (el: HTMLElement, magnification?: number): void;
        set cursor(value: string);
        addEventList(pe: PhotoBasic): void;
        getEventList<T>(className: string): T | null;
        deleteEventList(className: string): void;
        setPriority(pe: PhotoBasic): void;
        getPriority<T>(): T | null;
        deletePriority(className: string): void;
        private _eventInit (): void;
        private _touchStart(touches: TouchList): void;
        private _touchEnd (touches: TouchList): void;
        private _touchMove (touches: TouchList): void;
        private _mouseDown (e: MouseEvent): void;
        private _mouseUp (e: MouseEvent): void;
        private _mouseMove (e: MouseEvent): void;
        private _mouseWheel (zoom: number, point: Point): void;
        private _wheelStart(zoom: number, point: Point): void;
        private _wheelChange(zoom: number, point: Point): void;
        private _wheelEnd(zoom: number, point: Point): void;
        private _getTouchePoint (ct: Touch): TouchePoint;
        private _getMousePoint (ct: MouseEvent): TouchePoint;
        private _getClientPosition (el: HTMLElement, p: Point): Point;
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
        abort(doEnd: boolean): void;
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

    export interface Draw{
        (maskRect: Rect, touchePosition: boolean, mask: PhotoMask): void;
    }
}

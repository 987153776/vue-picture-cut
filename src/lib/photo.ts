import createAnimation, {AnimationInterface} from './animation'
import $filter from './filter';
import $tool from './tool';
import {
    PhotoCutting,
    Position,
    TouchePoint
} from './PhotoCutting';

export interface ClipResult {
    src: string;
    file: Blob;
}

interface WheelData extends Position{
    zoom: number;
}

export default class Photo {
    // 是否可操作
    private isCan = false;
    // 状态
    private status: string | null = null;
    // 是否初始化
    isLoad = false;
    // 引用
    private pc: PhotoCutting;
    // 原始图片的坐标
    private x = 0;
    private y = 0;
    // 原始图片的宽高
    private w = 0;
    private h = 0;
    // 画布显示的图片坐标
    private cx = 0;
    private cy = 0;
    // 画布显示的图片宽高
    private cw: number;
    private ch: number;
    // 图片中心
    private core: Position;
    // 移动范围
    private minX: number | null = 0;
    private minY = 0;
    private maxX = 0;
    private maxY = 0;
    // 移动范围
    private isThisCreate = false;
    // 可移的范围中心
    private mCore =  {x: 0, y: 0} as Position;
    // 手指坐标
    private touch: any[] = [];
    // 单指(或双指中心)初始偏移量
    private touchstart =  {x: 0, y: 0} as Position;
    // 双指初始间距
    private touchstartlength = 0;
    // 滚轮数据
    private wheelData = {x: 0, y: 0, zoom: 1} as WheelData;

    animation: AnimationInterface | undefined = undefined;

    private img: HTMLImageElement | null = null;
    private src: string | undefined = undefined;
    private wheelAnimation: AnimationInterface | undefined = undefined;

    constructor (photoCutting: PhotoCutting) {
        // 引用
        this.pc = photoCutting;
        // 画布显示的图片宽高
        this.cw = this.pc.width;
        this.ch = this.pc.height;
        // 图片中心
        this.core = {x: this.cw / 2, y: this.ch / 2};
    }

    /**
     * 载入图片
     */
    setSrc (src: string) {
        // 链接
        this.src = src;
        // 设置为不可操作
        this.isCan = false;
        this.isLoad = false;
        // 图片
        $tool.loadImg(src).then((img: any) => {
            img = img as HTMLImageElement;
            const result = this.checkImgSize(img);
            if (result) {
                this.setSrc(result);
                return;
            }
            this.img = img;
            // 坐标
            this.x = 0;
            this.y = 0;
            // 宽高
            this.w = img.width;
            this.h = img.height;
            // 初始化矩形
            if (!this.minX) this.setMoveRange();
            this._initRect();
            this._checkRange();
            // 设置为可操作
            this.isCan = true
            this.isLoad = true;
            this.pc.draw();
        })
    }

    /**
     * 若图片宽或高大于1500，则压缩图片
     * 出于移动端性能考虑
     * @param img
     * @returns {*}
     */
    checkImgSize (img: HTMLImageElement | null = null) {
        const _img = img || this.img;
        if (_img === null) {
            return;
        }
        const max = 2000;
        const offset = _img.width / _img.height;
        if (_img.width <= max && _img.height <= max) {
            return null;
        }
        let nw = 0, nh = 0;
        if (_img.width > max) {
            nw = max;
            nh = nw / offset;
        }
        if (_img.height > max) {
            nh = max;
            nw = nh * offset;
        }
        return $tool.clipBy(_img, 0, 0, _img.width, _img.height, 0, 0, nw, nh, 0.9);
    }

    /**
     * 设置移动范围
     * @param minX
     * @param minY
     * @param maxX
     * @param maxY
     */
    setMoveRange (minX: number | null = null, minY: number | null = null, maxX: number | null = null, maxY: number | null = null) {
        this.isThisCreate = false;
        if (!minX || !minY || !maxX || !maxY ) {
            const {w, h} = this;
            if (!w) return;
            const pw = this.pc.width;
            const ph = this.pc.height;
            const d1 = pw / ph;
            const d2 = w / h;
            if (d1 > d2) {
                const nw = ph * d2;
                minX = (pw - nw) / 2;
                minY = 0;
                maxX = minX + nw;
                maxY = ph;
            } else {
                const nh = pw / d2;
                minX = 0;
                minY = (ph - nh) / 2;
                maxX = pw;
                maxY = minY + nh;
            }
            this.isThisCreate = true;
        }
        this.minX = minX as number;
        this.minY = minY as number;
        this.maxX = maxX as number;
        this.maxY = maxY as number;
        this.core = {x: (maxX as number + minX as number) / 2, y: (maxY as number + minY as number) / 2};
        if (this.img) this._checkRange()
    }

    /**
     * 初始化图片矩形
     * @private
     */
    _initRect () {
        const pw = this.pc.width;
        const ph = this.pc.height;
        const w = this.w;
        const h = this.h;
        const dw = w / pw;
        const dh = h / ph;
        const d = (dw < dh) ? dh : dw;
        this.cw = w / d;
        this.ch = h / d;
        this.cx = (pw - this.cw) / 2;
        this.cy = (ph - this.ch) / 2;
        this.core = {x: this.cx, y:this.cy};
    }

    touchMove1 (touch: TouchePoint) {
        if (this.status === 'move') {
            this.touch[0] = touch
        }
        this.draw()
    }

    touchMove2 (touch1: TouchePoint, touch2: TouchePoint) {
        if (this.status === 'scale') {
            this.touch = [touch1, touch2]
        }
        this.draw()
    }

    touchMove3 (touches: TouchePoint[]) {
        // let data = []
        // let touch = this.touch
        // for (let v of touches) {
        //   for (let v2 of touch) {
        //     if (v2.id === v.id) {
        //       data.push(v)
        //     }
        //   }
        //   if (data.length === touch.length) {
        //     break
        //   }
        // }
        // this.touch = data
        this.draw()
    }

    /**
     * 鼠标滚轮事件处理
     * @param zoom 缩放倍数
     * @param x 鼠标x坐标
     * @param y 鼠标y坐标
     */
    mouseWheel (zoom: number, x: number, y: number) {
        this.wheelAnimation?.abort();

        this.status = 'wheel';
        this.wheelData = {x, y, zoom};

        const {cx, cy, cw, ch} = this;
        this.scaleByZoom2(zoom, x, y);
        const offX = this.cx - cx;
        const offY = this.cy - cy;
        const offW = this.cw - cw;
        const offH = this.ch - ch;

        this.isCan = false;
        this.wheelAnimation = createAnimation({
            duration: 50,
            timing: 'linear',
            change: i => {
                this.cx = cx + i * offX;
                this.cy = cy + i * offY;
                this.cw = cw + i * offW;
                this.ch = ch + i * offH;
                this.core = {x: this.cx + this.cw / 2, y: this.cy + this.ch / 2};
                // 重新绘制画布
                this.pc.draw();
                if (this.isCan) return false;
            },
            end: () => {
                this.isCan = true;
            }
        }).start();
    }

    _touchStart (touch: TouchePoint) {
        this.animation?.abort();
        if (this.touch.length === 1) {
            if (this.touch[0].id !== touch.id) {
                this.touch.push(touch);
                this._touchStart2(this.touch[0], this.touch[1]);
            }
        } else if (this.touch.length === 0) {
            this.touch.push(touch)
            this._touchStart1(touch)
        }
    }

    _touchStart1 (touch: TouchePoint) {
        this.status = 'move';
        this.touchstart = this._getPointerLocation(touch.x, touch.y);
    }

    _touchStart2 (touch1: TouchePoint, touch2: TouchePoint) {
        this.status = 'scale'
        const x1 = touch1.x, y1 = touch1.y;
        const x2 = touch2.x, y2 = touch2.y;
        this.touchstart = this._getPointerLocation((x1 + x2) / 2, (y1 + y2) / 2);
        this.touchstartlength = this._getPointLength(x1, y1, x2, y2);
    }

    _touchEnd (touch: TouchePoint) {
        if (this.touch.length === 0) return
        const data: TouchePoint[] = [];
        this.touch.forEach(v => {
            if (v.id !== touch.id) {
                data.push(v)
            }
        })
        if (data.length === 0) {
            this.touchstartlength = 0;
            this.status = '';
            this.touchstart = {x: 0, y: 0};
            this._checkRange();
        } else if (data.length === 1) {
            this.status = '';
            this._touchStart1(data[0]);
        }
        this.touch = data;
    }

    /**
     * 绘制图片
     */
    draw () {
        if (!this.isLoad) return;
        if (this.touch.length === 2 && this.status === 'scale') {
            this.scaleByLocation(this.touch[1].x, this.touch[1].y, this.touch[0].x, this.touch[0].y);
        } else if (this.status === 'move') {
            this.move(this.touch[0].x, this.touch[0].y);
        }
        // else if (this.status === 'wheel') {
        // }
        this.pc.drawImg(this.img as HTMLImageElement, this.x, this.y, this.w, this.h, this.cx, this.cy, this.cw, this.ch);
    }

    /**
     * 缩放图片（两个手指的位置）
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    scaleByLocation (x1: number, y1: number, x2: number, y2: number) {
        if (!this.isCan) return;
        const thisLength = this._getPointLength(x1, y1, x2, y2);
        if (!this.touchstartlength) this.touchstartlength = thisLength;
        if (!this.touchstartlength) return;
        let zoom = thisLength / this.touchstartlength;
        zoom = (zoom < 0.9091) ? 0.9091 : zoom;
        zoom = (zoom > 1.1) ? 1.1 : zoom;
        this.scaleByZoom(zoom, (x1 + x2) / 2, (y1 + y2) / 2);
        this.touchstartlength = thisLength;
    }

    /**
     * 缩放图片（两个手指的位置）
     * @param zoom 缩放倍数，已当前比例为1
     */
    scaleByZoom (zoom = 1, x: number, y: number) {
        if (!this.isCan) return;
        let pl = this.touchstart;
        pl = {x: pl.x * zoom, y: pl.y * zoom};
        this.touchstart = pl;
        const {cw, ch} = this;
        const nw = cw * zoom, nh = ch * zoom;
        const nx = (cw - nw) / 2;
        const ny = (ch - nh) / 2;
        this.cx = x ? x - pl.x : nx;
        this.cy = y ? y - pl.y : ny;
        this.cw = nw;
        this.ch = nh;
        this.core = {x: nx + nw / 2, y: ny + nh / 2};
    }

    /**
     * 缩放图片 (滚轮)
     * @param zoom 缩放倍数，已当前比例为1
     */
    scaleByZoom2 (zoom = 1, x: number, y: number) {
        // if (!this.isCan) return;
        this.cx = x + (this.cx - x) * zoom;
        this.cy = y + (this.cy - y) * zoom;
        this.cw = this.cw * zoom;
        this.ch = this.ch * zoom;
        this.core = {
            x: this.cx + this.cw / 2,
            y: this.cy + this.ch / 2
        };
    }

    /**
     * 移动图片
     * @param x
     * @param y
     */
    move (x: number, y: number) {
        if (!this.isCan) return;
        const pl = this.touchstart;
        const newX = x - pl.x;
        const newY = y - pl.y;
        this.cx = newX;
        this.cy = newY;
        this.core = {x: newX + this.cw / 2, y: newY + this.ch / 2};
    }

    /**
     * 检查图片是否在可移动范围内
     * 若不在范围内，则改变图片大小及位置
     * @private
     */
    _checkRange () {
        const {w, h, cx, cy, cw, ch, minX, minY, maxX, maxY} = this
        let nx = cx, ny = cy, nw = cw, nh = ch;
        let rl = this._getPohtoByRangeLocation();
        let offx = rl[0], offy = rl[1], offx2 = rl[2], offy2 = rl[3], offw = rl[4], offh = rl[5];
        const imgOff = w / h;
        if (offw <= 0) {
            nw = maxX - (minX as number);
            nh = nw / imgOff;
            nx = cx + (cw - nw) / 2;
            ny = cy + (ch - nh) / 2;
        }
        rl = this._getPohtoByRangeLocation([nx, ny, nw, nh]);
        offx = rl[0], offy = rl[1], offx2 = rl[2], offy2 = rl[3], offw = rl[4], offh = rl[5];
        if (offh <= 0) {
            nh = maxY - minY
            nw = nh * imgOff
            nx = cx + (cw - nw) / 2
            ny = cy + (ch - nh) / 2
        }
        rl = this._getPohtoByRangeLocation([nx, ny, nw, nh]);
        offx = rl[0], offy = rl[1], offx2 = rl[2], offy2 = rl[3], offw = rl[4], offh = rl[5];
        if (offx > 0) nx -= offx;
        if (offy > 0) ny -= offy;
        if (offx2 < 0) nx -= offx2;
        if (offy2 < 0) ny -= offy2;
        this._animation(nx - cx, ny - cy, nw - cw, nh - ch);
    }

    /**
     * 动画
     * @param offX 偏移量
     * @param offY 偏移量
     * @param offW 偏移量
     * @param offH 偏移量
     * @private
     */
    _animation (offX: number, offY: number, offW: number, offH: number) {
        this.isCan = false;
        const {cx, cy, cw, ch} = this;
        this.animation = createAnimation({
            duration: 300,
            timing: 'ease-in-out',
            change: i => {
                this.cx = cx + i * offX;
                this.cy = cy + i * offY;
                this.cw = cw + i * offW;
                this.ch = ch + i * offH;
                this.core = {x: this.cx + this.cw / 2, y: this.cy + this.ch / 2};
                // 重新绘制画布
                this.pc.draw();
                if (this.isCan) return false;
            },
            end: () => {
                this.isCan = true;
            }
        }).start();
    }

    /**
     * 裁剪
     */
    clip (): ClipResult | void {
        if (!this.img) return;
        const rl = this._getPohtoByRangeLocation();
        const offx = rl[0], offy = rl[1];
        const maxW = this.maxX - (this.minX as number);
        const maxH = this.maxY - this.minY;
        const r = this.w / this.cw; // 缩放比例
        const cx = 0 - offx * r;
        const cy = 0 - offy * r;
        const cw = maxW * r;
        const ch = maxH * r;
        const base64 = $tool.clipBy(this.img, cx, cy, cw, ch, 0, 0, maxW, maxH);
        return {
            src: base64,
            file: $tool.base64ToBlob(base64)
        };
    }

    /**
     * 根据角度旋转
     * @param deg
     */
    rotate (deg: number) {
        const base64 = $filter.rotateProcess(this.img as HTMLImageElement, deg)
        if (this.isThisCreate) this.minX = null;
        this.setSrc(base64);
    }

    /**
     * 翻转
     * @param status
     */
    flip (status: boolean) {
        const base64 = $filter.flipProcess(this.img as HTMLImageElement, status)
        this.setSrc(base64);
    }

    /**
     * 滤镜
     * @param fun
     */
    filter (fun: (img: HTMLImageElement, fun: (nsrc: string) => void) => void) {
        fun(this.img as HTMLImageElement, newSrc => {
            $tool.loadImg(newSrc).then(img => {
                this.img = img as HTMLImageElement;
                this.pc.draw();
            });
        });
    }

    /**
     * 检测图片是否与指定坐标发生碰撞
     * @param x
     * @param y
     * @returns {boolean}
     * @private
     */
    _isHover (x: number, y: number) {
        const rect = this.getRect()
        return x >= rect[0] && y >= rect[1] && x <= rect[2] && y <= rect[3];
    }

    /**
     * 获取手指相对图片的位置
     * @param x
     * @param y
     * @returns {*[]}
     * @private
     */
    _getPointerLocation (x: number, y: number): Position {
        return {x: x - this.cx, y: y - this.cy};
    }

    /**
     * 获取图片相对可移动范围的各边坐标的偏移量
     * @returns {*[]}
     * @private
     */
    _getPohtoByRangeLocation (newLocation?: number[]) {
        let {cx, cy, cw, ch} = this;
        const {minX, minY, maxX, maxY} = this;
        if (newLocation) {
            cx = newLocation[0];
            cy = newLocation[1];
            cw = newLocation[2];
            ch = newLocation[3];
        }
        return [
            cx - (minX as number),
            cy - minY,
            cx + cw - maxX,
            cy + ch - maxY,
            cw - (maxX - (minX as number)),
            ch - (maxY - minY)
        ];
    }

    /**
     * 获取图片所在矩形
     * @returns {*[]}
     */
    getRect () {
        return [this.cx, this.cy, this.cx + this.cw, this.cy + this.ch];
    }

    /**
     * 获取两坐标的间距
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @returns {number}
     */
    _getPointLength (x1: number, y1: number, x2: number, y2: number) {
        return Math.pow(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 0.5);
    }
}
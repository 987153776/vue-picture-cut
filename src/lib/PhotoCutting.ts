import Photo from './photo';
import Mask from './Mask';

export interface Position {
    x: number;
    y: number;
}

export interface TouchePoint {
    x: number;
    y: number;
    id: number;
}

interface WheelEvent2{
    offsetX: number;
    offsetY: number;
    wheelDelta?: number; // chrome & ie
    detail?: number; // firefox
}

export class PhotoCutting {
    private canvas: HTMLCanvasElement;
    private readonly magnification: number;
    readonly width: number;
    readonly height: number;
    private core: Position;
    private readonly con: HTMLDivElement;
    readonly ctx: CanvasRenderingContext2D;
    readonly photo: Photo;
    private mask: Mask;
    // 图片可移动范围
    private moveRange: number[] | undefined;

    // 记录滚轮触发时间
    private wheelTime = 0;
    private wheelTimeOut = 0;
    // 记录滚轮状态
    private wheelstutas = false;

    constructor (el: HTMLCanvasElement, width: number, height: number, con: HTMLDivElement) {
        this.canvas = el;
        this.magnification = 1.5;
        this.width = width * this.magnification;
        this.height = height * this.magnification;
        this.core = {
            x: this.width / 2,
            y: this.height / 2
        };
        this.con = con;
        el.width = width * this.magnification;
        el.height = height * this.magnification;
        // this.moveRange = [0, 0, 0, 0]
        this.ctx = el.getContext('2d') as CanvasRenderingContext2D;
        this.ctx.save();
        this.photo = new Photo(this);
        this.mask = new Mask(this);
        // this.setMoveRange()
        this.closeMask()
        this._init()
    }

    log (text: string) {
        if (!this.con) return
        this.con.innerHTML = '<br>' + text + this.con.innerHTML
    }

    /**
     * 设置可移动范围
     */
    setMoveRange () {
        const {width, height} = this;
        if (width > height) {
            const x1 = (width - height) / 2;
            const x2 = width - x1;
            this.moveRange = [x1, 0, x2, width];
        } else {
            const y1 = (height - width) / 2;
            const y2 = height - y1;
            this.moveRange = [0, y1, height, y2];
        }
    }

    /**
     * 初始化
     * @private
     */
    _init () {
        this._eventInit();
        if (this.ctx) {
            this.clear();
        }
    }

    /**
     * 打开遮罩
     */
    openMask () {
        this.mask.open();
        const maskRect = this.mask.getRect();
        this.photo.setMoveRange(maskRect[0], maskRect[1], maskRect[0] + maskRect[2], maskRect[1] + maskRect[3]);
    }

    /**
     * 关闭遮罩
     */
    closeMask () {
        this.mask.close();
        // this.photo.setMoveRange(...this.moveRange)
        this.photo.setMoveRange();
    }

    /**
     * 设置图片
     */
    setSrc (src: string) {
        // 初始化图片
        this.photo.setSrc(src);
    }

    /**
     * 事件初始化
     */
    _eventInit () {
        this.canvas.addEventListener('touchstart', event => {
            if (!this.photo) return;
            const e = event || window.event;
            e.preventDefault();
            const touches = e.changedTouches;
            this._touchStart(touches);
        });
        this.canvas.addEventListener('touchend', event => {
            if (!this.photo) return;
            const e = event || window.event;
            e.preventDefault();
            const touches = e.changedTouches;
            this._touchEnd(touches);
        });
        this.canvas.addEventListener('touchmove', event => {
            if (!this.photo) return;
            const e = event || window.event;
            e.preventDefault();
            const touches = e.changedTouches;
            this._touchMove(touches);
        });
        let isMousedown = false;
        this.canvas.addEventListener('mousedown', event => {
            if (!this.photo) return;
            const e = event || window.event;
            e.preventDefault();
            this._mouseDown(e);
            isMousedown = true;
        });
        this.canvas.addEventListener('mouseup', event => {
            if (!this.photo) return;
            const e = event || window.event;
            e.preventDefault();
            this._mouseUp(e);
            isMousedown = false;
        });
        this.canvas.addEventListener('mousemove', event => {
            if (!this.photo || !isMousedown) return;
            const e = event || window.event;
            e.preventDefault();
            this._mouseMove(e);
        });
        this.canvas.addEventListener('mousewheel', event => {
            if (!this.photo) return;
            const e = (event || window.event) as unknown as WheelEvent2;
            const delta = e.wheelDelta || e.detail;
            this._mouseWheel(delta as number, e.offsetX, e.offsetY);
        });
    }

    getClientPosition (el: HTMLElement, p: Position): Position {
        if (el.tagName === 'HTML') {
            return {x: p.x + el.offsetLeft, y: p.y + el.offsetTop};
        } else {
            return this.getClientPosition(el.parentNode as HTMLElement, {x: p.x + el.offsetLeft, y: p.y + el.offsetTop});
        }
    }

    _touchStart (touches: TouchList) {
        const ct1 = this._getTouchePoint(touches[0]);
        this.photo._touchStart(ct1);
    }

    _touchEnd (touches: TouchList) {
        const ct1 = this._getTouchePoint(touches[0]);
        this.photo._touchEnd(ct1);
    }

    _touchMove (touches: TouchList) {
        this.clear();
        const data = [];
        for (const v of touches) {
            data.push(this._getTouchePoint(v));
        }
        if (data.length === 1) {
            this.photo.touchMove1(data[0]);
        } else if (data.length === 2) {
            this.photo.touchMove2(data[0], data[1]);
        } else {
            this.photo.touchMove3(data);
        }
        this.mask.touchMove();
    }


    _mouseDown (e: MouseEvent) {
        const ct1 = this._getMousePoint(e);
        this.photo._touchStart(ct1);
    }

    _mouseUp (e: MouseEvent) {
        const ct1 = this._getMousePoint(e);
        this.photo._touchEnd(ct1);
    }

    _mouseMove (e: MouseEvent) {
        this.clear();
        const ct1 = this._getMousePoint(e);
        this.photo.touchMove1(ct1);
        this.mask.touchMove();
    }

    _mouseWheel (wheelDelta: number, x: number, y: number) {
        clearTimeout(this.wheelTimeOut);
        const now = Date.now();
        if (now - this.wheelTime > 200 && !this.wheelstutas) {
            // 滚轮开始
            this.wheelstutas = true;
            this.photo.animation?.abort();
        }
        this.wheelTime = now;
        this.wheelTimeOut = setTimeout(() => {
            // 滚轮结束
            this.wheelstutas = false;
            this.photo._checkRange();
        }, 200);
        const zoom = wheelDelta > 0 ? 1.08 : 0.92593;
        this.clear();
        this.photo.mouseWheel(zoom, x * this.magnification, y * this.magnification);
        this.mask.touchMove();
    }

    /**
     * 检测touches中是否包含当前手指id
     * 如果有当前手指，就返回它
     * @param touches
     * @param id
     * @returns {*}
     * @private
     */
    _isHasPoint (touches: TouchList, id: number) {
        let result = null;
        for (const v of touches) {
            if (v.identifier === id) {
                result = v;
                break;
            }
        }
        return result;
    }

    /**
     * 获取手指
     * @param ct
     * @private
     */
    _getTouchePoint (ct: Touch): TouchePoint {
        const elOffset = this.getClientPosition(this.canvas, {x: 0, y: 0});
        return {
            x: (ct.clientX - elOffset.x) * this.magnification,
            y: (ct.clientY - elOffset.x) * this.magnification,
            id: ct.identifier
        };
    }

    /**
     * 获取鼠标
     * @param ct
     * @private
     */
    _getMousePoint (ct: MouseEvent): TouchePoint {
        return {
            x: ct.offsetX * this.magnification,
            y: ct.offsetY * this.magnification,
            id: 0
        };
    }

    /**
     * 清除画布
     */
    clear () {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    /**
     * 保存当前环境
     */
    save () {
        this.ctx.save();
    }

    /**
     * 恢复当前环境
     */
    restore () {
        this.ctx.restore();
    }

    /**
     * 绘制图片
     */
    drawImg (img: HTMLImageElement, sX: number, sY: number, sW: number, sH: number, x: number, y: number, w: number, h: number) {
        this.ctx.drawImage(img, sX, sY, sW, sH, x, y, w, h);
    }

    /**
     * 设置坐标原点
     */
    setCore (x: number, y: number) {
        this.core = {x, y};
        this.ctx.translate(x, y);
    }

    /**
     * 还原坐标原点
     */
    resetCore () {
        this.ctx.translate(-this.core.x, -this.core.y)
    }

    /**
     * 旋转
     */
    rotate (x: number, y: number) {
        this.ctx.translate(x, y);
    }

    /**
     * 绘制画布
     */
    draw () {
        this.clear();
        this.photo?.draw();
        this.mask.draw();
    }
}

export default (el: HTMLCanvasElement, width: number, height: number, conso: HTMLDivElement) =>
    new PhotoCutting(el, width, height, conso);
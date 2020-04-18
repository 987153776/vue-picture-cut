import { PhotoCutting, TouchePoint} from './PhotoCutting';

export default class Mask {
    private pc: PhotoCutting;
    private isOpen: boolean;
    private x: number;
    private y: number;
    private w: number;
    private h: number;
    
    constructor (photoCutting: PhotoCutting) {
        this.pc = photoCutting;
        this.isOpen = false;
        // 遮罩坐标及大小
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this._initRect();
        this.draw();
    }

    _initRect () {
        const pw = this.pc.width;
        const ph = this.pc.height;
        if (pw > ph) {
            this.w = ph * 0.6;
            this.h = this.w;
            this.x = (pw - this.h) * 0.5;
            this.y = ph * 0.2;
        } else {
            this.w = pw * 0.6;
            this.h = this.w;
            this.x = pw * 0.2;
            this.y = (ph - this.w) * 0.5;
        }
    }

    /**
     * 开启遮罩
     */
    open () {
        this.isOpen = true;
    }

    /**
     * 关闭遮罩
     */
    close () {
        this.isOpen = false;
    }

    draw () {
        if (!this.isOpen) return;
        const ctx = this.pc.ctx;
        const color = 'rgba(0,0,0,0.6)';
        const lineW = this.pc.height > this.pc.width ? this.pc.height - this.h : this.pc.width - this.w;

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineW;
        ctx.strokeRect(this.x - lineW / 2, this.y - lineW / 2, this.w + lineW, this.h + lineW);
        ctx.closePath();
        // ---------
        ctx.beginPath();
        ctx.strokeStyle = '#ff5500';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        ctx.closePath();
        // ---------
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.fillStyle = '#ff5500';
        ctx.arc(this.pc.width / 2, this.pc.height / 2, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    touchMove (touch1?: TouchePoint, touch2?: TouchePoint) {
        this.draw();
    }

    getRect () {
        return [this.x, this.y, this.w, this.h];
    }
}

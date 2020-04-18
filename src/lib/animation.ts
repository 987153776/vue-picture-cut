import Bezier from "./Bezier";

interface AnimationParamsChange {
    (i: number): boolean | void;
}
interface AnimationParamsEnd {
    (): void;
}
interface AnimationParams {
    change?: AnimationParamsChange;
    duration?: number;
    timing?: string | number[];
    delay?: number;
    iteration?: number | string;
    direction?: string;
    end: AnimationParamsEnd;
}
export interface AnimationInterface {
    start(): AnimationInterface;
    abort(): void;
}

const bezier = new Bezier();
class Animation implements AnimationInterface{
    /**
     * 动画持续时间，单位毫秒，
     * 默认1000毫秒。
     */
    private duration = 1000;
    /**
     * 动画的过渡类型：
     * linear(线性过渡)；
     * ease(默认，平滑过渡)；
     * ease-in(由慢到快)；
     * ease-out(由快到慢)；
     * ease-in-out(由慢到快再到慢)；
     * [x1,y1,x1,y1](数组,[x1,y1]表示点1的坐标,[x2,y2]表示点2的坐标)。
     */
    private readonly timing: string | number[] = 'ease';
    /**
     * 动画的延迟时间，单位毫秒，
     * 默认0毫秒。
     */
    private delay = 0
    /**
     * 动画循环次数，infinite为无限循环
     * 默认1次。
     */
    private readonly iteration: number | string = 1;
    /**
     * 动画在循环中是否反向运动：
     * normal(默认，正向运动)；
     * reverse(反向运行)；
     * alternate(先正向，后反向，并交替)；
     * alternate-reverse(先反向，后正向，并交替)。
     */
    private direction = 'normal';
    /**
     * 回调函数，接收参数x，x在0~1之间
     */
    private readonly change: AnimationParamsChange = () => false;
    /**
     * 回调函数，动画结束时执行
     */
    private readonly end: AnimationParamsEnd = () => undefined;
    /**
     * 包含循环的总的时间
     */
    private readonly times: number;
    /**
     * 动画开始时的时间
     */
    private startTime = 0;
    /**
     * 动画状态
     */
    private id = 0;

    constructor(option: AnimationParams) {
        if (option.duration !== void 0) this.duration = option.duration;
        if (option.timing !== void 0) this.timing = option.timing;
        if (option.delay !== void 0) this.delay = option.delay;
        if (option.iteration !== void 0) this.iteration = option.iteration;
        if (option.direction !== void 0) this.direction = option.direction;
        if (option.change !== void 0) this.change = option.change;
        if (option.end !== void 0) this.end = option.end;

        // 包含循环的总的时间
        const times = (this.iteration === 'infinite') ? 9999999999999 : ((this.iteration as number) * this.duration);
        // 如果动画正反向交替进行，则总时间乘以2
        this.times = (this.direction === 'alternate' || this.direction === 'alternate-reverse') ? (2 * times) : times;

        bezier.setOpt(this.timing);
    }

    /**
     * 开始动画
     */
    start () {
        // 动画开始时的时间
        this.startTime = 0;
        // 判断延迟执行
        if (this.delay) {
            setTimeout(() => {
                this.startTime = Date.now();
                this._do();
            }, this.delay);
        } else {
            this.startTime = Date.now();
            this._do();
        }
        return this;
    }

    private _do() {
        this.id = requestAnimationFrame(() => {
            // 动画运行的时间，毫秒
            const difT = Date.now() - this.startTime;

            let difT2 = difT / this.duration;
            // 运行的次数
            const n = parseInt(String(difT2));

            difT2 = difT2 - n;

            switch (this.direction) {
                case 'normal': // 正向运行
                    difT2 = (difT < this.times) ? difT2 : 1;
                    break;
                case 'reverse': // 反向运行
                    difT2 = (difT < this.times) ? (1 - difT2) : 0;
                    break;
                case 'alternate': // 先正向，后反向，并交替
                    if (n % 2) difT2 = (difT < this.times) ? (1 - difT2) : 0;
                    else difT2 = (difT < this.times) ? difT2 : 1;
                    if (n / 2 === this.iteration) difT2 = 0;
                    break;
                case 'alternate-reverse': // 先反向，后正向，并交替
                    if (n % 2) difT2 = (difT < this.times) ? difT2 : 1;
                    else difT2 = (difT < this.times) ? (1 - difT2) : 0;
                    if (n / 2 === this.iteration) difT2 = 1;
                    break;
            }
            const x = bezier.getPoint(difT2);
            const c = this.change(x);
            if (c !== false && difT < this.times) {
                this._do();
            } else this.end();
        });
    }

    /**
     * 中止动画
     */
    abort () {
        this.id > 0 && cancelAnimationFrame(this.id);
        this.id = 0;
    }
}

export default function createAnimation(option: AnimationParams): AnimationInterface {
    return new Animation(option);
}
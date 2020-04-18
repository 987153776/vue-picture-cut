interface Point {
    x: number;
    y: number;
}
interface ParamsInterface {
    [index: number]: number;
    length: number;
}
interface CubeInterface {
    setOpt (arg?: string | ParamsInterface): Bezier;
    setOptByString (arg: string): Bezier;
    setOptByArr (p1x: number, p1y: number, p2x: number, p2y: number): Bezier;
    getPoint(time: number): number;
}

interface BezierInterface {
    [name: string]: number[];
}

const tp = (v: unknown) =>Object.prototype.toString.call(v);

/**
 * 三次贝塞尔$Bezier([])
 * function getPoint(t) : t--0到1的小数
 * return {x,y}
 */
export default class Bezier implements CubeInterface {
    static BEZIER: BezierInterface = {
        'linear': [0.0, 0.0, 1.0, 1.0], // 线性过渡
        'ease': [0.25, 0.1, 0.25, 1.0], // 平滑过渡
        'ease-in': [0.42, 0, 1.0, 1.0], // 由慢到快
        'ease-out': [0, 0, 0.58, 1.0], // 由快到慢
        'ease-in-out': [0.42, 0, 0.58, 1.0], // 由慢到快再到慢
    };
    private pStart: Point = { x: 0, y: 0 };
    private pEnd: Point = { x: 1, y: 1 };
    private pCrt1: Point = { x: 0, y: 0 };
    private pCrt2: Point = { x: 0, y: 0 };

    constructor() {
        this.setOptByString('ease')
    }

    setOpt (arg?: string | ParamsInterface): Bezier {
        if (tp(arg) === '[object Array]' && (arg as ParamsInterface).length >= 4) {
            const _arg = arg as ParamsInterface;
            return this.setOptByArr(_arg[0], _arg[1], _arg[2], _arg[3]);
        } else if (tp(arg) === '[object String]') {
            return this.setOptByString(arg as string);
        }
        return this.setOptByString('ease');
    }

    setOptByString (arg = 'ease'): Bezier {
        let p = Bezier.BEZIER[arg as string];
        if (p === void 0) {
            p = Bezier.BEZIER.ease;
        }
        return this.setOptByArr(p[0], p[1], p[2], p[3]);
    }

    setOptByArr (p1x: number, p1y: number, p2x: number, p2y: number): Bezier {
        this.pCrt1 = { x: p1x, y: p1y };
        this.pCrt2 = { x: p2x, y: p2y };
        return this;
    }

    /**
     * 计算公式
     * @param time
     */
    getPoint(time: number): number {
        const _matrix1 = [1, time, time * time, time * time * time];
        const _matrix2 = [
            [1, 0, 0, 0],
            [-3, 3, 0, 0],
            [3, -6, 3, 0],
            [-1, 3, -3, 1]
        ];
        const _matrix3 = [
            [this.pStart.x, this.pStart.y],
            [this.pCrt1.x, this.pCrt1.y],
            [this.pCrt2.x, this.pCrt2.y],
            [this.pEnd.x, this.pEnd.y]
        ];
        const _matrixTmp = [
            _matrix1[0] * _matrix2[0][0] + _matrix1[1] * _matrix2[1][0] + _matrix1[2] * _matrix2[2][0] + _matrix1[3] * _matrix2[3][0],
            _matrix1[0] * _matrix2[0][1] + _matrix1[1] * _matrix2[1][1] + _matrix1[2] * _matrix2[2][1] + _matrix1[3] * _matrix2[3][1],
            _matrix1[0] * _matrix2[0][2] + _matrix1[1] * _matrix2[1][2] + _matrix1[2] * _matrix2[2][2] + _matrix1[3] * _matrix2[3][2],
            _matrix1[0] * _matrix2[0][3] + _matrix1[1] * _matrix2[1][3] + _matrix1[2] * _matrix2[2][3] + _matrix1[3] * _matrix2[3][3]
        ];
        const _matrixFinal = [
            _matrixTmp[0] * _matrix3[0][0] + _matrixTmp[1] * _matrix3[1][0] + _matrixTmp[2] * _matrix3[2][0] + _matrixTmp[3] * _matrix3[3][0],
            _matrixTmp[0] * _matrix3[0][1] + _matrixTmp[1] * _matrix3[1][1] + _matrixTmp[2] * _matrix3[2][1] + _matrixTmp[3] * _matrix3[3][1]
        ];
        const _resPoint = {
            x: _matrixFinal[0],
            y: _matrixFinal[1]
        };
        return _resPoint.y
    }
}
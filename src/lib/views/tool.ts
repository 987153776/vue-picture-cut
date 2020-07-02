import {
  Point,
  Rect,
  RectFull,
  TouchePoint,
  Win,
  DoubleToucheEvent,
  ClipResult
} from './interface';

// 剪裁用
const canvas = document.createElement('canvas') as HTMLCanvasElement;
canvas.style.display = 'none';
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

/**
 * 绘制矩形的内切椭圆
 * @param ctx
 * @param x
 * @param y
 * @param w
 * @param h
 */
function ellipsePath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void {
  const a = 0.5 * w;
  const b = 0.5 * h;
  const k = .5522848,
    ox = a * k,
    oy = b * k;
  ctx.moveTo(x - a, y);
  ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
  ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
  ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
  ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
}

/**
 * 根据椭圆的主轴和次轴半径以及旋转角度(默认圆心在原点)
 * 得到椭圆参数方程的参数，
 * 椭圆参数方程为：
 *      A * x^2 + B * x * y + C * y^2 + F = 0
 * @param a       长轴半径
 * @param b       短轴半径
 * @param angle   旋转角度，逆时针
 */
function getEllipseParam(a: number, b: number, angle: number) {
  const sinTheta = Math.sin(angle * Math.PI / 180);
  const cosTheta = Math.cos(angle * Math.PI / 180);
  const A = Math.pow(a, 2) * Math.pow(sinTheta, 2) + Math.pow(b, 2) * Math.pow(cosTheta, 2);
  const B = 2 * (Math.pow(a, 2) - Math.pow(b, 2)) * sinTheta * cosTheta;
  const C = Math.pow(a, 2) * Math.pow(cosTheta, 2) + Math.pow(b, 2) * Math.pow(sinTheta, 2);
  const F = -Math.pow(a, 2) * Math.pow(b, 2);
  return { A, B, C, F };
}

/**
 * 根据椭圆参数方程的参数，得到椭圆的外接矩形
 * @param A
 * @param B
 * @param C
 * @param F
 */
function getEllipseRect(A: number, B: number, C: number, F: number): Rect {
  const k = Math.pow(B, 2) - 4 * A * C;
  // 椭圆左右外接点的横坐标值
  const x = Math.sqrt(4 * C * F / k);
  // 椭圆上下外接点的纵坐标值
  const y = Math.sqrt(4 * A * F / k);
  return {
    x: -Math.abs(x),
    y: -Math.abs(y),
    w: 2 * Math.abs(x),
    h: 2 * Math.abs(y)
  };
}

/**
 * 将一个点绕原点旋转angle度后，
 * 计算新的点的坐标
 * @param x
 * @param y
 * @param angle
 */
function rotatePoint(x: number, y: number, angle: number): Point{
  const a = Math.sqrt(x * x + y * y);
  const r1 = Math.atan2(x, y);
  const r2 = angle * Math.PI / 180 + r1;
  return {
    x: a * Math.sin(r2),
    y: a * Math.cos(r2)
  }
}

function arrayBuffer2String(arrayBuffer: ArrayBuffer, type: string): string {
  const uInt8Array = new Uint8Array(arrayBuffer);
  let i = uInt8Array.length;
  const binaryString = new Array(i);
  while (i--) {
    binaryString[i] = String.fromCharCode(uInt8Array[i]);
  }
  const data = binaryString.join('');
  const base64 = window.btoa(data);
  return "data:" + type + ";base64," + base64;
}

/**
 * 加载跨域图片
 * @param src
 */
function loadCrossDomainImg (src: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', src, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      if (this.status === 200) {
        const blob = xhr.response;
        const oFileReader = new FileReader();
        oFileReader.addEventListener('loadend', function (e) {
          if (e.target) {
            if (typeof e.target.result === 'string') {
              resolve(e.target.result);
            } else if (e.target.result !== null) {
              arrayBuffer2String(e.target.result, blob.type);
            } else {
              reject();
            }
          } else {
            reject();
          }
        });
        oFileReader.readAsDataURL(blob);
      } else {
        reject();
      }
    };
    xhr.onerror = function (e) {
      reject(e);
    };
    xhr.send();
  });
}

export default {
  rotatePoint,
  loadCrossDomainImg,
  cloneJSON<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj)) as T;
  },
  /**
   * 加载图片
   * @param src
   * @returns {Promise<any>}
   */
  loadImg (src: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => {
        resolve && resolve(image);
      });
      image.addEventListener('error', () => {
        reject && reject(image);
      });
      image.src = src;
    });
  },

  /**
   * 根据坐标剪裁图像
   * @param img
   * @param width           // 裁剪宽
   * @param height          // 裁剪高
   * @param showRect        // 显示图片的矩形
   * @param encoderOptions
   * @param format
   * @returns {string}
   */
  clipBy (img: HTMLImageElement,
          width: number,
          height: number,
          showRect: RectFull,
          encoderOptions = 0.8,
          format = 'image/jpeg'): string {
    const { x, y, w, h, r, sH, sV } = showRect;
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2, height / 2);

    if (format === 'image/jpeg' || format === 'image/jpg') {
      ctx.fillStyle = '#fff';
      ctx.fillRect(-width / 2, -height / 2, width, height);
    }

    if (r / 360) {
      ctx.rotate(-r * Math.PI / 180);
    }
    ctx.scale(sH ? -1 : 1,sV ? -1 : 1);

    ctx.drawImage(img, 0, 0, img.width, img.height, x, y, w, h);

    ctx.scale(sH ? 1 : -1,sV ? 1 : -1);
    ctx.translate(-width / 2, -height / 2);
    ctx.restore();
    return canvas.toDataURL(format, encoderOptions);
  },

  /**
   * 根据坐标内切圆剪裁图像
   * @param img
   * @param width           // 裁剪宽
   * @param height          // 裁剪高
   * @param showRect        // 显示图片的矩形
   * @param encoderOptions
   * @param format
   */
  clipByRound (img: HTMLImageElement,
               width: number,
               height: number,
               showRect: RectFull,
               encoderOptions = 0.8,
               format = 'image/jpeg'): string {
    const { x, y, w, h, r, sH, sV } = showRect;
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2, height / 2);

    if (format === 'image/jpeg' || format === 'image/jpg') {
      ctx.fillStyle = '#fff';
      ctx.fillRect(-width / 2, -height / 2, width, height);
    }

    // 剪切椭圆形状
    ctx.beginPath();
    ellipsePath(ctx, 0, 0, width, height);
    ctx.clip();
    ctx.closePath();

    if (r / 360) {
      ctx.rotate(-r * Math.PI / 180);
    }
    ctx.scale(sH ? -1 : 1,sV ? -1 : 1);

    ctx.drawImage(img, 0, 0, img.width, img.height, x, y, w, h);

    ctx.scale(sH ? 1 : -1,sV ? 1 : -1);
    ctx.translate(-width / 2, -height / 2);
    ctx.restore();
    return canvas.toDataURL(format, encoderOptions);
  },

  /**
   * 若图片宽或高大于max，则压缩图片
   * @param img {HTMLImageElement}
   * @param max {number}
   * @param encoderOptions {number}
   */
  clipByMax (img: HTMLImageElement,
             max = 2000,
             encoderOptions = 1): ClipResult | void {
    if (img.width > max || img.height > max) {
      const offset = img.width / img.height;
      let nw = img.width;
      let nh = img.height;
      if (img.width > max) {
        nw = max;
        nh = nw / offset;
      }
      if (img.height > max) {
        nh = max;
        nw = nh * offset;
      }
      const newShow: RectFull = {
        x: -nw / 2,
        y: -nh / 2,
        w: nw,
        h: nh,
        r: 0,
        sV: false,
        sH: false
      }
      const base64 = this.clipBy(img, nw, nh, newShow, encoderOptions);
      return {
        src: base64,
        file: this.base64ToBlob(base64)
      }
    }
  },

  /**
   * 将base64转Blob对象
   * @param base64
   * @param format
   */
  base64ToBlob (base64: string, format = 'image/jpeg'): Blob | null {
    const code = atob(base64.split(',')[1]);
    const aBuffer = new ArrayBuffer(code.length);
    const uBuffer = new Uint8Array(aBuffer);
    for (let i = 0, l = code.length; i < l; i++) {
      uBuffer[i] = code.charCodeAt(i) & 0xff;
    }
    let blob: Blob | null = null;
    try {
      blob = new Blob([uBuffer], {type: format});
    } catch (e) {
      const win = window as Win;
      const BlobBuilder = win.BlobBuilder ||
        win.WebKitBlobBuilder ||
        win.MozBlobBuilder ||
        win.MSBlobBuilder;
      if (e.name === 'TypeError' && BlobBuilder) {
        const bb = new BlobBuilder();
        bb.append(uBuffer.buffer);
        blob = bb.getBlob(format);
      } else if (e.name === 'InvalidStateError') {
        blob = new Blob([aBuffer], {type: format});
      }
    }
    return blob;
  },

  /**
   * 移动端双指处理
   * @param tp1
   * @param tp2
   */
  doubleTouche (tp1: TouchePoint | Point, tp2?: TouchePoint): DoubleToucheEvent {
    if (tp2 === undefined) {
      return {
        core: {
          x: tp1.x,
          y: tp1.y,
        },
        length: 0,
        lengthX: 0,
        lengthY: 0,
        angle: 0
      };
    }
    const core = { x: (tp1.x + tp2.x) / 2, y: (tp1.y + tp2.y) / 2 };
    const lengthX = tp2.x - tp1.x;
    const lengthY = tp2.y - tp1.y;
    const length = Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2));
    const angle = Math.acos(lengthX / length) * 180 / Math.PI;
    return { core, length, lengthX, lengthY, angle };
  },

  /**
   * 将一个正矩形的内切椭圆旋转angle度，
   * 计算该椭圆的外接正矩形
   * (假设矩形中心为原点)
   * @param w
   * @param h
   * @param angle
   */
  getEllipseRectByRect(w: number, h: number, angle: number): Rect {
    if (!(angle / 180)) {
      return { x: -w / 2, y: -h / 2, w, h };
    }
    const a = w / 2;
    const b = h / 2;
    const { A, B, C, F } = getEllipseParam(a, b, angle);
    return getEllipseRect(A, B, C, F);
  },

  /**
   * 将一个正矩形旋转angle度，
   * 计算该矩形的外接正矩形
   * (假设矩形中心为原点)
   * @param w
   * @param h
   * @param angle
   */
  getRectByRect(w: number, h: number, angle: number): Rect {
    if (!(angle / 180)) {
      return { x: -w / 2, y: -h / 2, w, h };
    }
    const p1: Point = rotatePoint(-w / 2, -h / 2, angle);
    const p2: Point = rotatePoint(w / 2, -h / 2, angle);
    const nx = Math.max(Math.abs(p1.x), Math.abs(p2.x));
    const ny = Math.max(Math.abs(p1.y), Math.abs(p2.y));
    return {
      x: -nx,
      y: -ny,
      w: nx + nx,
      h: ny + ny
    };
  }
}
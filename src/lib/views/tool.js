// 剪裁用
const canvas = document.createElement('canvas');
canvas.style.display = 'none';
/**
 * 创建一个canvas
 * @type {CanvasRenderingContext2D}
 */
// @ts-ignore
const ctx = canvas.getContext('2d');

/**
 * 绘制矩形的内切椭圆
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 */
function ellipsePath(ctx, x, y, w, h) {
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
 *  得到椭圆参数方程的参数，
 *  椭圆参数方程为：
 *  A * x^2 + B * x * y + C * y^2 + F = 0
 * @param {number} a - 长轴半径
 * @param {number} b - 短轴半径
 * @param {number} angle - 旋转角度，逆时针
 * @returns {{A: number, B: number, C: number, F: number}}
 */
function getEllipseParam(a, b, angle) {
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
 * @param {number} A
 * @param {number} B
 * @param {number} C
 * @param {number} F
 * @returns {module:vue-picture-cut.Rect}
 */
function getEllipseRect(A, B, C, F) {
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
 * @param {number} x
 * @param {number} y
 * @param {number} angle
 * @returns {module:vue-picture-cut.Point}
 */
function rotatePoint(x, y, angle) {
  const a = Math.sqrt(x * x + y * y);
  const r1 = Math.atan2(x, y);
  const r2 = angle * Math.PI / 180 + r1;
  return {
    x: a * Math.sin(r2),
    y: a * Math.cos(r2)
  }
}

/**
 * 将一个二进制数组转换成base64
 * @param {ArrayBuffer} arrayBuffer
 * @param {string} type
 * @returns {string}
 */
function arrayBuffer2String(arrayBuffer, type) {
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
 * @param {string} src
 * @returns {Promise<string>}
 */
function loadCrossDomainImg (src) {
  return new Promise((resolve, reject) => {
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

/**
 * 工具类
 * @type {module:vue-picture-cut.Tool}
 */
const tool = {
  rotatePoint,
  loadCrossDomainImg,
  /**
   * 克隆对象
   * @param {any} obj
   * @returns {any}
   */
  cloneJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  /**
   * 加载图片
   * @param {string} src
   * @returns {Promise<HTMLImageElement>}
   */
  loadImg (src) {
    return new Promise((resolve, reject) => {
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
   * @param {HTMLImageElement} img
   * @param {number} width - 裁剪宽
   * @param {number} height - 裁剪高
   * @param {module:vue-picture-cut.RectFull} showRect - 显示图片的矩形
   * @param {number} [encoderOptions=0.8] - 压缩率
   * @param {string} [format='image/jpeg'] - 导出格式
   * @param {module:vue-picture-cut.PathDone} [pathDone] - 绘制剪裁路径
   * @returns {string}
   */
  clipBy (img,
          width,
          height,
          showRect,
          encoderOptions = 0.8,
          format = 'image/jpeg',
          pathDone) {
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

    pathDone && pathDone(ctx, width, height);

    if (r / 360) {
      ctx.rotate(-r * Math.PI / 180);
    }

    ctx.translate(x + w / 2 , y + h /2);
    ctx.scale(sH , sV);

    ctx.drawImage(img, 0, 0, img.width, img.height,
      -w / 2, -h / 2, w, h);

    ctx.scale(sH, sV);

    ctx.translate(-x - w / 2 - width / 2, -y - h / 2 - height / 2);
    ctx.restore();
    return canvas.toDataURL(format, encoderOptions);
  },

  /**
   * 根据坐标内切圆剪裁图像
   * @param {HTMLImageElement} img
   * @param {number} width - 裁剪宽
   * @param {number} height - 裁剪高
   * @param {module:vue-picture-cut.RectFull} showRect - 显示图片的矩形
   * @param {number} [encoderOptions=0.8] - 压缩率
   * @param {string} [format='image/jpeg'] - 导出格式
   * @returns {string}
   */
  clipByRound (img,
               width,
               height,
               showRect,
               encoderOptions = 0.8,
               format = 'image/jpeg') {
    return this.clipBy(
      img, width, height, showRect, encoderOptions, format,
      (ctx) => {
        // 剪切椭圆形状
        ctx.beginPath();
        ellipsePath(ctx, 0, 0, width, height);
        ctx.clip();
        ctx.closePath();
      });
  },

  /**
   * 若图片宽或高大于max，则压缩图片
   * @param {HTMLImageElement} img
   * @param {number} [max=2000]
   * @param {number} [encoderOptions=1]
   * @returns {module:vue-picture-cut.ClipResult|void}
   */
  clipByMax (img,
             max = 2000,
             encoderOptions = 1) {
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
      const newShow = {
        x: -nw / 2,
        y: -nh / 2,
        w: nw,
        h: nh,
        r: 0,
        sV: 1,
        sH: 1
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
   * @param {string} base64
   * @param {string} [format='image/jpeg']
   * @returns {Blob | null}
   */
  base64ToBlob (base64, format = 'image/jpeg') {
    if (!window.atob) {
      return null;
    }
    const code = window.atob(base64.split(',')[1]);
    const aBuffer = new ArrayBuffer(code.length);
    const uBuffer = new Uint8Array(aBuffer);
    for (let i = 0, l = code.length; i < l; i++) {
      uBuffer[i] = code.charCodeAt(i) & 0xff;
    }
    let blob = null;
    try {
      blob = new Blob([uBuffer], {type: format});
    } catch (e) {
      /**
       * @type {module:vue-picture-cut.Window}
       */
      const win = window;
      const BlobBuilder = win.BlobBuilder ||
        win.WebKitBlobBuilder ||
        win.MozBlobBuilder ||
        win.MSBlobBuilder;
      // @ts-ignore
      if (e.name === 'TypeError' && BlobBuilder) {
        const bb = new BlobBuilder();
        bb.append(uBuffer.buffer);
        blob = bb.getBlob(format);
      }
      // @ts-ignore
      else if (e.name === 'InvalidStateError') {
        blob = new Blob([aBuffer], {type: format});
      }
    }
    return blob;
  },

  /**
   * 移动端双指处理
   * @param {module:vue-picture-cut.TouchePoint|module:vue-picture-cut.Point} tp1
   * @param {module:vue-picture-cut.TouchePoint} [tp2]
   * @returns {module:vue-picture-cut.DoubleToucheEvent}
   */
  doubleTouche (tp1, tp2) {
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
   * @param {number} w
   * @param {number} h
   * @param {number} angle
   * @returns {module:vue-picture-cut.Rect}
   */
  getEllipseRectByRect(w, h, angle) {
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
   * @param {number} w
   * @param {number} h
   * @param {number} angle
   * @returns {module:vue-picture-cut.Rect}
   */
  getRectByRect(w, h, angle) {
    if (!(angle / 180)) {
      return { x: -w / 2, y: -h / 2, w, h };
    }
    const p1 = rotatePoint(-w / 2, -h / 2, angle);
    const p2 = rotatePoint(w / 2, -h / 2, angle);
    const nx = Math.max(Math.abs(p1.x), Math.abs(p2.x));
    const ny = Math.max(Math.abs(p1.y), Math.abs(p2.y));
    return {
      x: -nx,
      y: -ny,
      w: nx + nx,
      h: ny + ny
    };
  },

  /**
   * 函数防抖
   * @param {function} func
   * @param {number} [delay=300] - 延迟时间
   * @param {boolean} [immediate=false] - 是否立即执行
   * @returns {function}
   */
  debounce(func, delay = 300, immediate = false) {
    let timer = null;
    return function (...args) {
      const callNow = immediate && !timer;
      if (timer) {
        clearTimeout(timer);
      }
      if (callNow) {
        // @ts-ignore
        func.apply(this, args);
      }
      timer = setTimeout(() => {
        timer = null; // 重置 timer，为下一次立即执行做准备
        if (!immediate) {
          // @ts-ignore
          func.apply(this, args);
        }
      }, delay);
    };
  },

  /**
   * 函数节流
   * @param {function} func
   * @param {number} [delay=300] - 延迟时间
   * @returns {function}
   */
  throttle(func, delay = 300) {
    let previous = 0; // 上一次执行的时间戳
    return function (...args) {
      const now = Date.now(); // 获取当前时间

      // 如果距离上一次执行的时间超过了 delay，则执行函数
      if (now - previous >= delay){
        // @ts-ignore{
        func.apply(this, args);
        previous = now; // 更新上一次执行的时间
      }
    }
  },

}

export default tool;
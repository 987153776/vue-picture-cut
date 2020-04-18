export class Win extends Window{
    BlobBuilder?: any;
    WebKitBlobBuilder?: any;
    MozBlobBuilder?: any;
    MSBlobBuilder?: any;
}

// 剪裁用
const canvas = document.createElement('canvas') as HTMLCanvasElement;
canvas.style.display = 'none';
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

export default {
    /**
     * 加载图片
     * @param src
     * @returns {Promise<any>}
     */
    loadImg (src: string) {
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
     * @param img
     * @param cx
     * @param cy
     * @param cw
     * @param ch
     * @param nx
     * @param ny
     * @param nw
     * @param nh
     * @param encoderOptions
     * @returns {string}
     */
    clipBy (img: HTMLImageElement, cx: number, cy: number, cw: number, ch: number, nx: number, ny: number, nw: number, nh: number, encoderOptions = 0.8, format = 'image/jpeg') {
        canvas.width = nw;
        canvas.height = nh;
        ctx.clearRect(0, 0, nw, nh);
        ctx.drawImage(img, cx, cy, cw, ch, nx, ny, nw, nh);
        return canvas.toDataURL(format, encoderOptions);
    },

    /**
     * 若图片宽或高大于2000，则压缩图片
     * 出于移动端性能考虑
     * @param img {HTMLImageElement}
     * @param max {number}
     */
    clipByMax (img: HTMLImageElement, max = 2000) {
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
        const base64 = this.clipBy(img, 0, 0, img.width, img.height, 0, 0, nw, nh, 0.9);
        return {
            src: base64,
            file: this.base64ToBlob(base64)
        }
    },

    /**
     * 将base64转Blob对象
     * @param url
     * @param format
     */
    base64ToBlob (url: string, format = 'image/jpeg') {
        const code = atob(url.split(',')[1]);
        const aBuffer = new ArrayBuffer(code.length);
        const uBuffer = new Uint8Array(aBuffer);
        for (let i = 0, l = code.length; i < l; i++) {
            uBuffer[i] = code.charCodeAt(i) & 0xff;
        }
        let blob = null;
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
    }
}
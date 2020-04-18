// 调整
// Alteration: {
//   '亮度': 'brightness',
//     '色相/饱和度调节': 'setHSI',
//     '曲线': 'curve',
//     'gamma调节': 'gamma',
//     '可选颜色': 'selectiveColor'
// },
//
// // 滤镜
// Filter: {
//   '灰度处理': 'toGray',
//     '反色': 'toReverse',
//     '灰度阈值': 'toThresh',
//     '高斯模糊': 'gaussBlur',
//     '浮雕效果': 'embossment',
//     '查找边缘': 'borderline',
//     '马赛克': 'mosaic',
//     '油画': 'oilPainting',
//     '腐蚀': 'corrode',
//     '锐化': 'sharp',
//     '添加杂色': 'noise',
//     '暗角': 'darkCorner',
//     '喷点': 'dotted',
//     '降噪': 'denoise',
//     '棕褐色': 'sepia',
//     '色调分离': 'posterize'
// },
//
// ComEffect: {
//   '美肤': 'softenFace',
//     '素描': 'sketch',
//     '自然增强': 'softEnhancement',
//     '紫调': 'purpleStyle',
//     '柔焦': 'soften',
//     '复古': 'vintage',
//     '黑白': 'gray',
//     '仿lomo': 'lomo',
//     '亮白增强': 'strongEnhancement',
//     '灰白': 'strongGray',
//     '灰色': 'lightGray',
//     '暖秋': 'warmAutumn',
//     '木雕': 'carveStyle',
//     '粗糙': 'rough'
// }
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
export default {

    /**
     * 克隆
     * @param context
     * @param canvasData
     */
    copyImageData (context: CanvasRenderingContext2D, canvasData: ImageData) {
        const dst = context.createImageData(canvasData.width, canvasData.height);
        dst.data.set(canvasData.data);
        return dst;
    },

    /**
     * 反色
     * @param binaryData
     * @param l
     */
    colorInvertProcess (binaryData: Uint8ClampedArray, l: number) {
        for (let i = 0; i < l; i += 4) {
            const r = binaryData[i];
            const g = binaryData[i + 1]
            const b = binaryData[i + 2]

            binaryData[i] = 255 - r
            binaryData[i + 1] = 255 - g
            binaryData[i + 2] = 255 - b
        }
    },

    /**
     * 灰色调
     * @param binaryData
     * @param l
     */
    colorAdjustProcess (binaryData: Uint8ClampedArray, l: number) {
        for (let i = 0; i < l; i += 4) {
            const r = binaryData[i]
            const g = binaryData[i + 1]
            const b = binaryData[i + 2]

            binaryData[i] = (r * 0.272) + (g * 0.534) + (b * 0.131)
            binaryData[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168)
            binaryData[i + 2] = (r * 0.393) + (g * 0.769) + (b * 0.189)
        }
    },

    /**
     * 模糊
     * @param context
     * @param canvasData
     */
    blurProcess (context: CanvasRenderingContext2D, canvasData: ImageData) {
        const tempCanvasData = this.copyImageData(context, canvasData);
        let sumred = 0.0, sumgreen = 0.0, sumblue = 0.0;
        for (let x = 0; x < tempCanvasData.width; x++) {
            for (let y = 0; y < tempCanvasData.height; y++) {
                // Index of the pixel in the array
                const idx = (x + y * tempCanvasData.width) * 4;
                for (let subCol = -2; subCol <= 2; subCol++) {
                    let colOff = subCol + x;
                    if (colOff < 0 || colOff >= tempCanvasData.width) {
                        colOff = 0
                    }
                    for (let subRow = -2; subRow <= 2; subRow++) {
                        let rowOff = subRow + y;
                        if (rowOff < 0 || rowOff >= tempCanvasData.height) {
                            rowOff = 0
                        }
                        const idx2 = (colOff + rowOff * tempCanvasData.width) * 4;
                        const r = tempCanvasData.data[idx2 + 0];
                        const g = tempCanvasData.data[idx2 + 1];
                        const b = tempCanvasData.data[idx2 + 2];
                        sumred += r
                        sumgreen += g
                        sumblue += b
                    }
                }

                // calculate new RGB value
                const nr = (sumred / 25.0);
                const ng = (sumgreen / 25.0);
                const nb = (sumblue / 25.0);

                // clear previous for next pixel point
                sumred = 0.0;
                sumgreen = 0.0;
                sumblue = 0.0;

                // assign new pixel value
                canvasData.data[idx + 0] = nr; // Red channel
                canvasData.data[idx + 1] = ng; // Green channel
                canvasData.data[idx + 2] = nb; // Blue channel
                canvasData.data[idx + 3] = 255; // Alpha channel
            }
        }
    },

    /**
     * 浮雕
     * @param context
     * @param canvasData
     */
    reliefProcess (context: CanvasRenderingContext2D, canvasData: ImageData) {
        const tempCanvasData = this.copyImageData(context, canvasData);
        for (let x = 1; x < tempCanvasData.width - 1; x++) {
            for (let y = 1; y < tempCanvasData.height - 1; y++) {
                // Index of the pixel in the array
                const idx = (x + y * tempCanvasData.width) * 4;
                const bidx = ((x - 1) + y * tempCanvasData.width) * 4;
                const aidx = ((x + 1) + y * tempCanvasData.width) * 4;

                // calculate new RGB value
                let nr = tempCanvasData.data[aidx + 0] - tempCanvasData.data[bidx + 0] + 128;
                let ng = tempCanvasData.data[aidx + 1] - tempCanvasData.data[bidx + 1] + 128;
                let nb = tempCanvasData.data[aidx + 2] - tempCanvasData.data[bidx + 2] + 128;
                nr = (nr < 0) ? 0 : ((nr > 255) ? 255 : nr);
                ng = (ng < 0) ? 0 : ((ng > 255) ? 255 : ng);
                nb = (nb < 0) ? 0 : ((nb > 255) ? 255 : nb);

                // assign new pixel value
                canvasData.data[idx + 0] = nr; // Red channel
                canvasData.data[idx + 1] = ng; // Green channel
                canvasData.data[idx + 2] = nb; // Blue channel
                canvasData.data[idx + 3] = 255; // Alpha channel
            }
        }
    },

    /**
     * 雕刻
     * @param context
     * @param canvasData
     */
    diaokeProcess (context: CanvasRenderingContext2D, canvasData: ImageData) {
        const tempCanvasData = this.copyImageData(context, canvasData);
        for (let x = 1; x < tempCanvasData.width - 1; x++) {
            for (let y = 1; y < tempCanvasData.height - 1; y++) {
                // Index of the pixel in the array
                const idx = (x + y * tempCanvasData.width) * 4;
                const bidx = ((x - 1) + y * tempCanvasData.width) * 4;
                const aidx = ((x + 1) + y * tempCanvasData.width) * 4;

                // calculate new RGB value
                let nr = tempCanvasData.data[bidx + 0] - tempCanvasData.data[aidx + 0] + 128;
                let ng = tempCanvasData.data[bidx + 1] - tempCanvasData.data[aidx + 1] + 128;
                let nb = tempCanvasData.data[bidx + 2] - tempCanvasData.data[aidx + 2] + 128;
                nr = (nr < 0) ? 0 : ((nr > 255) ? 255 : nr);
                ng = (ng < 0) ? 0 : ((ng > 255) ? 255 : ng);
                nb = (nb < 0) ? 0 : ((nb > 255) ? 255 : nb);

                // assign new pixel value
                canvasData.data[idx + 0] = nr; // Red channel
                canvasData.data[idx + 1] = ng; // Green channel
                canvasData.data[idx + 2] = nb; // Blue channel
                canvasData.data[idx + 3] = 255; // Alpha channel
            }
        }
    },

    /**
     * 镜像
     * @param context
     * @param canvasData
     */
    mirrorProcess (context: CanvasRenderingContext2D, canvasData: ImageData) {
        const tempCanvasData = this.copyImageData(context, canvasData);
        for (let x = 0; x < tempCanvasData.width; x++) { // column
            for (let y = 0; y < tempCanvasData.height; y++) { // row
                // Index of the pixel in the array
                const idx = (x + y * tempCanvasData.width) * 4;
                const midx = (((tempCanvasData.width - 1) - x) + y * tempCanvasData.width) * 4;

                // assign new pixel value
                canvasData.data[midx + 0] = tempCanvasData.data[idx + 0]; // Red channel
                canvasData.data[midx + 1] = tempCanvasData.data[idx + 1]; // Green channel
                canvasData.data[midx + 2] = tempCanvasData.data[idx + 2]; // Blue channel
                canvasData.data[midx + 3] = 255; // Alpha channel
            }
        }
    },

    /**
     * 图像旋转
     * @param canvas
     * @param img
     * @param rad
     */
    rotateProcess (img: HTMLImageElement, rad: number): string {
        const w = img.width;
        const h = img.height;
        canvas.width = h;
        canvas.height = w;
        ctx.clearRect(0, 0, h, w);
        ctx.save();
        ctx.translate(h / 2, w / 2);
        ctx.rotate(rad * Math.PI);
        ctx.drawImage(img, -w / 2, -h / 2, w, h);
        ctx.restore();
        return canvas.toDataURL('image/jpeg', 0.95);
    },

    /**
     * 图像翻转
     * @param canvas
     * @param img
     * @param status
     */
    flipProcess (img: HTMLImageElement, status: boolean): string {
        const w = img.width;
        const h = img.height;
        canvas.width = w;
        canvas.height = h;
        ctx.save();
        ctx.scale(status ? -1 : 1, status ? 1 : -1);
        ctx.drawImage(img, status ? -img.width : 0, status ? 0 : -img.height, img.width, img.height);
        ctx.restore();
        return canvas.toDataURL('image/jpeg', 0.95);
    }
};
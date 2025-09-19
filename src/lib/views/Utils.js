/**
 * 二次包装工具类
 * 简化api，方便自定义菜单等
 */
export class Utils {

  photoRoot;

  /**
   * 工具类
   * @param {module:vue-picture-cut.CutInterface} cut
   */
  constructor(cut) {
    this.photoRoot = cut.photoRoot;
  }

  /**
   * 获取图片剪裁
   * @returns {module:vue-picture-cut.PhotoMask|null}
   */
  getPhotoMask() {
    if (this.photoRoot) {
      return this.photoRoot.getEventList('PhotoMask');
    }
    return null;
  }

  /**
   * 获取图片主控件
   * @returns {module:vue-picture-cut.PhotoMain|null}
   */
  getPhotoMain() {
    if (this.photoRoot) {
      return this.photoRoot.getEventList('PhotoMain');
    }
    return null;
  }

  /**
   * 裁剪
   * @param {number|{maxPixel,encoderOptions,format}} [opt] - 最大像素
   * @param {number} [encoderOptions] - 压缩率
   * @param {string} [format] - 导出格式
   * @returns {module:vue-picture-cut.ClipResult|null}
   */
  cut(opt, encoderOptions, format) {
    if (!this.photoRoot) return null;
    const mask = this.getPhotoMask();
    if (mask) {
      if (typeof opt === "object") {
        return mask.clip(opt.maxPixel, opt.encoderOptions, opt.format);
      } else if (typeof opt === "number") {
        return mask.clip(opt, encoderOptions, format);
      }
      return mask.clip();
    }
    return null;
  }

  /**
   * 重置图片状态
   */
  reset(){
    if (!this.photoRoot) return;
    const main = this.getPhotoMain();
    main?.reset();
  }

  /**
   * 设置剪裁框是否圆形
   * @param {boolean} isRound=true
   */
  setMaskRound(isRound = true) {
    if (!this.photoRoot) return;
    const mask = this.getPhotoMask();
    if (mask) {
      mask.isRound = isRound;
    }
  }

  /**
   * 设置剪裁框
   * @param {number} w - 比例宽
   * @param {number} h - 比例高
   */
  setMaskSize(w, h) {
    if (!this.photoRoot) return;
    const mask = this.getPhotoMask();
    mask?.reset(w, h);
  }

  /**
   * 按图片宽高比例设置剪裁框尺寸
   * @returns {{width: number, height: number} | void}
   */
  setMaskSizeToOriginal () {
    if (!this.photoRoot) return;
    const main = this.getPhotoMain();
    if (main) {
      this.setMaskSize(main.imgRect.w, main.imgRect.h);
      return {
        width: main.imgRect.w,
        height: main.imgRect.h
      }
    }
  }

  /**
   * 设置剪裁框是否可拖动改变大小
   * @param {boolean} resize=true
   */
  setMaskResize (resize = true) {
    if (!this.photoRoot) return;
    const mask = this.getPhotoMask();
    mask?.setResize(resize);
  }

  /**
   * 图片旋转
   * @param {number} angle - 逆时针角度
   * @param {boolean} animation=false - 是否动画
   * @returns {number | void}
   */
  rotate (angle, animation = false) {
    if (!this.photoRoot || angle % 360 === 0) return;
    const main = this.getPhotoMain();
    if (main) {
      const newAngle = main.showRect.r + angle;
      main.setAngle(newAngle, animation);
      return newAngle;
    }
  }

  /**
   * 图片旋转到指定角度
   * @param {number} angle - 逆时针角度
   * @param {boolean} animation=false - 是否动画
   */
  rotateTo (angle, animation = false) {
    if (!this.photoRoot) return;
    const main = this.getPhotoMain();
    if (main && main.showRect.r + angle % 360) {
      main.setAngle(angle, animation);
    }
  }

  /**
   * 设置图片垂直翻转
   * @param {boolean} animation=false - 是否动画
   * @returns {boolean | void}
   */
  setFlipV(animation) {
    if (!this.photoRoot) return;
    const main = this.getPhotoMain();
    if (main) {
      main.setFlipV(main.showRect.sV === 1, animation);
      return main.showRect.sV === -1;
    }
  }

  /**
   * 设置图片水平翻转
   * @param {boolean} animation=false - 是否动画
   * @returns {boolean | void}
   */
  setFlipH(animation = false) {
    if (!this.photoRoot) return;
    const main = this.getPhotoMain();
    if (main) {
      main.setFlipH(main.showRect.sH === 1, animation);
      return main.showRect.sH === -1;
    }
  }

  /**
   * 设置图片翻转
   * @param {boolean} sV - 垂直
   * @param {boolean} sH - 水平
   * @param {boolean} animation=false - 是否动画
   */
  setFlip (sV, sH, animation = false) {
    if (!this.photoRoot) return;
    const main = this.getPhotoMain();
    main?.setFlip(sV, sH, animation);
  }

  /**
   * 图片缩放
   * @param {number} zoom - 缩放系数
   */
  scale(zoom){
    const photoMain = this.getPhotoMain();
    photoMain?.scale(zoom);
  }

  /**
   * 获取控件参数
   * @returns {module:vue-picture-cut.CutOptions|null}
   */
  getOptions() {
    const root = this.photoRoot;
    if (!root) return null;
    const main = root.getEventList('PhotoMain');
    const mask = root.getEventList('PhotoMask');
    let imgOpt, maskOpt;
    if (main) {
      const imgRect = main.imgRect;
      const showRect = main.showRect;
      imgOpt = {
        src: main.originalImg?.src,
        imgRect: {...imgRect},
        showRect: {...showRect},
      };
      imgOpt.showRect.x -= imgOpt.showRect.w / 2;
      imgOpt.showRect.y -= imgOpt.showRect.y / 2;
    }
    if (mask) {
      const maskRect = mask.getMaskRect();
      maskOpt = {
        isRound: mask.isRound,
        x: maskRect.x - maskRect.w / 2,
        y: maskRect.y - maskRect.h / 2,
        w: maskRect.w,
        h: maskRect.h
      }
    }
    return {
      canvas: {
        width: root.width,
        height: root.height,
        drawWidth: root.drawWidth,
        drawHeight: root.drawHeight,
        magnification: root.magnification
      },
      img: imgOpt || {},
      mask: maskOpt || {}
    };
  }
}

/**
 * 创建工具类
 * @param cut
 * @returns {Utils}
 */
export default function createUtils(cut) {
  if (!cut || !cut.photoRoot) {
    throw new Error(
      `createUtils需要一个为VuePictureCut实例的参数，但是当前得到的是${cut}!\n
      "createUtils" requires an argument for the "VuePictureCut" instance, but the current result is ${cut}!`
    );
  } else {
    return new Utils(cut);
  }
}
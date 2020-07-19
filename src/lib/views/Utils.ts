import {ClipResult, CutInterface, CutOptions} from './interface';
import PhotoRoot from './PhotoRoot';
import PhotoMask from "@/lib/views/PhotoMask";
import PhotoMain from "@/lib/views/PhotoMain";

/**
 * 二次包装工具类
 * 简化api，方便自定义菜单等
 */
export class Utils {

  photoRoot: PhotoRoot;

  constructor(cut: CutInterface) {
    this.photoRoot = cut.photoRoot;
  }

  getPhotoMask(): PhotoMask | null {
    if (this.photoRoot) {
      return this.photoRoot.getEventList<PhotoMask>('PhotoMask');
    }
    return null;
  }

  getPhotoMain(): PhotoMain | null {
    if (this.photoRoot) {
      return this.photoRoot.getEventList<PhotoMain>('PhotoMain');
    }
    return null;
  }
  
  /**
   * 裁剪
   * @param maxPixel        最大像素
   * @param encoderOptions  压缩率
   * @param format          导出格式
   */
  cut(maxPixel?: number, encoderOptions?: number, format?: string): ClipResult | null{
    if (!this.photoRoot) return null;
    const mask = this.getPhotoMask();
    if (mask) {
      return mask.clip(maxPixel, encoderOptions, format);
    }
    return null;
  }

  /**
   * 重置图片状态
   */
  reset(): void{
    if (!this.photoRoot) return;
    const main = this.getPhotoMain();
    main?.reset();
  }

  /**
   * 设置剪裁框是否圆形
   * @param isRound
   */
  setMaskRound(isRound = true): void {
    if (!this.photoRoot) return;
    const mask = this.getPhotoMask();
    if (mask) {
      mask.isRound = isRound;
    }
  }

  /**
   * 设置剪裁框
   * @param w   比例宽
   * @param h   比例高
   */
  setMaskSize(w: number, h: number): void {
    if (!this.photoRoot) return;
    const mask = this.getPhotoMask();
    mask?.reset(w, h);
  }

  /**
   * 按图片宽高比例设置剪裁框尺寸
   */
  setMaskSizeToOriginal (): {width: number, height: number} | void {
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
   * @param resize
   */
  setMaskResize (resize = true): void {
    if (!this.photoRoot) return;
    const mask = this.getPhotoMask();
    mask?.setResize(resize);
  }

  /**
   * 图片旋转
   * @param angle       逆时针角度
   * @param animation   是否动画
   */
  rotate (angle: number, animation = false): number | void {
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
   * @param angle       逆时针角度
   * @param animation   是否动画
   */
  rotateTo (angle: number, animation = false): void {
    if (!this.photoRoot) return;
    const main = this.getPhotoMain();
    if (main && main.showRect.r + angle % 360) {
      main.setAngle(angle, animation);
    }
  }

  /**
   * 设置图片垂直翻转
   * @param animation   是否动画
   */
  setFlipV(animation?: boolean): boolean | void {
    if (!this.photoRoot) return;
    const main = this.getPhotoMain();
    if (main) {
      main.setFlipV(main.showRect.sV === 1, animation);
      return main.showRect.sV === -1;
    }
  }

  /**
   * 设置图片水平翻转
   * @param animation   是否动画
   */
  setFlipH(animation?: boolean): boolean | void {
    if (!this.photoRoot) return;
    const main = this.getPhotoMain();
    if (main) {
      main.setFlipH(main.showRect.sH === 1, animation);
      return main.showRect.sH === -1;
    }
  }

  /**
   * 设置图片翻转
   * @param sV          垂直
   * @param sH          水平
   * @param animation   是否动画
   */
  setFlip (sV: boolean, sH: boolean, animation?: boolean): void {
    if (!this.photoRoot) return;
    const main = this.getPhotoMain();
    main?.setFlip(sV, sH, animation);
  }

  /**
   * 图片缩放
   * @param zoom    缩放系数
   */
  scale(zoom: number): void{
    const photoMain = this.getPhotoMain();
    photoMain?.scale(zoom);
  }

  /**
   * 获取控件参数
   */
  getOptions(): CutOptions | null {
    const root = this.photoRoot;
    if (!root) return null;
    const main = root.getEventList<PhotoMain>('PhotoMain');
    const mask = root.getEventList<PhotoMask>('PhotoMask');
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
      const maskRect = mask.getmaskRect();
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

export default function createUtils(cut: CutInterface): Utils {
  if (!cut || !cut.photoRoot) {
    throw new Error(
      `createUtils需要一个为VuePictureCut实例的参数，但是当前得到的是${cut}!\n
      "createUtils" requires an argument for the "VuePictureCut" instance, but the current result is ${cut}!`
    );
  } else {
    return new Utils(cut);
  }
}
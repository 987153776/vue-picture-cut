import {ClipResult, CutInterface} from './interface';
import PhotoRoot from './PhotoRoot';
import PhotoMask from "@/lib/views/PhotoMask";
import PhotoMain from "@/lib/views/PhotoMain";

/**
 * 二次包装工具类
 * 简化api，方便自定义菜单等
 */
class Utils {

  photoRoot: PhotoRoot;

  constructor(cut: CutInterface) {
    this.photoRoot = cut.photoRoot;
  }

  /**
   * 裁剪
   * @param maxPixel        最大像素
   * @param encoderOptions  压缩率
   * @param format          导出格式
   */
  cut(maxPixel?: number, encoderOptions?: number, format?: string): ClipResult | null{
    if (!this.photoRoot) return null;
    const mask = this.photoRoot.getEventList<PhotoMask>('PhotoMask');
    if (mask) {
      return mask.clip(maxPixel, encoderOptions, format);
    }
    return null;
  }

  /**
   * 设置剪裁框是否圆形
   * @param isRound
   */
  setMaskRound(isRound = true): void {
    if (!this.photoRoot) return;
    const mask = this.photoRoot.getEventList<PhotoMask>('PhotoMask');
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
    const mask = this.photoRoot.getEventList<PhotoMask>('PhotoMask');
    mask?.reset(w, h);
  }

  /**
   * 按图片宽高比例设置剪裁框尺寸
   */
  setMaskSizeToOriginal (): void {
    if (!this.photoRoot) return;
    const main = this.photoRoot.getEventList<PhotoMain>('PhotoMain');
    if (main) {
      this.setMaskSize(main.imgRect.w, main.imgRect.h)
    }
  }

  /**
   * 设置剪裁框是否可拖动改变大小
   * @param resize
   */
  setMaskResize (resize = true): void {
    if (!this.photoRoot) return;
    const mask = this.photoRoot.getEventList<PhotoMask>('PhotoMask');
    mask?.setResize(resize);
  }

  /**
   * 图片旋转
   * @param angle       逆时针角度
   * @param animation   是否动画
   */
  rotate (angle: number, animation = false): void {
    if (!this.photoRoot || angle % 360 === 0) return;
    const main = this.photoRoot.getEventList<PhotoMain>('PhotoMain');
    main?.setAngle(main.showRect.r + angle, animation);
  }

  /**
   * 设置图片垂直翻转
   * @param animation   是否动画
   */
  setFlipV(animation?: boolean): void {
    if (!this.photoRoot) return;
    const main = this.photoRoot.getEventList<PhotoMain>('PhotoMain');
    main?.setFlipV(main.showRect.sV === 1, animation);
  }

  /**
   * 设置图片水平翻转
   * @param animation   是否动画
   */
  setFlipH(animation?: boolean): void {
    if (!this.photoRoot) return;
    const main = this.photoRoot.getEventList<PhotoMain>('PhotoMain');
    main?.setFlipH(main.showRect.sH === 1, animation);
  }

  /**
   * 设置图片翻转
   * @param sV          垂直
   * @param sH          水平
   * @param animation   是否动画
   */
  setFlip (sV: boolean, sH: boolean, animation?: boolean): void {
    console.log(0, sV, sH);
    if (!this.photoRoot) return;
    const main = this.photoRoot.getEventList<PhotoMain>('PhotoMain');
    main?.setFlip(sV, sH, animation);
  }

  /**
   * 图片缩放
   * @param zoom    缩放系数
   */
  scale(zoom: number): void{
    const photoMain = this.photoRoot.getEventList<PhotoMain>('PhotoMain');
    photoMain?.scale(zoom);
  }
}

export default function createUtils(cut: CutInterface): Utils {
  return new Utils(cut);
}
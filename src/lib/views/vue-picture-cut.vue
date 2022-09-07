<template>
  <div class="vue-picture-cut"
       :class="{'_default': !backgroundColor}"
       :style="{'background-color': backgroundColor || '#fff'}">
    <div class="vue-picture-cut_main" ref="main"
         :class="[menuPosition]"
         :style="mainPosition">
      <div v-show="loading" class="vue-picture-cut_main-loading">loading...</div>
      <vue-picture-cut-canvas :loading.sync="loading" :angle="initAngle"/>
      <slot>
        <vue-picture-cut-mask v-bind="mskOption"/>
      </slot>
    </div>
    <div v-show="thickness > 0"
         class="vue-picture-cut_menu-box"
         :class="[menuPosition]"
         :style="memuPosition">
      <slot name="menu">
        <div class="vue-picture-cut_default-menu">
          <div class="vue-picture-cut_slider" v-if="rotateControl">
            <input type="range" v-model="sliderAngle" :min="-180" :max="180"/>
            <div class="vue-picture-cut_slider-box">
              <div class="vue-picture-cut_slider-box-bar"
                   :style="{left: sliderAngle * 100 / 361 + 50 + '%'}">
                <div class="vue-picture-cut_slider-box-tips">
                  {{ sliderAngle }}°
                </div>
              </div>
            </div>
          </div>
          <div v-show="src" class="vue-picture-cut_button" @click="sureCut">ok</div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Provide, Ref, Prop, Watch, Emit} from 'vue-property-decorator';
import PhotoRoot from './PhotoRoot';
import PhotoMain from './PhotoMain';
import PhotoMask from './PhotoMask';
import VuePictureCutCanvas from './vue-picture-cut-canvas.vue';
import VuePictureCutMask from './vue-picture-cut-mask.vue';
import { Square } from './interface';

interface MskOption {
  width?: number;
  height?: number;
  isRound?: boolean;
  resize?: boolean;
}

@Component({
  name: 'VuePictureCut',
  components: {
    VuePictureCutCanvas,
    VuePictureCutMask
  }
})
export default class VuePictureCut extends Vue {

  // 背景色
  @Prop({ type: String, required: false }) private backgroundColor?: string;
  // 缩放率
  @Prop({ type: Number, default: 1.5 }) private magnification!: number;
  // 图片
  @Prop({ type: String, default: null }) private src!: string | null;
  // 旋转
  @Prop({ type: Number, required: false }) private initAngle: number | undefined;
  // 裁剪长边像素
  @Prop({ type: Number, required: false }) private maxPixel: number | undefined;
  // 裁剪压缩率
  @Prop({ type: Number, required: false }) private encoderOptions: number | undefined;
  // 导出格式
  @Prop({ type: String, required: false }) private format: string | undefined;
  // 遮罩
  @Prop({
    type: Object,
    default () {
      return {
        width: 1,
        height: 1,
        isRound: false,
        resize: true
      }
    }
  }) private mskOption!: MskOption;
  // 是否显示旋转控件
  @Prop({ type: Boolean, required: false }) private rotateControl!: boolean;
  // 菜单栏宽度/高度
  @Prop({ type: Number, required: false }) private menuThickness!: number;
  // 菜单栏位置
  @Prop({ type: String, default: 'bottom' }) private menuPosition!: string;

  @Ref() private main!: HTMLDivElement;

  loading = false;
  // 是否有菜单组件
  hasMenu = false;
  // 角度
  sliderAngle = 0;
  // 图片将要裁剪的宽高
  cutSize: Square | null = null;

  photoRoot: PhotoRoot = new PhotoRoot();


  get thickness () {
    if (this.menuThickness === void 0 || this.menuThickness < 0) {
      return this.hasMenu ? 120 : 50;
    }
    return this.menuThickness;
  }

  get mainPosition() {
    const thickness = this.thickness + 'px';
    const position = {
      top: '0',
      left: '0',
      right: '0',
      bottom: '0'
    }
    if (this.menuPosition === 'top') {
      position.top = thickness;
    } else if (this.menuPosition === 'left') {
      position.left = thickness;
    } else if (this.menuPosition === 'right') {
      position.right = thickness;
    } else {
      position.bottom = thickness;
    }
    return position;
  }

  get memuPosition() {
    const thickness = this.thickness + 'px';
    if (this.menuPosition === 'top') {
      return {
        top: '0',
        left: '0',
        right: '0',
        height: thickness
      }
    } else if (this.menuPosition === 'left') {
      return {
        top: '0',
        left: '0',
        bottom: '0',
        width: thickness
      }
    } else if (this.menuPosition === 'right') {
      return {
        top: '0',
        right: '0',
        bottom: '0',
        width: thickness
      }
    } else {
      return {
        left: '0',
        right: '0',
        bottom: '0',
        height: thickness
      }
    }
  }

  @Watch('src')
  watchSrc (to: string | null): void {
    if (to) {
      this.setImg();
    }
  }

  @Watch('initAngle')
  watchInitAngle (to: number | undefined): void {
    if (to === undefined) return;
    const main = this.photoRoot.getEventList<PhotoMain>('PhotoMain');
    if (main) {
      const angle2 = (main.showRect.r + to) % 360;
      this.sliderAngle = angle2 > 180 ? angle2 - 360 : angle2 < -180 ? angle2 + 360 : angle2;
    }
  }

  @Watch('sliderAngle')
  watchSliderAngle (to: string): void {
    const photoMain = this.photoRoot.getEventList<PhotoMain>('PhotoMain');
    if (photoMain) {
      photoMain.setAngle(parseInt(to));
    }
  }

  /*******生命周期********/
  protected created (): void {
    this.watchInitAngle(this.initAngle);
    if (this.$slots.menu) {
      this.hasMenu = true;
    }
    this.photoRoot.onPhotoChange = this.onStateChange;
  }

  protected mounted (): void {
    this.photoRoot.init(this.main, this.magnification);
    setTimeout(() => {
      this.setImg();
    }, 0);
  }

  /*******事件********/
  @Emit('on-change')
  onChangeEvent (blob: Blob | null, base64: string): {blob: Blob | null; base64: string} {
    return {blob, base64};
  }

  onStateChange({ type }) {
    if (['imageInit', 'imageAngle', 'imageReset', 'imageScale', 'maskMove'].indexOf(type) > -1) {
      const photoMask = this.photoRoot.getEventList<PhotoMask>('PhotoMask');
      if (photoMask) {
        const info = photoMask.getCutInfo(this.maxPixel);
        const cutSize = info?.cutSize;
        if (cutSize?.w !== this.cutSize?.w || cutSize?.h !== this.cutSize?.h) {
          this.cutSize = cutSize || null;
        }
      }
    }
  }

  /**********方法**********/

  @Provide('getCutRoot')
  private getCutRoot() {
    return this;
  }

  setImg(): void {
    const photoMain = this.photoRoot.getEventList<PhotoMain>('PhotoMain');
    const src = this.src;
    if (src && photoMain) {
      photoMain.setSrc(src, this.initAngle);
    }
    if (this.initAngle !== undefined) {
      this.sliderAngle = this.initAngle % 180;
    }
  }

  // 默认裁剪
  sureCut(): void{
    const mask = this.photoRoot.getEventList<PhotoMask>('PhotoMask');
    if (mask) {
      const result = mask.clip(this.maxPixel, this.encoderOptions, this.format);
      if (result) {
        this.onChangeEvent(result.file, result.src);
      }
    }
  }

  // 缩放
  scale(zoom: number): void{
    const photoMain = this.photoRoot.getEventList<PhotoMain>('PhotoMain');
    photoMain?.scale(zoom);
  }

}
</script>

<style lang="scss">
@import "../styles/center";
@import "../styles/1px";
@import "../styles/vue-picture-cut.scss";
</style>
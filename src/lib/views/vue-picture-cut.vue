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

<script>
import PhotoRoot from './PhotoRoot';
import VuePictureCutCanvas from './vue-picture-cut-canvas.vue';
import VuePictureCutMask from './vue-picture-cut-mask.vue';

export default {
  name: 'VuePictureCut',
  provide() {
    return {
      vuePictureCut: this.photoRoot
    }
  },
  components: {
    VuePictureCutCanvas,
    VuePictureCutMask
  },
  props: {
    // 背景色
    backgroundColor: {
      type: String,
      required: false
    },
    // 缩放率
    magnification: {
      type: Number,
      default: 1.5
    },
    // 图片
    src: {
      type: String,
      default: null
    },
    // 旋转
    initAngle: {
      type: Number,
      required: false
    },
    // 裁剪长边像素
    maxPixel: {
      type: Number,
      required: false
    },
    // 裁剪压缩率
    encoderOptions: {
      type: Number,
      required: false
    },
    // 导出格式
    format: {
      type: String,
      required: false
    },
    // 遮罩
    mskOption: {
      type: Object,
      default () {
        return {
          width: 1,
          height: 1,
          isRound: false,
          resize: true
        }
      }
    },
    // 是否显示旋转控件
    rotateControl: {
      type: Boolean,
      required: false
    },
    // 菜单栏宽度/高度
    menuThickness: {
      type: Number,
      required: false
    },
    // 菜单栏位置
    menuPosition: {
      type: String,
      default: 'bottom'
    },
  },
  data() {
    return {
      loading: false,
      // 是否有菜单组件
      hasMenu: false,
      // 角度
      sliderAngle: 0,
      photoRoot: new PhotoRoot(),
    }
  },
  computed: {
    thickness () {
      if (this.menuThickness === void 0 || this.menuThickness < 0) {
        return this.hasMenu ? 120 : 50;
      }
      return this.menuThickness;
    },
    mainPosition() {
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
    },
    memuPosition() {
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
  },
  watch: {
    src (to) {
      if (to) {
        this.setImg();
      }
    },
    initAngle (to) {
      this.watchInitAngle(to);
    },
    sliderAngle (to) {
      const photoMain = this.photoRoot.getEventList('PhotoMain');
      if (photoMain) {
        photoMain.setAngle(parseInt(to));
      }
    }
  },
  created () {
    this.watchInitAngle(this.initAngle);
    if (this.$slots.menu) {
      this.hasMenu = true;
    }
  },
  mounted () {
    this.photoRoot.init(this.$refs.main, this.magnification);
    setTimeout(() => {
      this.setImg();
    }, 0);
  },
  methods: {
    watchInitAngle(to) {
      if (to === undefined) return;
      const main = this.photoRoot.getEventList('PhotoMain');
      if (main) {
        const angle2 = (main.showRect.r + to) % 360;
        this.sliderAngle = angle2 > 180 ? angle2 - 360 : angle2 < -180 ? angle2 + 360 : angle2;
      }
    },
    onChangeEvent (blob, base64) {
      return this.$emit('on-change', {blob, base64});
    },
    setImg() {
      const photoMain = this.photoRoot.getEventList('PhotoMain');
      const src = this.src;
      if (src && photoMain) {
        photoMain.setSrc(src, this.initAngle);
      }
      if (this.initAngle !== undefined) {
        this.sliderAngle = this.initAngle % 180;
      }
    },
    // 默认裁剪
    sureCut() {
      const mask = this.photoRoot.getEventList('PhotoMask');
      if (mask) {
        const result = mask.clip(this.maxPixel, this.encoderOptions, this.format);
        if (result) {
          this.onChangeEvent(result.file, result.src);
        }
      }
    },
    // 缩放
    scale(zoom) {
      const photoMain = this.photoRoot.getEventList('PhotoMain');
      photoMain?.scale(zoom);
    }
  }
}
</script>

<style lang="scss">
@import "../styles/center";
@import "../styles/1px";
@import "../styles/vue-picture-cut.scss";
</style>
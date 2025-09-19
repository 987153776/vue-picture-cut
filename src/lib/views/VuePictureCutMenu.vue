<template>
  <div class="vue-picture-cut-menu dark-theme"
       :class="[
         ['default', 'dark', 'gray'].indexOf(theme) > -1 ?
         theme + '-theme' :
         'default-theme'
         ]">
    <div class="vue-picture-cut-menu_slider">
      <div class="vue-picture-cut-menu_slider-box">
        <span>{{ menuRotateName }}</span>
        <input type="range" v-model="sliderAngle" :min="-180" :max="180"/>
        <div class="vue-picture-cut-menu_slider-box-bar">
          <div class="vue-picture-cut-menu_slider-box-button"
               :style="{left: sliderAngle * 100 / 361 + 50 + '%'}">
            <div class="vue-picture-cut-menu_slider-box-tips">
              {{ sliderAngle }}°
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vue-picture-cut-menu_box">
      <div class="vue-picture-cut-menu_box-content">
        <!-- 13 * 40 + 38 = 558 -->
        <div class="vue-picture-cut-menu_box-list" style="width: 558px">
          <div class="vue-picture-cut-menu_box-item v-p-icon_flip-v" @click="setFlipV"></div>
          <div class="vue-picture-cut-menu_box-item v-p-icon_flip-h" @click="setFlipH"></div>
          <span></span>
          <div class="vue-picture-cut-menu_box-item v-p-icon_rotate-left" @click="rotate(90, true)"></div>
          <div class="vue-picture-cut-menu_box-item v-p-icon_rotate-right" @click="rotate(-90, true)"></div>
          <span></span>
          <div class="vue-picture-cut-menu_box-item __mask" @click="setMaskResize">
            <div class="__mask">{{ sizeAutoName }}</div>
          </div>
          <div class="vue-picture-cut-menu_box-item __mask" @click="setMaskSizeToOriginal">
            <div class="__mask">{{ sizeRawName }}</div>
          </div>
          <div class="vue-picture-cut-menu_box-item __mask" @click="setMaskSize(1,1)">
            <div class="__mask">1:1</div>
          </div>
          <div class="vue-picture-cut-menu_box-item __mask" @click="setMaskSize(4,3)">
            <div class="__mask _5_4">4:3</div>
          </div>
          <div class="vue-picture-cut-menu_box-item __mask" @click="setMaskSize(3,4)">
            <div class="__mask _4_5">3:4</div>
          </div>
          <div class="vue-picture-cut-menu_box-item __mask" @click="setMaskSize(16,9)">
            <div class="__mask _5_4">16:9</div>
          </div>
          <div class="vue-picture-cut-menu_box-item __mask" @click="setMaskSize(9,16)">
            <div class="__mask _4_5">9:16</div>
          </div>
          <div class="vue-picture-cut-menu_box-item __mask" @click="setMaskSize(3,2)">
            <div class="__mask _5_4">3:2</div>
          </div>
          <div class="vue-picture-cut-menu_box-item __mask" @click="setMaskSize(2,3)">
            <div class="__mask _4_5">2:3</div>
          </div>
        </div>
      </div>
    </div>
    <div class="vue-picture-cut-menu_confirm" style="max-width: 558px">
      <div v-show="cancel" class="__cancel" @click="onCancelEvent">{{ cancelName }}</div>
      <div class="__sure" :class="{'__center': !cancel}" @click="sureCut">{{ confirmName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VuePictureCutMenu',
  inject: {
    pRoot: {
      from: 'vuePictureCut',
      default: null
    }
  },
  props: {
    root: { type: Object, required: false},
    theme:{ type: String, default: 'default'},
    // 裁剪长边像素
    maxPixel:{ type: Number, required: false },
    // 裁剪压缩率
    encoderOptions:{ type: Number, required: false },
    // 裁剪压缩率
    format:{ type: String, required: false },
    // 是否需要关闭按钮
    cancel:{ type: Boolean, default: true},
    cancelName:{ type: String, default: 'Cancel'},
    confirmName:{ type: String, default: 'Ok'},
    sizeAutoName:{ type: String, default: 'auto'},
    sizeRawName:{ type: String, default: 'raw'},
    menuRotateName:{ type: String, default: 'Rotate'}
  },
  data() {
    return {
      sliderAngle: 0
    }
  },
  computed: {
    photoRoot() {
      return this.root ? this.root.photoRoot : this.pRoot;
    }
  },
  watch: {
    sliderAngle(to) {
      if (!this.photoRoot) return;
      const photoMain = this.photoRoot.getEventList('PhotoMain');
      if (photoMain) {
        photoMain.setAngle(parseInt(to));
      }
    }
  },
  methods: {
    onChangeEvent (blob, base64) {
      this.$emit('on-change', {blob, base64});
    },
    onCancelEvent () {
      this.$emit('on-cancel');
    },
    // 裁剪
    sureCut(){
      if (!this.photoRoot) return;
      const mask = this.photoRoot.getEventList('PhotoMask');
      if (mask) {
        const result = mask.clip(this.maxPixel, this.encoderOptions, this.format);
        if (result) {
          this.onChangeEvent(result.file, result.src);
        }
      }
    },
    // 设置剪裁框
    setMaskSize(w, h) {
      if (!this.photoRoot) return;
      const mask = this.photoRoot.getEventList('PhotoMask');
      if (mask) {
        mask.reset(w, h);
        mask.setResize(false);
      }
    },
    // 设置剪裁框
    setMaskSizeToOriginal () {
      if (!this.photoRoot) return;
      const main = this.photoRoot.getEventList('PhotoMain');
      if (main) {
        this.setMaskSize(main.imgRect.w, main.imgRect.h)
      }
    },
    // 设置剪裁框
    setMaskResize (resize = true) {
      if (!this.photoRoot) return;
      const mask = this.photoRoot.getEventList('PhotoMask');
      if (mask) {
        mask.setResize(resize);
      }
    },
    // 旋转
    rotate (angle, animation = false) {
      if (!this.photoRoot || angle % 360 === 0) return;
      const main = this.photoRoot.getEventList('PhotoMain');
      if (main) {
        const angle2 = (main.showRect.r + angle) % 360;
        this.sliderAngle = angle2 > 180 ? angle2 - 360 : angle2 < -180 ? angle2 + 360 : angle2;
        main.setAngle(main.showRect.r + angle, animation);
      }
    },
    /**
     * 设置图片垂直翻折
     */
    setFlipV() {
      if (!this.photoRoot) return;
      const main = this.photoRoot.getEventList('PhotoMain');
      if (main) {
        main.setFlipV(main.showRect.sV === 1, true);
      }
    },
    /**
     * 设置图片水平翻折
     */
    setFlipH() {
      if (!this.photoRoot) return;
      const main = this.photoRoot.getEventList('PhotoMain');
      if (main) {
        main.setFlipH(main.showRect.sH === 1, true);
      }
    }
  },
}
</script>

<style lang="scss">
@import "../styles/vue-picture-cut-menu";
</style>
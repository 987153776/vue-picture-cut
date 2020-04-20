<template>
  <div class="vue-picture-cut">
    <div class="vue-picture-cut_console" ref="conso"/>
    <div class="vue-picture-cut_header" v-if="choose">
      <i class="vue-picture-cut_load-bt v-p-icon v-p-icon_import" @click="loadBoxShow = !loadBoxShow"/>
      <transition name="vue-picture-cut_mask">
        <div class="vue-picture-cut_mask" v-show="loadBoxShow" @click="loadBoxShow = false"/>
      </transition>
      <transition name="vue-picture-cut_load">
        <div class="vue-picture-cut_load-box" v-show="loadBoxShow">
          <div class="vue-picture-cut_load-title v-p_1px-b">选择图片</div>
          <form ref="form">
            <div class="vue-picture-cut_load-item v-p_1px-b">拍照
              <input type="file" accept="image/*" capture="camera"
                     @change="myChange" name="file"/>
            </div>
            <div class="vue-picture-cut_load-item v-p_1px-b">从相册中选择图片
              <input type="file" accept="image/*"
                     @change="myChange" name="file"/>
            </div>
          </form>
          <div class="vue-picture-cut_load-close" @click="loadBoxShow = false">取消</div>
        </div>
      </transition>
    </div>
    <div class="vue-picture-cut_main" ref="main">
      <canvas class="vue-picture-cut_canvas" ref="canvas"/>
    </div>
    <div class="vue-picture-cut_menu-box">
      <div class="vue-picture-cut_menu1">
        <div class="flex-center">
          <div class="vue-picture-cut_menu1-item" @click="clip"
               :class="{usable: ['all', 'clip'].indexOf(status) > -1, 'active': status === 'clip'}">
            <i class="v-p-icon v-p-icon_clip"/>
            <div>剪裁</div>
          </div>
          <div class="vue-picture-cut_menu1-item" @click="rotate(-0.5)"
               :class="{usable: ['all'].indexOf(status) > -1}">
            <i class="v-p-icon v-p-icon_rotateLeft"/>
            <div>左旋转</div>
          </div>
          <div class="vue-picture-cut_menu1-item" @click="rotate(0.5)"
               :class="{usable: ['all'].indexOf(status) > -1}">
            <i class="v-p-icon v-p-icon_rotateRight"/>
            <div>右旋转</div>
          </div>
          <div class="vue-picture-cut_menu1-item" @click="flip(false)"
               :class="{usable: ['all'].indexOf(status) > -1}">
            <i class="v-p-icon v-p-icon_flipV"/>
            <div>上下翻转</div>
          </div>
          <div class="vue-picture-cut_menu1-item" @click="flip(true)"
               :class="{usable: ['all'].indexOf(status) > -1}">
            <i class="v-p-icon v-p-icon_flipH"/>
            <div>水平翻转</div>
          </div>
        </div>
      </div>
      <div class="vue-picture-cut_menu2">
        <i class="v-p-icon v-p-icon_cancel usable" @click="close"/>
        <i class="v-p-icon v-p-icon_sure usable" @click="sure"/>
        <span class="vue-picture-cut_reset" @click="reset">还原</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Watch, Vue, Ref, Emit } from 'vue-property-decorator';
  import photoCutting, { PhotoCutting } from './PhotoCutting';
  import { ClipResult } from './Photo';

  @Component
  export default class VuePictureCut extends Vue {
      // @PropSync('show', { type: Boolean }) private syncedShow!: boolean;
      @Prop({
          type: String,
          default: null,
          required: false
      }) private src!: string | null;
      @Prop({
          type: Boolean,
          default: true,
          required: false
      }) private choose!: boolean;

      /*********data*********/
      loadBoxShow = false;
      @Ref() private form!: HTMLFormElement;
      // @Ref() private fileInput01!: HTMLInputElement;
      // @Ref() private fileInput02!: HTMLInputElement;
      @Ref() private main!: HTMLDivElement;
      @Ref() private canvas!: HTMLCanvasElement;
      @Ref() private conso!: HTMLDivElement;
      file: File | null = null;
      oldSrc: string | null = null;
      winHeight = 0;
      winWidth = 0;
      photoCutting: PhotoCutting | null = null;
      newSrc: string | null = null;
      newBlob: Blob | null = null;
      status = '';

      @Watch('src')
      watchSrc (to: string | null): void {
          if (to) {
              if (this.photoCutting) {
                  this.newBlob = null;
                  this.newSrc = null;
                  this.setImg(to);
              }
          }
      }

      @Watch('oldSrc')
      watchOldSrc (to: string | null): void {
          if (to) {
              if (this.photoCutting) {
                  this.newBlob = null;
                  this.newSrc = null;
                  this.setImg(to);
              }
          }
      }

      @Watch('status')
      watchStatus (to: string | null): void {
          if (!this.photoCutting) return;
          switch (to) {
              case 'all':
                  (this.photoCutting as PhotoCutting).closeMask();
                  break;
              case 'clip':
                  (this.photoCutting as PhotoCutting).openMask();
                  break;
          }
      }

      @Watch('photoCutting.photo.isLoad')
      watchIsLoad (to: boolean): void {
          this.status = to ? 'all' : '';
      }


      myChange (e: Event): void {
          const file = ((e.target as HTMLInputElement).files as FileList)[0];
          this.file = file;
          this.oldSrc = URL.createObjectURL(file);
          this.loadBoxShow = false;
          (this.form as HTMLFormElement).reset();
      }

      loadCanvas (): void {
          this.winWidth = this.main.offsetWidth;
          this.winHeight = this.main.offsetHeight;
          this.photoCutting = photoCutting(
              this.canvas as HTMLCanvasElement,
              this.winWidth,
              this.winHeight,
              this.conso as HTMLDivElement
          );
          this.setImg(this.oldSrc as string);
      }

      setImg (src: string | null): void {
          if (!this.photoCutting || !src) return;
          this.photoCutting?.setSrc(src as string);
      }

      reset (): void {
          if (!this.photoCutting) return;
          this.photoCutting?.photo.setSrc(this.oldSrc as string);
      }

      updateNewData () {
          if (this.photoCutting) {
              const data = this.photoCutting.photo.clip() as ClipResult;
              this.newSrc = data.src;
              this.newBlob = data.file;
          }
      }

      close () {
          switch (this.status) {
              case 'all':
                  this.onCloseEvent();
                  break;
              case 'clip':
                  this.status = 'all';
                  break;
          }
      }
      sure () {
          switch (this.status) {
              case 'all':
                  if (!this.photoCutting) return;
                  this.updateNewData();
                  this.onChangeEvent(this.newBlob as Blob, this.newSrc as string);
                  break;
              case 'clip':
                  if (!this.photoCutting) return;
                  this.updateNewData();
                  this.photoCutting.photo.setSrc(this.newSrc as string);
                  this.status = 'all';
                  break;
          }
      }
      /**
       * 剪裁
       */
      clip () {
          switch (this.status) {
              case 'all':
                  this.status = 'clip';
                  break;
              case 'clip':
                  this.status = 'all';
                  break;
          }
      }
      /**
       * 旋转
       */
      rotate (deg: number): void {
          if (this.status !== 'all') return;
          this.photoCutting?.photo.rotate(deg);
      }
      /**
       * 翻转，true水平，false垂直
       * @param type
       */
      flip (type = false): void {
          if (this.status !== 'all') return;
          this.photoCutting?.photo.flip(type);
      }

      /*******生命周期********/
      protected mounted (): void {
          this.loadCanvas();
          if (this.photoCutting) {
              this.setImg(this.oldSrc);
          }
      }

      /*******事件********/
      @Emit('on-change')
      onChangeEvent (blob: Blob, base64: string) {
          return {blob, base64};
      }

      @Emit('on-close')
      onCloseEvent () {
          //
      }
  }
</script>

<style lang="scss" scoped>
  @import "./center";
  @import "/1px";
  @import "./font";
  @import "vue-picture-cut";
</style>
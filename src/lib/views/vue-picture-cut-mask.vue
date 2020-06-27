<template>
  <svg class="vue-picture-cut2_mask" preserveAspectRatio="none" :viewBox="viewBox">
    <path class="cls-1" :d="`M0,0 H${drawWidth} V${drawHeight} H0 V0 Z ${round}`"/>
    <rect v-if="resize || !isRound" class="cls-3" v-bind="rect"
          :style="{ 'stroke-dasharray': border, stroke: isRound ? 'rgba(255,255,255,.7)' : '#ff5500' }"/>
    <path v-if="isRound" class="cls-2" :d="round"/>
  </svg>
</template>

<script lang="ts">
import {Component, Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import PhotoRoot from "@/lib/views/PhotoRoot";
import PhotoMask from "@/lib/views/PhotoMask";
import { Rect } from './interface';

@Component
export default class VuePictureCutMask extends Vue {
  @Inject({from: 'vuePictureCut', default: 'photoRoot'})
  photoRoot!: PhotoRoot;

  // 裁剪框（圆的外切矩形）宽高比
  @Prop({ type: Number, default: 1 }) private width!: number;
  @Prop({ type: Number, default: 1 }) private height!: number;
  // 是否圆形剪裁
  @Prop({ type: Boolean, default: false }) private isRound!: boolean;
  // 是否可以调整比例
  @Prop({ type: Boolean, default: true }) private resize!: boolean;

  mask: PhotoMask | null = null;
  viewBox = '0 0 0 0';
  drawWidth = 0;
  drawHeight = 0;
  round = 'M0,150 V+150 a150,150 0 1 0 0,-1';
  rect = {};
  border='10, 5';

  @Watch('width')
  watchWidth (to: number): void {
    this.mask && this.mask.reset(to, this.height);
  }

  @Watch('height')
  watchHeight (to: number): void {
    this.mask && this.mask.reset(this.width, to);
  }

  @Watch('isRound')
  watchIsRound (to: boolean): void {
    this.mask && (this.mask.isRound = to);
  }

  @Watch('resize')
  watchResize (to: boolean): void {
    this.mask && this.mask.setResize(to);
  }

  /*******生命周期********/
  protected mounted (): void {
    setTimeout(() => {
      this.viewBox = `0 0 ${this.photoRoot.drawWidth} ${this.photoRoot.drawHeight}`;
      this.drawWidth = this.photoRoot.drawWidth;
      this.drawHeight = this.photoRoot.drawHeight;
      this.mask = new PhotoMask(
        this.photoRoot,
        this.width,
        this.height,
        this.resize,
        (rect: Rect, touchePosition = false) => {
          this.setPathOption(rect, touchePosition)
        }
      );
      this.mask.isRound = this.isRound;
    }, 0);
  }

  /*******事件********/
  protected setPathOption(rect: Rect, touchePosition = false): void {
    let {x, y, w, h} = rect;
    x += this.photoRoot.core.x;
    y += this.photoRoot.core.y;
    if (w < 0) {
      x += w;
      w *= -1;
    }
    if (h < 0) {
      y += h;
      h *= -1;
    }
    const r1 = w / 2;
    const r2 = h / 2;
    if (this.isRound) {
      this.round = `M${x},${y + r2} a${r1},${r2} 0 1 0 0,-1`;
    } else {
      this.round = `M${x},${y} H${w + x} V${h + y} H${x} V${y}`;
    }
    this.rect = {
      x,
      y,
      width: w,
      height: h
    }
    this.border = touchePosition ? '10, 0' : '10, 5';
  }
}
</script>

<style scoped>
.cls-1 {
  fill-rule: evenodd;
  fill: rgba(0,0,0,.4);
}
.cls-2{
  stroke: #ff5500;
  stroke-width: 2px;
  stroke-dasharray: 10, 5;
  fill: rgba(0,0,0,0);
}
.cls-3{
  stroke-width: 2px;
  stroke-dasharray: 10, 5;
  fill:rgba(0,0,0,0);
}
</style>
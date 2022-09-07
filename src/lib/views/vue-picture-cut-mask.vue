<template>
  <svg class="vue-picture-cut_mask" preserveAspectRatio="none" :viewBox="viewBox">
    <path class="cls-1" :fill="color || 'rgba(0,0,0,.5)'"
          :d="`M0,0 H${drawWidth} V${drawHeight} H0 V0 Z ${round}`"/>
    <rect v-if="thisResize || !thisRound" class="cls-3" v-bind="rect"
          :style="{ 'stroke-dasharray': border, stroke: thisRound ? 'rgba(255,255,255,.7)' : borderColor || '#ff5500' }"/>
    <path v-if="thisRound" class="cls-2" :stroke="borderColor || '#ff5500'" :d="round"/>
    <path v-if="thisResize" class="cls-4" :d="TLHorn"/>
    <path v-if="thisResize" class="cls-4" :d="TRHorn"/>
    <path v-if="thisResize" class="cls-4" :d="BLHorn"/>
    <path v-if="thisResize" class="cls-4" :d="BRHorn"/>
  </svg>
</template>

<script lang="ts">
import {Component, Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import PhotoRoot from "@/lib/views/PhotoRoot";
import PhotoMask from "@/lib/views/PhotoMask";
import { Rect } from './interface';

@Component({
  name: 'VuePictureCutMask'
})
export default class VuePictureCutMask extends Vue {
  @Inject({from: 'vuePictureCut', default: 'photoRoot'})
  photoRoot!: PhotoRoot;

  // 前景色
  @Prop({ type: String, default: 'rgba(0,0,0,.5)' }) private color?: string;
  // 裁剪框颜色
  @Prop({ type: String, default: '#ff5500' }) private borderColor?: string;
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
  rect = {x: 0, y: 0, width: 0, height: 0};
  border='10, 5';
  thisRound = false;
  thisResize = true;

  get TLHorn (): string {
    const x = this.rect.x;
    const y = this.rect.y;
    return `M${x},${y} H${x} V${y + 15} H${x - 5} V${y + 15} H${x - 5} V${y - 5} H${x + 15} V${y - 5} H${x + 15} V${y} Z`;
  }

  get TRHorn (): string {
    const x = this.rect.x + this.rect.width;
    const y = this.rect.y;
    return `M${x},${y} H${x} V${y + 15} H${x + 5} V${y + 15} H${x + 5} V${y - 5} H${x - 15} V${y - 5} H${x - 15} V${y} Z`;
  }

  get BLHorn (): string {
    const x = this.rect.x;
    const y = this.rect.y + this.rect.height;
    return `M${x},${y} H${x} V${y - 15} H${x - 5} V${y - 15} H${x - 5} V${y + 5} H${x + 15} V${y + 5} H${x + 15} V${y} Z`;
  }

  get BRHorn (): string {
    const x = this.rect.x + this.rect.width;
    const y = this.rect.y + this.rect.height;
    return `M${x},${y} H${x} V${y - 15} H${x + 5} V${y - 15} H${x + 5} V${y + 5} H${x - 15} V${y + 5} H${x - 15} V${y} Z`;
  }

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

  @Watch('thisRound')
  watchThisRound (to: boolean): void {
    if (this.mask && this.mask.isRound !== to) {
      this.mask.isRound = to;
    }
  }

  @Watch('thisResize')
  watchThisResize (to: boolean): void {
    if (this.mask && this.mask.getResize() !== to) {
      this.mask.setResize(to);
    }
  }

  /*******生命周期********/
  protected mounted (): void {
    this.thisRound = this.isRound;
    this.thisResize = this.resize;
    setTimeout(() => {
      this.viewBox = `0 0 ${this.photoRoot.drawWidth} ${this.photoRoot.drawHeight}`;
      this.drawWidth = this.photoRoot.drawWidth;
      this.drawHeight = this.photoRoot.drawHeight;
      this.mask = new PhotoMask(
        this.photoRoot,
        this.width,
        this.height,
        this.resize,
        (rect: Rect, touchePosition = false, mask: PhotoMask) => {
          this.setPathOption(rect, touchePosition, mask)
        }
      );
      this.mask.isRound = this.isRound;
    }, 0);
  }

  /*******事件********/
  protected setPathOption(rect: Rect, touchePosition = false, mask: PhotoMask): void {
    this.thisRound = mask.isRound;
    this.thisResize = mask.getResize();
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
    if (this.thisRound) {
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
}
.cls-2{
  stroke-width: 2px;
  stroke-dasharray: 10, 5;
  fill: rgba(0,0,0,0);
}
.cls-3{
  stroke-width: 2px;
  stroke-dasharray: 10, 5;
  fill:rgba(0,0,0,0);
}
.cls-4{
  stroke: rgba(255,255,255,.8);
  stroke-width: 2px;
  fill: rgba(255,255,255,.5);
}
</style>
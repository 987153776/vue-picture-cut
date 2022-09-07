<template>
  <canvas class="vue-picture-cut_canvas"/>
</template>

<script lang="ts">
import {Component, Vue, Prop, PropSync, Watch, Inject} from 'vue-property-decorator';
import PhotoRoot from "./PhotoRoot";
import PhotoMain from "./PhotoMain";
import VuePictureCut from "@/lib/views/vue-picture-cut.vue";

@Component({
  name: 'VuePictureCutCanvas'
})
export default class VuePictureCutCanvas extends Vue {

  // 旋转
  @Prop({ type: Number, required: false}) private angle: number | undefined;

  @PropSync('loading', { type: Boolean, default: false}) private _loading!: boolean;

  photoMain: PhotoMain | null = null;
  cutRoot!: VuePictureCut;

  get photoRoot(): PhotoRoot {
    return this.cutRoot?.photoRoot;
  }

  @Watch('angle')
  watchAngle (to: number | undefined): void {
    if (this.photoMain && to !== undefined) {
      this.photoMain.setAngle(to, true);
    }
  }

  /*******生命周期********/
  @Inject('getCutRoot')
  getCutRoot!: () => VuePictureCut;

  protected created (): void {
    this.cutRoot = this.getCutRoot();
  }

  protected mounted (): void {
    setTimeout(() => {
      this.photoMain = new PhotoMain(
        this.$el as HTMLCanvasElement,
        this.photoRoot
      );
      this.photoMain.onLoading(loading => {
        this._loading = loading
      })
    }, 0);
  }
}
</script>
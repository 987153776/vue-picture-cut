<template>
  <div class="vue-picture-cut2-msk">
    <div class="vue-picture-cut2_default-menu" @click="sureCut">确定</div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Inject, Emit} from 'vue-property-decorator';
import PhotoMask from "@/lib/views/PhotoMask";
import PhotoRoot from "@/lib/views/PhotoRoot";

@Component
export default class VuePictureCutMenu extends Vue {
  @Inject({from: 'vuePictureCut', default: 'photoRoot'})
  photoRoot!: PhotoRoot;


  /*******事件********/
  @Emit('on-change')
  onChangeEvent (blob: Blob, base64: string): {blob: Blob, base64: string} {
    return {blob, base64};
  }
  // 默认裁剪
  sureCut(): void{
    const mask = this.photoRoot.eventList.get('PhotoMask') as PhotoMask | undefined;
    if (mask) {
      const result = mask.clip();
      if (result) {
        this.onChangeEvent(result.file, result.src);
      }
    }
  }
}
</script>
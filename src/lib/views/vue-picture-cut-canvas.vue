<template>
  <canvas class="vue-picture-cut_canvas"/>
</template>

<script lang="ts">
import PhotoMain from "./PhotoMain";

export default {
  name: 'VuePictureCutCanvas',
  inject: {
    photoRoot: {
      from: 'vuePictureCut',
      default: null
    }
  },
  props: {
    angle: {
      type: Number,
      required: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      photoMain: null
    }
  },
  watch: {
    angle (to) {
      if (this.photoMain && to !== undefined) {
        this.photoMain.setAngle(to, true);
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.photoMain = new PhotoMain(
        this.$el,
        this.photoRoot
      );
      this.photoMain.onLoading(loading => {
        this.$emit('update:loading', loading)
      })
    }, 0);
  }
}
</script>
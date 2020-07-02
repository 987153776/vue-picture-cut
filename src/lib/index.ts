import {Vue} from "vue-property-decorator";
import VuePictureCut from './views/vue-picture-cut.vue';
import VuePictureCutCanvas from './views/vue-picture-cut-canvas.vue';
import VuePictureCutMask from './views/vue-picture-cut-mask.vue';
import VuePictureCutMenu from './views/vue-picture-cut-menu.vue';
import Bezier from './views/Bezier';
import createAnimation from './views/animation';
import Tool from './views/tool';

export {
  VuePictureCut,
  VuePictureCutCanvas,
  VuePictureCutMask,
  VuePictureCutMenu,
  Bezier,
  createAnimation,
  Tool
};

export default {
  install: (Vue: Vue.VueConstructor): void => {
    Vue.component('vue-picture-cut', VuePictureCut);
    Vue.component('vue-picture-cut-canvas', VuePictureCutCanvas);
    Vue.component('vue-picture-cut-mask', VuePictureCutMask);
    Vue.component('vue-picture-cut-menu', VuePictureCutMenu);
  }
};
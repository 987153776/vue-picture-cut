import {Vue} from "vue-property-decorator";
import vuePictureCut from './views/vue-picture-cut.vue';
import vuePictureCutCanvas from './views/vue-picture-cut-canvas.vue';
import vuePictureCutMask from './views/vue-picture-cut-mask.vue';
import vuePictureCutMenu from './views/vue-picture-cut-menu.vue';
import Bezier from './views/Bezier';
import createAnimation from './views/animation';
import Tool from './views/tool';

export {
  vuePictureCut,
  vuePictureCutCanvas,
  vuePictureCutMask,
  vuePictureCutMenu,
  Bezier,
  createAnimation,
  Tool
};

export default {
  install: (Vue: Vue.VueConstructor): void => {
    Vue.component('vue-picture-cut', vuePictureCut);
    Vue.component('vue-picture-cut-canvas', vuePictureCutCanvas);
    Vue.component('vue-picture-cut-mask', vuePictureCutMask);
    Vue.component('vue-picture-cut-menu', vuePictureCutMenu);
  }
};
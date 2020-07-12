import {Vue} from "vue-property-decorator";
import VuePictureCut from './views/vue-picture-cut.vue';
import VuePictureCutMask from './views/vue-picture-cut-mask.vue';
import VuePictureCutMenu from './views/vue-picture-cut-menu.vue';
import Bezier from './views/Bezier';
import createAnimation from './views/animation';
import Tool from './views/tool';
import createUtils from './views/Utils';

export {
  VuePictureCut,
  VuePictureCutMask,
  VuePictureCutMenu,
  Bezier,
  createAnimation,
  Tool,
  createUtils
};

export default {
  install: (Vue: Vue.VueConstructor): void => {
    Vue.component('vue-picture-cut', VuePictureCut);
    Vue.component('vue-picture-cut-mask', VuePictureCutMask);
    Vue.component('vue-picture-cut-menu', VuePictureCutMenu);
  }
};
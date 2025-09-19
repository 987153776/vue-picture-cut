import VuePictureCut from './views/VuePictureCut.vue';
import VuePictureCutMask from './views/VuePictureCutMask.vue';
import VuePictureCutMenu from './views/VuePictureCutMenu.vue';
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
  install(Vue) {
    Vue.component('vue-picture-cut', VuePictureCut);
    Vue.component('vue-picture-cut-mask', VuePictureCutMask);
    Vue.component('vue-picture-cut-menu', VuePictureCutMenu);
  }
};
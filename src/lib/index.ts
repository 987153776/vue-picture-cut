import vuePictureCut from './vue-picture-cut.vue';
import Bezier from './Bezier';
import createAnimation from './animation';
import Tool from './tool';

export {
    vuePictureCut,
    Bezier,
    createAnimation,
    Tool
};

export default {
    install: (Vue: Vue.VueConstructor, options?: any) => {
        Vue.component('vue-picture-cut', vuePictureCut);
    }
};
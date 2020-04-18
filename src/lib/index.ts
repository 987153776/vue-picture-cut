import vuePictureCut from './vue-picture-cut.vue';

export default {
    install: (Vue: Vue.VueConstructor, options?: any) => {
        Vue.component('vue-picture-cut', vuePictureCut);
    }
};
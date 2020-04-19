# vue-picture-cut

基于vue和typescript开发的一款图片剪裁处理工具

## 使用方法
### 通过npm安装插件
```nodejs
npm install vue-picture-cut
```
### 在vue中使用
1. main.js 中全局引用
```javascript
import Vue from 'vue';
import VuePictureCut from 'vue-picture-cut';

Vue.user(VuePictureCut);
```
2. 在.vue文件中单独引用
```vue
<template>
  <div>
    <vue-picture-cut/>
  </div>
</template>

<script>
  import { VuePictureCut } from 'vue-picture-cut';
    
  export default {
    // ...
    components: {
      VuePictureCut
    },
    // ...
  }
</script>
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

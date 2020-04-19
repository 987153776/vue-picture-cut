# vue-picture-cut

基于vue和typescript开发的一款图片剪裁处理工具

## 一、使用方法
### 通过npm安装插件
```nodejs
npm install vue-picture-cut
```
### 在vue中使用
1. 在`main.js`中全局引用
```javascript
import Vue from 'vue';
import VuePictureCut from 'vue-picture-cut';

Vue.user(VuePictureCut);
```
2. 或者在`.vue`文件中单独引用
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
### 截图
![示例截图](https://github.com/987153776/vue-picture-cut/blob/master/readme/cut.jpg?raw=true)

## 二、API
### 1、基本使用
#### 属性Attribute
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| src | 图片链接: 网络连接、base64、`URL.createObjectURL(file)`等 | string | —— | 空串 |
| choose | 组件中是否可以选择本地图片 | boolean | —— | true |

#### 事件Events
| 事件名 | 说明 | 回调参数 |
| ---- | ---- | ---- |
| change | 当用户处理完图片，点击右下角`√`时的回调 | ({src: base64, file: Blob对象}) |

### 2、其他工具类



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

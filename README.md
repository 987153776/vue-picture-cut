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
#### 2.1 Bezier对象

```javascript
  import { Bezier } from 'vue-picture-cut';

  const bezier = Bezier();
  bezier.setOpt(Bezier.BEZIER['ease-in-out']);
  const y = bezier.getPoint(0.5);
  console.log(y);
```

##### (1) 静态属性BEZIER，是一个键值对，包含一些预设值

| 键 | 值 | 说明 |
| ---- | ---- | ---- |
| linear | \[0.0, 0.0, 1.0, 1.0\] | 线性过渡 |
| ease | \[0.25, 0.1, 0.25, 1.0\] | 平滑过渡 |
| ease-in | \[0.42, 0, 1.0, 1.0\] | 由慢到快 |
| ease-out | \[0, 0, 0.58, 1.0\] | 由快到慢 |
| ease-in-out | \[0.42, 0, 0.58, 1.0\] | 由慢到快再到慢 |

##### (2) 构造函数

一个无参的构造函数，内部调用了`setOptByString('ease')`方法

##### (3) 方法

| 方法名 | 说明 | 参数 | 返回值 |
| ---- | ---- | ---- | ---- |
| setOpt | 设置贝塞尔曲线类型 | (arg: string \| ParamsInterface = 'ease') | Bezier对象本身 |
| setOptByString | 设置贝塞尔曲线类型 | BEZIER预设值(arg = 'ease') | Bezier对象本身 |
| setOptByArr | 设置贝塞尔曲线类型 | (x1: number, y1: number, x2: number, y2: number) | Bezier对象本身 |
| getPoint | 返回x坐标对应的y坐标值 | (x: number) 0~1之间 | 对应y坐标，0~1之间 |

##### (4) 参数ParamsInterface说明

ParamsInterface为包含4个number类型的数组。

#### 2.2 createAnimation方法

```javascript
  import { createAnimation } from 'vue-picture-cut';

  const animation = createAnimation(option);
```
createAnimation会返回一个Animation对象

##### (1) 参数option

| 参数 | 说明 | 类型 | 可选值 | 必需 | 默认值 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| duration | 动画持续时间，单位毫秒 | number | —— | false | 1000 |
| timing | 动画的过渡类型 | string、number[] | Bezier.BEZIER中的值，或者ParamsInterface类型 | false | ease |
| delay | 动画的延迟时间，单位毫秒 | number | —— | false | 0 |
| iteration | 动画循环次数，infinite为无限循环 | number、string | 'infinite'或正整数 | false | 0 |
| direction | 动画在循环中是否反向运动 | string | normal(默认，正向运动)；reverse(反向运行)；alternate(先正向，后反向，并交替)；alternate-reverse(先反向，后正向，并交替)。 | false | normal |
| change | 回调函数，接收参数x，x在0~1之间，动画在这里处理 | Function | —— | false | —— |
| end | 回调函数，动画结束时执行 | Function | —— | false | —— |



#### 2.3 Tool对象

```javascript
  import { Tool } from 'vue-picture-cut';
```


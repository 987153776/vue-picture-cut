# vue-picture-cut 2.x

![npm](https://badgen.net/npm/v/vue-picture-cut?cache=1800)
![download](https://badgen.net/npm/dw/vue-picture-cut?cache=1800)
![license](https://badgen.net/npm/license/vue-picture-cut)

[中文](./README.md) | English

An image clipping tool based on `vue` and `typescript`.    
Advantage：**It is original, light weight, simple to use, comprehensive function and strong expansibility**  
Feature：**Scale, flip, rotate, edge check, rectangle clip, ellipse clip**  
About zoom: mouse (mouse wheel zoom), touch screen (double finger zoom)  

<a href="https://github.com/987153776/vue-picture-cut" target="_blank">github homepage</a>  
<a href="https://gitee.com/light-year/vue-picture-cut" target="_blank">gitee homepage</a>  
<a href="https://htmlpreview.github.io/?https://raw.githubusercontent.com/987153776/vue-picture-cut/master/dist/index.html" target="_blank">demo(github)</a>  
<a href="https://light-year.gitee.io/vue-picture-cut/" target="_blank">demo(gitee)</a>  

<a href="https://github.com/987153776/vue-picture-cut/tree/1.0">💩💩💩Version 0.x is here</a>【This version has too many bugs and is no longer maintained】

## 一、Usage

### Install

```nodejs
npm i vue-picture-cut
```

### Using in Vue

1、In` main.js `Global reference in

```javascript
import Vue from 'vue';
import 'vue-picture-cut/lib/vue-picture-cut.css';
import VuePictureCut from 'vue-picture-cut';

Vue.use(VuePictureCut);
```

2、Or use it alone in the `.vue` file  

```vue
<template>
  <div>
	<input type="file" accept="image/*" @change="inputChange"/>
    <vue-picture-cut :src="src" @on-change="cutChange"/>
  </div>
</template>

<script>
  import { VuePictureCut } from 'vue-picture-cut';

  export default {
    // ...
    components: {
      VuePictureCut
    },
    data () {
      return {
        src: null,
        blob: null,
        base64: null
      }
    },
    methods: {
      inputChange(e) {
        const file = e.target.files[0];
        this.src = URL.createObjectURL(file);
      },
      /**
       * @param blob      BLOB object
       * @param base64    Base64 string
       */
      cutChange({ blob, base64 }) {
        this.blob = blob;
        this.base64 = base64;
      }
    }
    // ...
  }
</script>

<style>
  @import "~vue-picture-cut/lib/vue-picture-cut.css";
</style>
```

3、Attention

**When components are used, the width and height follow the parent label, so it is necessary to set the width and height of the parent label.**

## 二、API

### Exposed objects

**When importing globally**
```javascript
import VuePictureCut from 'vue-picture-cut';
Vue.use(VuePictureCut);
```
This will register：`VuePictureCut`、`VuePictureCutMask`、`VuePictureCutMenu`three components。

**Separate using**
```javascript
import {
  VuePictureCut,
  VuePictureCutMask,
  VuePictureCutMenu,
  Bezier,
  createAnimation,
  Tool
} from 'vue-picture-cut';
```
Components：`VuePictureCut`、`VuePictureCutMask`、`VuePictureCutMenu`。
Tools：`Bezier`、`createAnimation`、`Tool`。

### 1、VuePictureCut Components

**Slots：** `default`、`menu`

**Using：**

```vue
<template>
  <vue-picture-cut
    ref="pictureCut"
    :src="src"
    :magnification="magnification"
    :init-angle="initAngle"
    :rotate-control="rotateControl"
    :msk-option="mskOption"
    :max-pixel="maxPixel"
    :encoder-options="encoderOptions"
    :format="format"
    @on-change="onChange"
  />
</template>
```

**Attribute：**

1. `src`：  
	**type**：string  
	**default**：null  
	**describe**：pictures linking  
2. `magnification`：  
	**type**：number  
	**default**：1.5  
	**describe**：Canvas drawing zoom rate，and the value is greater than 0，The higher the value, the higher the logical pixels drawn.  
3. `initAngle`：  
	**type**：number  
	**required**：false  
	**describe**：Initial rotation angle of loaded image  
4. `rotateControl`：  
	**type**：boolean  
	**default**：false  
	**describe**：Whether to display the rotation control.  
5. `maxPixel`：  
	**type**：number  
	**required**：false  
	**describe**：Export the pixels on the longer side of the picture. When the value is not transferred, it is adaptive according to the actual image size.  
6. `encoderOptions`：  
	**type**：number  
	**required**：false  
	**describe**：Compression ratio of exported pictures. When the value is not transferred, it is calculated as 0.8, and the value range is 0 ~ 1.  
7. `format`：  
	**type**：string  
	**default**：false  
	**describe**：导出图片的格式，不传时导出格式为“image/jpeg”，其值可以为“image/png”等浏览器支持格式。
8. `mskOption`：  
	**type**：object  
	**default**：`{ width: 1, height: 1, isRound: false, resize: true}`  
	**describe**：  
	width：number 裁剪框比例宽  
	height：number 裁剪框比例高  
	isRound：boolean 矩形true，椭圆false  
	resize：boolean 裁剪框大小是否可通过拖动改变大小  

**Event：**

1. `onChange ({ blob, base64 })`：监听图片最终裁剪导出的事件  
	blob：导出图片的Blob对象，可用于图片上传  
	base64：导出图片的base64字符串，可用于图片上传  
	
**Method：**

1. `this.$refs['pictureCut'].scale(zoom)`：缩放图片  
    参数zoom：缩放后的尺寸和当前尺寸的比例，取值大于0，0到1之间缩小，大于1放大。  

#### 2、VuePictureCutMask Components

`VuePictureCutMask`是`VuePictureCut`默认slot插槽组件，是控制遮罩裁剪框相关的组件，使用它与不使用它效果一样。  

**Using：**

```vue
<template>
  <vue-picture-cut
    :src="src"
    :magnification="magnification"
    :init-angle="initAngle"
    :rotate-control="rotateControl"
    :max-pixel="maxPixel"
    :encoder-options="encoderOptions"
    :format="format"
    @on-change="onChange"
  >
    <vue-picture-mask
      :width="width"
      :height="height"
      :is-round="isRound"
      :resize="resize"
    />
  </vue-picture-cut>
</template>
```

**Attribute：**

1. `width`：  
	**type**：number  
	**default**：1  
	**describe**：裁剪框比例宽
2. `height`：  
	**type**：number  
	**default**：1  
	**describe**：裁剪框比例高
3. `isRound`：  
	**type**：boolean  
	**default**：false  
	**describe**：矩形true，椭圆false  
4. `resize`：  
	**type**：boolean  
	**default**：false  
	**describe**：裁剪框大小是否可通过拖动改变大小  

#### 3、VuePictureCutMenu组件

菜单栏组件，效果参见Demo。  

**Using：**

```vue
<template>
  <vue-picture-cut
    :src="src"
    :magnification="magnification"
    :init-angle="initAngle"
    :rotate-control="rotateControl"
    :msk-option="mskOption"
    @on-change="cutChange"
  >
    <vue-picture-menu
      slot="menu"
      :cancel="false"
      :max-pixel="maxPixel"
      :encoder-options="encoderOptions"
      :format="format"
      @on-change="onChange"
      @on-cancel="onCancel"
    />
  </vue-picture-cut>
</template>
```

**Attribute：**

1. `cancel`：  
	**type**：boolean  
	**default**：false  
	**describe**：是否显示取消按钮。
2. `maxPixel`：  
	**type**：number  
	**required**：false  
	**describe**：导出图片的宽高中较长边的像素，不传时则依据实际图片大小自适应。
3. `encoderOptions`：  
	**type**：number  
	**required**：false  
	**describe**：导出图片的压缩率，不传时按0.8计算，取值范围0~1。
4. `format`：  
	**type**：string  
	**required**：false  
	**describe**：导出图片的格式，不传时导出格式为“image/jpeg”，其值可以为“image/png”等浏览器支持格式。  

**Event：**

1. `onChange ({ blob, base64 })`：监听图片最终裁剪导出的事件，即点击确认按钮  
	blob：导出图片的Blob对象，可用于图片上传  
	base64：导出图片的base64字符串，可用于图片上传  

2. `onCancel ()`：监听点击取消按钮  

#### 4、Bezier Object

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
| setOpt | 设置贝塞尔曲线类型 | (arg: string , ParamsInterface = 'ease') | Bezier对象本身 |
| setOptByString | 设置贝塞尔曲线类型 | BEZIER预设值(arg = 'ease') | Bezier对象本身 |
| setOptByArr | 设置贝塞尔曲线类型 | (x1: number, y1: number, x2: number, y2: number) | Bezier对象本身 |
| getPoint | 返回x坐标对应的y坐标值 | (x: number) 0~1之间 | 对应y坐标，0~1之间 |

##### (4) 参数ParamsInterface说明

ParamsInterface为包含4个number类型的数组。

#### 5、 createAnimation方法

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

##### (2) Animation对象方法

| 方法名 | 说明 | 参数 | 返回值 |
| ---- | ---- | ---- | ---- |
| start | 开始动画 | —— | Animation对象本身 |
| abort | 中止动画 | —— | —— |

#### 6、 Tool Object

```javascript
  import { Tool } from 'vue-picture-cut';

  Tool.loadImg('http://xxx.xxx.xxx/xxx.jpg')
  .then(image => {
    // 加载图片成功
    // image为Image对象
  }, image => {
    // 加载图片失败
  });
```

##### 包含方法

***...待编辑***

### 3、自定义扩展

暂时可以参考`src/App.vue`和`src/lib/views/vue-picture-cut-menu.vue`

#### 3.1、自定义裁剪

***...文档待编辑***  

#### 3.2、自定义菜单栏

***...文档待编辑***  

## 三、希望大家都来用一下
VuePictureCut 💗 you!

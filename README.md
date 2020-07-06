# vue-picture-cut 2.x

![npm](https://badgen.net/npm/v/vue-picture-cut?cache=1800)
![download](https://badgen.net/npm/dw/vue-picture-cut?cache=1800)
![license](https://badgen.net/npm/license/vue-picture-cut)

English | [中文](./README-CN.md)  

An image clipping tool based on `vue` and `typescript`.    
Advantage：**It is original, light weight, simple to use, comprehensive function and strong expansibility**  
Feature：**Scale, flip, rotate, edge check, rectangle clip, ellipse clip**  
About zoom: mouse (mouse wheel zoom), touch screen (double finger zoom)  

<a href="https://github.com/987153776/vue-picture-cut" target="_blank">github homepage</a>  
<a href="https://gitee.com/light-year/vue-picture-cut" target="_blank">gitee homepage</a>  
<a href="https://htmlpreview.github.io/?https://raw.githubusercontent.com/987153776/vue-picture-cut/master/dist/index.html" target="_blank">demo(github)</a>  
<a href="https://light-year.gitee.io/vue-picture-cut/" target="_blank">demo(gitee)</a>  

<a href="https://github.com/987153776/vue-picture-cut/tree/1.0">💩💩💩Version 0.x is here</a>【This version has too many bugs and is no longer maintained】

## Ⅰ、Usage

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

## Ⅱ、API

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
	**describe**：Format of exported picture. When no value is transferred, the export format is “image/jpeg”, and the value can be “image/png” and other browser supported formats.  
8. `mskOption`：  
	**type**：object  
	**default**：`{ width: 1, height: 1, isRound: false, resize: true}`  
	**describe**：  
	width：{number} Crop box width ratio.  
	height：{number} Crop box height ratio.  
	isRound：{boolean} rectangle - true，ellipse - false.  
	resize：{boolean} Can the crop box size be changed by dragging.  
	color：{string} Mask color.  
	borderColor：{string} Crop box color.  

**Event：**

1. `onChange ({ blob, base64 })`：Listen to the event that the picture is finally cropped and exported.  
	blob：Export the Blob object of the picture, which can be used to upload the picture.  
	base64：Export the Base64 string of the picture, which can be used to upload the picture.  
	
**Method：**

1. `this.$refs['pictureCut'].scale(zoom)`：Zoom picture  
    zoom：The scale of the scaled size to the current size. The value is greater than 0. Between 0 and 1 is to reduce, and greater than 1 to enlarge.  

#### 2、VuePictureCutMask Components

`VuePictureCutMask` is the default slot component of `VuePictureCut`. It is related to the control mask crop box. Using it has the same effect as not using it.  

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
      :color="color"
      :border-color="borderColor"
    />
  </vue-picture-cut>
</template>
```

**Attribute：**

1. `width`：  
	**type**：number  
	**default**：1  
	**describe**：Crop box width ratio.  
2. `height`：  
	**type**：number  
	**default**：1  
	**describe**：Crop box height ratio.  
3. `isRound`：  
	**type**：boolean  
	**default**：false  
	**describe**：rectangle - true，ellipse - false.  
4. `resize`：  
	**type**：boolean  
	**default**：false  
	**describe**：Can the crop box size be changed by dragging.  
5. `color`：  
	**type**：string  
	**required**：false  
	**describe**：Mask color.  
6. `borderColor`：  
	**type**：string  
	**required**：false  
	**describe**：Crop box color.  

#### 3、VuePictureCutMenu Components

Menu bar component, see demo for effect.    

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
      :theme="theme"
      confirm-name="Ok"
      cancel-name="cancel"
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
	**describe**：Whether to display the 'cancel' button.  
2. `maxPixel`：  
	**type**：number  
	**required**：false  
	**describe**：Export the pixels on the longer side of the picture. When the value is not transferred, it is adaptive according to the actual image size.  
3. `encoderOptions`：  
	**type**：number  
	**required**：false  
	**describe**：Compression ratio of exported pictures. When the value is not transferred, it is calculated as 0.8, and the value range is 0 ~ 1.  
4. `format`：  
	**type**：string  
	**required**：false  
	**describe**：Format of exported picture. When no value is transferred, the export format is “image/jpeg”, and the value can be “image/png” and other browser supported formats.  
5. `theme`：  
    **type**：string  
    **default**：'default'  
    **describe**：Menu bar theme. Value：'default'、'dark'、'gray'.  
6. `confirmName`：  
	**type**：string  
	**default**：'Ok'  
	**describe**：Text for 'confirm' button.  
7. `cancelName`：  
	**type**：string  
	**default**：'cancel'  
	**describe**：Text for 'cancel' button.  

**Event：**

1. `onChange ({ blob, base64 })`：Listen to the event that the picture is finally cropped and exported.  
	blob：Export the Blob object of the picture, which can be used to upload the picture.  
	base64：Export the Base64 string of the picture, which can be used to upload the picture.  

2. `onCancel ()`：Listen to 'cancel' button click event.  

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
    // Image loaded successfully
    // image: Image Object
  }, image => {
    // Failed to load picture
  });
```

##### Method

***...Waiting for editing***

### 3、Custom extension

For the time being, please refer to `src/App.vue` and `src/lib/views/vue-picture-cut-menu.vue`

#### 3.1、Custom crop

***...Waiting for editing***  

#### 3.2、Customize the menu bar

***...Waiting for editing***  

## 三、Welcome

VuePictureCut 💗 you!

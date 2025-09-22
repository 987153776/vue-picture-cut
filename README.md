# vue-picture-cut 2.x

![npm](https://badgen.net/npm/v/vue-picture-cut?cache=1800)
![download](https://badgen.net/npm/dy/vue-picture-cut?cache=1800)
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

🚀 **[【Update Log】](./CHANGELOG.md)**  

## Ⅰ、Usage

### Install

[![npm install vue-picture-cut](https://nodei.co/npm/vue-picture-cut.png)](https://nodei.co/npm/vue-picture-cut/)

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
  Tool,
  createUtils
} from 'vue-picture-cut';
```
Components：`VuePictureCut`、`VuePictureCutMask`、`VuePictureCutMenu`。
Tools：`Bezier`、`createAnimation`、`Tool`、`createUtils`。

### 1、VuePictureCut Components

**Slots：** `default`、`menu`

**Using：**

[/demo/demo1.html](https://htmlpreview.github.io/?https://raw.githubusercontent.com/987153776/vue-picture-cut/master/demo/demo1.html)  
[/demo/demo2.html](https://htmlpreview.github.io/?https://raw.githubusercontent.com/987153776/vue-picture-cut/master/demo/demo2.html)

```vue
<template>
  <vue-picture-cut
    ref="pictureCut"
    :src="src"
    :magnification="magnification"
    :init-angle="initAngle"
    :msk-option="mskOption"
    :max-pixel="maxPixel"
    :encoder-options="encoderOptions"
    :format="format"
    :rotate-control="rotateControl"
    :edge-detection="edgeDetection"
    :menu-position="menuPosition"
    :menu-thickness="menuThickness"
    :background-color="backgroundColor"
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
4. `maxPixel`：  
	**type**：number  
	**required**：false  
	**describe**：Export the pixels on the longer side of the picture. When the value is not transferred, it is adaptive according to the actual image size.  
5. `encoderOptions`：  
	**type**：number  
	**required**：false  
	**describe**：Compression ratio of exported pictures. When the value is not transferred, it is calculated as 0.8, and the value range is 0 ~ 1.  
6. `format`：  
	**type**：string  
	**default**：false  
	**describe**：Format of exported picture. When no value is transferred, the export format is “image/jpeg”, and the value can be “image/png” and other browser supported formats.  
7. `mskOption`：  
	**type**：object  
	**default**：`{ width: 1, height: 1, isRound: false, resize: true}`  
	**describe**：  
	width：{number} Crop box width ratio.  
	height：{number} Crop box height ratio.  
	isRound：{boolean} rectangle - true，ellipse - false.  
	resize：{boolean} Can the crop box size be changed by dragging.  
	color：{string} Mask color.  
	borderColor：{string} Crop box color.  
8. `rotateControl`：  
	**type**：boolean  
	**default**：false  
	**describe**：Whether to display the rotation control.  
9. `edgeDetection`：  
	**type**：boolean  
	**default**：false  
	**describe**：Whether to enable edge detection.  
10. `menuPosition`：  
	**type**：string  
	**default**：bottom  
	**describe**：Location of menu bar. Value：top、bottom、left、right.  
11. `menuThickness`：  
	**type**：number  
	**required**：false  
	**describe**：When 'menuPosition' is equal to 'top' or 'bottom', it represents the height of the menu bar. When 'menuPosition' equals 'left' or 'right', it represents the width of the menu bar. The value is greater than 0. Hide menu bar when equal to 0.  
12. `backgroundColor`：  
	**type**：string  
	**required**：false  
	**describe**：The background color of the component. 

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

[/demo/demo3.html](https://htmlpreview.github.io/?https://raw.githubusercontent.com/987153776/vue-picture-cut/master/demo/demo3.html)  

```vue
<template>
  <vue-picture-cut
    :src="src"
    :magnification="magnification"
    :init-angle="initAngle"
    :rotate-control="rotateControl"
    :edge-detection="edgeDetection"
    :max-pixel="maxPixel"
    :encoder-options="encoderOptions"
    :format="format"
    :background-color="backgroundColor"
    @on-change="onChange"
  >
    <vue-picture-cut-mask
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

[/demo/demo4.html](https://htmlpreview.github.io/?https://raw.githubusercontent.com/987153776/vue-picture-cut/master/demo/demo4.html)  
[/demo/demo5.html](https://htmlpreview.github.io/?https://raw.githubusercontent.com/987153776/vue-picture-cut/master/demo/demo5.html)  

```vue
<template>
  <vue-picture-cut
    :src="src"
    :magnification="magnification"
    :init-angle="initAngle"
    :rotate-control="rotateControl"
    :edge-detection="edgeDetection"
    :msk-option="mskOption"
    @on-change="cutChange"
  >
    <vue-picture-cut-menu
      slot="menu"
      :cancel="false"
      :max-pixel="maxPixel"
      :encoder-options="encoderOptions"
      :format="format"
      :theme="theme"
      confirm-name="Ok"
      cancel-name="cancel"
      size-auto-name="auto"
      size-raw-name="raw"
      menu-rotate-name="Rotate"
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
8. `sizeAutoName`：  
	**type**：string  
	**default**：'auto'  
	**describe**：Menu bar button text.  
9. `sizeRawName`：  
	**type**：string  
	**default**：'raw'  
	**describe**：Menu bar button text.  
10. `menuRotateName`：  
	**type**：string  
	**default**：'Rotate'  
	**describe**：Menu bar button text.  
11. `root`：  
	**type**：object  
	**required**：If it is not used externally through slot mode, it must be passed.  
	**describe**：The value is an instance of 'VuePictureCut'。  

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

##### (1) Static attribute 'BEZIER'，a key value pair, contains some default preset.  

| key | value | describe |
| ---- | ---- | ---- |
| linear | \[0.0, 0.0, 1.0, 1.0\] | Linear transition |
| ease | \[0.25, 0.1, 0.25, 1.0\] | Smooth transition |
| ease-in | \[0.42, 0, 1.0, 1.0\] | From slow to fast |
| ease-out | \[0, 0, 0.58, 1.0\] | From fast to slow |
| ease-in-out | \[0.42, 0, 0.58, 1.0\] | From slow to fast and then to slow |

##### (2) constructor  

`setOptByString('ease')` parameterless constructor that internally calls the a method.  

##### (3) Method

| name | describe | params | return |
| ---- | ---- | ---- | ---- |
| setOpt | Set Bezier curve type. | (arg: string , ParamsInterface = 'ease') | Bezier itself. |
| setOptByString | Set Bezier curve type. | BEZIER preset(arg = 'ease') | Bezier itself. |
| setOptByArr | Set Bezier curve type. | (x1: number, y1: number, x2: number, y2: number) | Bezier itself. |
| getPoint | Returns the Y coordinate value corresponding to the X coordinate. | (x: number) Between 0 and 1. | Corresponding y coordinate. |

##### (4) Params ParamsInterface description.

ParamsInterface is an array containing four number types.  

#### 5、 createAnimation method

```javascript
  import { createAnimation } from 'vue-picture-cut';

  const animation = createAnimation(option);
```

'createAnimation' returns a 'Animation' object.  

##### (1) Params option

| key | describe | type | value | required | default |
| ---- | ---- | ---- | ---- | ---- | ---- |
| duration | Animation duration in milliseconds. | number | —— | false | 1000 |
| timing | Transition type of animation. | string、number[] | Bezier.BEZIER preset，or ParamsInterface | false | ease |
| delay | The delay time of the animation, in milliseconds. | number | —— | false | 0 |
| iteration | The number of animation cycles, 'infinite' is infinite. | number、string | 'infinite' or positive integer | false | 0 |
| direction | Does the animation reverse in the loop. | string | normal(default. Forward motion)；reverse(Reverse operation)；alternate(First forward, then reverse, and alternate)；alternate-reverse(Reverse first, then forward, and alternate)。 | false | normal |
| change | Callback function, receive parameter x, X between 0 ~ 1, animation is processed here. | Function | —— | false | —— |
| end | Callback function, executed at the end of the animation. | Function | —— | false | —— |

##### (2) Animation object method

| name | describe | params | return |
| ---- | ---- | ---- | ---- |
| start | Start animation. | —— | Animation itself. |
| abort | Abort animation. | —— | —— |

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

#### 7、 createUtils method

```vue
<template>
  <div>
	<input type="file" accept="image/*" @change="inputChange"/>
    <vue-picture-cut ref="pictureCut" :src="src"/>
    <button @click="doCut">裁剪</button>
  </div>
</template>

<script>
  import { VuePictureCut, createUtils } from 'vue-picture-cut';

  export default {
    // ...
    components: {
      VuePictureCut
    },
    data () {
      return {
        utils: null,
        src: null,
        blob: null,
        base64: null
      }
    },
    mounted() {
      this.utils = createUtils(this.$refs['pictureCut']);
    },
    methods: {
      inputChange(e) {
        const file = e.target.files[0];
        this.src = URL.createObjectURL(file);
      },
      doCut() {
        const res = this.utils.cut();
        if (res) {
            this.blob = res.file;   // BLOB Object
            this.base64 = res.src;  // base64 string
        }
      }
    }
    // ...
  }
</script>

<style>
  @import "~vue-picture-cut/lib/vue-picture-cut.css";
</style>
```

##### Method

1. `cut(maxPixel?: number, encoderOptions?: number, format?: string): ClipResult | null`  
**describe**：cut  
**param maxPixel**：Export the pixels on the longer side of the picture.   
**param encoderOptions**：Compression ratio of exported pictures.  
**param format**：Format of exported picture. When no value is transferred, the export format is “image/jpeg”, and the value can be “image/png” and other browser supported formats.  
**return ClipResult | null**：omit...  

2. `cut(opt?: { maxPixel?: number, encoderOptions?: number, format?: string }): ClipResult | null`  
**describe**：cut  
**param opt.maxPixel**：Export the pixels on the longer side of the picture.   
**param opt.encoderOptions**：Compression ratio of exported pictures.  
**param opt.format**：Format of exported picture. When no value is transferred, the export format is “image/jpeg”, and the value can be “image/png” and other browser supported formats.  
**return ClipResult | null**：omit...  

3. `setMaskRound(isRound = true): void`  
**describe**：Sets the shape of the crop box.  
**param isRound**：true (circular)，false (rectangle).   

4. `setMaskSize(w: number, h: number): void`  
**describe**：Set clipping box size.  
**param w**：Crop box width ratio.  
**param h**：Crop box height ratio.  

5. `setMaskSizeToOriginal (): void`  
**describe**：Set clipping box size according to picture width height ratio.  

6. `setMaskResize (resize = true): void`  
**describe**：Can the crop box size be changed by dragging.  
**param resize**：omit...  

7. `rotate (angle: number, animation = false): number | void`  
**describe**：Pictures rotating.  
**param angle**：Counterclockwise angle.  
**param animation**：Do you want to show animation.  
**return number | null**：Anticlockwise angle of image after rotation.  

8. `rotateTo (angle: number, animation = false): void`  
**describe**：Rotate the picture at a specified angle.  
**param angle**：Counterclockwise angle.  
**param animation**：Do you want to show animation.  

9. `setFlipV(animation?: boolean): boolean | void`  
**describe**：Picture vertical flip  
**param animation**：Do you want to show animation.  
**return boolean | null**：Compared with the original image, whether it is flipped, true (flipped), false (original).  

10. `setFlipH(animation?: boolean): boolean | void`  
**describe**：Picture flip horizontally  
**param animation**：Do you want to show animation.  
**return boolean | null**：Compared with the original image, whether it is flipped, true (flipped), false (original).  

11. `setFlip (sV: boolean, sH: boolean, animation?: boolean): void`  
**describe**：Pictures flipping.  
**param sV**：Vertical，true (flipping)，false (original)。  
**param sH**：Vorizontal，true (flipping)，false (original)。  
**param animation**：Do you want to show animation.  

12. `scale(zoom: number): void`  
**describe**：Picture zoom.  
**param zoom**：The scale of the scaled size to the current size.  

13. `reset(): void`  
**describe**：Reset picture status.  

13. `getOptions(): CutOptions | null`  
**describe**：Gets the parameter of the current state inside the component.  
**return CutOptions | null**：omit...  

### 3、Custom extension

For the time being, please refer to `src/App.vue` and `src/lib/views/vue-picture-cut-menu.vue`

#### 3.1、Custom crop

***...Waiting for editing***  

#### 3.2、Customize the menu bar

***...Waiting for editing***  

## 三、Welcome

VuePictureCut 💗 you!

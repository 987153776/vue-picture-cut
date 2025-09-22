# vue-picture-cut 2.x

![npm](https://badgen.net/npm/v/vue-picture-cut?cache=1800)
![download](https://badgen.net/npm/dy/vue-picture-cut?cache=1800)
![license](https://badgen.net/npm/license/vue-picture-cut)

[English](./README.md) | 中文  

基于`vue`和`typescript`开发的一款图片剪裁处理工具  
优点：**原生、轻量、使用简单、功能全面、扩展性强**  
目前功能：**缩放、翻折、旋转、边缘校验、矩形剪裁、任意(椭)圆剪裁**  
关于缩放：鼠标（鼠标滚轮缩放）、触屏（双指缩放） 

<a href="https://github.com/987153776/vue-picture-cut" target="_blank">github主页</a>  
<a href="https://gitee.com/light-year/vue-picture-cut" target="_blank">码云主页</a>  
<a href="https://htmlpreview.github.io/?https://raw.githubusercontent.com/987153776/vue-picture-cut/master/dist/index.html" target="_blank">demo演示(github)</a>  
<a href="https://light-year.gitee.io/vue-picture-cut/" target="_blank">demo演示(码云)</a>  

<a href="https://github.com/987153776/vue-picture-cut/tree/1.0">💩💩💩0.x版本点这里</a>【此版本bug太多，不再维护】  

🚀 **[【升级日志】](./CHANGELOG.md)**  

## 一、使用方法

### 通过npm安装插件

[![npm install vue-picture-cut](https://nodei.co/npm/vue-picture-cut.png)](https://nodei.co/npm/vue-picture-cut/)

### 在vue中使用

1、在`main.js`中全局引用

```javascript
import Vue from 'vue';
import 'vue-picture-cut/lib/vue-picture-cut.css';
import VuePictureCut from 'vue-picture-cut';

Vue.use(VuePictureCut);
```

2、或者在`.vue`文件中单独引用

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
       * @param blob      BLOB对象
       * @param base64    base64字符串
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

3、注意

**组件在使用时，宽高跟随父级标签，所以需要设置父级标签的宽高。**

## 二、API

### 暴露的对象

**全局引入时**
```javascript
import VuePictureCut from 'vue-picture-cut';
Vue.use(VuePictureCut);
```
此时会注册：`VuePictureCut`、`VuePictureCutMask`、`VuePictureCutMenu`三个组件。

**独立引用**
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
组件：`VuePictureCut`、`VuePictureCutMask`、`VuePictureCutMenu`。
工具类：`Bezier`、`createAnimation`、`Tool`、`createUtils`。

### 1、VuePictureCut组件

**slot插槽：** `default`、`menu`

**使用：**  

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

**属性：**

1. `src`：  
	**类型**：string  
	**默认**：null  
	**描述**：图片链接  
2. `magnification`：  
	**类型**：number  
	**默认**：1.5  
	**描述**：画布绘制缩放率，取值大于0，值越大绘制的逻辑像素越高  
3. `initAngle`：  
	**类型**：number  
	**必须**：非必须  
	**描述**：载入图片的初始旋转角度  
4. `maxPixel`：  
	**类型**：number  
	**必须**：非必须  
	**描述**：导出图片的宽高中较长边的像素，不传时则依据实际图片大小自适应。  
5. `encoderOptions`：  
	**类型**：number  
	**必须**：非必须  
	**描述**：导出图片的压缩率，不传时按0.8计算，取值范围0~1。  
6. `format`：  
	**类型**：string  
	**默认**：false  
	**描述**：导出图片的格式，不传时导出格式为“image/jpeg”，其值可以为“image/png”等浏览器支持格式。  
7. `mskOption`：  
	**类型**：object  
	**默认**：`{ width: 1, height: 1, isRound: false, resize: true}`  
	**描述**：  
	width：number 裁剪框比例宽  
	height：number 裁剪框比例高  
	isRound：boolean 矩形true，椭圆false  
	resize：boolean 裁剪框大小是否可通过拖动改变大小  
	color：string 遮罩颜色  
	borderColor：string 裁剪框颜色  
8. `rotateControl`：  
	**类型**：boolean  
	**默认**：false  
	**描述**：是否显示旋转控件。 
9. `edgeDetection`：  
	**类型**：boolean  
	**默认**：false  
	**描述**：是否开启边缘检测。  
10. `menuPosition`：  
	**类型**：string  
	**默认**：bottom  
	**描述**：菜单栏位置，取值：top、bottom、left、right。  
11. `menuThickness`：  
	**类型**：number  
	**必须**：非必须  
	**描述**：menuPosition取top、bottom时表示菜单栏高度，menuPosition取left、right时表示菜单栏高度宽度，取值大于0，等于0时隐藏菜单栏。  
12. `backgroundColor`：  
	**类型**：string  
	**必须**：非必须  
	**描述**：组件背景色。  

**事件：**

1. `onChange ({ blob, base64 })`：监听图片最终裁剪导出的事件  
	blob：导出图片的Blob对象，可用于图片上传  
	base64：导出图片的base64字符串，可用于图片上传  
	
**方法：**

1. `this.$refs['pictureCut'].scale(zoom)`：缩放图片  
    参数zoom：缩放后的尺寸和当前尺寸的比例，取值大于0，0到1之间缩小，大于1放大。  

#### 2、VuePictureCutMask组件

`VuePictureCutMask`是`VuePictureCut`默认slot插槽组件，是控制遮罩裁剪框相关的组件，使用它与不使用它效果一样。  

**使用：**

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

**属性：**

1. `width`：  
	**类型**：number  
	**默认**：1  
	**描述**：裁剪框比例宽
2. `height`：  
	**类型**：number  
	**默认**：1  
	**描述**：裁剪框比例高
3. `isRound`：  
	**类型**：boolean  
	**默认**：false  
	**描述**：矩形true，椭圆false  
4. `resize`：  
	**类型**：boolean  
	**默认**：false  
	**描述**：裁剪框大小是否可通过拖动改变大小  
5. `color`：  
	**类型**：string  
	**必须**：非必须  
	**描述**：遮罩颜色  
6. `borderColor`：  
	**类型**：string  
	**必须**：非必须  
	**描述**：裁剪框颜色  

#### 3、VuePictureCutMenu组件

菜单栏组件，效果参见Demo。  

**使用：**

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
      cancel-name="Cancel"
      size-auto-name="auto"
      size-raw-name="raw"
      menu-rotate-name="Rotate"
      @on-change="onChange"
      @on-cancel="onCancel"
    />
  </vue-picture-cut>
</template>
```

**属性：**

1. `cancel`：  
	**类型**：boolean  
	**默认**：false  
	**描述**：是否显示取消按钮。  
2. `maxPixel`：  
	**类型**：number  
	**必须**：非必须  
	**描述**：导出图片的宽高中较长边的像素，不传时则依据实际图片大小自适应。  
3. `encoderOptions`：  
	**类型**：number  
	**必须**：非必须  
	**描述**：导出图片的压缩率，不传时按0.8计算，取值范围0~1。  
4. `format`：  
	**类型**：string  
	**默认**：false  
	**描述**：导出图片的格式，不传时导出格式为“image/jpeg”，其值可以为“image/png”等浏览器支持格式。  
5. `theme`：  
	**类型**：string  
	**默认**：'default'  
	**描述**：菜单栏主题。取值：'default'、'dark'、'gray'  
6. `confirmName`：  
	**类型**：string  
	**默认**：'Ok'  
	**描述**：确定按钮的文字  
7. `cancelName`：  
	**类型**：string  
	**默认**：'cancel'  
	**描述**：取消按钮的文字  
8. `sizeAutoName`：  
	**类型**：string  
	**默认**：'auto'  
	**描述**：菜单栏按钮文字  
9. `sizeRawName`：  
	**类型**：string  
	**默认**：'raw'  
	**描述**：菜单栏按钮文字  
10. `menuRotateName`：  
	**类型**：string  
	**默认**：'Rotate'  
	**描述**：菜单栏按钮文字  
11. `root`：  
	**类型**：object  
	**必须**：不通过slot方式在外部使用时，必须传。  
	**描述**：取值为`VuePictureCut`实例  

**事件：**

1. `onChange ({ blob, base64 })`：监听图片最终裁剪导出的事件，即点击确认按钮  
	blob：导出图片的Blob对象，可用于图片上传  
	base64：导出图片的base64字符串，可用于图片上传  

2. `onCancel ()`：监听点击取消按钮  

#### 4、Bezier对象

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

#### 6、 Tool对象

```javascript
  import { Tool } from 'vue-picture-cut';

  Tool.loadImg('http://xxx.xxx.xxx/xxx.jpg')
  .then(image => {
    // 加载图片成功
    // image为Image对象
  }, () => {
    // 加载图片失败
  });
```

##### 包含方法

1. `loadImg (src: string): Promise<HTMLImageElement>`  
**描述**：载入图片  
**参数 src**：图片的链接  
**返回 Promise<HTMLImageElement>**：略  

2. `rotatePoint(x: number, y: number, angle: number): Point`  
**描述**：将一个点绕原点旋转angle度后，计算新的点的坐标  
**参数 x**：点的x坐标  
**参数 y**：点的y坐标  
**参数 angle**：旋转角度  
**返回 Point**：{x: number, y: number}  新的点  

3. `clipBy (img: HTMLImageElement, width: number, height: number, showRect: RectFull, encoderOptions = 0.8, format = 'image/jpeg', pathDone?: PathDone): string`  
**描述**：根据坐标剪裁图像  
**参数 img**：Image对象  
**参数 width**：导出图片的宽度（px）  
**参数 height**：导出图片的高度（px）  
**参数 showRect**：RectFull对象  
**参数 encoderOptions**：压缩率  
**参数 format**：导出图片的格式'image/jpeg'、'image/png'等  
**参数 pathDone**：自定义路径的方法PathDone   
**返回 String**：base64  

3. `clipByRound (img: HTMLImageElement, width: number, height: number, showRect: RectFull, encoderOptions = 0.8, format = 'image/jpeg'): string`  
**描述**：根据坐标内切圆剪裁图像  
**参数 img**：略  
**参数 width**：略  
**参数 height**：略  
**参数 showRect**：略  
**参数 encoderOptions**：略  
**参数 format**：略  
**返回 String**：base64  

3. `clipByMax (img: HTMLImageElement, max = 2000, encoderOptions = 1): ClipResult | void`  
**描述**：若图片宽或高大于max，则压缩图片  
**参数 img**：略  
**参数 max**：略  
**参数 encoderOptions**：略  
**返回 ClipResult | void**：返回ClipResult对象或undefined  

4. `base64ToBlob (base64: string, format = 'image/jpeg'): Blob | null`  
**描述**：将base64转Blob对象  
**参数 base64**：略  
**参数 format**：base64的格式  
**返回 Blob | null**：返回Blob对象或null  

5. `getEllipseRectByRect(w: number, h: number, angle: number): Rect`  
**描述**：将一个正矩形的内切椭圆旋转angle度，计算该椭圆的外接正矩形。(假设矩形中心为原点)  
**参数 w**：初始正矩形宽  
**参数 h**：初始正矩形高  
**参数 angle**：逆时针旋转角度  
**返回 Rect**：返回Rect对象  

6. `getRectByRect(w: number, h: number, angle: number): Rect`  
**描述**：将一个正矩形旋转angle度，计算该矩形的外接正矩形。(假设矩形中心为原点)  
**参数 w**：初始正矩形宽  
**参数 h**：初始正矩形高  
**参数 angle**：逆时针旋转角度  
**返回 Rect**：返回Rect对象  

#### 7、 createUtils方法

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
            this.blob = res.file;   // BLOB对象
            this.base64 = res.src;  // base64字符串
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

##### 包含方法

1. `cut(maxPixel?: number, encoderOptions?: number, format?: string): ClipResult | null`  
**描述**：裁剪  
**参数 maxPixel**：导出图片的宽高中较长边的像素，不传时则依据实际图片大小自适应。  
**参数 encoderOptions**：压缩率  
**参数 format**：导出图片的格式'image/jpeg'、'image/png'等  
**返回 ClipResult | null**：略  

2. `cut(opt?: { maxPixel?: number, encoderOptions?: number, format?: string }): ClipResult | null`  
**描述**：裁剪  
**参数 opt.maxPixel**：导出图片的宽高中较长边的像素，不传时则依据实际图片大小自适应。  
**参数 opt.encoderOptions**：压缩率  
**参数 opt.format**：导出图片的格式'image/jpeg'、'image/png'等  
**返回 ClipResult | null**：略  

3. `setMaskRound(isRound = true): void`  
**描述**：设置裁剪框的形状。  
**参数 isRound**：true (圆形)，false (矩形)。  

4. `setMaskSize(w: number, h: number): void`  
**描述**：设置剪裁框尺寸  
**参数 w**：比例宽  
**参数 h**：比例高  

5. `setMaskSizeToOriginal (): void`  
**描述**：按图片宽高比例设置剪裁框尺寸  

6. `setMaskResize (resize = true): void`  
**描述**：设置剪裁框是否可拖动改变大小  
**参数 resize**：略  

7. `rotate (angle: number, animation = false): number | void`  
**描述**：图片旋转  
**参数 angle**：逆时针角度  
**参数 animation**：是否进行动画  
**返回 number | null**：图片旋转后的逆时针角度  

8. `rotateTo (angle: number, animation = false): void`  
**描述**：图片旋转指定角度  
**参数 angle**：逆时针角度  
**参数 animation**：是否进行动画  

9. `setFlipV(animation?: boolean): boolean | void`  
**描述**：图片垂直翻转  
**参数 animation**：是否进行动画  
**返回 boolean | null**：和原图相比，是否翻转了，true (翻转)，false (原始)。  

10. `setFlipH(animation?: boolean): boolean | void`  
**描述**：图片水平翻转  
**参数 animation**：是否进行动画  
**返回 boolean | null**：和原图相比，是否翻转了，true (翻转)，false (原始)。  

11. `setFlip (sV: boolean, sH: boolean, animation?: boolean): void`  
**描述**：图片翻转  
**参数 sV**：垂直，true (翻转)，false (原始)。  
**参数 sH**：水平，true (翻转)，false (原始)。  
**参数 animation**：是否进行动画  

12. `scale(zoom: number): void`  
**描述**：图片缩放  
**参数 zoom**：缩放系数  

13. `reset(): void`  
**描述**：重置图片状态  

13. `getOptions(): CutOptions | null`  
**描述**：获取组件内部当前状态的参数。  
**返回 CutOptions | null**：略。  


#### 8、 内部对象说明

***...待编辑***

### 3、自定义扩展

暂时可以参考`src/App.vue`和`src/lib/views/vue-picture-cut-menu.vue`

#### 3.1、自定义裁剪

***...文档待编辑***  

#### 3.2、自定义菜单栏

***...文档待编辑***  

## Ⅲ、希望大家都来用一下
VuePictureCut 💗 you!

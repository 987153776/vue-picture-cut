# vue-picture-cut 2.x

基于`vue`和`typescript`开发的一款图片剪裁处理工具  
优点：**原生、轻量、使用简单、功能全面、扩展性强**  
目前功能：**缩放、翻折、旋转、边缘校验、矩形剪裁、任意(椭)圆剪裁**

***2.0.0-alpha.4版本发布***

<a href="https://github.com/987153776/vue-picture-cut" target="_blank">github主页</a>  
<a href="https://gitee.com/light-year/vue-picture-cut" target="_blank">码云主页</a>  
<a href="https://htmlpreview.github.io/?https://raw.githubusercontent.com/987153776/vue-picture-cut/master/dist/index.html" target="_blank">demo演示(github)</a>  
<a href="https://light-year.gitee.io/vue-picture-cut/" target="_blank">demo演示(码云)</a>  

<a href="https://github.com/987153776/vue-picture-cut/tree/1.0">💩💩💩0.x版本点这里</a>【此版本bug太多，不再维护】

## 一、使用方法

### 通过npm安装插件

```nodejs
npm i vue-picture-cut@2.0.0-alpha.4
```

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

#### 暴露的对象

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
  Tool
} from 'vue-picture-cut';
```
组件：`VuePictureCut`、`VuePictureCutMask`、`VuePictureCutMenu`。
工具类：`Bezier`、`createAnimation`、`Tool`。

#### 1、VuePictureCut组件
**使用**
```vue
<template>
	<vue-picture-cut
		:src="src"
		:magnification="magnification"
		:init-angle="form.initAngle"
		:rotate-control="form.rotateControl"
		:msk-option="mskOption"
		:max-pixel="form.maxPixel"
		:encoder-options="encoderOptions"
		:format="format"
		@on-change="onChange"
	/>
</template>
```

**属性**

1. `src`：
	**类型**：string  
	**默认**：null  
	**描述**：图片链接
2. `magnification`：
	**类型**：number  
	**默认**：1.5  
	**描述**：画布绘制缩放率，大于0，值越大绘制的逻辑像素越高
3. `initAngle`：
	**类型**：number  
	**必须**：非必须  
	**描述**：载入图片的初始旋转角度
4. `rotateControl`：
	**类型**：boolean  
	**默认**：false  
	**描述**：是否显示旋转控件。
5. `maxPixel`：
	**类型**：number  
	**必须**：非必须  
	**描述**：导出图片的宽高中较长边的像素，不传时则依据实际图片大小自适应。
6. `encoderOptions`：
	**类型**：number  
	**必须**：非必须  
	**描述**：导出图片的压缩率，不传时按0.8计算，取值范围0~1。
7. `format`：
	**类型**：string  
	**默认**：false  
	**描述**：导出图片的格式，不传时导出格式为“image/jpeg”，其值可以为“image/png”等浏览器支持格式。
8. `mskOption`：
	**类型**：object  
	**默认**：`{ width: 1, height: 1, isRound: false, resize: true}`  
	**描述**：  
		width：number 裁剪框比例宽  
		height：number 裁剪框比例高  
		isRound：boolean 矩形true，椭圆false  
		resize：boolean 裁剪框大小是否可通过拖动改变大小  

**事件**

1. `onChange ({ blob, base64 })`：监听图片最终裁剪导出的事件
	blob：导出图片的Blob对象，可用于图片上传
	base64：导出图片的base64字符串，可用于图片上传

#### 2、VuePictureCutMask组件

`VuePictureCutMask`是`VuePictureCut`默认slot插槽组件，是控制遮罩裁剪框相关的组件，使用它与不使用它效果一样。  

**使用**
```vue
<template>
	<vue-picture-cut
		:src="src"
		:magnification="magnification"
		:init-angle="form.initAngle"
		:rotate-control="form.rotateControl"
		:msk-option="mskOption"
		:max-pixel="form.maxPixel"
		:encoder-options="form.encoderOptions"
		:format="form.format"
		@on-change="cutChange"
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

**属性**

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

#### 事件Events

***...待编辑***

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
| setOpt | 设置贝塞尔曲线类型 | (arg: string , ParamsInterface = 'ease') | Bezier对象本身 |
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

##### (2) Animation对象方法

| 方法名 | 说明 | 参数 | 返回值 |
| ---- | ---- | ---- | ---- |
| start | 开始动画 | —— | Animation对象本身 |
| abort | 中止动画 | —— | —— |

#### 2.3 Tool对象

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

***...文档待编辑***  
暂时可以参考`src/App.vue`和`src/lib/views/vue-picture-cut-menu.vue`

## 三、希望大家都来用一下
VuePictureCut 💗 you!

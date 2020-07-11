## 2.0.3 (2020-07-11)

#### :rocket: New Features
* `VuePictureCutMenu`
  * Attribute: `root` 传递`VuePictureCutMenu`实例后，可以不通过slot方式在外部使用。

#### :house: Optimize
* `Tool`
  * `clipBy`、`clipByRound`方法优化。
* `VuePictureCutMenu`
  * 主题样式优化。

## 2.0.2 (2020-07-08)

#### :rocket: New Features
* `VuePictureCut`
  * Attribute: `menuPosition` 菜单栏位置，取值(top、bottom、left、right，默认bottom)
  * Attribute: `menuThickness` menuPosition为top、bottom时即height，menuPosition为left、right时即width。

## 2.0.1 (2020-07-06)

#### :rocket: New Features
* `VuePictureCut`
  * Attribute: `backgroundColor` 改变控件背景色
* `VuePictureCutMask`
  * Attribute: `color` 改变遮罩颜色
  * Attribute: `borderColor` 改变裁剪框颜色
* `VuePictureCutMenu`
  * Attribute: `theme` 改变主题色

#### :house: Optimize
* `VuePictureCut`
  * 载入图片的过程中添加"loading..."文字提示。

#### :memo: Documentation
* 完善中文文档，新增英文文档。
* Demo展示更完整的功能。

## 2.0.0 (2020-07-05)

#### :house: 第一个稳定版发布

## 2.0.0-beta.3 (2020-07-05)

#### :bug: Bug Fix
* `VuePictureCut`  
  * API `scale`：通过接口缩放图片时的坐标计算错误。

#### :house: Optimize
* 事件处理逻辑优化。
* 优化鼠标滚轮效果。

## 2.0.0-beta.2 (2020-07-04)

#### :bug: Bug Fix
* `VuePictureCut`  
  * API `scale`：通过接口缩放图片时的坐标计算错误。

## 2.0.0-beta.1 (2020-07-04)

#### :rocket: New Features
* `VuePictureCut`
  * API: `scale` 新增缩放图片的接口

#### :house: Optimize
* `VuePictureCutMask`
  * 在裁剪框在可拖动的情况下，新增标识。

#### :memo: Documentation
* 完善文档

## 2.0.0-beta.0 (2020-07-02)

#### :memo: Documentation
* 完善文档

## 2.0.0-alpha.4 (2020-07-02)

#### :bug: Bug Fix
* `VuePictureCut`  
  * 图片翻转时，图片坐标计算错误。

## 2.0.0-alpha.3 (2020-07-01)

#### :bug: Bug Fix
* `VuePictureCut`  
  * 图片翻转时，双指缩放错误。
* `VuePictureCutMask`  
  * 图片翻转时，遮罩拖动错误。

## 2.0.0-alpha.2 (2020-06-30)

#### :bug: Bug Fix
* `VuePictureCut`
  * 移动端图片水平垂直翻转后，双指缩放初始手指坐标信息错误。

## 2.0.0-alpha.1 (2020-06-30)

#### :rocket: New Features
* `VuePictureCutMenu` （自定义扩展组件）
* `VuePictureCut`
  * 实现图片水平垂直翻转

#### :house: Optimize
* Demo样式调整

## 2.0.0-alpha.0 (2020-06-28)

#### :house: 第一个版本发布
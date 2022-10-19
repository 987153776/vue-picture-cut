## 2.0.18-alpha.1 (2022-10-19)

#### :bug: Bug Fix
* 修改babel配置，修复了一些问题。

## 2.0.18-alpha.0 (2022-05-23)

#### :bug: Bug Fix
* 修复某些情况下报控件的name为i的错。

## 2.0.17 (2020-12-26)

#### :bug: Bug Fix
* 修复移动端页面滚动后手指坐标计算错误的问题。

## 2.0.16 (2020-12-01)

#### :bug: Bug Fix
* 删除一个无用的依赖

## 2.0.15 (2020-11-20)

#### :bug: Bug Fix
* 修复某些情况下手指坐标计算错误的问题。
* 修复ie上图片或遮罩动画开始时有一次闪动的问题。

## 2.0.14 (2020-11-20)

#### :bug: Bug Fix
* 修复某些情况下手指坐标计算错误的问题。

## 2.0.13 (2020-09-17)

#### :bug: Bug Fix
* 修复火狐浏览器鼠标滚轮缩放无效的问题。
  
#### :house: Optimize
* 重构了动画的实现 

## 2.0.12 (2020-07-19)

#### :rocket: New Features
* `Utils`工具类
  * 新增`getOptions(): CutOptions | null`方法获取组件当前的内部参数。
  * 重载`cut(opt?: { maxPixel?: number, encoderOptions?: number, format?: string }): ClipResult | null`方法来裁剪图片。  

#### :house: Optimize
* `Utils`工具类
  * `rotate (angle: number, animation = false): number | void`方法增加了返回值，表示图片旋转后的绝对逆时针角度。 
  * `setFlipV(animation?: boolean): boolean | void`方法增加了返回值，表示图片垂直翻转后的翻转状态，true (翻转)，false (原始)。 
  * `setFlipH(animation?: boolean): boolean | void`方法增加了返回值，表示图片水平翻转后的翻转状态，true (翻转)，false (原始)。 

## 2.0.11 (2020-07-16)

#### :rocket: New Features
* `Utils`工具类
  * 新增`rotateTo (angle: number, animation = false): void`方法来旋转图片到指定角度。 

## 2.0.10 (2020-07-16)

#### :rocket: New Features
* `Utils`工具类
* 新增`reset(): void`方法来重置图片状态。

## 2.0.9 (2020-07-15)

#### :house: Optimize
* 对ie9做了requestAnimationFrame、cancelAnimationFrame兼容处理

## 2.0.8 (2020-07-12)

#### :rocket: New Features
* `Utils`工具类
  * 新增`setMaskRound(isRound = true): void`方法来设置裁剪框是圆形还是矩形。

#### :bug: Bug Fix
* `Utils`
  * 修复`setFlip`方法使用无效的问题。

#### :house: Optimize
* `VuePictureCutMask`
  * 内部优化
  
#### :memo: Documentation
* 更新文档。

## 2.0.7 (2020-07-12)

#### :bug: Bug Fix
* `Utils`
  * 紧急修复了一些问题。
  
#### :memo: Documentation
* 完善文档。

## 2.0.4 (2020-07-12)

#### :rocket: New Features
* `Utils`工具类
  * 将控件操作进行二次封装，以便用户能够更加灵活的自定义菜单，特别是有特定需求的时候。

#### :house: Optimize
* `VuePictureCut`
  * 图片翻转加入了动画效果

#### :bug: Bug Fix
* `VuePictureCutMenu`
  * 修复了一些问题。

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
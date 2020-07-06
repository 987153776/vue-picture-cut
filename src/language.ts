const config = {
  ZN: {
    'download': '点击下载',
    'Select Picture': '选择图片',
    'Select': '选择',
    'Please select': '请选择',
    'Perform zoom': '执行缩放',
    'Rectangle': '矩形',
    'Ellipse': '椭圆',
    'Unchangeable': '不可改变',
    'Changeable': '可改变',
    'Canvas bgColor': '画布背景色',
    'Mask color': '遮罩颜色',
    'CropBox color': '裁剪框颜色',
    'Menu theme': '菜单栏主题',
    'CropBox shape': '裁剪框形状',
    'CropBox size': '裁剪框尺寸',
    'Scaling factor': '缩放系数',
    'Initial angle': '初始角度',
    'Cropped width': '裁剪比例宽',
    'Cropped height': '裁剪比例高',
    'Max pixels': '裁剪长边像素',
    'compressibility': '图片压缩率',
    'Export format': '裁剪图片格式',
    'preview': '预览',
    'auto': '自由',
    'raw': '原始',
    'Rotate': '旋转',
    'Cancel': '取消',
    'Ok': '确定'
  }
};

export default function (lang: string, key: string): string {
  return config[lang] && config[lang][key] || key;
}
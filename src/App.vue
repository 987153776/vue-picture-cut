<template>
  <div id="app">
    <div class="link-box">
      <a href="https://github.com/987153776/vue-picture-cut" target="_blank" type="primary">
        <svg class="octicon octicon-mark-github v-align-middle" height="28" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
          <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
        <span>github</span>
      </a>
      <a href="https://gitee.com/light-year/vue-picture-cut" target="_blank" type="primary">
        <img height="28" width="95" src="https://gitee.com/static/images/logo-black.svg?t=158106664"/>
      </a>
    </div>
    <!--基本使用-->
<!--    <vue-picture-cut class="cut" :src="src"-->
<!--                     :init-angle="form.initAngle"-->
<!--                     :rotate-control="form.rotateControl"-->
<!--                     :msk-option="mskOption"-->
<!--                     :max-pixel="form.maxPixel"-->
<!--                     :encoder-options="form.encoderOptions"-->
<!--                     :format="form.format"-->
<!--                     @on-change="cutChange"/>-->
    <!--自定义菜单-->
    <vue-picture-cut class="cut" :src="src"
                     :init-angle="form.initAngle"
                     :msk-option="mskOption">
      <vue-picture-cut-menu slot="menu"
                            :cancel="false"
                            :max-pixel="form.maxPixel"
                            :encoder-options="form.encoderOptions"
                            :format="form.format"
                            @on-change="cutChange"/>
    </vue-picture-cut>
    <el-form style="margin-top: 15px;" ref="form" :model="form" label-width="110px" inline>
      <el-form-item label="预览:" label-width="70px">
        <a class="download-img"
           :download="'vue-picture-cut.' + form.format.replace('image/', '')"
           :href="base64"
           :style="{'background-image': `url(${newSrc})`}">
          点击下载
        </a>
      </el-form-item>
      <el-form-item label="🙄选择图片:">
        <el-upload class="upload-demo"
                   action=""
                   accept="image/*"
                   :show-file-list="false"
                   :on-change="inputChange">
          <el-button size="small" type="primary">选择</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="😁裁剪框形状:">
        <el-radio-group v-model="form.isRound">
          <el-radio :label="false">矩形</el-radio>
          <el-radio :label="true">椭圆</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="😂裁剪框尺寸:">
        <el-radio-group v-model="form.resize">
          <el-radio :label="false">不可改变</el-radio>
          <el-radio :label="true">可改变</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="😉旋转控件:">
        <el-checkbox v-model="form.rotateControl"></el-checkbox>
      </el-form-item>
      <el-form-item label="😎初始角度:">
        <el-input-number v-model="form.initAngle" placeholder="auto"></el-input-number>
      </el-form-item>
      <el-form-item label="😙裁剪比例宽:">
        <el-input-number :min="1" v-model="form.width" placeholder="1"></el-input-number>
      </el-form-item>
      <el-form-item label="😪裁剪比例高:">
        <el-input-number :min="1" v-model="form.height" placeholder="1"></el-input-number>
      </el-form-item>
      <el-form-item label="🤑裁剪长边像素:" label-width="124px">
        <el-input-number :min="1" v-model="form.maxPixel" placeholder="auto"></el-input-number>
      </el-form-item>
      <el-form-item label="👑图片压缩率:">
        <el-input-number :min="0" :max="1" :step="0.1" v-model="form.encoderOptions" placeholder="0.8"></el-input-number>
      </el-form-item>
      <el-form-item label="😍裁剪图片格式:" label-width="124px">
        <el-select v-model="form.format" placeholder="请选择">
          <el-option label="jpeg格式" value="image/jpeg"/>
          <el-option label="png格式" value="image/png"/>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface MskOption {
  width?: number;
  height?: number;
  isRound?: boolean;
  resize?: boolean;
}

@Component
export default class App extends Vue {

  private src: string | null = null;
  private blob: Blob | null = null;
  private base64: string | null = null;

  private form = {
    isRound: true,
    resize: true,
    rotateControl: true,
    initAngle: undefined,
    width: 4,
    height: 5,
    maxPixel: undefined,
    encoderOptions: 0.8,
    format: 'image/jpeg'
  }

  get mskOption(): MskOption {
    return {
      width: this.form.width || 1,
      height: this.form.height || 1,
      isRound: this.form.isRound,
      resize: this.form.resize
    }
  }

  get newSrc(): string {
    return this.blob ? URL.createObjectURL(this.blob) : '';
  }

  inputChange ({ raw }: { raw: File }): void{
    this.src = URL.createObjectURL(raw);
  }

  cutChange({ blob, base64 }: {blob: Blob; base64: string}): void{
    this.blob = blob;
    this.base64 = base64;
  }
}
</script>

<style lang="scss">
@import "./reset.scss";

#app{
  width: 100%;
  max-width: 1000px;
  padding: 20px 20px;
  margin: 0 auto;
}

.link-box{
  line-height: 28px;
  height: 28px;
  margin-bottom: 20px;
  color: #000;
  a{
    display: inline-block;
    line-height: 28px;
    height: 28px;
    margin-right: 20px;
    vertical-align: top;
    svg{
      display: inline-block;
      vertical-align: top;
    }
    span{
      display: inline-block;
      margin-left: 5px;
      line-height: 32px;
      height: 32px;
      vertical-align: top;
      font-weight: bolder;
      font-size: 22px;
    }
  }
}

.cut{
  width: 100%;
  height: 480px !important;
  max-width: 1000px;
  outline: 1px solid #000;
}
.download-img{
  display: block;
  width: 90px;
  height: 90px;
  border: 1px solid #000;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  color: #777;
  font-size: 12px;
  text-align: center;
  line-height: 88px;
  img{
    width: 100%;
    height: 100%;
  }
}
.el-form-item{
  margin-bottom: 10px !important;
}
</style>

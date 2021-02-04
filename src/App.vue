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
      <div class="language">
        <span :class="{active: language === 'EN'}" @click="language = 'EN'">English</span>
        <i></i>
        <span :class="{active: language === 'ZN'}" @click="language = 'ZN'">中文</span>
      </div>
    </div>
    <!--基本使用-->
<!--    <vue-picture-cut-->
<!--      ref="pictureCut"-->
<!--      class="cut" :src="src"-->
<!--      :init-angle="form.initAngle"-->
<!--      :rotate-control="form.rotateControl"-->
<!--      :msk-option="mskOption"-->
<!--      :max-pixel="form.maxPixel"-->
<!--      :encoder-options="form.encoderOptions"-->
<!--      :format="form.format"-->
<!--      @on-change="cutChange"-->
<!--    />-->
    <!--自定义菜单-->
    <vue-picture-cut
      ref="pictureCut"
      class="cut"
      :src="src"
      :init-angle="form.initAngle"
      :msk-option="mskOption"
      :background-color="form.backgroundColor">
      <vue-picture-cut-menu
        slot="menu"
        :max-pixel="form.maxPixel"
        :encoder-options="form.encoderOptions"
        :format="form.format"
        :theme="form.menuTheme"
        :size-auto-name="config(language, 'auto')"
        :size-raw-name="config(language, 'raw')"
        :menu-rotate-name="config(language, 'Rotate')"
        :cancel-name="config(language, 'Cancel')"
        :confirm-name="config(language, 'Ok')"
        @on-change="cutChange"
      />
    </vue-picture-cut>
    <!--单独使用vuePictureCutMenu-->
    <vue-picture-cut-menu
      class="cut-menu"
      :root="pictureCut"
      :max-pixel="form.maxPixel"
      :encoder-options="form.encoderOptions"
      :format="form.format"
      :theme="form.menuTheme"
      :size-auto-name="config(language, 'auto')"
      :size-raw-name="config(language, 'raw')"
      :menu-rotate-name="config(language, 'Rotate')"
      :cancel-name="config(language, 'Cancel')"
      :confirm-name="config(language, 'Ok')"
      @on-change="cutChange"
    />

    <el-alert :closable="false" type="success" effect="dark">
      {{ config(language, 'Now you can use the "utils" object to manipulate plug-ins in the browser console.') }}
    </el-alert>

    <el-form style="margin-top: 15px;" ref="form" :model="form" label-width="140px" inline>
      <el-form-item :label="config(language, 'preview') + ':'" label-width="70px">
        <a class="download-img"
           :download="'vue-picture-cut.' + form.format.replace('image/', '')"
           :href="base64"
           :style="{'background-image': `url(${base64})`}">
          {{ config(language, 'download') }}
        </a>
      </el-form-item>
      <el-form-item :label="'🙄' + config(language, 'Select Picture') + ':'">
        <el-upload
          class="upload-demo"
          action=""
          accept="image/*"
          :show-file-list="false"
          :before-upload="inputChange">
          <el-button size="small" type="primary">{{ config(language, 'Select') }}</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item :label="'😱' + config(language, 'reset') + ':'">
        <el-button size="small" type="primary" @click="reset">{{ config(language, 'do') }}</el-button>
      </el-form-item>
      <el-form-item :label="'😱' + config(language, 'Canvas bgColor') + ':'">
        <el-color-picker v-model="form.backgroundColor" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item :label="'😴' + config(language, 'Mask color') + ':'">
        <el-color-picker v-model="form.maskColor" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item :label="'🤔' + config(language, 'CropBox color') + ':'">
        <el-color-picker v-model="form.maskBorderColor" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item :label="'🤗' + config(language, 'Menu theme') + ':'" label-width="124px">
        <el-select v-model="form.menuTheme" :placeholder="config(language, 'Please select')" style="width: 110px">
          <el-option label="default" value="default"/>
          <el-option label="dark" value="dark"/>
          <el-option label="gray" value="gray"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="'😁' + config(language, 'CropBox shape') + ':'">
        <el-radio-group v-model="form.isRound">
          <el-radio :label="false">{{ config(language, 'Rectangle') }}</el-radio>
          <el-radio :label="true">{{ config(language, 'Ellipse') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="'😂' + config(language, 'CropBox size') + ':'">
        <el-radio-group v-model="form.resize">
          <el-radio :label="false">{{ config(language, 'Unchangeable') }}</el-radio>
          <el-radio :label="true">{{ config(language, 'Changeable') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="'😉' + config(language, 'Scaling factor') + ':'">
        <el-input-number v-model="form.zoom" :min="0" :step="0.05"></el-input-number>
        <el-button
          size="mini" type="primary" style="margin-left: 10px"
          @click="$refs['pictureCut'].scale(form.zoom)">
          {{ config(language, 'Perform zoom') }}
        </el-button>
      </el-form-item>
      <el-form-item :label="'😎' + config(language, 'Initial angle') + ':'">
        <el-input-number v-model="form.initAngle" placeholder="auto"></el-input-number>
      </el-form-item>
      <el-form-item :label="'😙' + config(language, 'Cropped width') + ':'">
        <el-input-number :min="1" v-model="form.width" placeholder="1"></el-input-number>
      </el-form-item>
      <el-form-item :label="'😪' + config(language, 'Cropped height') + ':'">
        <el-input-number :min="1" v-model="form.height" placeholder="1"></el-input-number>
      </el-form-item>
      <el-form-item :label="'🤑' + config(language, 'Max pixels') + ':'" label-width="124px">
        <el-input-number :min="1" v-model="form.maxPixel" placeholder="auto"></el-input-number>
      </el-form-item>
      <el-form-item :label="'👑' + config(language, 'compressibility') + ':'">
        <el-input-number :min="0" :max="1" :step="0.1" v-model="form.encoderOptions" placeholder="0.8"></el-input-number>
      </el-form-item>
      <el-form-item :label="'😍' + config(language, 'Export format') + ':'" label-width="124px">
        <el-select v-model="form.format" :placeholder="config(language, 'Please select')" style="width: 110px">
          <el-option label="jpeg" value="image/jpeg"/>
          <el-option label="png" value="image/png"/>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import config from './language';
import { CutInterface } from './lib/views/interface';
import createUtils, { Utils } from './lib/views/Utils';

interface MskOption {
  width?: number;
  height?: number;
  isRound?: boolean;
  resize?: boolean;
  color?: string;
  borderColor?: string;
}

@Component
export default class App extends Vue {

  private config = config;
  private language = 'EN';
  private src: string | null = './demo.jpg';
  private blob: Blob | null = null;
  private base64: string | null = null;

  private pictureCut: CutInterface | null = null;

  private form = {
    backgroundColor: undefined,
    maskColor: undefined,
    maskBorderColor: undefined,
    menuTheme: 'default',
    isRound: true,
    resize: true,
    rotateControl: true,
    zoom: .96,
    initAngle: undefined,
    width: 4,
    height: 5,
    maxPixel: undefined,
    encoderOptions: 0.8,
    format: 'image/jpeg'
  }
  utils!: Utils;

  get mskOption(): MskOption {
    return {
      width: this.form.width || 1,
      height: this.form.height || 1,
      isRound: this.form.isRound,
      resize: this.form.resize,
      color: this.form.maskColor,
      borderColor: this.form.maskBorderColor
    }
  }

  get newSrc(): string {
    return this.blob ? URL.createObjectURL(this.blob) : '';
  }

  /*******生命周期********/
  protected mounted (): void {
    this.pictureCut = this.$refs['pictureCut'] as any as CutInterface;
    this.utils = (window as any).utils = createUtils(this.pictureCut);
  }

  inputChange (file: File): boolean {
    this.src = URL.createObjectURL(file);
    return false;
  }

  cutChange({ blob, base64 }: {blob: Blob; base64: string}): void{
    this.blob = blob;
    this.base64 = base64;
  }

  reset(): void{
    this.utils.reset();
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
  .language{
    float: right;
    span{
      color: #2af;
      cursor: pointer;
      &:hover{
        text-decoration: underline;
      }
      &.active{
        color: #333;
        cursor: default;
        &:hover{
          text-decoration: none;
        }
      }
    }
    i{
      display: inline-block;
      width: 2px;
      height: 10px;
      border-left: 2px solid #aaa;
      margin: 0 8px;
    }
  }
}

.cut{
  width: 100%;
  height: 480px !important;
  max-width: 1000px;
  outline: 1px solid #000;
  margin-bottom: 20px;
}

.cut-menu{
  outline: 1px solid #000;
  margin-bottom: 20px;
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

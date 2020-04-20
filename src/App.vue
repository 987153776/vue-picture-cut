<template>
  <div id="app">
    <input type="file" accept="image/*" @change="inputChange"/>
    <a download="xxx.jpeg" :href="base64" :style="{'background-image': `url(${base64})`}">处理后预览</a>
    <vue-picture-cut class="cut" :src="src" @on-change="cutChange"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {

    private src: string | null = null;
    private blob: Blob | null = null;
    private base64: string | null = null;

    inputChange (e: Event) {
        const file = ((e.target as HTMLInputElement).files as FileList)[0];
        this.src = URL.createObjectURL((file));
    }

    cutChange({ blob, base64 }: {blob: Blob; base64: string}) {
        this.blob = blob;
        this.base64 = base64;
    }
}
</script>

<style lang="scss">
  html,body{
    margin: 0;
    padding: 0;
  }
  #app {
    & > input{
      display: inline-block;
    }
    & > a{
      display: inline-block;
      width: 90px;
      height: 90px;
      border: 1px solid #000;
      background-repeat: no-repeat;
      background-size: contain;
      color: #777;
      font-size: 12px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .cut{
    width: 90vw !important;
    height: 70vh !important;
    margin: 10px 0 0 5vw;
    outline: 1px solid #000;
  }
</style>

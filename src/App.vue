<template>
  <div id="app">
    <vue-picture-cut :show="true"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
  html,body{
    margin: 0;
    padding: 0;
  }
  #app {
    width: 90vw;
    height: 90vh;
    margin: 5vh 5vw;
    outline: 1px solid #000;
  }
</style>

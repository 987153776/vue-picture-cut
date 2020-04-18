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
    width: 100vw;
    height: 100vh;
  }
</style>

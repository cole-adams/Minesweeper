<template>
  <div id="app">
    <Game/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Game from './components/Game.vue';


@Component({
  components: {
    Game,
  },
})
export default class App extends Vue {}
</script>

<style>

body {
  --primary: #03a9f4;
  --primary-light: #B3E5FC;
  --primary-dark: #0288D1;
  --text: #FFFFFF;
  --accent: #FF4081;
  --primary-text: #212121;
  --secondary-text: #757575;
  --divider-color: #BDBDBD;
  background-color: var(--primary);
  font-family: 'Roboto', sans-serif;
}
</style>

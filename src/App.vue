<template>
  <div id="app">
    <app-header />
    <stuff/>
  </div>
</template>

<script>
import Header from './components/Header';
import Stuff from './components/Stuff';

export default {
  name: 'app',
  components: {
    'app-header': Header,
    Stuff,
  },
};
</script>

<style lang="scss">
  $fa-font-path: "~font-awesome/fonts";
  @import "~bootstrap/scss/bootstrap";
  @import "~font-awesome/scss/font-awesome";
</style>

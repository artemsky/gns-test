<template>
  <div id="app">
    <app-header></app-header>
    <HelloWorld/>
  </div>
</template>

<script>
import Header from './components/Header';

export default {
  name: 'app',
  components: {
    'app-header': Header,
  },
};
</script>

<style lang="scss">
  @import "~bootstrap/scss/bootstrap";
</style>

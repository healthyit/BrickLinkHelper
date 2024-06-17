<template>
  <MenuBar />
  <section class="section m-0 p-5" style="min-height: 70vh;">
  <router-view />
  </section>
  <FooterBar />
</template>

<script>
import MenuBar from '@/components/MenuBar.vue';
import FooterBar from '@/components/FooterBar.vue';

export default {
  name: 'App',
  components: {
    MenuBar,
    FooterBar
  }
}

</script>

<style>
#app {
  background-color: #f7f7ffff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  min-height: 95dvh;
}
</style>

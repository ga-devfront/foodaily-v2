<template>
    <main class="container center column spaceBottom">
      <SearchBar />
      <Features />
    </main>
</template>

<script>
import SearchBar from './SearchBar.vue';
import Features from './Features.vue';

export default {
  name: 'myMain',
  components: {
    SearchBar,
    Features,
  },
};
</script>

<style scoped>
main {
    position: relative;
    min-height: 100%;
    -webkit-transition: ease 1s;
    transition: ease 1s;
}
</style>

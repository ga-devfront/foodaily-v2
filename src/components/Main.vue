<template>
    <main class="container center column spaceBottom">
      <SearchBar />
    </main>
</template>

<script>
import SearchBar from './SearchBar.vue';

export default {
  name: 'myMain',
  components: {
    SearchBar,
  },
};
</script>

<style scoped>
main {
    position: relative;
    bottom: -40px;
    min-height: 100%;
    -webkit-transition: ease 1s;
    transition: ease 1s;
}
</style>

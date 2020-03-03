<template>
    <div class="container center column">
        <SearchBar v-on:search="emitSearch"/>
        <Features />
    </div>
</template>

<script>
import SearchBar from '../SearchBar.vue';
import Features from '../Features.vue';

export default {
  name: 'Step0',
  components: {
    SearchBar,
    Features,
  },
  methods: {
    emitSearch(value) {
      this.$emit('search', value);
    },
  },
};
</script>

<style scoped>
</style>

<template>
    <div class="container">
        <a class="button white bold" v-on:click="$emit('orderType', 'none')">Clear</a>
        <a class="button white bold" v-on:click="$emit('orderType', 'byAZ')">AZ</a>
        <a class="button white bold" v-on:click="$emit('orderType', 'byZA')">ZA</a>
        <a class="button white bold" v-on:click="$emit('orderType', 'byStarUp')">Star Up</a>
        <a class="button white bold" v-on:click="$emit('orderType', 'byStarDown')">Star Down</a>
    </div>
</template>

<script>
export default {
  name: 'Sort',
  methods: {
  },
};
</script>

<style scoped>
</style>

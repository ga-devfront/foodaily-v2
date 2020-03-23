<template>
    <div class="container around littleSpaceBottom">
        <a class="button white bold" v-on:click="$emit('orderType', 'none')">Aucun</a>
        <a class="button white bold" v-on:click="$emit('orderType', 'byAZ')">A ⇄ Z</a>
        <a class="button white bold" v-on:click="$emit('orderType', 'byZA')">Z ⇄ A</a>
        <a class="button white bold" v-on:click="$emit('orderType', 'byStarDown')">⇈ ★</a>
        <a class="button white bold" v-on:click="$emit('orderType', 'byStarUp')">⇊ ★</a>
    </div>
</template>

<script>
export default {
  name: 'Sort',
};
</script>

<style scoped>
@media (max-width: 1024px) {
  div {
    font-size: 0.75em;
  }
}
</style>

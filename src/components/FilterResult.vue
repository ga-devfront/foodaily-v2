<template>
    <div class="container around littleSpaceBottom verticalCenter">
        <a class="bold">note : </a>
        <a class="bold">nombre d'avis :
          <input
          type="number"
          id="numberOfAdvise"
          name="numberOfAdvise"
          min="0"
          max="1000">
        </a>
        <a class="button white bold">Appliquer</a>
        <a class="button white bold" v-on:click="$emit('filterType', 'all')">Aucun</a>
    </div>
</template>

<script>
export default {
  name: 'FilterResult',
};
</script>

<style scoped>
</style>

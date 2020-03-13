<template>
    <div class="container around littleSpaceBottom verticalCenter">
      <a class="bold container">Note :
        <div class="container center verticalCenter bodrerRL">
          <div v-for="ref in [0, 1, 2, 3, 4]" class="star"
            @mouseover="mouseInRate(ref)"
            @mouseout="mouseOutRate(ref)"
            @click="setRate(ref)"
            :key="ref"
          >
            <div
              :style="{ width: (ref + 1 <= minRate) ? '20px' : '0px' }"
              class="rate"
              :ref="ref"
            >
            </div>
          </div>
    </div></a>
        <a class="bold">Avis :
          <select v-model="numberOfRate">
  <option :value='10'>plus de 10</option>
  <option :value="50">plus de 50</option>
  <option :value="100">plus de 100</option>
  <option :value="200">plus de 200</option>
</select>
        </a>
        <a
          class="button white bold"
          v-on:click="emitFilter"
        >
        Valider
        </a>
        <a
          class="button white bold"
          v-on:click="reset"
        >
        Aucun
        </a>
    </div>
</template>

<script>
export default {
  name: 'FilterResult',
  data() {
    return {
      numberOfRate: 0,
      minRate: 0,
    };
  },
  methods: {
    reset() {
      this.numberOfRate = 0;
      this.minRate = 0;
      this.emitFilter();
    },
    emitFilter() {
      const filter = [];
      if (this.numberOfRate) {
        filter.push({ type: 'byNumberRating', value: this.numberOfRate });
      }
      if (this.minRate) {
        filter.push({ type: 'byStar', value: this.minRate });
      }
      if (!filter) {
        filter.push({ type: 'all', value: 'null' });
      }
      this.$emit('filter', filter);
    },
    setRate(value) {
      this.minRate = value + 1;
    },
    mouseInRate(value) {
      for (let x = 0; x < value + 1; x += 1) {
        this.$refs[x][0].style.width = '20px';
      }
    },
    mouseOutRate(value) {
      for (let x = 0; x < value + 1; x += 1) {
        if (x + 1 > this.minRate) this.$refs[x][0].style.width = '0px';
      }
    },
  },
};
</script>

<style scoped>
</style>

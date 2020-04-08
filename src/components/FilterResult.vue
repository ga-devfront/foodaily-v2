<template>
    <div class="container around littleSpaceBottom verticalCenter flexWrap">
 <a class="bold">Note entre :
          <select v-model="minRate">
  <option :value='0'>0</option>
  <option :value='1'>1</option>
  <option :value="2">2</option>
  <option :value="3">3</option>
  <option :value="4">4</option>
  <option :value="5">5</option>
</select>
</a>
 <a class="bold"> et
          <select v-model="maxRate">
  <option :value='0'>0</option>
  <option :value='1'>1</option>
  <option :value="2">2</option>
  <option :value="3">3</option>
  <option :value="4">4</option>
  <option :value="5">5</option>
</select>
</a>
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
      maxRate: 5,
    };
  },
  methods: {
    reset() {
      this.numberOfRate = 0;
      this.minRate = 0;
      this.maxRate = 5;
      this.emitFilter();
    },
    emitFilter() {
      const filter = [];
      if (this.numberOfRate) {
        filter.push({ type: 'byNumberRating', value: this.numberOfRate });
      }
      if (this.minRate || this.maxRate < 5) {
        filter.push({ type: 'byStar', value: { minRate: this.minRate, maxRate: this.maxRate } });
      }
      if (!filter) {
        filter.push({ type: 'all', value: 'null' });
      }
      this.$emit('filter', filter);
    },
    setMinRate(value) {
      this.minRate = value + 1;
    },
    setMaxRate(value) {
      this.maxRate = value + 1;
    },
    mouseInMinRate(value) {
      for (let x = 0; x < value + 1; x += 1) {
        this.$refs[x][0].style.width = '20px';
      }
    },
    mouseOutMinRate(value) {
      for (let x = 0; x < value + 1; x += 1) {
        if (x + 1 > this.minRate) this.$refs[x][0].style.width = '0px';
      }
    },
    mouseInMaxRate(value) {
      for (let x = 0; x < value + 1; x += 1) {
        this.$refs[x][0].style.width = '0px';
      }
    },
    mouseOutMaxRate(value) {
      for (let x = 0; x < value + 1; x += 1) {
        if (x + 1 > this.minRate) this.$refs[x][0].style.width = '20px';
      }
    },
  },
};
</script>

<style scoped>
@media (max-width: 1024px) {
  a {
    margin-bottom: 10px;
  }
}
</style>

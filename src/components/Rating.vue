<template>
    <div class="container verticalCenter">
        <div class="star" v-for="star in [1, 2, 3, 4, 5]" :key="star">
          <div class="rate" :ref="star" :style="getRatePercentage(star)"></div>
        </div>
        <a v-if="rateCount">({{rateCount}})</a>
    </div>
</template>

<script>

export default {
  name: 'Rating',
  props: {
    review: {
      type: Boolean,
      required: false,
    },
    rate: {
      type: Number,
      required: true,
    },
    rateCount: {
      type: Number,
      required: false,
    },
  },
  computed: {
  },
  methods: {
    getRatePercentage(ref) {
      if (!this.rate) return 'width: 0px';
      const rateIn100 = this.rate * 20;
      const star = rateIn100 - (20 * ref);
      if (star > -19) {
        if (star >= 0) return 'width: 20px';

        const calc = star + 20;
        return `width: ${calc}px`;
      }
      return 'width: 0px';
    },
  },
};
</script>

<style scoped>
</style>

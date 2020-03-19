<template>
    <div class="container verticalCenter">
        <div class="star"><div class="rate" :ref="1" style="width: 0px"></div></div>
        <div class="star"><div class="rate" :ref="2"></div></div>
        <div class="star"><div class="rate" :ref="3"></div></div>
        <div class="star"><div class="rate" :ref="4"></div></div>
        <div class="star"><div class="rate" :ref="5"></div></div>
        <a v-if="!reviewTest">({{rateNumber}})</a>
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
    restaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rate: this.restaurant.rating,
      numberOfRate: this.restaurant.user_ratings_total,
    };
  },
  computed: {
    reviewTest() {
      if (this.review === true) return true;
      return false;
    },
    rateNumber() {
      if (!this.numberOfRate) return '?';
      return this.numberOfRate;
    },
  },
  methods: {
    setRating(ref) {
      if (!this.rate) return;
      const rateIn100 = this.rate * 20;
      const star = rateIn100 - (20 * ref);
      if (star > -19) {
        if (star >= 0) {
          this.$refs[ref].style = 'width: 20px';
        } else {
          const calc = star + 20;
          this.$refs[ref].style = `width: ${calc}px`;
        }
      }
    },
  },
  mounted() {
    for (let y = 1; y < 6; y += 1) {
      this.setRating(y);
    }
  },
};
</script>

<style scoped>
</style>

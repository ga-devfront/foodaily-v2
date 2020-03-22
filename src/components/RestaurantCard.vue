<template>
    <div class="container between littleRestaurant">
      <div class="container containerImg">
        <img :src="getImg"/>
      </div>
      <article class="description">
        <h3>{{restaurant.name}}</h3>
        <p>{{restaurant.vicinity}}</p>
        <div class="container around">
          <Rating :rate="restaurant.rating" :rateCount="restaurantRateCount"/>
          <a class="button bold white" v-on:click="$emit('restaurant', restaurant)">Détails ▶</a>
        </div>
      </article>
    </div>
</template>

<script>
import NoImg from '../assets/noPicture.jpg';
import Rating from './Rating.vue';

export default {
  name: 'RestaurantCard',
  components: {
    Rating,
  },
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },
  computed: {
    restaurantRateCount() {
      const rateCount = this.$store.getters.restaurant({
        dataType: 'summary',
        id: this.restaurant.id,
      }).user_ratings_total;
      // eslint-disable-next-line no-unneeded-ternary
      return (rateCount) ? rateCount : '0';
    },
    getImg() {
      if (!this.restaurant.photos) return NoImg;
      if (typeof this.restaurant.photos[0].getUrl === 'function') {
        return this.restaurant.photos[0].getUrl();
      } if (typeof this.restaurant.photos[0].getUrl === 'string') {
        return this.restaurant.photos[0].getUrl;
      } return NoImg;
    },
  },
  methods: {
  },
};
</script>

<style scoped>
p {
  margin-block-end: 0.5em;
  margin-block-start: 0.5em;
}

.littleRestaurant {
    width: 500px;
    height: 130px;
    background-color: #ffffff;
    border: solid 2px #ffffff;
    box-shadow: 2px 2px 0px 5px #0063bf;
    border-radius: 25px;
    margin-bottom: 20px;
    overflow: hidden;
}

.littleRestaurant .containerImg {
    width: 160px;
    height: 130px;
    overflow: hidden;
}

.containerImg img {
        max-width:100%;
        height:auto;
}

.littleRestaurant .description {
    width: 310px;
}
</style>

<template>
    <div class="container column review">
        <div class="container verticalCenter spaceRL">
            <p class="bold spaceRL">{{review.author_name}}</p>
            <p class="spaceRL"><Rating :rate="review.rating"/></p>
        </div>
        <p class="spaceRL">{{review.text}}</p>
    </div>
</template>

<script>
import Rating from './Rating.vue';

export default {
  name: 'Review',
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
  components: {
    Rating,
  },
};
</script>

<style scoped>
.review {
    width: 800px;
  border-radius: 25px;
  min-height: 80px;
  background-color: #ffffff;
  border: solid 2px #0063bf;
  margin-bottom: 10px;
}

@media (max-width: 1024px) {
  .review {
    width: 95%;
  }
}
</style>

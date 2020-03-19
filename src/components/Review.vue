<template>
    <div class="container column review">
        <div class="container verticalCenter bodrerRL">
            <p class="bold bodrerRL">{{review.author_name}}</p>
            <p class="bodrerRL"><Rating :restaurant="review" :review="true" /></p>
        </div>
        <p class="bodrerRL">{{review.text}}</p>
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
</style>

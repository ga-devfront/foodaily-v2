<template>
    <div class="container between littleRestaurant">
    </div>
</template>

<script>
export default {
  name: 'restaurantCard',
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
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

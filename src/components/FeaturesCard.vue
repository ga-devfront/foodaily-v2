<template>
    <article class="card">
        <aside class="circle">
          <p>{{card.title}}</p>
          <img :src="card.img" />
        </aside>
        <p>{{card.presentation}}</p>
    </article>
</template>

<script>
export default {
  name: 'FeaturesCard',
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
    width: 175px;
    text-align: center;
    margin: 0px 100px 0px 100px;
}

.circle {
    height: 175px;
    width: 175px;
    background-color: #0067c0;
    -webkit-clip-path: circle(50% at 50% 50%);
    clip-path: circle(50% at 50% 50%);
}

.circle p {
    padding-top: 40px;
    margin-bottom: 0;
    color: #ffffff;
    font-size: 1.8em;
    text-align: center;
}

.circle img {
    -webkit-transition: 1s ease;
    transition: 1s ease;
}

.circle:hover img {
    -webkit-transform: scale(0.8) translateY(15px);
    transform: scale(0.8) translateY(15px);
}
</style>

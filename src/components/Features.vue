<template>
    <section class="container center spaceTop flexWrap">
      <FeaturesCard v-for="card in cards" :card="card" :key="card.title"/>
    </section>
</template>

<script>
import Decouvrir from '../assets/decouvrir.png';
import Reserver from '../assets/reserver.png';
import Noter from '../assets/noter.png';
import FeaturesCard from './FeaturesCard.vue';

export default {
  name: 'Features',
  components: {
    FeaturesCard,
  },
  data() {
    return {
      cards: [
        {
          title: 'decouvrir',
          img: Decouvrir,
          presentation: 'Decouvrez de nouveaux restaurants allant de la cuisine asiatique à la gastronomie française en passant par la streetfood amériquaine.',
        },
        {
          title: 'reserver',
          img: Reserver,
          presentation: 'Réservez votre table en ligne dans des restaurants du monde entier et profitez d’offres exclusives à Foodaily !',
        },
        {
          title: 'noter',
          img: Noter,
          presentation: 'Donnez votre avis et notez votre repas afin d’aider les autres utilisateurs à ce faire un avis sur le restaurant avant même d’y être aller !',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>

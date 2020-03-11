<template>
    <section class="container center column verticalCenter">
      <aside id="resultName" class="container verticalCenter column center spaceBottom">
        <p class="big white bold">Restaurants à {{research.locality}}</p>
      </aside>
      <article class="container center column width75">
        <aside class="container between spaceBottom">
          <!-- eslint-disable-next-line -->
          <a 
          class="bold white button"
          v-on:click="$emit('return')"
          >← Retour</a>
          <p id="resultNumber" class="bold">{{results.length}} restaurants</p>
        </aside>
        <section class="container around">
          <Map
          :restaurants="results"
          :research="city" class="spaceRight"
          v-on:newRestaurant="addRestaurant"/>
          <section id="resultList" class="container column center">
            <a class="bold white button littleSpaceBottom dropdown">☵ Filtrer</a>
            <a class="bold white button littleSpaceBottom dropdown">⇆ Trier</a>
            <transition-group name="fade2" mode="out-in">
              <RestaurantCard
              v-for="restaurant in results"
              :restaurant="restaurant"
              :key="restaurant.name"
              />
            </transition-group>
          </section>
        </section>
      </article>
    </section>
</template>

<script>
import Map from '../Map.vue';
import RestaurantCard from '../RestaurantCard.vue';

export default {
  name: 'Step1',
  components: {
    Map,
    RestaurantCard,
  },
  props: {
    research: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      city: this.research,
      results: [],
    };
  },
  methods: {
    addRestaurant(value) {
      this.results.push(value);
    },
  },
  created() {
    /* eslint-disable-next-line */
    const pos = new google.maps.LatLng(this.city.latitude,this.city.longitude);
    const request = {
      location: pos,
      radius: '500',
      type: ['restaurant'],
    };
    /* eslint-disable-next-line */
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch(request, (results, status, pagination) => {
      /* eslint-disable-next-line */
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.results.push(...results);
        pagination.nextPage();
      }
    });
  },
};
</script>

<style scoped>
#resultName {
    width: 100%;
    background: url("../../assets/resultBackground.jpg");
    height: 150px;
}

#resultNumber {
    line-height: 80%;
    color: #222222;
    font-style: italic;
}

.width75 {
  min-width: 75%;
}

.fade2-enter-active, .fade2-leave-active {
  transition: opacity .5s ease;
}
.fade2-enter, .fade2-leave-to
/* .component-fade-leave-active avant la 2.1.8 */ {
  opacity: 0;
}

.button {
  position: relative;
}

.button.dropdown::after {
  content: "▼";
  color: #ffffff;
  position: absolute;
  top: auto;
  right: 10px;
}
</style>

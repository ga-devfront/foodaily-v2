<template>
    <section class="container center column verticalCenter">
      <aside id="resultName" class="container verticalCenter column center spaceBottom">
        <p class="big white bold">Restaurants à {{research.locality}}</p>
      </aside>
      <article class="container center column width75">
        <aside class="container between spaceBottom">
          <a
          class="bold white button"
          v-on:click="$emit('return')"
          >← Retour</a>
          <p id="resultNumber" class="bold">{{displayedRestaurants.length}} restaurants</p>
        </aside>
        <section class="container around flexWrap">
          <Map
          :restaurants="displayedRestaurants"
          :research="city" class="spaceRight"
          v-on:restaurant="emitRestaurant"
          />
          <section id="resultList" class="container column center">
            <a
              class="container bold white button littleSpaceBottom between z1"
              v-on:click="displayFilter()"><a>☵ Filtrer</a>
              <a v-if="!filterOption">◀</a><a v-if="filterOption">▼</a>
            </a>
            <transition name="option" mode="out-in">
            <FilterResult v-if="filterOption" v-on:filter="changeFilter"/>
            </transition>
            <a
              class="container bold white button littleSpaceBottom between z1"
              v-on:click="displaySort()"><a>⇆ Trier</a>
              <a v-if="!sortOption">◀</a><a v-if="sortOption">▼</a>
            </a>
            <transition name="option" mode="out-in">
            <Sort v-if="sortOption" v-on:orderType="changeOrderType"/>
            </transition>
            <transition-group name="fade2" mode="out-in">
              <RestaurantCard
              v-for="restaurant in displayedRestaurants"
              :restaurant="restaurant"
              :key="restaurant.name"
              v-on:restaurant="emitRestaurant"
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
import FilterResult from '../FilterResult.vue';
import Sort from '../Sort.vue';

export default {
  name: 'Step1',
  components: {
    Map,
    RestaurantCard,
    FilterResult,
    Sort,
  },
  props: {
    research: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      filterOption: false,
      sortOption: false,
      city: this.research,
      orders: {
        none(restaurants) {
          return restaurants;
        },
        byAZ(restaurants) {
          // eslint-disable-next-line max-len
          return restaurants.sort((a, b) => ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1));
        },
        byZA(restaurants) {
          // eslint-disable-next-line max-len
          return restaurants.sort((a, b) => ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)).reverse();
        },
        byStarUp(restaurants) {
          return restaurants.sort((a, b) => ((a.rating > b.rating) ? 1 : -1));
        },
        byStarDown(restaurants) {
          return restaurants.sort((a, b) => ((a.rating > b.rating) ? 1 : -1)).reverse();
        },
      },
      orderType: 'none',
      filters: {
        all(restaurants) {
          return restaurants.filter(() => true);
        },
        byStar(restaurants, star) {
          return restaurants.filter((restaurant) => restaurant.rating > star);
        },
        byNumberRating(restaurants, number) {
          return restaurants.filter((restaurant) => restaurant.user_ratings_total > number);
        },
      },
      filter: [
        {
          type: 'all',
          value: 'null',
        },
      ],
    };
  },
  computed: {
    displayedRestaurants() {
      let restaurants = Object.values(this.$store.state.restaurants.summary);
      this.filter.forEach((filter) => {
        restaurants = this.filters[filter.type](restaurants, filter.value);
      });
      return this.orders[this.orderType](restaurants);
    },
  },
  methods: {
    emitRestaurant(value) {
      this.$emit('restaurant', value);
    },
    changeOrderType(value) {
      this.orderType = value;
    },
    changeFilter(value) {
      this.filter = value;
    },
    displayFilter() {
      this.filterOption = !this.filterOption;
    },
    displaySort() {
      this.sortOption = !this.sortOption;
    },
  },
  created() {
    /* eslint-disable-next-line */
    const pos = new google.maps.LatLng(this.city.latitude,this.city.longitude);
    const request = {
      location: pos,
      radius: '800',
      type: ['restaurant'],
    };
    /* eslint-disable-next-line */
      const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch(request, (results, status, pagination) => {
      /* eslint-disable-next-line */
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        results.forEach((restaurant) => {
          this.$store.commit({ type: 'addRestaurant', dataType: 'summary', restaurant });
        });
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
.fade2-enter, .fade2-leave-to {
  opacity: 0;
}

.option-enter-active, .option-leave-active {
  transition: .3s ease;
}
.option-enter, .option-leave-to {
  margin-top: -48px;
  opacity: 0;
}

.button {
  position: relative;
}

.z1 {
  position: relative;
  z-index: 1;
}

@media (max-width: 1024px) {
  .width75 {
    max-width: 95%;
  }
}
</style>

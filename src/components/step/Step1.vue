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
          <p id="resultNumber" class="bold">{{restaurants.length}} restaurants</p>
        </aside>
        <section class="container around">
          <Map
          :restaurants="restaurants"
          :research="city" class="spaceRight"
          v-on:newRestaurant="addRestaurant"/>
          <section id="resultList" class="container column center">
            <a
              class="container bold white button littleSpaceBottom between z1"
              v-on:click="displayFilter()"><a>☵ Filtrer</a>
              <a v-if="!filterOption">◀</a><a v-if="filterOption">▼</a>
            </a>
            <transition name="option" mode="out-in">
            <FilterResult v-if="filterOption"/>
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
      restaurants: [],
      orders: {
        none(restaurants) {
          return restaurants;
        },
        byAZ(restaurants) {
          // eslint-disable-next-line
          return restaurants.sort((a, b) => ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1));
        },
        byZA(restaurants) {
          // eslint-disable-next-line
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
          return restaurants.filter((restaurant) => restaurant.rating > number);
        },
      },
      filterType: ['all'],
      filterValue: null,
    };
  },
  computed: {
    displayedRestaurants() {
      let { restaurants } = this;
      this.filterType.forEach((filter) => {
        restaurants = this.filters[filter](restaurants);
      });
      return this.orders[this.orderType](restaurants);
    },
  },
  methods: {
    changeOrderType(value) {
      this.orderType = value;
    },
    changeFilterType(value) {
      this.filterType = [value];
    },
    addRestaurant(value) {
      this.restaurants.push(value);
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
      radius: '500',
      type: ['restaurant'],
    };
    /* eslint-disable-next-line */
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch(request, (results, status, pagination) => {
      /* eslint-disable-next-line */
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.restaurants.push(...results);
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
  transition: .5s ease-in-out;
}
.option-enter, .option-leave-to {
  transform: translate(0px, -48px);
  opacity: 0;
}

.button {
  position: relative;
}

.z1 {
  position: relative;
  z-index: 1;
}
</style>

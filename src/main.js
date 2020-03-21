import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    restaurants: {
      summary: [],
      details: [],
    },
  },
  mutations: {
    addRestaurant(state, settings) {
      // eslint-disable-next-line
      if (store.getters.restaurantIndex({
        dataType: settings.dataType,
        id: settings.restaurant.id,
      }) === -1) {
        state.restaurants[settings.dataType].push(settings.restaurant);
      }
    },
    resetRestaurants(state, settings) {
      // eslint-disable-next-line
      state.restaurants[settings.dataType] = [];
    },
    addReview(state, settings) {
      const summaryIndex = store.getters.restaurantIndex({ dataType: 'summary', id: settings.restaurant.id });
      const detailsIndex = store.getters.restaurantIndex({ dataType: 'details', id: settings.restaurant.id });
      state.restaurants.details[detailsIndex].reviews.push(settings.review);
      /* eslint-disable no-param-reassign */
      state.restaurants.summary[summaryIndex].rating = (state.restaurants.summary[summaryIndex].user_ratings_total * state.restaurants.summary[summaryIndex].rating + settings.review.rating) / (state.restaurants.summary[summaryIndex].user_ratings_total + 1);
      state.restaurants.summary[summaryIndex].user_ratings_total += 1;
      /* eslint-enable no-param-reassign */
    },
  },
  getters: {
    /* eslint-disable max-len */
    restaurantIndex: (state) => (settings) => state.restaurants[settings.dataType].findIndex((i) => i.id === settings.id),
    restaurant: (state) => (settings) => state.restaurants[settings.dataType][store.getters.restaurantIndex({
      dataType: settings.dataType,
      id: settings.id,
    })],
    /* eslint-enable max-len */
  },
});
new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

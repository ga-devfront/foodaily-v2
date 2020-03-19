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
      if (state.restaurants[settings.dataType].findIndex(i => i.id === settings.restaurant.id) === -1) {
        state.restaurants[settings.dataType].push(settings.restaurant);
      }
    },
    resetRestaurants(state, settings) {
      // eslint-disable-next-line
      state.restaurants[settings.dataType] = [];
    },
  },
});
new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

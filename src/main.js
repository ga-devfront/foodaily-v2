import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    restaurants: {
      summary: {},
      details: {},
    },
  },
  mutations: {
    addRestaurant(type, data) {
      this.restaurants[type][data.id] = data;
    },
  },
});
new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

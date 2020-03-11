<template>
    <div id="mapContainer">
      <aside
      class="overlay white container center verticalCenter"
      v-if="newRestaurant"
      >Déplacer l'icone
      <img :src="newIcon" class="bodrerRL"/>
      à l'emplacement du restaurant à ajouter puis validez</aside>
      <div id="map"></div>
      <button
      :ref="restaurantOk"
      class="bold white mapButton"
      v-on:click="creatNewRestaurant()"
      v-if="newRestaurant"
      >Valider</button>
      <button
      :ref="addRestaurant"
      class="bold white mapButton"
      v-on:click="creatNewMarker()"
      v-if="!newRestaurant"
      >✚ ajouter un restaurant</button>
    </div>
</template>

<script>
/* eslint-disable-next-line */
import CustomMap from '../../public/customMap.js';
import MapIcon from '../assets/icon.png';
import NewIcon from '../assets/iconRed.png';

export default {
  name: 'Map',
  props: {
    restaurants: {
      type: Array,
      required: true,
    },
    research: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newRestaurant: false,
      city: this.research,
      results: this.restaurants,
      map: null,
      newIcon: NewIcon,
      newMarker: null,
    };
  },
  watch: {
    results(val) {
      if (val.length) this.setMarker(val);
    },
  },
  methods: {
    setMarker(restaurants) {
      let count = 0;
      restaurants.forEach((place) => {
        count += 1;
        window.setTimeout(() => {
          /* eslint-disable-next-line */
          new google.maps.Marker({
            map: this.map,
            position: place.geometry.location,
            icon: MapIcon,
            title: place.name,
          });
        }, 200 * count);
      });
    },
    async setMap() {
      const researchPos = { lat: this.city.latitude, lng: this.city.longitude };
      /* eslint-disable-next-line */
      const map = await new google.maps.Map(document.getElementById('map'), {
        center: researchPos,
        zoom: 16,
        styles: CustomMap,
      });
      this.map = map;
      if (this.results.length) this.setMarker(this.results);
    },
    creatNewMarker() {
      const researchPos = { lat: this.city.latitude, lng: this.city.longitude };
      /* eslint-disable-next-line */
      this.newMarker = new google.maps.Marker({
        map: this.map,
        position: researchPos,
        icon: NewIcon,
        draggable: true,
      });
      this.newRestaurant = true;
    },
    creatNewRestaurant() {
      this.newRestaurant = false;
      this.newMarker.draggable = false;
      this.newMarker.icon = MapIcon;
    },
  },
  mounted() {
    this.setMap();
  },
};
</script>

<style scoped>
#mapContainer {
  position: sticky;
  top: 40px;
  border-radius: 25px;
  height: 580px;
  width: 550px;
  background-color: #ffffff;
  border: solid 2px #ffffff;
  box-shadow: 2px 2px 0px 5px #0063bf;
  overflow: hidden;
}

#map {
  z-index: 0;
  height: 540px;
  width: 550px;
}

.mapButton {
  border: none;
  width: 550px;
  height: 40px;
  background: #0063bf;
  -webkit-transition: 0.5s ease;
  transition: 0.5s ease;
}

.mapButton:hover {
    background-color: #007eea;
    cursor: pointer;
}

.overlay {
  z-index: 1;
  position: absolute;
  width: 550px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.7);
}

.bodrerRL {
  margin-left: 5px;
  margin-right: 5px;
}
</style>

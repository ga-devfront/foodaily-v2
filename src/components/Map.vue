<template>
    <div id="mapContainer">
      <aside
      class="overlay top white container center verticalCenter"
      v-if="addNewRestaurant">
      Déplacer l'icone
      <img :src="newIcon" class="spaceRL"/>
      à l'emplacement du restaurant à ajouter puis validez</aside>

      <NewRestaurantForm
      v-if="displayNewRestaurantForm"
      :infos="newRestaurantInfo"
      v-on:abort="abort"
      />

      <div id="map"></div>
      <button
      class="bold white mapButton"
      v-on:click="creatNewRestaurant()"
      v-if="addNewRestaurant"
      >Valider</button>
      <button
      class="bold white mapButton"
      v-on:click="creatNewMarker()"
      v-if="!addNewRestaurant"
      >✚ ajouter un restaurant</button>
    </div>
</template>

<script>
/* eslint-disable-next-line */
import CustomMap from '../../public/customMap.js';
import MapIcon from '../assets/icon.png';
import NewIcon from '../assets/iconRed.png';
import NewRestaurantForm from './NewRestaurantForm.vue';

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
  components: {
    NewRestaurantForm,
  },
  data() {
    return {
      addNewRestaurant: false,
      displayNewRestaurantForm: false,
      city: this.research,
      map: null,
      markers: [],
      newIcon: NewIcon,
      newMarker: null,
      newRestaurantInfo: {
        geometry: { location: {} },
        vicinity: '',
      },
    };
  },
  watch: {
    restaurants(val) {
      this.markers.forEach((marker) => {
        if (!val.some((restaurant) => restaurant.id === marker.id)) {
          marker.setMap(null);
        } else {
          marker.setMap(this.map);
        }
      });
      if (val.length) this.setMarker(val);
    },
  },
  methods: {
    setMarker(restaurants) {
      let count = 0;
      restaurants.forEach((place) => {
        count += 1;
        window.setTimeout(() => {
          if (!this.markers.some((marker) => place.id === marker.id)) {
          /* eslint-disable-next-line */
          let newMarker = new google.maps.Marker({
              map: this.map,
              position: place.geometry.location,
              icon: MapIcon,
              title: place.name,
            });
            newMarker.addListener('click', () => {
              this.$emit('restaurant', place);
            });
            newMarker.id = place.id;
            this.markers.push(newMarker);
          }
        }, 200 * count);
      });
    },
    async setMap() {
      const researchPos = { lat: this.research.latitude, lng: this.research.longitude };
      /* eslint-disable-next-line */
      const map = await new google.maps.Map(document.getElementById('map'), {
        center: researchPos,
        zoom: 16,
        styles: CustomMap,
      });
      this.map = map;
      if (this.restaurants.length) this.setMarker(this.restaurants);
    },
    creatNewMarker() {
      const researchPos = { lat: this.research.latitude, lng: this.research.longitude };
      /* eslint-disable-next-line */
      this.newMarker = new google.maps.Marker({
        map: this.map,
        position: researchPos,
        icon: NewIcon,
        draggable: true,
        title: 'déplacez moi !',
      });
      this.addNewRestaurant = true;
    },
    creatNewRestaurant() {
      this.addNewRestaurant = false;
      this.newMarker.setDraggable(false);
      this.newMarker.setIcon(MapIcon);
      this.newRestaurantInfo.geometry.location = {
        lat: this.newMarker.getPosition().lat(),
        lng: this.newMarker.getPosition().lng(),
      };
      /* eslint-disable-next-line */
      const geocoder = new google.maps.Geocoder;
      this.getAdress(geocoder);
    },
    getAdress(geocoder) {
      const latlng = this.newRestaurantInfo.geometry.location;
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.newRestaurantInfo.vicinity = results[0].formatted_address;
            this.nextStepNewRestaurant();
          } else {
            this.newRestaurantInfo.vicinity = null;
            this.nextStepNewRestaurant();
          }
        }
      });
    },
    nextStepNewRestaurant() {
      this.newMarker.setMap(null);
      this.newMarker = null;
      this.displayNewRestaurantForm = true;
    },
    abort() {
      this.displayNewRestaurantForm = false;
      this.newRestaurantInfo.geometry.location = {};
      this.newRestaurantInfo.vicinity = '';
    },
  },
  mounted() {
    this.setMap();
  },
};
</script>

<style scoped>
form {
  font-size: 1.4em;
  width: 80%;
  height: 65%;
}

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
</style>

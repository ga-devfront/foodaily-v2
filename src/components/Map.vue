<template>
    <div id="mapContainer">
      <aside
      class="overlay top white container center verticalCenter"
      v-if="newRestaurant">
      Déplacer l'icone
      <img :src="newIcon" class="bodrerRL"/>
      à l'emplacement du restaurant à ajouter puis validez</aside>

      <aside
      class="overlay all white container center verticalCenter"
      v-if="addNewRestaurant">
        <form class="container column between">
          <p class="big">Informations du restaurant</p>
          <div class="container between verticalCenter">
            <label for="restaurantName">Nom du restaurant</label>
            <input
            class="input"
            type="text"
            name="restaurantName"
            id="name"
            required>
          </div>
          <div class="container between verticalCenter">
            <label for="address">Adresse</label>
            <input
            class="input"
            type="address"
            name="address"
            id="address"
            :value="newRestaurantInfo.vicinity"
            required>
          </div>
          <div class="container between verticalCenter">
            <label for="image">Photo</label>
            <input
            class="input"
            type="file"
            name="image"
            id="image"
            required>
          </div>
          <div class="container between verticalCenter">
            <input
            type="button"
            class="button white bold"
            value="Valider"
            v-on:click="addRestaurant()">
            <input
            type="button"
            class="button white bold"
            value="Annuler"
            v-on:click="abort()">
          </div>
        </form>
      </aside>

      <div id="map"></div>
      <button
      class="bold white mapButton"
      v-on:click="creatNewRestaurant()"
      v-if="newRestaurant"
      >Valider</button>
      <button
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
      addNewRestaurant: false,
      city: this.research,
      results: this.restaurants,
      map: null,
      newIcon: NewIcon,
      newMarker: null,
      newRestaurantInfo: {
        name: '',
        geometry: { location: {} },
        vicinity: '',
        photos: [{ getUrl: null }],
        rating: null,
        user_ratings_total: null,
      },
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
        title: 'déplacez moi !',
      });
      this.newRestaurant = true;
    },
    creatNewRestaurant() {
      this.newRestaurant = false;
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
            this.newMarker.setMap(null);
            this.newMarker = null;
            this.addNewRestaurant = true;
          } else {
            this.newRestaurantInfo.vicinity = null;
            this.newMarker.setMap(null);
            this.newMarker = null;
            this.addNewRestaurant = true;
          }
        }
      });
    },
    async getCityPos(address) {
      /* eslint-disable-next-line */
      const geocoder = new google.maps.Geocoder();
      const cityPos = new Promise((resolveGeo) => {
        geocoder.geocode({
          address,
        }, (results, status) => {
          if (status === 'OK') {
            resolveGeo(results[0].geometry.location);
          }
        });
      });
      return cityPos;
    },
    async addRestaurant() {
      this.newRestaurantInfo.name = document.getElementById('name').value;
      this.newRestaurantInfo.vicinity = document.getElementById('address').value;
      // eslint-disable-next-line
      this.newRestaurantInfo.geometry.location = await this.getCityPos(document.getElementById('address').value);
      this.newRestaurantInfo.photos[0].getUrl = () => document.getElementById('image').value;
      this.addNewRestaurant = false;
      this.$emit('newRestaurant', this.newRestaurantInfo);
      this.resertNewRestaurant();
    },
    abort() {
      this.addNewRestaurant = false;
      this.resertNewRestaurant();
    },
    resertNewRestaurant() {
      this.newRestaurantInfo.name = null;
      this.newRestaurantInfo.geometry.location = {};
      this.newRestaurantInfo.vicinity = null;
      this.newRestaurantInfo.photos[0].getUrl = null;
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

.input {
    border: 0px;
    border-radius: 20px;
    padding-left: 10px;
    margin-left: 5px;
    width: 80%;
    height: 30px;
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
  background-color: rgba(0, 0, 0, 0.7);
}

.overlay.top{
  width: 550px;
  height: 50px;
}

.overlay.all{
  width: 550px;
  height: 580px;
}

.bodrerRL {
  margin-left: 5px;
  margin-right: 5px;
}
</style>

<template>
    <div id="mapContainer">
      <div id="map"></div>
      <button id="addRestaurant" class="bold white">✚ ajouter un restaurant</button>
    </div>
</template>

<script>
/* eslint-disable-next-line */
import CustomMap from '../../public/customMap.js';
import MapIcon from '../assets/icon.png';

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
      city: this.research,
      results: this.restaurants,
      map: null,
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
  height: 540px;
  width: 550px;
}

#addRestaurant {
  border: none;
  width: 550px;
  height: 40px;
  background: #0063bf;
  -webkit-transition: 0.5s ease;
  transition: 0.5s ease;
}

#addRestaurant:hover {
    background-color: #007eea;
    cursor: pointer;
}
</style>

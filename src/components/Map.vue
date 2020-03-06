<template>
    <div id="mapContainer">
      <div id="map">
      </div>
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
  mounted() {
    const researchPos = { lat: this.city.latitude, lng: this.city.longitude };
    /* eslint-disable-next-line */
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: researchPos,
      zoom: 15,
      styles: CustomMap,
    });
    this.restaurants.forEach((place) => {
      /* eslint-disable-next-line */
      new google.maps.Marker({
        map: this.map,
        position: place.geometry.location,
        icon: MapIcon,
        title: place.name,
      });
    });
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
  height: 580px;
  width: 550px;
}
</style>

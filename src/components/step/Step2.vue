<template>
    <section class="container center column verticalCenter">
        <aside class="container verticalCenter spaceBottom spaceTop">
             <a
                class="bold white button"
                v-on:click="$emit('returnResearch')"
            >← Retour à la recherche
            </a>
        </aside>
        <article class="container center width75 border spaceBottom">
            <div id="map"></div>
            <article class="container column">
              <aside class="container center verticalCenter photoContainer">
                <img class="photo" :src="getImg" />
              </aside>
              <section class="spaceLeft spaceRight">
                <h1 class="big bold">{{restaurantInfo.name}}</h1>
                <p><Rating :restaurant="restaurant"/></p>
                <p class="container verticalCenter">
                  <img
                  src="../../assets/address.png"
                  class="icon bodrerRL"
                  alt="Tel"
                  />
                  {{restaurantInfo.vicinity}}
                </p>
                <p class="container verticalCenter">
                  <img
                  src="../../assets/open.png"
                  class="icon bodrerRL"
                  alt="Tel"
                  />
                  {{open}}
                </p>
                <p class="container verticalCenter">
                  <img
                  src="../../assets/phone.png"
                  class="icon bodrerRL"
                  alt="Tel"
                  />
                  {{phone}}
                </p>
              </section>
            </article>
        </article>
    </section>
</template>

<script>
import NoImg from '../../assets/noPicture.jpg';
// eslint-disable-next-line
import CustomMap from '../../../public/customMap.js';
import MapIcon from '../../assets/icon.png';
import Rating from '../Rating.vue';

export default {
  name: 'Step2',
  components: {
    Rating,
  },
  props: {
    restaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      restaurantInfo: null,
      map: null,
      open: 'Informations d\'ouvertures non disponible',
      phone: 'Non renseigné',
    };
  },
  computed: {
    getPhone() {
      if (!this.restaurantInfo.formatted_phone_number) return 'Non renseigné';
      return this.restaurantInfo.formatted_phone_number;
    },
    getImg() {
      if (!this.restaurant.photos) return NoImg;
      if (typeof this.restaurant.photos[0].getUrl === 'function') {
        return this.restaurant.photos[0].getUrl();
      } if (typeof this.restaurant.photos[0].getUrl === 'string') {
        return this.restaurant.photos[0].getUrl;
      } return NoImg;
    },
  },
  methods: {
    setMarker(restaurant) {
      window.setTimeout(() => {
        /* eslint-disable-next-line */
          let marker = new google.maps.Marker({
          map: this.map,
          position: restaurant.geometry.location,
          icon: MapIcon,
          title: restaurant.name,
        });
      }, 200);
    },
    async setMap() {
      const researchPos = this.restaurant.geometry.location;
      /* eslint-disable-next-line */
      const map = await new google.maps.Map(document.getElementById('map'), {
        center: researchPos,
        zoom: 16,
        styles: CustomMap,
      });
      this.map = map;
      this.setMarker(this.restaurant);
    },
    getInfo() {
      // eslint-disable-next-line
      const request = {
        placeId: this.restaurant.place_id,
        fields: ['formatted_phone_number', 'photos', 'reviews', 'opening_hours', 'utc_offset_minutes'],
      };
      /* eslint-disable-next-line */
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      service.getDetails(request, (place, status) => {
        // eslint-disable-next-line
      if (status === google.maps.places.PlacesServiceStatus.OK) {
          if (place.opening_hours) {
            const isOpenNow = place.opening_hours.isOpen();
            if (isOpenNow) { this.open = 'Ouvert actuellement'; }
            this.open = 'Fermé actuellement';
          }
          if (place.formatted_phone_number) { this.phone = place.formatted_phone_number; }
          Object.assign(this.restaurantInfo, place);
        }
      });
    },
  },
  created() {
    this.restaurantInfo = JSON.parse(JSON.stringify(this.restaurant));
    this.getInfo();
  },
  mounted() {
    this.setMap();
  },
};
</script>

<style scoped>
#map {
    height: 400px;
    width: 500px;
}

.photoContainer {
  overflow: hidden;
  width: 500px;
  height: 150px;
}

.photo {
  max-width: 100%;
  min-width: 100%;
}

.header {
    background-repeat: no-repeat;
    background-size: cover;
}

.border {
  border-radius: 25px;
  background-color: #ffffff;
  border: solid 2px #ffffff;
  box-shadow: 2px 2px 0px 5px #0063bf;
  overflow: hidden;
}
.selfLeft {
    align-self: flex-start;
}

.bigSpaceLeft {
    margin-left: 20%;
}

.icon {
  height: 15px;
}

.photoBox {
  height: 100px;
  width: 100px;
}
</style>

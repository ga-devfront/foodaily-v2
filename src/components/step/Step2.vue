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
                <h1 class="big bold">{{restaurant.name}}</h1>
                <p class="bodrerRL"><Rating :restaurant="restaurant"/></p>
                <p class="bodrerRL">
                  <img
                  v-for="(value, index) in restaurant.price_level"
                  :key="index"
                  src="../../assets/price.png"
                  class="icon"
                  />
                </p>
                <p class="container verticalCenter">
                  <img
                  src="../../assets/address.png"
                  class="icon bodrerRL"
                  alt="Tel"
                  />
                  {{restaurant.vicinity}}
                </p>
                <p class="container verticalCenter">
                  <img
                  src="../../assets/open.png"
                  class="icon bodrerRL"
                  alt="Tel"
                  />
                  {{getOpen}}
                </p>
                <p class="container verticalCenter">
                  <img
                  src="../../assets/phone.png"
                  class="icon bodrerRL"
                  alt="Tel"
                  />
                  {{getPhone}}
                </p>
              </section>
            </article>
        </article>
        <h2 class="blue">Avis</h2>
        <div v-if="restaurant.reviews">
        <Review v-for="(review, index) in restaurant.reviews" :review="review" :key="index" />
        </div>
        <div v-if="!restaurant.reviews">
          <p>Aucun avis pour ce restaurant, soyez le premier à un poster un !</p>
        </div>
    </section>
</template>

<script>
// eslint-disable-next-line
import CustomMap from '../../../public/customMap.js';
import MapIcon from '../../assets/icon.png';
import Rating from '../Rating.vue';
import Review from '../Review.vue';

export default {
  name: 'Step2',
  components: {
    Rating,
    Review,
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
    };
  },
  computed: {
    getOpen() {
      if (!this.restaurant.place_opening_hours) return 'Horaires d\'ouverture non renseigné';
      if (this.restaurant.place_opening_hours.isOpen()) return 'Ouvert actuellement';
      return 'Fermé actuellement';
    },
    getPhone() {
      if (!this.restaurant.formatted_phone_number) return 'Non renseigné';
      return this.restaurant.formatted_phone_number;
    },
    getImg() {
      const { lat } = JSON.parse(JSON.stringify(this.restaurant.geometry.location));
      const { lng } = JSON.parse(JSON.stringify(this.restaurant.geometry.location));
      return `https://maps.googleapis.com/maps/api/streetview?size=500x300&location=${lat},${lng}&fov=80&heading=70&pitch=0&key=AIzaSyBda9d2634kdu2xbQBVaCirqsmkSCrfzwQ`;
    },
  },
  methods: {
    async getDetails(restaurant) {
      // eslint-disable-next-line
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      const requestInfo = {
        placeId: restaurant.place_id,
        fields: ['formatted_phone_number', 'photos', 'reviews', 'opening_hours', 'utc_offset_minutes'],
      };
      return new Promise((resolve) => {
        service.getDetails(requestInfo, (place, status) => {
          // eslint-disable-next-line
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const details = {};
            if (place.opening_hours) {
              details.place_opening_hours = place.opening_hours;
            }
            if (place.formatted_phone_number) {
              details.formatted_phone_number = place.formatted_phone_number;
            }
            if (place.reviews) {
              details.reviews = place.reviews;
            }
            details.id = place.id;
            this.$store.commit({ type: 'addRestaurant', dataType: 'details', details });
          }
        });
      });
    },
    setMarker(restaurant) {
      // eslint-disable-next-line
      new google.maps.Marker({
        map: this.map,
        position: restaurant.geometry.location,
        icon: MapIcon,
        title: restaurant.name,
      });
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
  min-height: 100%;
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

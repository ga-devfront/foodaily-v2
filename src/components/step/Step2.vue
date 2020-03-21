<template>
    <section class="container center column verticalCenter">
        <aside class="container verticalCenter spaceBottom spaceTop">
             <a
                class="bold white button"
                v-on:click="$emit('returnResearch')"
            >← Retour à la recherche
            </a>
        </aside>
        <article class="bigRestaurant container center width75 border spaceBottom">
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
        <div v-if="details.reviews">
        <Review v-for="(review, index) in details.reviews" :review="review" :key="index" />
        </div>
        <div v-if="!details.reviews">
          <p>Aucun avis pour ce restaurant, soyez le premier à un poster un !</p>
        </div>
        <form class="container column newReview">
        <div class="container verticalCenter bodrerRL">
            <label class="bold bodrerRL" for="pseudo">Pseudo :</label>
            <input class="input" type="text" name="pseudo" required>
            <label class="bold bodrerRL">Note :</label>
            <div v-for="ref in [0, 1, 2, 3, 4]" class="star"
            @mouseover="mouseInRate(ref)"
            @mouseout="mouseOutRate(ref)"
            @click="setRate(ref)"
            :key="ref"
          >
            <div
              :style="{ width: (ref + 1 <= newComment.rate) ? '20px' : '0px' }"
              class="rate"
              :ref="ref"
            >
            </div>
          </div>
        </div><label class="bold bodrerRL" for="review">Commentaire:</label>
        <textarea class="bodrerRL" name="review" cols="40" rows="5"></textarea>
        <a class="button bold white">Envoyer</a>
    </form>
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
      newComment: {
        username: '',
        rate: 0,
        review: '',
      },
      details: {},
      map: null,
    };
  },
  computed: {
    getOpen() {
      if (!this.details.place_opening_hours) return 'Horaires d\'ouverture non renseigné';
      if (this.details.place_opening_hours.isOpen()) return 'Ouvert actuellement';
      return 'Fermé actuellement';
    },
    getPhone() {
      if (!this.details.formatted_phone_number) return 'Non renseigné';
      return this.details.formatted_phone_number;
    },
    getImg() {
      const { lat } = JSON.parse(JSON.stringify(this.restaurant.geometry.location));
      const { lng } = JSON.parse(JSON.stringify(this.restaurant.geometry.location));
      return `https://maps.googleapis.com/maps/api/streetview?size=500x300&location=${lat},${lng}&fov=80&heading=70&pitch=0&key=AIzaSyBda9d2634kdu2xbQBVaCirqsmkSCrfzwQ`;
    },
  },
  methods: {
    setRate(value) {
      this.newComment.rate = value + 1;
    },
    mouseInRate(value) {
      for (let x = 0; x < value + 1; x += 1) {
        this.$refs[x][0].style.width = '20px';
      }
    },
    mouseOutRate(value) {
      for (let x = 0; x < value + 1; x += 1) {
        if (x + 1 > this.newComment.rate) this.$refs[x][0].style.width = '0px';
      }
    },
    getDetails(restaurant) {
      // eslint-disable-next-line
      if (this.$store.state.restaurants.details.findIndex((i) => i.id === this.restaurant.id) === -1) {
        // eslint-disable-next-line
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        const requestInfo = {
          placeId: restaurant.place_id,
          fields: ['formatted_phone_number', 'photos', 'reviews', 'opening_hours', 'utc_offset_minutes'],
        };
        service.getDetails(requestInfo, (place, status) => {
          const restaurantDetails = {};
          // eslint-disable-next-line
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            if (place.opening_hours) {
              restaurantDetails.place_opening_hours = place.opening_hours;
            }
            if (place.formatted_phone_number) {
              restaurantDetails.formatted_phone_number = place.formatted_phone_number;
            }
            if (place.reviews) {
              restaurantDetails.reviews = place.reviews;
            }
            restaurantDetails.id = this.restaurant.id;
            this.details = restaurantDetails;
            this.$store.commit({ type: 'addRestaurant', dataType: 'details', restaurant: restaurantDetails });
          } else {
            restaurantDetails.place_opening_hours = null;
            restaurantDetails.formatted_phone_number = null;
            restaurantDetails.reviews = [];
            restaurantDetails.id = this.restaurant.id;
            this.details = restaurantDetails;
            this.$store.commit({ type: 'addRestaurant', dataType: 'details', restaurant: restaurantDetails });
          }
        });
      } else {
        this.details = this.$store.state.restaurants.details[this.$store.state.restaurants.details.findIndex((i) => i.id === this.restaurant.id)];
      }
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
  created() {
    this.getDetails(this.restaurant);
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

.newReview {
  overflow: hidden;
    width: 800px;
  border-radius: 25px;
  min-height: 80px;
  background-color: #ffffff;
  border: solid 2px #0063bf;
  margin-bottom: 10px;
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

.bigRestaurant {
  max-width: 950px;
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

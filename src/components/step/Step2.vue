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
                <!-- eslint-disable-next-line max-len -->
                <p class="spaceRL"><Rating :rate="restaurantRate" :rateCount="restaurantRateCount"/></p>
                <p class="spaceRL">
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
                  class="icon spaceRL"
                  alt="Tel"
                  />
                  {{restaurant.vicinity}}
                </p>
                <p class="container verticalCenter">
                  <img
                  src="../../assets/open.png"
                  class="icon spaceRL"
                  alt="Tel"
                  />
                  {{getOpen}}
                </p>
                <p class="container verticalCenter">
                  <img
                  src="../../assets/phone.png"
                  class="icon spaceRL"
                  alt="Tel"
                  />
                  {{getPhone}}
                </p>
              </section>
            </article>
        </article>
        <h2 class="blue">Derniers avis</h2>
        <div class="container column verticalCenter" v-if="restaurantDetails.reviews">
        <!-- eslint-disable-next-line max-len -->
        <Review v-for="(review, index) in restaurantDetails.reviews" :review="review" :key="index" />
        </div>
        <div class="container column verticalCenter" v-if="restaurantDetails.reviews.length <= 0">
          <p>Aucun avis pour ce restaurant, soyez le premier à en poster un !</p>
        </div>
        <form class="container column newReview">
        <div class="container verticalCenter spaceRight spaceLeft littleSpaceTop">
          <p v-if="error" class="red bold">{{errorMessage}}</p>
          <div>
            <label class="bold spaceRL" for="username">Pseudo :</label>
            <input class="input" type="text" name="username" id="username" required></div>
            <div class="container">
            <label class="bold spaceLeft">Note :</label>
            <div v-for="ref in [0, 1, 2, 3, 4]" class="star"
            @mouseover="mouseInRate(ref)"
            @mouseout="mouseOutRate(ref)"
            @click="setRate(ref)"
            :key="ref"
          >
            <div
              :style="{ width: (ref + 1 <= newReview.rating) ? '20px' : '0px' }"
              class="rate"
              :ref="ref"
            ></div>
            </div>
          </div>
        </div><label class="bold spaceRight spaceLeft" for="review">Commentaire:</label>
        <!-- eslint-disable max-len-->
        <textarea class="spaceRight spaceLeft littleSpaceBottom" name="review" cols="40" rows="5" id="review"></textarea>
        <a class="reviewButton center container verticalCenter bold white" @click="emitReview()">Envoyer</a>
        <!-- eslint-enable max-len-->
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
      newReview: {
        author_name: '',
        rating: 0,
        text: '',
      },
      error: false,
      errorMessage: '',
      details: {},
      map: null,
    };
  },
  computed: {
    restaurantRate() {
      return this.$store.getters.restaurant({
        dataType: 'summary',
        id: this.restaurant.id,
      }).rating;
    },
    restaurantRateCount() {
      const rateCount = this.$store.getters.restaurant({
        dataType: 'summary',
        id: this.restaurant.id,
      }).user_ratings_total;
      // eslint-disable-next-line no-unneeded-ternary
      return (rateCount) ? rateCount : '0';
    },
    getOpen() {
      if (!this.restaurantDetails) return 'Chargement en cours ...';
      if (!this.restaurantDetails.place_opening_hours) return 'Horaires d\'ouverture non renseigné';
      if (this.restaurantDetails.place_opening_hours.isOpen()) return 'Ouvert actuellement';
      return 'Fermé actuellement';
    },
    getPhone() {
      if (!this.restaurantDetails) return 'Chargement en cours ...';
      if (!this.restaurantDetails.formatted_phone_number) return 'Non renseigné';
      return this.restaurantDetails.formatted_phone_number;
    },
    getImg() {
      const { lat } = JSON.parse(JSON.stringify(this.restaurant.geometry.location));
      const { lng } = JSON.parse(JSON.stringify(this.restaurant.geometry.location));
      return `https://maps.googleapis.com/maps/api/streetview?size=500x300&location=${lat},${lng}&fov=80&heading=70&pitch=0&key=AIzaSyBda9d2634kdu2xbQBVaCirqsmkSCrfzwQ`;
    },
    restaurantDetails() {
      const { restaurant } = this;
      return this.$store.getters.restaurant({
        dataType: 'details',
        id: restaurant.id,
      });
    },
  },
  methods: {
    async checkDetailsCache() {
      const { restaurant } = this;
      // eslint-disable-next-line
      return new Promise((resolve) => {
        if (this.$store.getters.restaurantIndex({
          dataType: 'details',
          id: restaurant.id,
        }) !== -1) return resolve();
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
            return resolve();
          }
          restaurantDetails.place_opening_hours = null;
          restaurantDetails.formatted_phone_number = null;
          restaurantDetails.id = this.restaurant.id;
          restaurantDetails.reviews = [];
          this.$store.commit({ type: 'addRestaurant', dataType: 'details', restaurant: restaurantDetails });
          return resolve();
        });
      });
    },
    setRate(value) {
      this.newReview.rating = value + 1;
    },
    mouseInRate(value) {
      for (let x = 0; x < value + 1; x += 1) {
        this.$refs[x][0].style.width = '20px';
      }
    },
    mouseOutRate(value) {
      for (let x = 0; x < value + 1; x += 1) {
        if (x + 1 > this.newReview.rating) this.$refs[x][0].style.width = '0px';
      }
    },
    setMarker() {
      // eslint-disable-next-line
      new google.maps.Marker({
        map: this.map,
        position: this.restaurant.geometry.location,
        icon: MapIcon,
        title: this.restaurant.name,
      });
    },
    async setMap() {
      const researchPos = this.restaurant.geometry.location;
      // eslint-disable-next-line
      const map = await new google.maps.Map(document.getElementById('map'), {
        center: researchPos,
        zoom: 16,
        styles: CustomMap,
      });
      this.map = map;
      this.setMarker(this.restaurant);
    },
    emitReview() {
      if (document.getElementById('username').value.length < 2) {
        this.error = true;
        this.errorMessage = 'Veuillez entrer un pseudo valide.';
        return;
      }
      if (document.getElementById('review').value.length < 10) {
        this.error = true;
        this.errorMessage = 'Veuillez entrer un commentaire valide.';
        return;
      }
      this.error = false;
      this.errorMessage = '';
      this.newReview.author_name = document.getElementById('username').value;
      this.newReview.text = document.getElementById('review').value;
      const newReview = JSON.parse(JSON.stringify(this.newReview));
      this.$store.commit({ type: 'addReview', restaurant: this.restaurant, review: newReview });
      this.newReview.author_name = '';
      this.newReview.text = '';
      this.newReview.rating = 0;
      document.getElementById('username').value = null;
      document.getElementById('review').value = null;
    },
  },
  async mounted() {
    await this.checkDetailsCache();
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

.reviewButton {
  border: none;
  width: 100%;
  height: 40px;
  background: #0063bf;
  -webkit-transition: 0.5s ease;
  transition: 0.5s ease;
}

.reviewButton:hover {
    background-color: #007eea;
    cursor: pointer;
}

@media (max-width: 1024px) {
  article {
    width: 100%;
  }

  #map {
    height: 250px;
    width: 100%;
  }

  .border {
  border: solid 2px #0063bf;
  box-shadow: 0px 0px 0px 0px ;
  }

  .photoContainer {
    width: 100%;
    background-color: #dbdbdb;
  }

  .bigRestaurant {
    width: 95%;
    flex-wrap: wrap;
  }

  .newReview {
    width: 95%;
    flex-direction: column;
  }

  form>div {
    flex-direction: column;
  }

  form>div>div {
    margin-bottom: 10px;
  }
}
</style>

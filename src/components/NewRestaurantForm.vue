<template>
      <aside
      class="overlay all white container center verticalCenter">
        <form type="submit" class="container column between">
          <p class="big">Informations du restaurant</p>
          <p v-if="error" class="red error bold">{{errorMessage}}</p>
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
            <vue-google-autocomplete
                class="input"
                ref="address"
                id="address"
                classname="address"
                :value="infos.vicinity"
                v-on:placechanged="setAddressData"
                types="address"
                :country="['fr', 'ch']"
                no-results-found>
            </vue-google-autocomplete>
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
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete';

export default {
  name: 'NewRestaurantForm',
  props: {
    infos: {
      type: Object,
      required: true,
    },
  },
  components: {
    VueGoogleAutocomplete,
  },
  data() {
    return {
      error: false,
      errorMessage: null,
      newRestaurantInfo: {
        name: '',
        geometry: { location: null },
        vicinity: '',
        photos: [{ getUrl: null }],
        rating: null,
        user_ratings_total: null,
        id: '',
        place_id: '',
      },
    };
  },
  computed: {
    newId() {
      const letterAndNumber = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
      let key = 'CUSTOM_';
      for (let x = 0; x < 20; x += 1) {
        key += letterAndNumber[Math.floor(Math.random() * Math.floor(letterAndNumber.length))];
      }
      return key;
    },
  },
  methods: {
    setAddressData(addressData) {
      this.newRestaurantInfo.geometry.location = {
        lat: addressData.latitude,
        lng: addressData.longitude,
      };
      let streetNumber;
      if (addressData.street_number) {
        streetNumber = addressData.street_number;
      } else { streetNumber = ''; }
      this.newRestaurantInfo.vicinity = `${streetNumber} ${addressData.route}, ${addressData.locality}`;
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
      if (!this.newRestaurantInfo.geometry.location) {
        this.error = true;
        this.errorMessage = 'Merci d\'entrer une adresse valide';
        return;
      }
      if (document.getElementById('name').value.length < 1) {
        this.error = true;
        this.errorMessage = 'Merci d\'entrer un nom de restaurant valide';
        return;
      }
      this.newRestaurantInfo.name = document.getElementById('name').value;
      if (document.getElementById('image').value.length < 1) {
        this.error = true;
        this.errorMessage = 'Merci d\'ajouter une photo valide';
        return;
      }
      const { files } = document.getElementById('image');
      if (FileReader && files && files.length) {
        const img = new FileReader();
        const imageResult = new Promise((resolve) => {
          img.onload = () => {
            resolve(img.result);
          };
        });
        img.readAsDataURL(files[0]);
        this.newRestaurantInfo.photos[0].getUrl = await imageResult;
      }
      this.newRestaurantInfo.id = this.newId;
      this.newRestaurantInfo.place_id = this.newRestaurantInfo.id;
      const newRestaurantInfo = JSON.parse(JSON.stringify(this.newRestaurantInfo));
      this.$store.commit({ type: 'addRestaurant', dataType: 'summary', restaurant: newRestaurantInfo });
      this.abort();
    },
    abort() {
      this.error = false;
      this.resetNewRestaurant();
      this.$emit('abort', true);
    },
    resetNewRestaurant() {
      this.newRestaurantInfo.name = null;
      this.newRestaurantInfo.geometry.location = {};
      this.newRestaurantInfo.vicinity = null;
      this.newRestaurantInfo.photos[0].getUrl = null;
      this.newRestaurantInfo.id = '';
      this.newRestaurantInfo.place_id = '';
    },
  },
};
</script>

<style scoped>
form {
  font-size: 1.4em;
  width: 80%;
  height: 65%;
}

.input {
    border: 0px;
    border-radius: 20px;
    padding-left: 10px;
    margin-left: 5px;
    width: 80%;
    height: 30px;
}

.input:focus {
    outline: 0;
}

@media (max-width: 1024px) {
  form {
    font-size: 1em;
    width: 90%;
    height: 95%;
  }

  .big {
    font-size: 1.5em;
  }

  .overlay.all {
    width: 350px;
    height: 350px;
  }
}
</style>

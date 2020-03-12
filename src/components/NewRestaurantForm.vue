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
            <input
            class="input"
            type="address"
            name="address"
            id="address"
            :value="infos.vicinity"
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
</template>

<script>

export default {
  name: 'Map',
  props: {
    infos: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      error: false,
      errorMessage: null,
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
  methods: {
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
      this.newRestaurantInfo.geometry.location = null;
      if (document.getElementById('address').value.length < 1) {
        this.error = true;
        this.errorMessage = 'Merci d\'entrer une adresse valide';
        return;
      }
      this.newRestaurantInfo.vicinity = document.getElementById('address').value;
      this.newRestaurantInfo.geometry.location = await this.getCityPos(document.getElementById('address').value);
      console.log(JSON.parse(JSON.stringify(this.newRestaurantInfo.geometry.location)));
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
      const newRestaurantInfo = JSON.parse(JSON.stringify(this.newRestaurantInfo));
      this.error = false;
      this.resetNewRestaurant();
      console.log('newRestaurantInfo', JSON.parse(JSON.stringify(newRestaurantInfo)));
      this.$emit('newRestaurant', newRestaurantInfo);
    },
    abort() {
      this.error = false;
      this.$emit('abort', true);
      this.resetNewRestaurant();
    },
    resetNewRestaurant() {
      this.newRestaurantInfo.name = null;
      this.newRestaurantInfo.geometry.location = {};
      this.newRestaurantInfo.vicinity = null;
      this.newRestaurantInfo.photos[0].getUrl = null;
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
</style>

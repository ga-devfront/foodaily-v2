<template>
    <section id="search" class="container verticalCenter column center">
        <p class="big white bold spaceBottom">Trouver le restaurant qui vous correspond</p>
        <form class="shadowBar container verticalCenter">
            <label for="searchInput">
                <img src="../assets/localisation.png" />
            </label>
            <vue-google-autocomplete
                ref="address"
                id="searchInput"
                classname="form-control"
                placeholder="Ville de recherche"
                types="(cities)"
                v-on:placechanged="getAddressData"
                :country="['fr', 'ch']"
            >
            </vue-google-autocomplete>
            <input
                id="searchBtn"
                type="button"
                value="Rechercher"
                class="white bold"
                v-on:click="$emit('search', address)"/>
        </form>
    </section>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete';
/* eslint-disable no-new */
export default {
  name: 'searchBar',
  data() {
    return {
      address: '',
    };
  },
  components: {
    VueGoogleAutocomplete,
  },
  methods: {
    getAddressData(addressData) {
      this.address = addressData;
    },
  },
  mounted() {
    this.$refs.address.focus();
  },
};
</script>

<style scoped>
#search {
    width: 100%;
    background: url("../assets/searchBackground.jpg");
    height: 370px;
}

#searchInput {
    border: none;
    width: 100%;
    height: 100%;
    background: none;
    font-size: 1.2em;
}

#searchInput:focus {
    outline: 0;
}

#searchBtn {
    font-size: 1.1em;
    background-color: #0067c0;
    width: 150px;
    height: 100%;
    border: 0px;
    border-radius: 0 20px 20px 0;
    -webkit-transition: ease 0.5s;
    transition: ease 0.5s;
}

#searchBtn:hover {
    background: #007eea;
    cursor: pointer;
}

#searchBtn:focus {
    outline: 0;
}

form label {
    padding: 0px 10px 0px 15px;
}

.shadowBar {
    background-color: #ffffff;
    height: 40px;
    width: 40%;
    box-shadow: 0px 0px 15px #000000;
    border-radius: 20px;
}
</style>

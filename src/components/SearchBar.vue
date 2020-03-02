<template>
    <section id="search" class="container verticalCenter column center">
        <p class="big white bold spaceBottom">Trouver le restaurant qui vous correspond</p>
        <form class="shadowBar container verticalCenter">
            <label for="searchInput">
                <img src="../assets/localisation.png" />
            </label>
            <input
                id="searchInput"
                type="text"
                placeholder="Ville de recherche"
                v-model="searchValue"/>
            <input
                id="searchBtn"
                type="button"
                value="Rechercher"
                class="white bold"
                v-on:click="$emit('search', searchValue)"/>
        </form>
    </section>
</template>

<script>
/* eslint-disable no-new */
export default {
  name: 'searchBar',
  data() {
    return {
      searchValue: null,
    };
  },
  mounted() {
    const options = {
      types: ['(cities)'],
      componentRestrictions: {
        country: ['fr', 'ch'],
      },
    };
    const input = document.getElementById('searchInput');
    console.log(input);
    new google.maps.places.Autocomplete(input, options);
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

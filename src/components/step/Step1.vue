<template>
    <section class="container center column">
      <aside id="resultName" class="container verticalCenter column center spaceBottom">
        <p class="big white bold">Restaurants à {{research.locality}}</p>
      </aside>
      <article class="container center column">
        <nav class="container between spaceBottom">
          <a class="bold white button"><< Retour</a>
          <p id="resultNumber" class="bold"></p>
        </nav>
        <section>
          <Map />
        </section>
      </article>
    </section>
</template>

<script>
import Map from '../Map.vue';

export default {
  name: 'Step1',
  components: {
    Map,
  },
  props: {
    research: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      city: this.research,
      results: [],
    };
  },
  methods: {
  },
  created() {
    /* eslint-disable-next-line */
    const pos = new google.maps.LatLng(this.city.latitude,this.city.longitude);
    const request = {
      location: pos,
      radius: '500',
      type: ['restaurant'],
    };
    /* eslint-disable-next-line */
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch(request, (results, status) => {
      /* eslint-disable-next-line */
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        results.forEach((result) => {
          this.results.push(result);
        });
      }
    });
  },
};
</script>

<style scoped>
#resultName {
    width: 100%;
    background: url("../../assets/resultBackground.jpg");
    height: 150px;
}

.button {
    background-color: #0067c0;
    font-variant: small-caps;
    font-size: 1.1em;
    border-radius: 0.5em;
    padding: 10px 20px 10px 20px;
    -webkit-transition: ease 0.5s;
    transition: ease 0.5s;
}

.button:hover {
    background-color: #007eea;
    cursor: pointer;
}

#resultNumber {
    line-height: 80%;
    color: #222222;
    font-style: italic;
}
</style>

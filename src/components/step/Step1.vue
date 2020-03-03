<template>
    <div class="container center column">

    </div>
</template>

<script>

export default {
  name: 'Step0',
  components: {
  },
  props: {
    research: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      geoPos: this.getCityPos(),
    };
  },
  methods: {
    getCityPos() {
      console.log(this.research);
      /* eslint-disable-next-line */
      const geocoder = new google.maps.Geocoder();
      const cityPos = (resolveGeo) => {
        geocoder.geocode({
          address: this.research,
        }, (results, status) => {
          if (status === 'OK') {
            resolveGeo(results[0].geometry.location);
          }
        });
      };
      return cityPos;
    },
  },
};
</script>

<style scoped>
</style>

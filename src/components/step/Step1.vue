<template>
    <section class="container center column">
      <aside id="resultName" class="container verticalCenter column center spaceBottom">
        <p class="big white bold">Restaurants à {{research.locality}}</p>
      </aside>
    </section>
</template>

<script>
export default {
  name: 'Step0',
  components: {
  },
  props: {
    research: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped>
#resultName {
    width: 100%;
    background: url("../../assets/resultBackground.jpg");
    height: 150px;
}
</style>

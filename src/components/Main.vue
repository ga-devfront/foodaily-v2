<template>
    <main class="container center column spaceBottom">
      <transition name="fade">
        <section :is="step" v-on:search="setSearch"/>
      </transition>
    </main>
</template>

<script>
import Step0 from './step/Step0.vue';

export default {
  name: 'myMain',
  components: {
    Step0,
  },
  data() {
    return {
      steps: {
        0: Step0,
      },
      currentStep: 0,
      search: null,
    };
  },
  computed: {
    step() {
      return this.steps[this.currentStep];
    },
  },
  methods: {
    setSearch(value) {
      this.search = value;
      this.incrementStep();
    },
    incrementStep() {
      this.currentStep += 1;
    },
    decrementStep() {
      this.currentStep -= 1;
    },
  },
};
</script>

<style scoped>
main {
    position: relative;
    min-height: 100%;
    -webkit-transition: ease 1s;
    transition: ease 1s;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

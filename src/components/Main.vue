<template>
    <main>
      <transition name="fade">
        <section class="spaceBottom" :is="step" v-on:search="setSearch" :research="search"/>
      </transition>
    </main>
</template>

<script>
import Step0 from './step/Step0.vue';
import Step1 from './step/Step1.vue';

export default {
  name: 'myMain',
  components: {
    Step0,
    Step1,
  },
  data() {
    return {
      steps: [
        Step0,
        Step1,
      ],
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

<template>
    <main>
      <transition name="fade" mode="out-in">
        <section
        class="spaceBottom"
        :is="step"
        v-on:return="returnStep"
        v-on:search="setSearch"
        v-on:restaurant="setRestaurant"
        v-on:returnResearch="returnResearch"
        :research="search"
        :restaurant="currentRestaurant"
        />
      </transition>
    </main>
</template>

<script>
import Step0 from './step/Step0.vue';
import Step1 from './step/Step1.vue';
import Step2 from './step/Step2.vue';

export default {
  name: 'myMain',
  components: {
    Step0,
    Step1,
    Step2,
  },
  data() {
    return {
      steps: {
        0: Step0,
        1: Step1,
        2: Step2,
      },
      currentStep: 0,
      currentRestaurant: null,
      search: null,
    };
  },
  computed: {
    step() {
      return this.steps[this.currentStep];
    },
  },
  methods: {
    returnResearch() {
      this.currentRestaurant = null;
      this.decrementStep();
    },
    returnStep() {
      this.search = '';
      this.$store.commit({ type: 'resetRestaurants', dataType: 'summary' });
      this.decrementStep();
    },
    setRestaurant(value) {
      if (!value) { return; }
      this.currentRestaurant = value;
      this.incrementStep();
    },
    setSearch(value) {
      if (!value) { return; }
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
    padding-bottom: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active avant la 2.1.8 */ {
  opacity: 0;
}
</style>

<template>
    <main>
      <transition name="fade" mode="out-in">
        <section
        class="spaceBottom"
        :is="step"
        v-on:return="returnStep"
        v-on:search="setSearch"
        :research="search"
        />
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
      steps: {
        0: Step0,
        1: Step1,
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
    returnStep() {
      this.search = '';
      this.decrementStep();
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

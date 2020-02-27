<template>
  <div id="app" class="container column">
    <myHeader />
    <myMain />
    <myFooter />
  </div>
</template>

<script>
import myHeader from './components/Header.vue';
import myMain from './components/Main.vue';
import myFooter from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    myHeader,
    myMain,
    myFooter,
  },
};
</script>

<style lang="scss">
#app {
    width: 100%;
    font-size: 0.9em;
    position: relative;
    background-color: #ffffff;
    width: 100%;
    min-height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
}

.container {
    display: -webkit-box;
    display: flex;
}

.container.column {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
}

.container.center {
    -webkit-box-pack: center;
    justify-content: center;
}

.container.verticalCenter {
    -webkit-box-align: center;
    align-items: center;
}

.container.around {
    justify-content: space-around;
}

.container.evenly {
    -webkit-box-pack: space-evenly;
    justify-content: space-evenly;
}

.container.between {
    -webkit-box-pack: justify;
            justify-content: space-between;
}

.white {
    color: #ffffff;
}

.bold {
    font-weight: 700;
}
</style>

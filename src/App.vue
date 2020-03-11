<template>
  <body id="app" class="container column">
    <myHeader />
    <myMain />
    <myFooter />
  </body>
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

.spaceBottom {
    margin-bottom: 40px;
}

.littleSpaceBottom {
    margin-bottom: 10px;
}

.spaceTop {
    margin-top: 40px;
}

.spaceLeft {
    margin-left: 40px;
}

.spaceRight {
    margin-right: 40px;
}

.big {
    font-size: 2em;
}

.white {
    color: #ffffff;
}

.red {
    color: #bc1f00;
}

.bold {
    font-weight: 700;
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
</style>

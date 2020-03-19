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

.container.verticalAround {
    align-items: stretch;
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

.blue {
    color: #0067c0;
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

.error {
  margin-top: -30px;
  padding: 5px;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  font-size: 0.8em;
  font-style: italic;
}

.overlay {
  z-index: 1;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
}

.overlay.top{
  width: 550px;
  height: 50px;
}

.overlay.all{
  width: 550px;
  height: 580px;
}

.bodrerRL {
  margin-left: 5px;
  margin-right: 5px;
}

.star {
    height: 20px;
    width: 20px;
    overflow: hidden;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%,
    32% 57%, 2% 35%, 39% 35%);
    background-color: #555555;
}

.rate {
    height: 20px;
    width: 0px;
    background: #ca9912;
}
</style>

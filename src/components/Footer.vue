<template>
    <footer class="container column verticalCenter">
        <p>Suivez-Nous</p>
        <nav><Social /></nav>
    </footer>
</template>

<script>
import Social from './Social.vue';

export default {
  name: 'myFooter',
  components: {
    Social,
  },
};
</script>

<style scoped>
footer {
    position: absolute;
    bottom: -80px;
    min-width: 100%;
    min-height: calc(60px + 40px);
    background-color: #0067c0;
    color: #ffffff;
    -webkit-transition: ease 1s;
    transition: ease 1s;
}
</style>

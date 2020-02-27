<template>
    <div class="social container center verticalCenter">
    </div>
</template>

<script>
export default {
  name: 'Social',
};
</script>

<style scoped>
.social {
    margin: 5px;
    height: 40px;
    width: 40px;
    background-color: #ffffff;
    border-radius: 5px;
}

.social img {
    -webkit-transition: 1s ease;
    transition: 1s ease;
}

.social:hover img {
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
}
</style>

<template>
    <footer class="container column verticalCenter">
        <p>Suivez-Nous</p>
        <nav>
          <ul class="container center verticalCenter">
          <Social v-for="social in socials" :social="social" :key="social.name"/>
          </ul>
        </nav>
    </footer>
</template>

<script>
import GithubIcon from '../assets/social/github.png';
import FacebookIcon from '../assets/social/facebook.png';
import InstragramIcon from '../assets/social/instagram.png';
import TwitterIcon from '../assets/social/twitter.png';
import Social from './Social.vue';

export default {
  name: 'myFooter',
  components: {
    Social,
  },
  data() {
    return {
      socials: [
        {
          name: 'github',
          link: 'https://github.com/ga-devfront/foodaily-v2/',
          icon: GithubIcon,
          alt: 'github',
        },
        {
          name: 'facebook',
          link: 'https://www.facebook.com/agdevfront/',
          icon: FacebookIcon,
          alt: 'facebook',
        },
        {
          name: 'instagram',
          link: 'https://www.instagram.com/agdevfront/',
          icon: InstragramIcon,
          alt: 'instagram',
        },
        {
          name: 'twitter',
          link: 'https://twitter.com/AgDevfront',
          icon: TwitterIcon,
          alt: 'twitter',
        },
      ],
    };
  },
};
</script>

<style scoped>
ul {
  padding: 0px;
}

nav a:hover {
    cursor: pointer;
}

footer {
    position: absolute;
    bottom: -80px;
    min-width: 100%;
    min-height: calc(60px + 40px);
    background-color: #0067c0;
    color: #ffffff;
}
</style>

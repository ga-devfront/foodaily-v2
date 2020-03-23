<template>
    <header class="container around verticalCenter flexWrap">
        <a href="../">
            <img src="../assets/logo.png" alt="logo Foodaily"/>
        </a>
        <nav>
            <a id="connection">Se connecter</a>
            <a id="subscribe" class="bold white">S'inscrire</a>
        </nav>
    </header>
</template>

<script>
export default {
  name: 'myHeader',
};
</script>

<style scoped>
header{
    position: relative;
    margin-left: 0em;
    margin-right: 0em;
    top: 0px;
    height: 65px;
    bottom: -40px;
    -webkit-transition: ease 1s;
    transition: ease 1s;
}

nav a {
    padding: 0px 20px 0px 20px;
}

nav a:hover {
    cursor: pointer;
}

#connection {
    color: #0067c0;
    font-size: 1.2em;
    font-weight: 500;
    -webkit-transition: ease 0.5s;
    transition: ease 0.5s;
}

#connection:hover {
    color: #007eea;
}

#subscribe {
    background-color: #bc1f00;
    font-variant: small-caps;
    font-size: 1.3em;
    border-radius: 0.5em;
    padding: 10px 20px 10px 20px;
    -webkit-transition: ease 0.5s;
    transition: ease 0.5s;
}

#subscribe:hover {
    background-color: #9d1a00;
}

@media (max-width: 1024px) {
    nav {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    header {
        height: 100px;
    }
}
</style>

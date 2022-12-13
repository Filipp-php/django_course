<template>
  <nav>
    <router-link to="/">Главная</router-link> |
    <router-link to="/editor">Конструктор</router-link> |
    <router-link to="/catalog">Каталог</router-link> | 
    <router-link to="/exercises">Упражнения</router-link> |
    <router-link to="/about">О нас</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #993300;
  background-image: url('https://images.unsplash.com/photo-1457195740896-7f345efef228?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
  background-size: cover;
  background-attachment: fixed;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

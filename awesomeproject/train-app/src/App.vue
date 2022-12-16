<template>
  <nav>
    <router-link to="/">Главная</router-link> |
    <router-link to="/editor">Конструктор</router-link> |
    <router-link to="/catalog">Каталог</router-link> | 
    <router-link to="/exercises">Упражнения</router-link> |
    <router-link to="/complexes">Комплексы</router-link> |
    <router-link to="/about">О нас</router-link> |
    <router-link to="/login">Войти</router-link> |
    <router-link to="/register">Зарегистрироваться</router-link>
    <my-button class="butt" v-if="isLoggedIn"
            @click="exit"
        >
        Выйти
        </my-button>
  </nav>
  <router-view/>
  <!-- Footer -->
  <footer class="page-footer font-small blue foot bg-dark text-white" :style="currentStyle">

    <!-- Copyright -->
    <div class="footer-copyright text-center py-3">© 2022 Copyright:
      <a href="/"> train.com</a>
    </div>
    <!-- Copyright -->

  </footer>
<!-- Footer -->
</template>
<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFToken";
export default{
  methods: {
    ...mapActions('login', [
      'changeLoggedIn'
    ]),
    async exit() {
      const response = await axios({
          method: "post",
          url: "/accounts/logout",
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        })
      this.changeLoggedIn(!response.data[0]);
    },
  },
  async mounted () {
      const response = await axios({
            method: "get",
            url: "/accounts/checkuser",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            }
          })
      this.changeLoggedIn(response.data[0]);
  },
  computed: {
      ...mapState({
          isLoggedIn: state => state.login.isLoggedIn,
          currentStyle: state => state.currentStyle
      })
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #993300;
}

html body {
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

.butt{
    margin-left: 40px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>

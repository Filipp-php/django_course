<template>
  <video-bg class="vid" :sources="['https://joy.videvo.net/videvo_files/video/free/video0459/large_watermarked/_import_60c593722cd9a6.76835589_preview.mp4']" img="https://joy.videvo.net/videvo_files/video/free/video0458/large_watermarked/_import_60c59183b09766.16800488_preview.mp4">
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
  </video-bg>
</template>

<script>
import VideoBg from 'vue-videobg'
export default {
  components: {
    VideoBg
  }
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

.vid {
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  overflow: scroll;
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

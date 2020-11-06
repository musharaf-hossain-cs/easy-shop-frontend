<template>
  <v-app class="app" style="background-color:#a7ffeb;">
    <Navbar></Navbar>
    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>


<script>
  import Navbar from './components/Navbar';
  let socket;
  export default {
    name: 'App',

    components: {
      Navbar
    },

    data: () => ({
      //
    }),
    created() {
      socket = this.$store.getters.getSocket;
      let app = navigator.userAgent;
      let abc = {
        app
      };
      socket.emit('device',abc);
    }
  };
</script>

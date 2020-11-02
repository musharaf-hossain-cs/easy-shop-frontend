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
  import io from 'socket.io-client';
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
      socket = io(this.$store.state.server);
      let app = navigator.userAgent;
      let abc = {
        app
      };
      socket.emit('device',abc);
    }
  };
</script>

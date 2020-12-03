<template>
  <v-app class="app" v-if="loaded" style="background-color:#a7ffeb;">
    <Navbar></Navbar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
  <div v-else><h3>Loading...</h3></div>
</template>


<script>
  import Navbar from './components/Navbar';
  let socket;
  export default {
    name: 'App',

    components: {
      Navbar
    },

    data(){
      return{
        loaded: false
      }
    },
    created() {
      socket = this.$store.getters.getSocket;
      let app = navigator.userAgent;
      let abc = {
        app
      };
      socket.emit('device',abc);

      let root = this;
      if(this.$cookies.isKey('token')){
        let token = this.$cookies.get('token');
        let data = {
          command: 'checkLogin',
          token: token
        };
        socket.emit('login',data);
      }else{
        this.loaded = true;
      }
      socket.on('loginInfo', (res)=>{
        if(res.success){
          root.$store.dispatch('setUser',res.user);
          if(res.user.type.toLowerCase() === 'manager'){
            root.$store.dispatch('setAdmin',true);
          }
        }else{
          this.$cookies.remove('token');
          this.$router.push('/').catch((e)=>{
            console.log('Routing error in app.vue');
          });
        }
        this.loaded = true;
        socket.off('loginInfo');
      });

    }
  };
</script>

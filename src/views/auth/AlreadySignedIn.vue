<template>
  <div class="container">
    <h2>You are already signed in!</h2>
    <span>Want to sign out?</span>
    <b-link
        @click="atClickSignOut"
    >Sign-Out</b-link>
  </div>
</template>

<script>
let socket;
export default {
  name: "AlreadySignedIn",
  methods:{
    atClickSignOut(){
      socket.emit('signout', {
        token: this.$store.getters.getUser.token
      });
      this.$store.dispatch('setUser', null);
      this.$store.dispatch('setAdmin',false);
      this.$cookies.remove('token');
      this.$router.push('/auth/signin').catch((e)=>{
        console.log('Routing Error in AlreadySignedIn.vue');
      });
    }
  },

  created() {
    socket = this.$store.getters.getSocket;
  }
}
</script>

<style scoped>

</style>

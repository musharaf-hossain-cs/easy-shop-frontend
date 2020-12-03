<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Auth",
  methods:{
    isSignedIn(){
      return this.$store.getters.getUser != null;
    }
  },
  created() {
    if(this.isSignedIn()){
      this.$router.push('/already-signed-in').catch((e)=>{
        console.log('Routing Error in Auth.vue');
      })
    }
  }
}
</script>

<style scoped>

</style>

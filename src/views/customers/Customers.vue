<template>
  <div class="container">
    <customer-header></customer-header>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Customers",
  components:{
    customerHeader: ()=>import('@/components/CustomerHeader')
  },
  methods:{
    isCustomer(){
      if(this.$store.getters.getUser == null) return null;
      return this.$store.getters.getUser.type.toLowerCase() === 'customer';
    }
  },
  created() {
    if(this.isCustomer() == null){
      console.log('You are not signed in');
      this.$router.push('/auth/signin').catch((e)=>{
        console.log('Routing Error');
      });
    }else if(this.isCustomer()===false){
      console.log('You are not a customer');
      this.$router.push('/').catch((e)=>{
        console.log('Routing Error');
      });
    }
  }
}
</script>

<style scoped>

</style>

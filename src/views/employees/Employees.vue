<template>
  <div class="container">
    <employee-header></employee-header>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Employees",
  components:{
    EmployeeHeader: ()=>import('@/components/EmployeeHeader')
  },
  methods:{
    isEmployee(){
      if(this.$store.getters.getUser == null) return null;
      return this.$store.getters.getUser.type.toLowerCase() === 'employee';
    }
  },
  created() {
    if(this.isEmployee() == null){
      console.log('You are not signed in');
      this.$router.push('/auth/signin').catch((e)=>{
        console.log('Routing Error');
      });
    }else if(this.isEmployee()===false){
      console.log('You are not an employee');
      this.$router.push('/').catch((e)=>{
        console.log('Routing Error');
      });
    }
  }
}
</script>

<style scoped>

</style>

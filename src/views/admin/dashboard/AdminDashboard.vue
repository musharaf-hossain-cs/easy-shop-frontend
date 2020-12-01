<template>
  <div class="container">
    <monthly-salary></monthly-salary>
    <sell-report></sell-report>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",
  components:{
    monthlySalary: ()=> import('./MonthlySalary'),
    sellReport: ()=> import('./SellReport')
  }
}
</script>

<style scoped>

</style>

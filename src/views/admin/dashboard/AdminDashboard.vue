<template>
  <div class="container">
    <monthly-salary></monthly-salary>
    <weekly-sell-report></weekly-sell-report>
    <monthly-sell-report></monthly-sell-report>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",
  components:{
    monthlySalary: ()=> import('./MonthlySalary'),
    sellReport: ()=> import('./SellReport'),
    weeklySellReport: ()=> import('./WeeklySellReport'),
    monthlySellReport: ()=> import('./MonthlySellReport')
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="container">
    <div class="row">
      <b-button
          @click="employeeList"
          variant="info"
          class="col-4"
      >Employees List</b-button>
      <b-button
          @click="employeeRequest"
          variant="info"
          class="col-4"
      >Employee Request</b-button>
      <b-button
          @click="recruitEmployee"
          variant="info"
          class="col-4"
      >Recruit Employee</b-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Employees",
  methods:{
    employeeList(){
      this.$router.push('/admin/employees/employee-list');
    },
    employeeRequest(){
      this.$router.push('/admin/employees/requests');
    },
    recruitEmployee(){
      this.$router.push('/admin/employees/recruit');
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <table class="table table-striped table-hover">
      <tbody>
      <tr>
        <td>A</td><td>B</td>
      </tr>
      <tr>
        <td>A</td><td>B</td>
      </tr>
      <tr>
        <td>A</td><td>B</td>
      </tr>
      </tbody>


    </table>
    <table class="table" border="1">
      <thead >
      <th>Customer ID</th>
      <th>Name</th>
      <th>Username</th>
      <th>Password</th>
      <th>Email</th>
      <th>Mobile</th>
      <th>Address</th>
      <th>Gender</th>
      <th>Date Of Birth</th>
      <th>Status</th>
      </thead>
      <tr
          v-for="c in customers"
      >
        <td>{{ c.CUSTOMER_ID }}</td>
        <td>{{ c.FIRST_NAME }} {{c.LAST_NAME}}</td>
        <td>{{ c.USERNAME }}</td>
        <td>{{ c.PASSWORD }}</td>
        <td>{{ c.EMAIL }}</td>
        <td>{{ c.MOBILE }}</td>
        <td>{{ c.ADDRESS }}</td>
        <td>{{ c.GENDER }}</td>
        <td>{{ c.DOB }}</td>
        <td>{{ c.STATUS }}</td>

      </tr>
    </table>
  </div>

</template>

<script>
export default {
name: "customer-tableview"
}
</script>

<style scoped>

</style>

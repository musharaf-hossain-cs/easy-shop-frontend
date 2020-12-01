<template>
  <div class="home container">
      <h1>This is Home Page</h1>
      <router-link
              tag="span"
              to="/auth/signin"
      >
        <b-button variant="dark">SignIn</b-button>
      </router-link>
    .
    <router-link
        tag="span"
        to="/admin"
    >
      <b-button variant="dark">Admin</b-button>
    </router-link>
    .
    <router-link
        tag="span"
        to="/employees"
    >
      <b-button variant="dark">Employees</b-button>
    </router-link>
    .
    <router-link
        tag="span"
        to="/customers"
    >
      <b-button variant="dark">Customers</b-button>
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'
}
</script>

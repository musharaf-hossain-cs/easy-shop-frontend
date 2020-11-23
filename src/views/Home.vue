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
    <br><br>
    <Customers></Customers>
  </div>
</template>

<script>
// @ is an alias to /src
import Customers from '../components/check/Customers'

export default {
  name: 'Home',
  components: {
    Customers
  }
}
</script>

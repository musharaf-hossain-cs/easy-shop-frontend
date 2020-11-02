<template>
  <div class="home container">
      <h1>This is Home Page</h1>
      <router-link
              tag="span"
              to="/about"
      >
        <b-button variant="dark">About</b-button>
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

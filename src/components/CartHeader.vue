<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand>
        <v-icon color="white">mdi-cart</v-icon>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link
              to="/orders/carts/current-cart"
              tag="b-nav-item"
          ><b>Current Cart</b></router-link>
          <router-link
              to="/orders/carts/bought-carts"
              tag="b-nav-item"
          ><b>Bought Carts</b></router-link>
          <router-link
              to="/orders/carts/pending-carts"
              tag="b-nav-item"
          ><b>Pending Carts</b></router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <router-link
              to="/"
              tag="b-nav-item"
          >
            <b-icon icon="box-arrow-in-up-right" variant="light"></b-icon>
          </router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
name: "OrderHeader"
}
</script>

<style scoped>

</style>

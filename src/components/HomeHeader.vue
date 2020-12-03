<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand><b>Home</b></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link
              to="/home/all"
              tag="b-nav-item"
          ><b>All</b></router-link>
          <router-link
              to="/home/category-view"
              tag="b-nav-item"
          ><b>Category-Wise</b></router-link>
          <router-link
              to="/home/search-products"
              tag="b-nav-item"
          ><b>Search</b></router-link>
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
  name: "HomeHeader"
}
</script>

<style scoped>

</style>

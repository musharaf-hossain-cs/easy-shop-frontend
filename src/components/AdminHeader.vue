<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand><b>Admin</b></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link
              to="/admin/dashboard"
              tag="b-nav-item"
          ><b>Dashboard</b></router-link>
          <router-link
              to="/admin/products"
              tag="b-nav-item"
          ><b>Products</b></router-link>
          <router-link
              to="/admin/employees"
              tag="b-nav-item"
          ><b>Employess</b></router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em><b>User</b></em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
    export default {
        name: "AdminHeader"
    }
</script>

<style scoped>

</style>

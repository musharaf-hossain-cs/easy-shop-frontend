<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand><b>Customer</b></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link
              to="/customers/profile/dashboard"
              tag="b-nav-item"
          ><b>Dashboard</b></router-link>
          <router-link
              to="/customers/profile/history"
              tag="b-nav-item"
          ><b>Order History</b></router-link>
          <router-link
              v-if="false"
              to="/customers/profile/live-status"
              tag="b-nav-item"
          ><b>Live Status</b></router-link>
          <router-link
              to="/customers/profile/edit"
              tag="b-nav-item"
          ><b>Edit Profile</b></router-link>
          <router-link
              to="/customers/profile/security"
              tag="b-nav-item"
          ><b>Security</b></router-link>
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

        <!--
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em><b>User</b></em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        -->
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "CustomerHeader"
}
</script>

<style scoped>

</style>

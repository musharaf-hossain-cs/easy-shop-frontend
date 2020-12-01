<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand><b>Employee</b></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link
              to="/employees/profile/dashboard"
              tag="b-nav-item"
          ><b>Dashboard</b></router-link>
          <router-link
              to="/employees/profile/history"
              tag="b-nav-item"
          ><b>History</b></router-link>
          <router-link
              to="/employees/profile/live-status"
              tag="b-nav-item"
          ><b>Live Status</b></router-link>
          <router-link
              to="/employees/profile/edit"
              tag="b-nav-item"
          ><b>Edit Profile</b></router-link>
          <router-link
              to="/employees/profile/security"
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
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "EmployeeHeader"
}
</script>

<style scoped>

</style>

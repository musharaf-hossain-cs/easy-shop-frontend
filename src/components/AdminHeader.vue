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
          <router-link
              to="/admin/security"
              tag="b-nav-item"
          ><b>Security</b></router-link>
          <b-nav-item
            @click="atClickSignOut"
          >
            <b>Sign Out</b>
          </b-nav-item>
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
let socket;
import {mapActions} from 'vuex';
export default {
    name: "AdminHeader",
    methods:{
      ...mapActions([
         'setUser',
         'setAdmin'
      ]),
      atClickSignOut(){
        if(confirm('Are you sure to Sign Out?')){
          socket.emit('signout',{
            token: this.$store.getters.getUser.token
          });
          this.$cookies.remove('token');
          this.setAdmin(false);
          this.setUser(null);
          this.$router.push('/').catch((e)=>{
            console.log('Routing error in AdminHeader.vue');
          });
        }
      }
    },
    created() {
      socket = this.$store.getters.getSocket;
    }
}
</script>

<style scoped>

</style>

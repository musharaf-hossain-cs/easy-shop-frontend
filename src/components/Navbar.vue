<template>
    <nav>
        <v-app-bar app class="green lighten-4">
            <v-toolbar-title>
                <router-link
                        tag="span"
                        to="/home"
                        style="cursor: pointer"
                >
                    <v-btn class="align-center" style="height: 50px" text>
                        <v-img
                                :src="require('../assets/ProjectLogo.png')"
                                alt="EasyShop Logo"
                                class="shrink mr-2"
                                contain
                                transition="scale-transition"
                                width="45"
                        ></v-img>
                        <span class="font-weight-light">easy</span>
                        <span>Shop</span>
                    </v-btn>
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <router-link
                to="/notices"
                tag="button"
                class="hidden-sm-and-down"
            >
              <v-btn text>Notices</v-btn>
            </router-link>
            <router-link
                to="/admin"
                tag="button"
                class="hidden-sm-and-down"
                v-if="isAdmin"
            >
              <v-btn text>Admin</v-btn>
            </router-link>

            <div v-if="isSignedIn && !isAdmin">
              <b-dropdown
                  :text="userFirstName"
                  variant="outline"
                  class="m-2"
                  block
              >
                <b-dropdown-group align="center">
                  <b-dropdown-header>
                    <b-avatar
                        variant="primary"
                        text="USER"
                        :src="getUserImageURL"
                        alt="user-photo"
                        size="150"
                    ></b-avatar>

                    <h2>{{userFirstName}} {{userLastName}}</h2>
                    <h3>({{getUserName}})</h3>
                  </b-dropdown-header>
                </b-dropdown-group>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item >
                  <b-btn
                      variant="primary"
                      block
                      @click="atClickDashboard"
                  >Dashboard</b-btn>
                </b-dropdown-item>
                <b-dropdown-item>
                  <b-btn
                      variant="primary"
                      block
                      @click="atClickSignOut"
                  >Sign Out</b-btn>
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <div v-else-if="!isAdmin">
              <router-link
                  to="/auth/signin"
                  tag="button"
              >
                <v-btn text>Sign in</v-btn>
              </router-link>
            </div>

            <v-btn
                    @click="cartDrawer=!cartDrawer"
                    text
                    class="hidden-sm-and-down"
            >
              <span>Cart</span>
                <v-icon>mdi-cart</v-icon>
            </v-btn>

            <v-menu
                v-if="isMobile"
            >
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item to="/notices">
                  <v-list-item-title>NOTICE</v-list-item-title>
                </v-list-item>
                <v-list-item to="/admin">
                  <v-list-item-title>ADMIN</v-list-item-title>
                </v-list-item>
              </v-list>

            </v-menu>

        </v-app-bar>

        <v-navigation-drawer
                app
                right
                temporary
                v-model="cartDrawer"
                class="primary"
        >
            <v-container>
                <v-btn @click="cartDrawer=!cartDrawer" block>
                    <span>Close</span>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-container>

        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
  name: "Navbar",
  data(){
    return{
      cartDrawer: false,
      user: null,
      userImageURL: null,
      signedIn: null
    }
  },
  methods:{
    atClickSignOut(){
      if(confirm('Are to sure to sign out?')){
        this.$store.commit('setUser',null);
        this.$router.push('/auth/signin').catch((e)=>{
          console.log('Routing Error!');
        });
      }
    },
    atClickDashboard(){
      if(this.user.type.toLowerCase() === 'customer'){
        this.$router.push('/customers/profile/dashboard')
            .catch((e)=>{
              console.log('routing error!');
            });
      }else if(this.user.type.toLowerCase() === 'employee'){
        this.$router.push('/employees/profile/dashboard')
            .catch((e)=>{
              console.log('routing error!');
            });
      }
    }
  },
  computed:{
    userFirstName(){
      this.user = this.$store.getters.getUser;
      return this.user.first_name.toUpperCase();
    },
    userLastName(){
      return this.$store.getters.getUser.last_name.toUpperCase();
    },
    getUserName(){
      return this.$store.getters.getUser.username;
    },
    getUserImageURL(){
      const buffer = this.$store.getters.getUser.image;
      const blob = new Blob([buffer], {type: 'image/jpeg'});
      const reader = new FileReader();
      reader.onload = (e) => {
        this.userImageURL = e.target.result;
      };
      reader.readAsDataURL(blob);
      return this.userImageURL;
    },
    isMobile(){
      return this.$vuetify.breakpoint.xsOnly;
    },
    isSignedIn(){
      return this.$store.getters.getUser != null;
    },
    isAdmin(){
      if(this.$store.getters.getUser == null) return false;

      if(this.$store.getters.getUser.type.toLowerCase() === 'manager'){
        this.$store.commit('setAdmin',true);
      }else{
        this.$store.commit('setAdmin', false);
      }
      return this.$store.getters.isAdmin;
    }
  }
}
</script>

<style scoped>

</style>

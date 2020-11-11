<template>
    <nav>
        <v-app-bar app>
            <v-toolbar-title>
                <router-link
                        tag="span"
                        to="/home"
                        style="cursor: pointer"
                >
                    <v-btn class="align-center" style="height: 50px" text>
                        <v-img
                                src="../assets/abc.png"
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

            <b-dropdown
                :text="userFirstName"
                variant="outline"
                class="m-2"
            >
              <b-dropdown-group align="center">
                <b-dropdown-header>
                  <b-avatar
                      variant="primary"
                      text="BV"
                      :src="require('./abc.png')"
                      size="150"
                  ></b-avatar>

                  <h2>{{userFirstName}} {{userLastName}}</h2>
                  <h3>({{getUserName}})</h3>
                </b-dropdown-header>
              </b-dropdown-group>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item >
                <b-btn variant="primary" block>Dashboard</b-btn>
              </b-dropdown-item>
              <b-dropdown-item>
                <b-btn variant="primary" block>Signout</b-btn>
              </b-dropdown-item>

               <!-- <b-icon icon="caret-down-fill"></b-icon>   -->
               <!-- <v-icon flat right>mdi-exit-to-app</v-icon>  -->
            </b-dropdown>
            <v-btn
                    @click="cartDrawer=!cartDrawer"
                    text
            >
              <span>Cart</span>
                <v-icon>mdi-cart</v-icon>

            </v-btn>
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
      user: null
    }
  },
  created() {

  },
  computed:{
    userFirstName(){
      this.user = this.$store.getters.getUser;
      return this.user.first_name;
    },
    userLastName(){
      return this.$store.getters.getUser.last_name;
    },
    getUserName(){
      return this.$store.getters.getUser.username;
    }

  }
}
</script>

<style scoped>

</style>

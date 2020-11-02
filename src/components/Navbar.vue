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
            <v-btn text >
                <span>User</span>
                <b-icon icon="caret-down-fill"></b-icon>
               <!-- <v-icon flat right>mdi-exit-to-app</v-icon>  -->
            </v-btn>
            <v-btn
                    @click="cartDrawer=!cartDrawer"
                    text
            >
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
                cartDrawer: false
            }
        }
    }
</script>

<style scoped>

</style>

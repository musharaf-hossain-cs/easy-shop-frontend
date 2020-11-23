<template>
  <div class="container" >
    <router-link
        to="/admin/products/insert"
    >
      <v-btn
          fab
          large
          bottom
          fixed
          class="secondary"
          id="add-a-product"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </router-link>
    <b-tooltip
        target="add-a-product"
        triggers="hover"
    >Add a Product </b-tooltip>
    <div>
      <b-card-group>
        <app-product
            v-for="product in products"
            :product="product"
            :key="product.PRODUCT_MODEL_ID"
        ></app-product>
      </b-card-group>

    </div>
  </div>
</template>

<script>
import Product from './Product';
let socket;
export default {
  name: "ProductHome",
  data(){
    return{
      products: []
    }
  },
  created() {
    let admin;
    admin = this.$store.getters.isAdmin;
    if(!admin){
      this.$router.push('/admin/notAdmin');
    }
    socket = this.$store.getters.getSocket;
    socket.emit('sendProductsAdmin');
    socket.on('getProductsAdmin', (data)=>{
      this.products = data;
    })
  },
  components:{
    appProduct: Product
  }
}
</script>

<style scoped>

</style>

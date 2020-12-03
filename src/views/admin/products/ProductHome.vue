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
            v-for="(product,index) in products"
            :product="product"
            :key="index"
        ></app-product>
      </b-card-group>

    </div>
  </div>
</template>

<script>
import Product from './ProductCard';
let socket;
export default {
  name: "ProductHome",
  data(){
    return{
      products: []
    }
  },
  created() {
    socket = this.$store.getters.getSocket;
    socket.emit('sendProducts');
    socket.on('getProducts', (data)=>{
      this.products = data;
      socket.off('getProducts');
    })
  },
  components:{
    appProduct: Product
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="container" v-if="loaded">
    <h3>All products</h3>
    <div>
      <b-card-group>
        <product-card
            v-for="(product,index) in products"
            :product="product"
            :key="index"
        ></product-card>
      </b-card-group>

    </div>
  </div>
  <div v-else><h3>Loading...</h3></div>
</template>

<script>
import ProductCard from "@/views/home/ProductCard";

let socket;
export default {
  name: "AllProducts",
  data(){
    return{
      products: [],
      loaded:false
    }
  },
  created() {
    socket = this.$store.getters.getSocket;
    socket.emit('sendProducts');
    socket.on('getProducts', (data)=>{
      this.products = data;
      this.loaded = true;
      socket.off('getProducts');
    })
  },
  components:{
    productCard: ProductCard
  }
}
</script>

<style scoped>

</style>

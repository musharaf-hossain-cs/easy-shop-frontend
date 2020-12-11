<template>
  <div class="container" v-if="loaded">
    <h3>SearchView</h3>
    <b-form>
      <b-form-group
          id="search-group"
          label="Search: "
          label-for="search"
      >
        <b-input-group class="mb-3">
          <b-input
              id="search"
              v-model="search"
              required
              placeholder="Search Item"
              style="margin-left: 10px;"
              autocomplete="off"
          ></b-input>
          <b-input-group-append>
            <b-button  @click="atClickSearch" >Search</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-form>
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
import ProductCard from "@/views/admin/products/ProductCard";
let socket;
export default {
  name: "SearchProducts",
  data(){
    return{
      products: [],
      loaded:false,
      search: ''
    }
  },
  methods:{
    atClickSearch(){
      socket.emit('sendSearchedProducts',{
        search: this.search
      });
      this.loaded = false;
      socket.on('getSearchedProducts', (data)=>{
        this.products = data;
        this.loaded = true;
        socket.off('getSearchedProducts');
      });
    }
  },
  created() {
    socket = this.$store.getters.getSocket;

    socket.emit('sendSearchedProducts',{
      search: this.search
    });
    socket.on('getSearchedProducts', (data)=>{
      this.products = data;
      this.loaded = true;
      socket.off('getSearchedProducts');
    });
  },
  components:{
    productCard: ProductCard
  }
}
</script>

<style scoped>

</style>

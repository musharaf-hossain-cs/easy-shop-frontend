<template>
  <div class="container" v-if="loaded">
    <b-form>
      <b-form-group
          id="category-group"
          label="Select Category: "
          label-for="category"
      >
        <b-form-select
            id="category"
            :options="categories"
            v-model="selectedCategory"
            @change="atChangeCategory"
        ></b-form-select>
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
  name: "CategoryView",
  data(){
    return{
      products: [],
      loaded:false,
      selectedCategory: 'All',
      categories: [
        'All'
      ]
    }
  },
  methods:{
    atChangeCategory(){
      console.log('Changed Category');
      console.log(this.selectedCategory);
      socket.emit('sendProductsByCategory',{
        category: this.selectedCategory
      });
      this.loaded = false;
      socket.on('getProductsByCategory', (data)=>{
        this.products = data;
        this.loaded = true;
        socket.off('getProductsByCategory');
      });
    }
  },
  created() {
    socket = this.$store.getters.getSocket;

    socket.emit('sendCategories');
    socket.on('getCategories', (res) => {
      if(res.length>0){
        let i=0;
        for(i;i<res.length;i++){
          this.categories.push(res[i].CATEGORY);
        }
      }
      socket.off('getCategories');
    });

    socket.emit('sendProductsByCategory',{
      category: this.selectedCategory
    });
    socket.on('getProductsByCategory', (data)=>{
      this.products = data;
      this.loaded = true;
      socket.off('getProductsByCategory');
    });
  },
  components:{
    productCard: ProductCard
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="container">
    <div class="row" style="margin:15px;">
      <b-button
          @click="atSelectAllProducts"
          variant="info"
          class="col-4"
      >All Products</b-button>
      <b-button
          @click="atSelectCategoryView"
          variant="info"
          class="col-4"
      >Category View</b-button>
      <b-button
          @click="atSelectSearchView"
          variant="info"
          class="col-4"
      >Search Products</b-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Product",
  methods:{
    atSelectAllProducts(){
      this.$router.push('/admin/products').catch((e)=>{
        console.log('Routing Error in Admin Products.vue');
      });
    },
    atSelectCategoryView(){
      this.$router.push('/admin/products/category-view').catch((e)=>{
        console.log('Routing Error in Admin Products.vue');
      });
    },
    atSelectSearchView(){
      this.$router.push('/admin/products/search').catch((e)=>{
        console.log('Routing Error in Admin Products.vue');
      });
    }
  }
}
</script>

<style scoped>

</style>

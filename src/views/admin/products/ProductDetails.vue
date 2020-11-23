<template>
<div v-if="loaded">
  <div class="row">
    <div class="col-sm-12 col-md-5" style="text-align: center">
      <h3 style="text-align: left">Product's Image:</h3>
      <b-img
          :src="imageURL"
          alt="Product's Image"
          class="col-sm-12 col-md-10"
      ></b-img>
    </div>

    <div class="col-sm-12 col-md-7">
      <b-table striped stacked hover :items="tableData"></b-table>
    </div>
  </div>
  <div>
    <b-button
        block
        variant="success"
        @click="atClickEdit"
    >Edit Product Info</b-button>
  </div>

</div>
</template>

<script>
let socket;
export default {
  name: "ProductDetails",
  data(){
    return {
      id: '',
      product: null,
      imageURL: null,
      loaded: false,
    }
  },
  methods:{
    atClickEdit(){
      this.$router.push('/admin/products/product/'+this.product.MODEL_ID+'/edit');
    }
  },
  computed:{
    tableData(){
      let item = [
        {
          'Model Name:': this.product.MODEL_NAME,
          'Brand:': this.product.BRAND,
          'Category: ': this.product.CATEGORY,
          'Price: ': this.product.PRICE,
          'Stock:': this.product.STOCK,
          'Sold:':this.product.SOLD,
          'Description:':this.product.DESCRIPTION
        }
      ];
      return item;
    }
  },
  created() {
    this.id = this.$route.params.id;
    socket = this.$store.getters.getSocket;
    socket.emit('sendProductAdmin',{
      id: this.id
    });
    let root = this;
    socket.on('getProductAdmin',(res)=>{
      if(res.length > 0){
        this.product = res[0];
        const buffer = this.product.IMAGE;
        const blob = new Blob([buffer], {type: 'image/jpeg'});
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageURL = e.target.result;
          root.loaded = true;
        };
        reader.readAsDataURL(blob);
      }

    });
  }
}
</script>

<style scoped>

</style>

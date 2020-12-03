<template>
  <div v-if="loaded">
    <div class="row">
      <div class="col-sm-12 col-md-5" style="text-align: center">
        <h4 style="text-align: left">{{product.CATEGORY}} > <b>{{product.MODEL_NAME}}</b></h4>
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
          :variant="isSelected ? 'danger':'success'"
          @click="atClickAddorRemove"
      >{{cartButtonName}}</b-button>
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
    atClickAddorRemove(){
      if(this.isSelected){
        this.$store.dispatch('removeCartItem', this.product.MODEL_ID);
      }else{
        this.$store.dispatch('addCartItem', {
          id: this.product.MODEL_ID,
          name: this.product.MODEL_NAME
        });
      }
    }
  },
  computed:{
    tableData(){
      let item = [
        {
          'Model Name:': this.product.MODEL_NAME,
          'Brand:': this.product.BRAND,
          'Category: ': this.product.CATEGORY,
          'Price: ': 'TK.'+this.product.PRICE,
          'Discount: ': this.product.DISCOUNT+'%',
          'Stock:': this.product.STOCK,
          'Sold:':this.product.SOLD,
          'Description:':this.product.DESCRIPTION
        }
      ];
      return item;
    },
    isSelected(){
      let idx = this.$store.getters.getCurrentCart
          .findIndex(item => item.id === this.product.MODEL_ID);
      return idx >= 0;
    },
    cartButtonName(){
      if(this.isSelected){
        return 'Remove from Cart';
      }else{
        return 'Add to Cart';
      }
    }
  },
  created() {
    this.id = this.$route.params.id;
    socket = this.$store.getters.getSocket;
    socket.emit('sendProduct',{
      id: this.id
    });
    let root = this;
    socket.on('getProduct',(res)=>{
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
      }else{
        root.$router.push('/admin/products');
      }
      socket.off('getProduct')
    });
  }
}
</script>

<style scoped>

</style>

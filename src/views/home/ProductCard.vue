<template>
  <div class="col-sm-12 col-md-6 col-lg-4">
    <b-card
        :title="product.MODEL_NAME"
        header-bg-variant="info"
        border-variant="primary"
    >
      <template #header>{{ product.CATEGORY }}</template>
      <b-img :src="image" alt="Product's Image" height="150px" center></b-img>

      <b-card-text>
        <hr>
        Price: TK.{{product.PRICE}} (-{{product.DISCOUNT}}%)<br>
        ({{status}})
      </b-card-text>
      <template #footer>
        <b-button
            class="col-5"
            variant="success"
            @click="atClickDetails"
        >Details</b-button>
        <b-button
            class="col-7"
            :variant="isSelected?'danger':'info' "
            @click="atClickAddorRemove"
        >{{cartButtonName}}</b-button>
      </template>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: ['product'],
  data(){
    return {
      image:null,
    }
  },
  methods: {
    atClickDetails(){
      this.$router.push('/home/products/product/'+this.product.MODEL_ID+'/details')
      .catch((e)=>{
        console.log('Routing error in home/Product.vue');
      });
    },
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
    isSelected(){
      let idx = this.$store.getters.getCurrentCart
          .findIndex(item => item.id === this.product.MODEL_ID);
      return idx >= 0;
    },
    status(){
      if(this.product.STOCK>0)
        return 'Available';
      else
        return 'Out of Stock';
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
    const buffer = this.product.IMAGE;
    const blob = new Blob([buffer], {type: 'image/jpeg'});
    const reader = new FileReader();
    reader.onload = (e) => {
      this.image = e.target.result;
    };
    reader.readAsDataURL(blob);
  },
}
</script>

<style scoped>

</style>

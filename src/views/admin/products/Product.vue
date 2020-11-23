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
        Price: TK.{{product.PRICE}} ({{status}})
      </b-card-text>
      <template #footer>
        <b-button
            class="col-6"
            variant="success"
            @click="atClickDetails"
        >Details</b-button>
        <b-button
            class="col-6"
            variant="danger"
            @click="atClickEdit"
        >Edit</b-button>
      </template>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: ['product'],
  data(){
    return {
      image:null,
    }
  },
  methods: {
    atClickDetails(){
      this.$router.push('/admin/products/product/'+this.product.MODEL_ID+'/details');
    },
    atClickEdit(){
      this.$router.push('/admin/products/product/'+this.product.MODEL_ID+'/edit');
    }
  },
  computed:{
    status(){
      if(this.product.STOCK>0)
        return 'Available';
      else
        return 'Out of Stock';
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

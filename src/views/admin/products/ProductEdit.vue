<template>
<div v-if="loaded">
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <h4> {{product.CATEGORY}} > <b>{{product.MODEL_NAME}}</b></h4>
      <b-img
          :src="getImage"
          alt="Product's Image"
          class="col-sm-10 col-md-8"
      ></b-img>
      <b-form>
        <b-form-file
            id="image"
            v-model="formData.image"
            placeholder="Choose a image or drop it here..."
            drop-placeholder="Drop image here..."
            accept="image/*"
            @change="atImageSelection"
            :state="imageState"
        ></b-form-file>
      </b-form>
    </div>

    <div class="col-sm-12 col-md-6">
      <b-form>
        <h5>Current Price: <b>TK.{{product.PRICE}}</b></h5>
        <b-form-group
          label="New Price (Taka):"
          label-for="newPrice"
        >
          <b-form-input
              id="newPrice"
              v-model="formData.newPrice"
              type="number"
              placeholder="New Price Here..."
              :state="priceState"
          ></b-form-input>
        </b-form-group>
        <hr>
        <h5>Current Stock: <b>{{product.STOCK}}</b></h5>
        <b-form-group
            label="Increase Stock By:"
            label-for="increaseStock"
        >
          <b-form-input
              id="increaseStock"
              v-model="formData.newStock"
              type="number"
              placeholder="Add Stock..."
              :state="stockState"
          ></b-form-input>
        </b-form-group>
        <hr>
        <h5>Current Discount: <b>{{product.DISCOUNT}}%</b></h5>
        <b-form-group
            label="New Discount (%):"
            label-for="newDiscount"
        >
          <b-form-input
              id="newDiscount"
              v-model="formData.newDiscount"
              type="number"
              placeholder="New Discount..."
              :state="discountState"
          ></b-form-input>
        </b-form-group>
      </b-form>
    </div>
  </div>
  <div class="row">
    <b-button
        class="col-6"
        @click="atClickChange"
        variant="success"
    >Change</b-button>
    <b-button
        class="col-6"
        @click="atClickReset"
        variant="danger"
    >Reset</b-button>
  </div>
</div>
</template>

<script>
let socket;
export default {
  name: "EditProduct",
  data(){
    return {
      id: '',
      product: null,
      oldImageURL: null,
      newImageURL:null,
      newImageBlob: null,
      loaded: false,
      formData: {
        newPrice: null,
        newStock: null,
        newDiscount:null,
        image:null
      }
    }
  },
  methods:{
    checkValidity(){
      return this.imageState !== false && this.priceState !== false
          && this.stockState !== false && this.discountState !== false;
    },
    atClickChange(){
      if(!this.checkValidity()){
        alert('Invalid Input!');
        return;
      }
      let fields = this.createDataToUpdate();
      let hasImage = false;
      let hasFields = false;
      if(this.imageState){
        hasImage = true;
      }
      if(fields.length > 0){
        hasFields = true;
      }
      if((!hasFields) && (!hasImage)){
        alert('Nothing to update!');
        return;
      }

      let data = {
        command: 'update',
        tablename: 'product_models',
        hasFields: hasFields,
        fields: fields,
        hasImage: hasImage,
        image: this.newImageBlob,
        id: this.id
      };
      console.log(data);
      socket.emit('update',data);
    },
    atClickReset(){
      this.formData.image = null;
      this.formData.newDiscount = null;
      this.formData.newPrice = null;
      this.formData.newStock = null;
      this.newImageBlob = null;
      this.newImageURL = null;
    },
    makeBlob(){
      let img = new Image;
      let c = document.createElement("canvas");
      let ctx = c.getContext("2d");
      let root = this;
      img.onload = function() {
        c.width = this.naturalWidth;     // update canvas size to match image
        c.height = this.naturalHeight;
        ctx.drawImage(this, 0, 0);       // draw in image
        c.toBlob(function(blob) {        // get content as JPEG blob
          // here the image is a blob
          console.log(blob);
          root.newImageBlob = blob;
        }, "image/jpeg", 0.75);
      };
      img.crossOrigin = "";              // if from different origin
      img.src = this.newImageURL;
    },
    atImageSelection(event){
      this.formData.image = event.target.files[0];
      console.log(this.formData.image.type + ' ' + this.formData.image.size);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newImageURL = e.target.result;
        this.makeBlob();
      };
      reader.readAsDataURL(this.formData.image);
    },
    createDataToUpdate(){
      let data = [];
      /*if(this.formData.image!=null){
        data.push({
          field: 'image',
          value: this.newImageBlob
        });
      }*/
      if(this.formData.newPrice>0){
        data.push({
          field: 'price',
          value: this.formData.newPrice
        });
      }
      if(this.formData.newStock!==0 && this.formData.newStock!=null
        && this.formData.newStock!==''){
        data.push({
          field: 'stock',
          value: parseInt(this.product.STOCK) + parseInt(this.formData.newStock)
        });
      }
      if(this.formData.newDiscount>=0 && this.formData.newDiscount<=100
        && this.formData.newDiscount != null){
        data.push({
          field: 'discount',
          value: this.formData.newDiscount
        });
      }
      return data;
    }
  },
  computed:{
    getImage(){
      if(this.formData.image == null){
        return this.oldImageURL;
      }else{
        return this.newImageURL;
      }
    },
    priceState(){
      if(this.formData.newPrice===null || this.formData.newPrice===0
          || this.formData.newPrice==='') return null;
      if(this.formData.newPrice>999999999){
        alert('Maximum Limit Exceeded!');
        return false;
      }
      return true;
    },
    discountState(){
      if(this.formData.newDiscount===null || this.formData.newDiscount===0
          || this.formData.newDiscount==='') return null;
      if(this.formData.newDiscount>100 || this.formData.newDiscount<0){
        alert('Discount must be in range 0-100!');
        return false;
      }
      return true;
    },
    stockState(){
      if(this.formData.newStock===null || this.formData.newStock===0
          || this.formData.newStock==='') return null;
      if(this.formData.newStock>1000000000){
        alert('Maximum Limit Exceeded!');
        return false;
      }
      return true;
    },
    imageState(){
      if(this.formData.image == null) return null;
      else return true;
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
          this.oldImageURL = e.target.result;
          root.loaded = true;
        };
        reader.readAsDataURL(blob);
      }else{
        root.$router.push('/admin/products');
      }

    });
    socket.on('updateResponse', (res)=>{
      if(res.success){
        root.$router.push('/admin/products/product/'+root.id+'/details').catch((e)=>{
          console.log('routing error due to duplicate route!');
        });
        socket.off('updateResponse');
      }else{
        alert('Failed to update!');
      }
    });
  }
}
</script>

<style scoped>

</style>

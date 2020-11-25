<template>
  <div class="row" style="background-color:#a7ffeb;">
    <div class="col-sm-10 col-md-8 col-lg-6 " style="margin: auto">
      <h3 style="margin-bottom: 20px; text-align: center">Add a Product</h3>
      <div style="text-align: center">
      </div>

      <b-form>
        <b-form-group
            id="form-group-model"
            label="Enter Product Model:"
            label-for="product-model"
        >
          <b-input-group class="mb-3">
            <b-form-input
                id="product-model"
                v-model="formData.model"
                @keyup="modelNameCheck=null"
                required
                placeholder="Enter Model Name"
                style="margin-left: 10px;"
                autocomplete="off"
                :state="modelState"
            ></b-form-input>
            <b-input-group-append>
              <b-button  @click="checkModelName" >Check</b-button>
            </b-input-group-append>
          </b-input-group>

        </b-form-group>
        <b-form-group
            id="form-group-description"
            label="Product Description:"
            label-for="product-description"
        >
          <b-form-textarea
              id="product-description"
              v-model="formData.description"
              placeholder="Description Here"
              style="margin: 10px;"
              autocomplete="off"
              :state="descriptionState"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group
            id="form-group-brand"
            label="Product brand:"
            label-for="product-brand"
        >
          <b-form-input
              id="product-brand"
              v-model="formData.brand"
              placeholder="Product Brand"
              style="margin: 10px;"
              autocomplete="off"
              :state="brandState"
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="form-group-category"
            label="Product category:"
            label-for="product-category"
        >
          <b-form-input
              id="product-category"
              v-model="formData.category"
              placeholder="Category"
              style="margin: 10px;"
              autocomplete="off"
              :state="categoryState"
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="form-group-price"
            label="Product price:"
            label-for="product-price"
        >
          <b-form-input
              id="product-price"
              v-model="formData.price"
              placeholder="Product Price"
              type="number"
              required
              style="margin: 10px;"
              autocomplete="off"
              :state="priceState"
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="form-group-discount"
            label="Product Discount(%):"
            label-for="product-discount"
        >
          <b-form-input
              id="product-discount"
              v-model="formData.discount"
              placeholder="Product Discount (0 to 100)"
              type="number"
              required
              style="margin: 10px;"
              autocomplete="off"
              :state="discountState"
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="form-group-stock"
            label="Product stock:"
            label-for="product-stock"
        >
          <b-form-input
              id="product-stock"
              v-model="formData.stock"
              placeholder="Product stock"
              type="number"
              required
              style="margin: 10px;"
              autocomplete="off"
              :state="stockState"
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="form-group-image"
            label-for="image"
            label="Product Image: "
        >
          <b-img
              center
              :src="imageURL"
              v-if="imageURL!=null"
              alt="ProductImage"
              width="100"
          ></b-img>
          <b-form-file
              id="image"
              v-model="formData.image"
              placeholder="Choose a image or drop it here..."
              drop-placeholder="Drop image here..."
              accept="image/*"
              @change="atImageSelection"
              :state="imageState"
          ></b-form-file>
        </b-form-group>
        <b-alert
            variant="danger"
            :show="submitAlert"
        >Please fill up everything correctly!</b-alert>
        <div
            class="row"
            style="padding:5px;"
        >
          <div class="col-sm-1"></div>
          <v-btn
              class="col-sm-4 secondary"
              @click="onReset"
          >Reset</v-btn>
          <div class="col-sm-1"></div>
          <v-btn
              class="col-sm-4 success"
              @click="onSubmit"
          >Submit</v-btn>
          <div class="col-sm-1"></div>
        </div>
      </b-form>

    </div>

  </div>

</template>

<script>
let socket;
export default {
  name: "InsertProduct",
  created() {
    socket = this.$store.getters.getSocket;
    socket.on('insertProductRes', (data)=>{
      if(data.success){
        this.onReset();
        this.$router.push('/admin/products');
      }
    });
  },
  data(){
    return {
      formData: {
        model: '',
        category: '',
        brand: '',
        price: null,
        discount: null,
        stock: null,
        image: null,
        description: ''
      },
      imageBlob: null,
      imageURL: null,
      submitAlert: false,
      modelNameCheck: null
    }
  },
  methods:{
    atImageSelection(event){
      this.formData.image = event.target.files[0];
      console.log(this.formData.image.type + ' ' + this.formData.image.size);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageURL = e.target.result;
        this.makeBlob();
      };
      reader.readAsDataURL(this.formData.image);
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
          root.imageBlob = blob;
        }, "image/jpeg", 0.75);
      };
      img.crossOrigin = "";              // if from different origin
      img.src = this.imageURL;
    },
    checkValidity(){
      return this.modelState && this.descriptionState && this.brandState && this.priceState
          && this.categoryState && this.discountState && this.stockState && this.imageState;
    },
    checkModelName(){
      let data = {
        command: 'checkModelName',
        tablename: 'product_models',
        field: 'MODEL_NAME',
        value: this.formData.model
      }
      socket.emit('check', data);
      socket.on(data.command,(data)=>{
        this.modelNameCheck = data;
      });
    },
    onSubmit(){
      if(!this.checkValidity()){
        alert('Invalid Input');
        return;
      }
      let data = {
        command: 'insert',
        tablename: 'PRODUCT_MODELS',
        id: '',
        image:this.imageBlob,
        modelName: this.formData.model,
        category: this.formData.category,
        brand: this.formData.brand,
        price: this.formData.price,
        discount: this.formData.discount,
        stock: this.formData.stock,
        description: this.formData.description,
        sold: 0
      };
      socket.emit('insert',data);
    },
    onReset(){
      this.formData.model = '';
      this.formData.category = '';
      this.formData.brand = '';
      this.formData.price = null;
      this.formData.discount = null;
      this.formData.stock = null;
      this.formData.description = '';
      this.formData.image = null;
    }
  },
  computed: {
    modelState(){
      if(this.formData.model==='') return null;
      if(this.formData.model.length>=50){
        alert('Maximum limit exceeded!');
        return false;
      }
      return this.modelNameCheck;
    },
    descriptionState(){
      if(this.formData.description==='') return null;
      if(this.formData.description.length>=2000){
        alert('Maximum limit exceeded!');
        return false;
      }
      return true;
    },
    brandState(){
      if(this.formData.brand==='') return null;
      if(this.formData.brand.length>=30){
        alert('Maximum limit exceeded!');
        return false;
      }
      return true;
    },
    categoryState(){
      if(this.formData.category==='') return null;
      if(this.formData.category.length>=30){
        alert('Maximum limit exceeded!');
        return false;
      }
      return true;
    },
    priceState(){
      if(this.formData.price===null || this.formData.price===0
        || this.formData.price==='') return null;
      if(this.formData.price>999999999){
        alert('Maximum Limit Exceeded!');
        return false;
      }
      return true;
    },
    discountState(){
      if(this.formData.discount===null || this.formData.discount===0
          || this.formData.discount==='') return null;
      if(this.formData.discount>100 || this.formData.discount<0){
        alert('Discount must be in range 0-100!');
        return false;
      }
      return true;
    },
    stockState(){
      if(this.formData.stock===null || this.formData.stock===0
          || this.formData.stock==='') return null;
      if(this.formData.stock>1000000000){
        alert('Maximum Limit Exceeded!');
        return false;
      }
      return true;
    },
    imageState(){
      if(this.formData.image == null) return null;
      else return true;
    }
  }
}
</script>

<style scoped>

</style>

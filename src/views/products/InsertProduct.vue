<template>
  <div class="row" style="background-color:#a7ffeb;">
    <div class="col-xs-10 col-sm-8 col-md-6 col-lg-5 " style="margin: auto">
      <h3 style="margin-bottom: 20px; text-align: center">Add a Product</h3>
      <div style="text-align: center">
      </div>

      <b-form>
        <b-form-group
            id="form-group-model"
            label="Enter Product Model:"
            label-for="product-model"
        >
          <b-form-input
              id="product-model"
              v-model="formData.model"
              required
              placeholder="Enter Model Name"
              style="margin: 10px;"
              autocomplete="off"
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="form-group-description"
            label="Product Description:"
            label-for="product-description"
        >
          <b-form-input
              id="product-description"
              v-model="formData.description"
              placeholder="Description Here"
              style="margin: 10px;"
              autocomplete="off"
          ></b-form-input>
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
export default {
  name: "InsertProduct",
  data(){
    return {
      formData: {
        model: '',
        category: '',
        brand: '',
        price: 0,
        stock: 0,
        image: null,
        description: ''
      },
      imageBlob: null,
      imageURL: null,
      submitAlert: false
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
      let param = this;
      img.onload = function() {
        c.width = this.naturalWidth;     // update canvas size to match image
        c.height = this.naturalHeight;
        ctx.drawImage(this, 0, 0);       // draw in image
        c.toBlob(function(blob) {        // get content as JPEG blob
          // here the image is a blob
          console.log(blob);
          param.imageBlob = blob;
        }, "image/jpeg", 0.75);
      };
      img.crossOrigin = "";              // if from different origin
      img.src = this.imageURL;
    },
    onSubmit(){

    },
    onReset(){

    }
  }
}
</script>

<style scoped>

</style>

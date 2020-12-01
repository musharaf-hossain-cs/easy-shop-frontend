<template>
  <div v-if="loaded">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <h4>Current Photo:</h4>
        <b-img
            :src="oldImageURL"
            alt="User's Photo"
            class="col-sm-10 col-md-4"
        ></b-img>
        <h4 v-if="formData.newImage != null">New Image: </h4>
        <b-img
            v-if="formData.newImage != null"
            :src="newImageURL"
            alt="User's new Photo"
            class="col-sm-10 col-md-8"
        ></b-img>
        <b-form>
          <b-form-file
              id="image"
              v-model="formData.newImage"
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
          <h5>Current Name: <b>{{customer.FIRST_NAME + ' ' +customer.LAST_NAME}}</b></h5>
          <b-form-group
              label="New Name:"
              label-for="newName"
          >
            <b-form-input
                id="newName"
                v-model="formData.newFirstName"
                placeholder="First Name"
                style="margin: 10px;"
                autocomplete="off"
                :state="firstNameState"
            ></b-form-input>
            <b-form-input
                v-model="formData.newLastName"
                placeholder="Last Name"
                style="margin: 10px;"
                autocomplete="off"
                :state="lastNameState"
            ></b-form-input>
          </b-form-group>
          <hr>
          <h5>Current Email: <b>{{customer.EMAIL}}</b></h5>
          <b-form-group
              id="form-group-email"
              label-for="newEmail"
              label="New Email: "
          >
            <b-input-group>
              <b-input
                  id="newEmail"
                  v-model="formData.newEmail"
                  @keyup="emailCheck=null"
                  placeholder="someone@example.com"
                  autocomplete="off"
                  style="margin-left: 10px;"
                  :state="emailState"
              ></b-input>
              <b-input-group-append>
                <b-button @click="checkEmail">Check</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <hr>
          <h5>Current Mobile: <b>{{customer.MOBILE}}</b></h5>
          <b-form-group
              label="New Mobile:"
              label-for="newMobile"
          >
            <b-form-input
                id="newMobile"
                v-model="formData.newMobile"
                type="number"
                placeholder="Mobile Number"
                autocomplete="off"
                style="margin-left: 10px;"
                :state="mobileState"
            ></b-form-input>
          </b-form-group>
          <h5>Current Address: <b>{{customer.ADDRESS}}</b></h5>
          <b-form-group
              label="New Address:"
              label-for="newAddress"
          >
            <b-form-textarea
                id="newAddress"
                v-model="formData.newAddress"
                placeholder="Address"
                autocomplete="off"
                style="margin-left: 10px;"
                :state="addressState"
            ></b-form-textarea>
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
  <div v-else><h3>Loading...</h3></div>
</template>

<script>
let socket;
export default {
  name: "CustomerEdit",
  data(){
    return {
      loaded: false,
      formData: {
        newImage: null,
        newFirstName: null,
        newLastName: null,
        newAddress: null,
        newMobile: null,
        newEmail: null
      },
      customer: null,
      emailCheck: null,
      newImageURL: null,
      newImageBlob: null,
      oldImageURL: null
    }
  },
  methods:{
    checkValidity(){
      return this.imageState !== false && this.firstNameState !== false && this.lastNameState !== false
          && this.emailState !== false && this.mobileState !== false && this.addressState !== false;
    },
    atClickReset(){
      this.formData.newImage = null;
      this.formData.newFirstName = null;
      this.formData.newLastName = null;
      this.formData.newAddress = null;
      this.formData.newEmail = null;
      this.formData.newMobile = null;
      this.emailCheck = null;
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
      if((!hasImage) && (!hasFields)){
        alert('Nothing to Update');
        return;
      }
      let data = {
        command: 'update',
        tablename: 'persons',
        hasFields: hasFields,
        fields: fields,
        hasImage: hasImage,
        image: this.newImageBlob,
        id: '',
        token:this.$store.getters.getUser.token
      };
      console.log(data);
      socket.emit('update',data);
    },
    createDataToUpdate(){
      let data = [];
      if(this.firstNameState){
        data.push({
          field: 'FIRST_NAME',
          value: this.formData.newFirstName
        });
      }
      if(this.lastNameState){
        data.push({
          field: 'LAST_NAME',
          value: this.formData.newLastName
        });
      }
      if(this.emailState){
        data.push({
          field: 'EMAIL',
          value: this.formData.newEmail
        });
      }
      if(this.mobileState){
        data.push({
          field: 'MOBILE',
          value: this.formData.newMobile
        });
      }
      if(this.addressState){
        data.push({
          field: 'ADDRESS',
          value: this.formData.newAddress
        })
      }
      return data;
    },
    atImageSelection(event){
      this.formData.newImage = event.target.files[0];
      if(this.formData.newImage == null) return;
      console.log(this.formData.newImage.type + ' ' + this.formData.newImage.size);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newImageURL = e.target.result;
        this.makeBlob();
      };
      reader.readAsDataURL(this.formData.newImage);
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
          param.newImageBlob = blob;
        }, "image/jpeg", 0.75);
      };
      img.crossOrigin = "";              // if from different origin
      img.src = this.newImageURL;
    },
    checkEmail(){
      let data = {
        command: 'checkEmail',
        tablename: 'persons',
        field: 'email',
        value: this.formData.newEmail
      }
      socket.emit('check', data);
      socket.on('checkEmail',(data)=>{
        socket.off('checkEmail');
        this.emailCheck = data;
      });
    }
  },
  computed:{
    firstNameState(){
      if(this.formData.newFirstName === '' || this.formData.newFirstName == null) return null;
      if(this.formData.newFirstName.length>=30){
        alert('Maximum length exceeded!');
        return false;
      }
      else{

        let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;

        return !this.formData.newFirstName.match(format);
        /*check from database*/
      }
    },
    lastNameState(){
      if(this.formData.newLastName === '' || this.formData.newLastName == null) return null;
      if(this.formData.newLastName.length>=30){
        alert('Maximum length exceeded!');
        return false;
      }
      else{

        let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;

        return !this.formData.newLastName.match(format);
        /*check from database*/
      }
    },
    imageState(){
      if(this.formData.newImage == null) return null;
      else return true;
    },
    emailState(){
      if(this.formData.newEmail === '' || this.formData.newEmail == null) return null;
      if(this.formData.newEmail.length>=320){
        alert('Maximum length exceeded!');
        return false;
      }
      if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          .test(this.formData.newEmail)))
        return false;
      return this.emailCheck;
    },
    mobileState(){
      if(this.formData.newMobile === '' || this.formData.newMobile == null) return null;
      let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
      if(this.formData.newMobile.match(phoneno)) return true;
      phoneno = /^\(?[+]?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
      if(this.formData.newMobile.match(phoneno)) return true;
      phoneno = /^\(?([0-9]{5})\)?[-. ]?([0-9]{6})$/;
      if(this.formData.newMobile.match(phoneno)) return true;
      phoneno = /^\(?[+]?([0-9]{5})\)?[-. ]?([0-9]{6})$/;
      return !!this.formData.newMobile.match(phoneno);
    },
    addressState(){
      if(this.formData.newAddress === '' || this.formData.newAddress == null) return null;
      if(this.formData.newAddress.length>=100){
        alert('Maximum length exceeded!');
        return false;
      }
      return this.formData.newAddress.length >= 3;
    }
  },
  created() {
    socket = this.$store.getters.getSocket;
    socket.emit('sendPerson',{
      token: this.$store.getters.getUser.token
    });
    let root = this;
    socket.on('getPerson',(res)=>{
      if(res.length>0){
        this.customer = res[0];
        const buffer = this.customer.IMAGE;
        const blob = new Blob([buffer], {type: 'image/jpeg'});
        const reader = new FileReader();
        reader.onload = (e) => {
          this.oldImageURL = e.target.result;
          root.loaded = true;
        };
        reader.readAsDataURL(blob);
      }else{
        console.log('Cannot find User. Please, sign in again...');
      }
      socket.off('getPerson');
    });
    socket.on('updateResponse', (res)=>{
      if(res.success){
        root.$router.push('/customers/profile/dashboard').catch((e)=>{
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

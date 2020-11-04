<template>
  <div class="row" style="background-color:#a7ffeb;">
    <div class="col-xs-10 col-sm-8 col-md-6 col-lg-5 auto">
      <h3 style="margin-bottom: 20px; text-align: center">Sign-Up for easyShop</h3>
      <b-form>
        <b-form-group
            id="form-group-name"
            label="Enter Your Name:"
            label-for="firstName"
        >
          <b-form-input
              id="firstName"
              v-model="formData.firstName"
              required
              placeholder="Enter First Name"
              style="margin: 10px;"
              :state="firstNameState"
              autocomplete="off"
          ></b-form-input>
          <b-form-input
              id="lastName"
              v-model="formData.lastName"
              required
              placeholder="Enter Last Name"
              style="margin: 10px;"
              :state="lastNameState"
              autocomplete="off"
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="form-group-username"
            label-for="username"
            label="Username: "
        >
          <b-input-group class="mb-3">
            <b-input
                id="username"
                v-model="formData.username"
                @keyup="usernameCheck=null"
                required
                placeholder="Enter Username"
                style="margin-left: 10px;"
                :state="usernameState"
                autocomplete="off"
            ></b-input>
            <b-input-group-append>
              <b-button  @click="checkUsername" >Check</b-button>
            </b-input-group-append>
          </b-input-group>

        </b-form-group>
        <b-form-group
            id="form-group-password"
            label-for="password"
            label="Password: "
        >
          <b-input
              id="password"
              v-model="formData.password"
              required
              type="password"
              placeholder="Enter Password"
              style="margin: 10px;"
              :state="passwordState"
          ></b-input>
          <b-input
              id="confirmPassword"
              v-model="formData.confirmedPassword"
              required
              type="password"
              placeholder="Confirm Password"
              style="margin: 10px;"
              :state="confirmPasswordState"
          ></b-input>
        </b-form-group>
        <b-form-group
            id="form-group-email"
            label-for="email"
            label="Email: "
        >
          <b-input-group>
            <b-input
                id="email"
                v-model="formData.email"
                @keyup="emailCheck=null"
                required
                placeholder="Enter your email"
                autocomplete="off"
                style="margin-left: 10px;"
                :state="emailState"
            ></b-input>
            <b-input-group-append>
              <b-button @click="checkEmail">Check</b-button>
            </b-input-group-append>
          </b-input-group>

        </b-form-group>
        <b-form-group
            id="form-group-dob"
            label-for="dob"
            label="Date of Birth: "

        >
          <b-input-group class="mb-3" id="dob">
            <b-form-input
                id="dobText"
                v-model="formData.dob"
                type="text"
                placeholder="YYYY-MM-DD"
                :state="dobState"
                style="margin-left: 10px;"
            ></b-form-input>
            <b-input-group-append>
              <b-datepicker
                  id="dobPicker"
                  v-model="formData.dob"
                  button-only
                  right
                  aria-controls="dobText"
                  @context="onContext"
                  :date-format-options="{day:'numeric',month: 'numeric',year:'numeric' }"
              ></b-datepicker>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-form-group
            id="form-group-address"
            label-for="address"
            label="Address: "
        >
          <b-input
              id="address"
              v-model="formData.address"
              required
              placeholder="Enter Address"
              style="margin: 10px;"
              :state="addressState"
              autocomplete="off"
          ></b-input>
        </b-form-group>
        <b-form-group
            id="form-group-mobile"
            label-for="mobile"
            label="Mobile Number: "
        >
          <b-input
              id="mobile"
              v-model="formData.mobile"
              required
              placeholder="Enter Mobile Number"
              style="margin: 10px;"
              :state="mobileState"
              autocomplete="off"
          ></b-input>
        </b-form-group>
        <b-form-group
            id="form-group-gender"
            label-for="gender"
            label="Your Gender:"
        >
          <b-form-radio-group
              id="gender"
              v-model="formData.gender"
              :options="genderOptions"
              value-field="value"
              text-field="text"
              style="padding-left: 100px;"
          ></b-form-radio-group>
        </b-form-group>
        <b-form-group
            id="form-group-image"
            label-for="image"
            label="Choose Your Photo: "
        >
          <b-form-file
              id="image"
              v-model="formData.image"
              :state="imageState"
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
import io from 'socket.io-client'
let socket;
export default {
  name: "SignUp",
  created() {
    socket = io(this.$store.state.server);
  },
  data(){
    return {
      formData : {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmedPassword: '',
        address: '',
        email: '',
        mobile: '',
        dob:'',
        gender: '',
        image: null
      },
      genderOptions: [
        {value: 'Male', text: 'Male'},
        {value: 'Female', text: 'Female'},
        {value: 'Other', text: 'Other'}
      ],
      imageURL: null,
      imageBlob: null,
      usernameCheck: null,
      abc: 4,
      emailCheck: null,
      submitAlert: false,
      data: null
    }
  },
  computed: {
    firstNameState(){
      if(this.formData.firstName === '') return null;
      else{

        let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;

        return !this.formData.firstName.match(format);
        /*check from database*/
      }
    },
    lastNameState(){
      if(this.formData.lastName === '') return null;
      else{

        let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;

        return !this.formData.lastName.match(format);
        /*check from database*/
      }
    },
    usernameState(){
      if(this.formData.username === '') return null;
      else{

        let format = /[!@#$%^&*() _+\-=\[\]{};':"\\|,.<>\/?]/;

        if(this.formData.username.match(format))
          return false;
        return this.usernameCheck;
      }
    },
    passwordState(){
      /// One Uppercase, One lowercase, One Digit, minimum 6 characters
      if(this.formData.password.length === 0) return null;
      let passw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      return !!this.formData.password.match(passw);
    },
    confirmPasswordState(){
      if(this.formData.confirmedPassword.length === 0) return null;
      else return this.formData.confirmedPassword === this.formData.password;
    },
    addressState(){
      if(this.formData.address === '') return null;
      return this.formData.address.length >= 5;
    },
    emailState(){
      if(this.formData.email === '') return null;
      if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.formData.email)))
        return false;
      return this.emailCheck;


    },
    mobileState(){
      if(this.formData.mobile === '') return null;
      let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
      if(this.formData.mobile.match(phoneno)) return true;
      phoneno = /^\(?[+]?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
      if(this.formData.mobile.match(phoneno)) return true;
      phoneno = /^\(?([0-9]{5})\)?[-. ]?([0-9]{6})$/;
      if(this.formData.mobile.match(phoneno)) return true;
      phoneno = /^\(?[+]?([0-9]{5})\)?[-. ]?([0-9]{6})$/;
      return !!this.formData.mobile.match(phoneno);


    },
    dobState(){
      if(this.formData.dob === '') return null;
      let dateformat = /\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
      return !!this.formData.dob.match(dateformat);
    },
    genderState(){
      return this.formData.gender !== '';
    },
    imageState(){
      if(this.formData.image == null) return null;
      else return true;
    }
  },
  methods:{
    onContext(ctx){

    },
    checkEmail(){
      let data = {
        command: 'checkEmail',
        tablename: 'persons',
        field: 'email',
        value: this.formData.email
      }
      socket.emit('check', data);
      socket.on('checkEmail',(data)=>{
        this.emailCheck = data;
      });
    },
    checkUsername(){
      let data = {
        command: 'checkUsername',
        tablename: 'persons',
        field: 'username',
        value: this.formData.username
      }
      socket.emit('check', data);
      socket.on('checkUsername',(data)=>{
        this.usernameCheck = data;
      });
    },
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
    formatDate(){
      const date = this.formData.dob.split('-');
      if(date.length > 1){
        this.formData.dob = date[0]+'/'+date[1]+'/'+date[2];
      }
      console.log('Changed to: '+this.formData.dob);
    },
    checkForm(){
      return !!(this.firstNameState && this.lastNameState && this.usernameState && this.passwordState
          && this.confirmPasswordState && this.addressState && this.emailState && this.dobState
          && this.mobileState && this.genderState && this.imageState);
    },
    onReset(){
      this.formData.firstName = '';
      this.formData.lastName = '';
      this.formData.username = '';
      this.formData.password = '';
      this.formData.confirmedPassword = '';
      this.formData.address = '';
      this.formData.email = '';
      this.formData.mobile = '';
      this.formData.dob = '';
      this.formData.gender = '';
      this.formData.image = null;
      this.submitAlert = false;

    },
    createData(){
      this.data = {
        command: 'insert',
        tablename: 'CUSTOMERS',
        id: '',
        first_name: this.formData.firstName,
        image:this.imageBlob,
        last_name: this.formData.lastName,
        username: this.formData.username,
        password: this.formData.password,
        address: this.formData.address,
        email: this.formData.email,
        mobile: this.formData.mobile,
        dob: this.formData.dob,
        gender: this.formData.gender

      };
    },
    onSubmit(){
      if(!this.checkForm()){
        this.submitAlert = true;
      }else{
        this.submitAlert = false;
        this.formatDate();
        this.createData();

        socket.emit('insert',this.data);

        console.log('Submitted!');

        this.onReset();
      }

    }
  }
}

</script>

<style scoped>
.auto{
  margin: auto;
}

</style>

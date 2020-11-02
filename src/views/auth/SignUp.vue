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
          ></b-form-input>
          <b-form-input
              id="lastName"
              v-model="formData.lastName"
              required
              placeholder="Enter Last Name"
              style="margin: 10px;"
              :state="lastNameState"
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="form-group-username"
            label-for="username"
            label="Username: "
        >
          <b-input
              id="username"
              v-model="formData.username"
              required
              placeholder="Enter Username"
              style="margin: 10px;"
              :state="usernameState"
          ></b-input>
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
          ></b-input>
        </b-form-group>
        <b-form-group
            id="form-group-email"
            label-for="email"
            label="Email: "
        >
          <b-input
              id="email"
              v-model="formData.email"
              required
              placeholder="Enter your email"
              style="margin: 10px;"
              :state="emailState"
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


      </b-form>
    </div>

  </div>

</template>

<script>
export default {
  name: "SignUp",
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
      ]
    }
  },
  computed: {
    firstNameState(){
      if(this.formData.firstName === '') return null;
      else return true;
    },
    lastNameState(){
      if(this.formData.lastName === '') return null;
      else return true;
    },
    usernameState(){
      if(this.formData.username === '') return null;
      else{

        let format = /[!@#$%^&*() _+\-=\[\]{};':"\\|,.<>\/?]/;

        if(this.formData.username.match(format))
          return false;
        /*check from database*/
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
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          .test(this.formData.email);
      /* check from database */
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
      console.log(this.formData.dob);
      let dateformat = /\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
      return !!this.formData.dob.match(dateformat);
    },
    genderState(){
      return this.formData.gender !== '';
    },
    imageState(){

    }
  },
  methods:{
    onContext(ctx){
      this.formData.dob = ctx.selectedYMD;
    }
  }
}

</script>

<style scoped>
.auto{
  margin: auto;
}

</style>

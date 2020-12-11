<template>
  <div class="row">
    <div class="col-xs-10 col-sm-8 col-md-6 col-lg-5 auto">
      <h3
          style="margin-bottom: 20px; text-align: center"
      >Change Password</h3>
      <b-form>
        <b-form-group
            id="form-group-old-password"
            label-for="old-password"
            label="Old Password:"
        >
          <b-input
              id="old-password"
              v-model="formData.oldPassword"
              required
              type="password"
              placeholder="Enter Old Password"
              style="margin: 10px;"
              :state="oldPasswordState"
          ></b-input>
        </b-form-group>
        <b-form-group
            id="form-group-new-password"
            label-for="new-password"
            label="New Password: "
            v-b-tooltip="passwordTooltip"
        >
          <b-input
              id="new-password"
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
              @click="onChange"
          >Change</v-btn>
          <div class="col-sm-1"></div>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
let socket;
export default {
  name: "ChangePassword",
  data(){
    return {
      formData: {
        confirmedPassword: null,
        password: null,
        oldPassword: null
      },
      passwordTooltip: 'Requirement: a capital letter, a small letter, ' +
                  'a number and minimum 6 characters'
    }
  },
  methods:{
    onReset(){
      this.formData.password = null;
      this.formData.confirmedPassword = null;
      this.formData.oldPassword = null;
    },
    onChange(){
      if(!this.checkValidity()){
        alert('Invalid Input!');
        return;
      }
      let data = {
        command: 'changePassword',
        token: this.$store.getters.getUser.token,
        oldPassword: this.formData.oldPassword,
        newPassword: this.formData.password
      };
      socket.emit('changePassword',data);
    },
    checkValidity(){
      return !!(this.passwordState && this.confirmPasswordState && this.oldPasswordState);
    }
  },
  computed:{
    passwordState(){
      /// One Uppercase, One lowercase, One Digit, minimum 6 characters
      if(this.formData.password == null) return null;
      if(this.formData.password.length === 0) return null;
      if(this.formData.password.length>=30){
        alert('Maximum length exceeded!');
        return false;
      }
      let password = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      return !!this.formData.password.match(password);
    },
    confirmPasswordState(){
      if(this.formData.confirmedPassword == null) return null;
      if(this.formData.confirmedPassword.length === 0) return null;
      else return this.formData.confirmedPassword === this.formData.password;
    },
    oldPasswordState(){
      if(this.formData.oldPassword == null) return null;
      if(this.formData.oldPassword.length === 0) return null;
      if(this.formData.oldPassword.length>=30){
        alert('Maximum length exceeded!');
        return false;
      }
      let password = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      return !!this.formData.oldPassword.match(password);
    }
  },

  created() {
    socket = this.$store.getters.getSocket;
    socket.on('changePasswordRes', (res)=>{
      if(res.success){
        socket.off('changePasswordRes');
        this.$router.push('/customers').catch((e)=>{
          console.log("Routing Error!");
        });
      }
    })
  }
}
</script>

<style scoped>
.auto{
  margin: auto;
}

</style>

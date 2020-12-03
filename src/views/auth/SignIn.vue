<template>
  <div class="row " style="background-color:#a7ffeb;padding-top: 50px;">
    <div class="col-sm-8 col-md-6 col-lg-4 auto">
      <h3 style="margin: 25px;text-align: center">Sign in to easyShop!</h3>
        <b-form>
          <b-form-group>
            <b-input
                id="user-input"
                v-model="username"
                required
                placeholder="Enter Username"
                :state="usernameState"
            ></b-input>
          </b-form-group>

          <b-form-group>
            <b-input
                id="pass-input"
                v-model="password"
                required
                placeholder="Enter Password"
                type="password"
            ></b-input>
          </b-form-group>
          <b-button
              variant="primary"
              block
              @click="atClickSignIn"
          >Sign In</b-button>
        </b-form>
      <hr>
      <span>New in easyShop? </span>
      <router-link
          to="/auth/signup"
          tag="a"
      >Sign Up</router-link>
      <br>
      <span>Want a job? </span>
      <router-link
          to="/notices"
          tag="a"
      >See Notices</router-link>

    </div>
  </div>
</template>

<script>
let socket;
export default {
  name: "Login",
  data(){
    return {
      username: '',
      password: '',
      inputValidity: true
    }
  },
  methods: {

    checkValidity(){
      return this.inputValidity && this.password !== '' && this.username !== '';
    },

    atClickSignIn(){
      if(this.checkValidity()){
        const data = {
          command: 'login',
          username: this.username,
          password: this.password
        };
        socket.emit('login',data);
      }else{
        console.log("Invalid Login Input");
      }

    }
  },
  computed: {
    usernameState(){
      if(this.username === '') return null;
      else{

        let format = /[!@#$%^&*() _+\-=\[\]{};':"\\|,.<>\/?]/;

        if(this.username.match(format)){
          this.inputValidity = false;
          return false;
        }else{
          this.inputValidity = true;
          return null;
        }
      }
    }
  },
  created() {
    let root = this;
    socket = root.$store.getters.getSocket;
    socket.on('loginInfo',(data)=>{
      console.log(data);
      if(data.success){
        socket.off('loginInfo');
        root.$store.dispatch('setUser',data.user);
        if(data.user.type.toLowerCase() === 'manager'){
          root.$store.dispatch('setAdmin',true);
        }
        root.$cookies.set("token",data.user.token,"1d");
        root.$router.push('/home');
      }
    });
  }
}
</script>

<style scoped>
.auto{
  margin: auto;
}

</style>

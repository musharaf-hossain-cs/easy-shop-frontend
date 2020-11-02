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
          <b-button variant="primary" block>Sign In</b-button>
        </b-form>
      <hr>
      <span>New in easyShop? </span>
      <router-link
          to="/auth/signup"
          tag="a"
      >Sign Up</router-link>

    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style scoped>
.auto{
  margin: auto;
}

</style>

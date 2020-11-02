<template>
  <div class="container" style="background-color:#a7ffeb;">
    <router-link tag="span" to="/auth/signin">
      <button class="btn btn-primary">Sign In</button>
    </router-link>
    <hr>
    <router-link tag="span" to="/auth/signup">
      <button class="btn btn-primary">Sign Up</button>
    </router-link>

  </div>
</template>

<script>
export default {
  name: "AuthHome"
}
</script>

<style scoped>

</style>

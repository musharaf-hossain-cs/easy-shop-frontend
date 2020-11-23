<template>
<div>
  <h2>You are not an admin!</h2>
  <span>If you are an admin, please </span>
  <router-link
      to="/auth/signin"
      tag="a"
  >Sign-In</router-link>
</div>
</template>

<script>
export default {
  name: "NotAdmin",
  created() {
    let admin = this.$store.getters.isAdmin;
    if(admin){
      this.$router.push('/admin');
    }
  }
}
</script>

<style scoped>

</style>

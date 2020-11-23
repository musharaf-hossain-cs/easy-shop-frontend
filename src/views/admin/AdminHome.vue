<template>
  <div class="container">
    <h3>Admin Section</h3>

  </div>
</template>

<script>
export default {
  name: "AdminHome",
  created() {
    let admin = this.$store.getters.isAdmin;
    if(!admin){
      this.$router.push('/admin/notAdmin');
    }
  }
}
</script>

<style scoped>

</style>

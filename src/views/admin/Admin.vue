<template>
  <div class="container">
    <admin-header></admin-header>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AdminHeader from "@/components/AdminHeader";
export default {
  name: "Admin",
  components:{
    AdminHeader
  },
  computed:{

  },
  created() {
    let admin = this.$store.getters.isAdmin;
    if(!admin){
      this.$router.push('/not-admin');
    }
  }
}
</script>

<style scoped>

</style>

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
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <change-password></change-password>
  </div>
</template>

<script>
export default {
  name: "Security",
  components: {
    changePassword: () => import('@/views/admin/security/ChangePassword')
  }
}
</script>

<style scoped>

</style>

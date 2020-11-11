<template>
  <div class="container">
    <h3>Product Home</h3>
    <router-link
        tag="span"
        to="/products/insert"
    >
      <b-button variant="primary">INSERT</b-button>
    </router-link>
  </div>
</template>

<script>
export default {
name: "ProductHome"
}
</script>

<style scoped>

</style>

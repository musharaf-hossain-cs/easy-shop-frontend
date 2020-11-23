<template>
<div>
  <h3>Edit product here...</h3>
  <h3>The Product ID is: {{id}}</h3>
</div>
</template>

<script>
export default {
  name: "EditProduct",
  data(){
    return {
      id: this.$route.params.id
    }
  }
}
</script>

<style scoped>

</style>

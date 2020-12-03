<template>
  <div >
    <cart-header></cart-header>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Carts",
  components:{
    cartHeader: () => import('@/components/CartHeader')
  }
}
</script>

<style scoped>

</style>

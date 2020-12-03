<template>
  <div>
    <b-list-group>
      <b-list-group-item
          v-for="(cartItem,idx) in getCurrentCart"
          :key="idx"
      >{{cartItem.name}}</b-list-group-item>
    </b-list-group>
    <hr>
    <v-btn
        block
        @click="atClickCartPage"
    >Go to Cart</v-btn>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: "NavDrawer",
  computed: {
    ...mapGetters([
      'getCurrentCart'
    ])
  },
  methods:{
    atClickCartPage(){
      this.$router.push('/orders/carts/current-cart').catch((e)=>{
        console.log('Routing Error in CurrentCart.vue');
      });
    }
  }
}
</script>

<style scoped>

</style>

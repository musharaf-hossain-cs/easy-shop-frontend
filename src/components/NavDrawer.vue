<template>
  <div>
    <b-list-group>
      <b-list-group-item
          v-for="(cartItem,idx) in getCurrentCart"
          :key="idx"
          class="d-inline-block"
      >
        {{cartItem.name}} -
        <small
            class="text-danger"
            @click="atClickRemove(idx)"
            style="cursor:pointer"
        >Remove</small>
      </b-list-group-item>
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
    },
    atClickRemove(idx){
      this.$store.dispatch('removeCartItem', this.getCurrentCart[idx].id);
    }
  }
}
</script>

<style scoped>

</style>

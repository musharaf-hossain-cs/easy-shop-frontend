<template>
  <div v-if="loaded">
    <table
        v-if="pendingCarts.length"
        class="table table-striped table-hover"
    >
      <thead>
        <tr>
          <th>Cart ID</th>
          <th>Creation Date</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        <tr
            v-for="cart in pendingCarts"
            @click="atRowClicked(cart.CART_ID)"
        >
          <td>{{cart.CART_ID}}</td>
          <td>{{cart.CREATE_DATE.split('T')[0]}}</td>
          <td>TK.{{cart.TOTAL_COST}}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <h3>There is no pending carts</h3>
    </div>
  </div>
  <div v-else><h3>Loading...</h3></div>
</template>

<script>
let socket;
export default {
  name: "PendingCarts",
  data(){
    return {
      loaded: false,
      pendingCarts: []
    }
  },
  methods:{
    atRowClicked(id){
      this.$router.push('/orders/checkout/'+id+'/').catch((e)=>{
        console.log('Routing Error in PendingCarts.vue');
      });
    }
  },
  created() {
    let user = this.$store.getters.getUser;
    if(user == null || user.type.toLowerCase() !== 'customer'){
      alert('You mush sign in as Customer!');
      this.$router.push('/auth/signin').catch((e)=>{
        console.log('Routing Error in PendingCarts.vue');
      });
      return;
    }

    socket = this.$store.getters.getSocket;
    socket.emit('sendPendingCarts', user.token);
    socket.on('getPendingCarts', (res) => {
      socket.off('getPendingCarts');
      this.pendingCarts = res;
      this.loaded = true;
    });
  }
}
</script>

<style scoped>

</style>

<template>
  <div v-if="loaded">
    <table
        v-if="boughtCarts.length"
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
          v-for="cart in boughtCarts"
          @click="atRowClicked(cart.CART_ID)"
      >
        <td>{{cart.CART_ID}}</td>
        <td>{{cart.CREATE_DATE.split('T')[0]}}</td>
        <td>TK.{{cart.TOTAL_COST}}</td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      <h3>No carts bought yet!</h3>
    </div>
  </div>
  <div v-else><h3>Loading...</h3></div>
</template>
<script>
let socket;
export default {
  name: "BoughtCarts",
  data(){
    return{
      loaded: false,
      boughtCarts: []
    }
  },
  methods: {
    atRowClicked(id){
      this.$router.push('/orders/carts/bought-carts/'+id+'/details').catch((e)=>{
        console.log('Routing Error in BoughtCarts.vue');
      });
    }
  },
  created() {
    let user = this.$store.getters.getUser;
    if(user == null || user.type.toLowerCase() !== 'customer'){
      alert('You mush sign in as Customer!');
      this.$router.push('/auth/signin').catch((e)=>{
        console.log('Routing Error in BoughtCarts.vue');
      });
      return;
    }

    socket = this.$store.getters.getSocket;
    socket.emit('sendBoughtCarts',user.token);
    socket.on('getBoughtCarts', (res) => {
      socket.off('getBoughtCarts');
      this.boughtCarts = res;
      this.loaded = true;
    });
  }
}
</script>

<style scoped>

</style>

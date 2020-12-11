<template>
  <div v-if="loaded">
    <table
        v-if="orders.length"
        class="table table-striped table-hover"
    >
      <thead>
      <tr>
        <th>Order ID</th>
        <th>Order Date</th>
        <th>Customer Username</th>
        <th>Customer Address</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="order in orders"
          @click="atRowClicked(order.ORDER_ID)"
      >
        <td>{{order.ORDER_ID}}</td>
        <td>{{order.ORDER_DATE.split('T')[0]}}</td>
        <td>{{order.USERNAME}}</td>
        <td>{{order.ADDRESS}}</td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      <h3>No Orders Available...</h3>
    </div>
  </div>
  <div v-else>
    <h3>Loading...</h3>
  </div>
</template>

<script>
let socket;
export default {
  name: "AvailableOrders",
  data(){
    return {
      loaded: false,
      orders: []
    };
  },
  methods: {
    atRowClicked(orderId){
      this.$router.push('/orders/order/'+orderId+'/details').catch((e)=>{
        console.log('Routing error in AvailableOrders.vue');
      });
    }
  },
  created() {
    socket = this.$store.getters.getSocket;
    if(!this.$store.getters.isDeliveryBoy){
      this.$router.push('/employees/profile/dashboard').catch((e)=>{
        console.log('Routing Error in employees Dashboard.vue');
      });
    }
    else{
      socket.emit('sendAvailableOrders');
    }

    socket.on('getAvailableOrders', (res) => {
      socket.off('getAvailableOrders');
      this.orders = res;
      this.loaded = true;
    });
  }
}
</script>

<style scoped>

</style>

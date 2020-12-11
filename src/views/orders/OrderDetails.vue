<template>
  <div v-if="loaded">
    <div>
      <h3 class="info text-light p-2">Order Information:</h3>
      <b-table
          :items="orderTableData"
          stacked
      ></b-table>
    </div>
    <div>
      <cart-details :cartId="order.CART_ID"></cart-details>
    </div>
    <div class="container">
      <b-button
          variant="success"
          block
          @click="takeOrder"
      >Take the Order</b-button>
    </div>

  </div>
  <div v-else>
    <h3>Loading...</h3>
  </div>
</template>

<script>
let socket;
export default {
  name: "OrderDetails",
  data(){
    return {
      orderId: null,
      order: null,
      loaded: false,
    };
  },
  components:{
    cartDetails: () => import('@/views/orders/CartDetailsForOrder')
  },
  methods:{
    takeOrder(){
      let date = (new Date().toLocaleDateString()).split('/');
      let today = date[2]+'/'+date[0]+'/'+date[1];
      let data = {
        id: '',
        employeeId: '',
        token: this.$store.getters.getUser.token,
        tablename: 'delivery',
        orderId: this.order.ORDER_ID,
        shipmentDate: today,
      };
      socket.emit('takeOrder', (data));
    }
  },
  computed: {
    orderTableData(){
      let items = [
        {
          'Order ID:': this.order.ORDER_ID,
          'Order Date:': this.order.ORDER_DATE.split('T')[0],
          'Customer Username:': this.order.USERNAME,
          'Customer Address:': this.order.ADDRESS
        }
      ];
      return items;
    }
  },
  created() {
    this.orderId = this.$route.params.id;
    socket = this.$store.getters.getSocket;
    socket.emit('sendOrderInfo',this.orderId);
    socket.on('getOrderInfo',(res)=>{
      socket.off('getOrderInfo');
      this.order = res[0];
      this.loaded = true;
    });
    socket.on('takeOrder', (res)=>{
      socket.off('takeOrder');
      console.log(res);
      if(res.success){
        this.$router.push('/employees/profile/history').catch((e)=>{
          console.log('Routing error in OrderDetails.vue');
        });
      }else{
        alert('Taking order is not possible now. Try again later.')
      }
    });
  }
}
</script>

<style scoped>

</style>

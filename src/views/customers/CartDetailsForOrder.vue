<template>
  <div v-if="loaded">
    <div>
      <h3 class="info text-light p-2">Cart Details</h3>
      <table
          class="table table-striped table-hover"
          v-if="cart.length"
      >
        <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Discount</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(item,idx) in cart"
        >
          <td>{{item.MODEL_NAME}}</td>
          <td>{{item.PRICE}}</td>
          <td>{{item.DISCOUNT}}</td>
          <td>{{item.QUANTITY}}</td>
          <td>{{item.PRICE*(1-item.DISCOUNT/100)*item.QUANTITY}}</td>
        </tr>
        </tbody>
      </table>
      <h3
          style="margin: 25px;text-align: center"
      >Total Price : <b>TK.{{totalPrice}}</b></h3>
      <h3
          style="margin: 25px;text-align: center"
      >Payment Status : <b>PAID</b></h3>
    </div>


  </div>
  <div v-else><h3>Loading...</h3></div>
</template>

<script>
let socket;
export default {
  name: "CartDetailsForOrder",
  props: ['cartId'],
  data(){
    return{
      loaded: false,
      cart: [],
      paymentType: null,
      paymentOptions: [
        {text:'Payment Type', value: null},
        {text: 'bKash', value: 'bKash'},
        {text: 'Rocket', value: 'Rocket'}
      ]
    }
  },
  methods:{
  },
  computed: {
    totalPrice(){
      let price=0;
      for(let i=0;i<this.cart.length;i++){
        price += this.cart[i].PRICE*(1-this.cart[i].DISCOUNT/100)*this.cart[i].QUANTITY;
      }
      return price;
    },
  },
  created() {
    socket = this.$store.getters.getSocket;
    socket.emit('sendCartItems',this.cartId);
    socket.on('getCartItems', (res) => {
      socket.off('getCartItems');
      this.cart = res;
      this.loaded = true;
    });
  }
}
</script>

<style scoped>

</style>

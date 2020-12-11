<template>
  <div v-if="cart.length">
    <div v-if="loaded">
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
          <td>{{item.name}}</td>
          <td>{{prices[idx]}}</td>
          <td>{{discounts[idx]}}</td>
          <td>
            <b-form>
              <b-form-input
                  required
                  placeholder="Quantity"
                  style="width: 100px;"
                  type="number"
                  min="0"
                  v-model="quantities[idx]"
                  :state="quantities[idx]>=0"
              ></b-form-input>
            </b-form>
          </td>
          <td>{{Math.max( prices[idx]*(1-discounts[idx]/100) * quantities[idx],0)}}</td>
        </tr>
        </tbody>
      </table>
      <h3
          style="margin: 25px;text-align: center"
      >Total Price : <b>TK.{{totalPrice}}</b></h3>
      <div class="row">
        <b-button
            block
            variant="success"
            @click="atClickSaveCart"
        >Save the Cart</b-button>
      </div>
    </div>
    <div v-else><h3>Loading...</h3></div>
  </div>
  <div v-else><h4>No Item Selected!</h4></div>
</template>

<script>
let socket;
export default {
  name: "CurrentCart",
  data(){
    return {
      loaded: false,
      cart: [],
      quantities: [],
      prices: [],
      discounts: [],
      stocks: []
    };
  },
  methods:{
    atClickSaveCart(){
      let user = this.$store.getters.getUser;
      if(user == null || user.type.toLowerCase() !== 'customer'){
        alert('You mush sign in as Customer!');
        this.$router.push('/auth/signin').catch((e)=>{
          console.log('Routing Error in CurrentCart.vue');
        });
        return;
      }
      let products = [];
      for(let i=0;i<this.cart.length;i++){
        if(this.quantities[i]===0) continue;
        products.push({
          model: this.cart[i].id,
          quantity: this.quantities[i]
        });
      }
      if(products.length>0){
        let date = (new Date().toLocaleDateString()).split('/');
        let today = date[2]+'/'+date[0]+'/'+date[1];
        let data = {
          command: 'saveCart',
          customerToken: user.token,
          id: '',
          tablename: 'carts',
          products: products,
          date: today,
          totalCost: this.totalPrice
        };

        socket.emit('saveCart',data);
      }
      else{
        alert('No item selected');
      }

    }
  },
  computed: {
    totalPrice(){
      let price=0;
      for(let i=0;i<this.cart.length;i++){
        price += Math.max(
            this.prices[i]*(1-this.discounts[i]/100) * this.quantities[i],0);
      }
      return Math.round(price);
    }
  },
  created() {
    this.cart = this.$store.getters.getCurrentCart;
    let i=0;
    let ids='';
    for(i;i<this.cart.length;i++){
      this.quantities.push(0);
      ids += '\''+this.cart[i].id+'\','
    }
    ids = ids.slice(0,-1);
    socket = this.$store.getters.getSocket;
    if(this.cart.length>0){
      socket.emit('sendTheseProducts',ids);
    }
    socket.on('getTheseProducts',(res)=>{
      socket.off('getTheseProducts');
      for(i=0;i<this.cart.length;i++){
        let idx = res.findIndex(p => p.MODEL_ID === this.cart[i].id);
        this.prices.push(res[i].PRICE);
        this.discounts.push(res[i].DISCOUNT);
        this.stocks.push(res[i].STOCK);
      }
      this.loaded = true;
    });

    socket.on('saveCart', (res) => {
      if(res.success){
        this.$store.dispatch('resetCart');
        this.$router.push('/orders/carts/pending-carts').catch((e)=>{
          console.log('Routing Error in Checkout.vue');
        });
      }
      socket.off('saveCart');
    });
  }
}
</script>

<style scoped>

</style>

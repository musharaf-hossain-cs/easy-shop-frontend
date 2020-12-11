<template>
  <div v-if="loaded">
    <table
        v-if="histories.length"
        class="table table-striped table-hover"
    >
      <thead>
      <tr>
        <th>Delivery ID</th>
        <th>Order ID</th>
        <th>Shipment Date</th>
        <th>Delivery Date</th>
        <th>Customer Username</th>
        <th>Customer Address</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(history,idx) in histories"
          @click="atRowClicked(idx)"
      >
        <td>{{history.DELIVERY_ID}}</td>
        <td>{{history.ORDER_ID}}</td>
        <td>{{history.SHIPMENT_DATE.split('T')[0]}}</td>
        <td>
          {{history.DELIVERY_DATE == null ? 'Not Delivered Yet': history.DELIVERY_DATE.split('T')[0]}}
        </td>
        <td>{{history.USERNAME}}</td>
        <td>{{history.ADDRESS}}</td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      <h3>There is no history of you...</h3>
    </div>
  </div>
  <div v-else>
    <h3>Loading...</h3>
  </div>
</template>

<script>
let socket;
export default {
  name: "History",
  data(){
    return {
      loaded: false,
      histories: []
    };
  },
  methods:{
    atRowClicked(idx){
      if(this.histories[idx].DELIVERY_DATE == null){
        if(confirm('Do you deliver the order?')){
          socket.emit('setOrderDelivered', this.histories[idx].ORDER_ID);
        }
      }else{
        return;
      }
/*      location.reload();
      return false;*/
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
      socket.emit('sendEmployeeHistory', this.$store.getters.getUser.token);
    }

    socket.on('getEmployeeHistory', (res) => {
      socket.off('getEmployeeHistory');
      this.histories = res;
      this.loaded = true;
    });

    socket.on('orderUpdateInfo', (res) => {
      socket.off('orderUpdateInfo');
      if(res.success){
        console.log('here');
        location.reload();
        return false;
      }
    });
  }
}
</script>

<style scoped>

</style>

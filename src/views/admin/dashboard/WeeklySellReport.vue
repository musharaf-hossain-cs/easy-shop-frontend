<template>
  <div v-if="loaded">
    <div class="container" >
      <div class="row info">
        <h4 class="col-6"><b>Weekly Sell</b></h4>
        <h4 class="col-6" align="right">Total: <b>TK.{{weeklyTotal}}</b></h4>
      </div>
      <div>
        <b-table
            :items="weeklyReport"
            striped
            hover
        ></b-table>
      </div>
    </div>
  </div>
  <div v-else>
    <h3>Loading...</h3>
  </div>
</template>

<script>
let socket;
export default {
  name: "WeeklySellReport",
  data(){
    return {
      loaded: false,
      weeklySell: null,
      weeklyTotal: 0
    }
  },
  computed:{
    weeklyReport(){
      let items = [];
      let i=0;
      this.weeklyTotal=0;
      for(i;i<this.weeklySell.length;i++){
        let sell = this.weeklySell[i];
        let item = {
          'Product ID': sell.MODEL_ID,
          'Product Name': sell.MODEL_NAME,
          'Sold':sell.SOLD,
          'Cost':sell.TOTAL_COST

        };
        this.weeklyTotal += sell.TOTAL_COST;
        items.push(item);
      }
      return items;
    }
  },
  created() {
    socket = this.$store.getters.getSocket;
    socket.emit('sendWeeklySellReport');
    socket.on('getWeeklySellReport', (res) => {
      socket.off('getWeeklySellReport');
      this.weeklySell = res;
      this.loaded = true;
    });
  }
}
</script>

<style scoped>

</style>

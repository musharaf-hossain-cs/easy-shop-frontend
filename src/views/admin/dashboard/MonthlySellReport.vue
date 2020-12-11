<template>
  <div v-if="loaded">
    <div class="container">
      <div class="row info">
        <h4 class="col-6"><b>Monthly Sell</b></h4>
        <h4 class="col-6" align="right">Total: <b>TK.{{monthlyTotal}}</b></h4>
      </div>
      <div>
        <b-table
            :items="monthlyReport"
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
  name: "MonthlySellReport",
  data(){
    return {
      loaded: false,
      monthlySell: null,
      monthlyTotal: 0
    }
  },
  computed:{
    monthlyReport(){
      let items = [];
      let i=0;
      this.monthlyTotal=0;
      for(i;i<this.monthlySell.length;i++){
        let sell = this.monthlySell[i];
        let item = {
          'Product ID': sell.MODEL_ID,
          'Product Name': sell.MODEL_NAME,
          'Sold':sell.SOLD,
          'Cost':sell.TOTAL_COST
        };
        this.monthlyTotal += sell.TOTAL_COST;
        items.push(item);
      }
      return items;
    }
  },
  created() {
    socket = this.$store.getters.getSocket;
    socket.emit('sendMonthlySellReport');
    socket.on('getMonthlySellReport', (res) => {
      socket.off('getMonthlySellReport');
      this.monthlySell = res;
      this.loaded = true;
    });
  }
}
</script>

<style scoped>

</style>

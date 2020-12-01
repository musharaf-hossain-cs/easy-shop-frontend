<template>
  <div v-if="loaded">
    <div class="row">
      <h4 class="col-6"><b>Monthly Salary</b></h4>
      <h4 class="col-6" align="right">Total: <b>TK.{{totalSalary}}</b></h4>
    </div>
    <div>
      <b-table
          :items="tableData"
          striped
          hover
      ></b-table>
    </div>
  </div>
  <div v-else><h3>Loading...</h3></div>
</template>

<script>
let socket;
export default {
  name: "MonthlySalary",
  data(){
    return {
      totalSalary: 0,
      jobReport: null,
      loaded: false
    }
  },
  computed:{
    tableData(){
      let items = [];
      let i=0;
      this.totalSalary=0;
      for(i;i<this.jobReport.length;i++){
        let job = this.jobReport[i];
        let item = {
          'JOB': job.JOB,
          'Salary': Math.round(job.SALARY/job.COUNT),
          'No. of Employees': job.COUNT,
          'Total Salary': job.SALARY
        };
        this.totalSalary += job.SALARY;
        items.push(item);
      }
      return items;
    }
  },

  created() {
    socket = this.$store.getters.getSocket;
    socket.emit('sendReport', {
      topic: 'MonthlySalary'
    });
    socket.on('getReport', (res) => {
      this.jobReport = res;
      this.loaded = true;
    });
  }
}
</script>

<style scoped>

</style>

<template>
  <div v-if="loaded">
    <div class="row" v-if="valid">
      <div class="col-sm-12 col-md-5" style="text-align: center">
        <h4 style="text-align: left">Employee Details > <b>{{employee.FIRST_NAME}}</b></h4>
        <b-img
            :src="imageURL"
            alt="Product's Image"
            class="col-sm-12 col-md-10"
        ></b-img>
        <h5>Employees Photo</h5>
      </div>

      <div class="col-sm-12 col-md-7">
        <b-table striped stacked hover :items="tableData">
        </b-table>
      </div>
    </div>
    <div v-else><h3>There is no employee with this id: {{empId}}</h3></div>
  </div>
  <div v-else><h3>Loading...</h3></div>
</template>

<script>
let socket;
export default {
  name: "EmployeeDetails",
  data(){
    return {
      empId: null,
      imageURL:null,
      loaded:false,
      valid: false,
      employee: null
    }
  },
  computed:{
    tableData(){
      let date = new Date(this.employee.DOB);
      return [
        {
          'Name:': this.employee.FIRST_NAME + ' ' + this.employee.LAST_NAME,
          'Username:': this.employee.USERNAME,
          'Job Title:': this.employee.JOB_TITLE,
          'Email:': this.employee.EMAIL,
          'Mobile': this.employee.MOBILE,
          'Address:': this.employee.ADDRESS,
          'Gender:': this.employee.GENDER,
          'Date Of Birth:': date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
          'Age:': this.employee.AGE + ' Years',
          'Salary:':'TK.'+this.employee.SALARY,
          'Status:':this.employee.STATUS

        }
      ];
    }
  },
  created() {
    this.empId = this.$route.params.id;
    socket = this.$store.getters.getSocket;
    socket.emit('sendEmployee', {
      id: this.$route.params.id
    });

    socket.on('getEmployee',(res)=>{
      if(res.length>0){
        this.employee = res[0];
        this.valid = true;
        let root = this;
        const buffer = this.employee.IMAGE;
        const blob = new Blob([buffer], {type: 'image/jpeg'});
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageURL = e.target.result;
          root.loaded = true;
        };
        reader.readAsDataURL(blob);
        socket.off('getEmployee');
      }else{
        this.loaded = true;
      }

    });
  }
}
</script>

<style scoped>

</style>

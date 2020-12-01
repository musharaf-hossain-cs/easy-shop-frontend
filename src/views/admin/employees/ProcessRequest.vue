<template>
  <div v-if="loaded">
    <div class="row" v-if="valid">
      <div class="col-sm-12 col-md-5" style="text-align: center">
        <h4 style="text-align: left">Employee Requests > <b>{{employee.FIRST_NAME}}</b></h4>
        <b-img
            :src="imageURL"
            alt="Employee's Image"
            class="col-sm-12 col-md-10"
        ></b-img>
      </div>

      <div class="col-sm-12 col-md-7">
        <b-table striped stacked hover :items="tableData">
          <!--<template #cell(Image)="data">
            <b-img :src="data.value"></b-img>
          </template>-->
        </b-table>
      </div>
    </div>
    <div class="row" v-if="valid">
      <b-button
          class="col-6"
          @click="atClickApprove"
          variant="success"
          :disabled="!approvable"
      >Approve Request</b-button>
      <b-button
          class="col-6"
          @click="atClickDelete"
          variant="danger"
      >Delete Request</b-button>
    </div>
    <div v-else><h3>This request does not exist...</h3></div>
  </div>
  <div v-else><h3>Loading...</h3></div>
</template>

<script>
let socket;
export default {
  name: "ProcessRequest",
  data(){
    return{
      loaded:false,
      imageURL: null,
      employee: null,
      approvable: false,
      valid: false
    }
  },
  methods:{
    atClickApprove(){
      socket.emit('processRequest',{
        command: 'approve',
        id: this.employee.EMPLOYEE_ID,
        job: this.employee.JOB_TITLE
      });
    },
    atClickDelete(){
      socket.emit('processRequest',{
        command: 'delete',
        id: this.employee.EMPLOYEE_ID,
        job: this.employee.JOB_TITLE
      });
    }
  },
  computed:{
    tableData(){
      let date = new Date(this.employee.DOB);
      return [
        {
          'Name: ': this.employee.FIRST_NAME + ' ' + this.employee.LAST_NAME,
          'Username: ': this.employee.USERNAME,
          'Job Title: ': this.employee.JOB_TITLE,
          'Email: ': this.employee.EMAIL,
          'Mobile': this.employee.MOBILE,
          'Address: ': this.employee.ADDRESS,
          'Gender: ': this.employee.GENDER,
          'Date Of Birth: ': date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
          'Age: ': this.employee.AGE + ' Years'
        }
      ];
    }
  },
  created() {
    socket = this.$store.getters.getSocket;
    socket.emit('sendEmployee', {
      id: this.$route.params.id
    });

    socket.on('getEmployee',(res)=>{
      if(res.length>0){
        this.employee = res[0];
        if(this.employee.STATUS === 'Pending'){
          this.valid = true;
        }
        let root = this;
        const buffer = this.employee.IMAGE;
        const blob = new Blob([buffer], {type: 'image/jpeg'});
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageURL = e.target.result;
          root.loaded = true;
          socket.emit('checkPostAvailability', {
            job: this.employee.JOB_TITLE
          });
        };
        reader.readAsDataURL(blob);
        socket.off('getEmployee');
      }else{
        this.loaded = true;
      }

    });
    socket.on('processRequest', (res)=>{
      if(res.success){
        this.$router.push('/admin/employees/requests');
        socket.off('processRequest');
      }else{
        alert('Processing Failed!');
        socket.off('precessRequest');
      }
    });
    socket.on('checkPostAvailability', (res) => {
      this.approvable = res;
      socket.off('checkPostAvailability');
    });
  }
}
</script>

<style scoped>

</style>

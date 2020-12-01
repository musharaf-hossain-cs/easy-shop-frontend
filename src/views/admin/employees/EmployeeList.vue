<template>
  <div v-if="loaded">
    <h3>Employee List</h3>

    <b-table
        striped
        :items="tableData"
        hover
        responsive="lg"
        table-variant="primary"
        @row-clicked="atRowClicked"
        :per-page="pagination.perPage"
        :current-page="pagination.currentPage"
        id="table"
    >
      <template #cell(Image)="data">
        <b-avatar
            variant="primary"
            text="USER"
            :src="data.value"
            alt="user-photo"
            size="50"
        ></b-avatar>
      </template>
    </b-table>
    <b-pagination
        aria-controls="table"
        :per-page="pagination.perPage"
        :total-rows="pagination.totalRows"
        v-model="pagination.currentPage"
        align="center"
    ></b-pagination>

  </div>
  <div v-else><h3>Loading...</h3></div>
</template>

<script>
let socket;
export default {
  name: "EmployeeList",
  data(){
    return {
      loaded:false,
      employees: null,
      imageURLs: [],
      pagination:{
        currentPage: 1,
        totalRows: null,
        perPage:10
      }
    };
  },
  components:{

  },
  methods:{
    createImageURLs(){
      let i=0;
      for(i;i<this.employees.length;i++){
        const buffer = this.employees[i].IMAGE;
        const blob = new Blob([buffer], {type: 'image/jpeg'});
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageURLs.push(e.target.result);
        };
        reader.readAsDataURL(blob);
      }
    },
    atRowClicked(record){
      let email = record.Email;
      socket.emit('sendEmployeeID',{
        field:'EMAIL',
        value:email
      });
      socket.on('getEmployeeID', (res)=>{
        console.log(res);
        this.$router.push('/admin/employees/employee/'+res[0].EMPLOYEE_ID+'/details');
        socket.off('getEmployeeID');
      });
    }

  },
  computed:{
    tableData(){
      let items = [];
      let i=0;
      for(i;i<this.employees.length;i++){
        let e = this.employees[i];
        let item = {
          'Image' : this.imageURLs[i],
          'Name': e.FIRST_NAME + ' ' + e.LAST_NAME,
          'Username': e.USERNAME,
          'Job': e.JOB_TITLE,
          'Email': e.EMAIL,
          'Mobile': e.MOBILE
        }
        items.push(item);
      }
      return items;
    }
  },
  created() {
    socket = this.$store.getters.getSocket;
    socket.emit('sendEmployees');
    socket.on('getEmployees',(res)=>{
      this.employees = res;
      this.loaded=true;
      this.pagination.totalRows =
          Math.ceil(this.employees.length/this.pagination.perPage);
      this.createImageURLs();
    });
  }
}
</script>

<style scoped>

</style>

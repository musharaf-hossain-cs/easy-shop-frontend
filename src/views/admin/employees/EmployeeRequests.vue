<template>
  <div v-if="loaded" class="container">
    <request
        v-for="(request,idx) in requests"
        :key="idx"
        :request="request"
        @click.native="atClickRequest(request.EMPLOYEE_ID)"
        style="cursor:alias"
    ></request>
  </div>
  <div v-else>
    <h4>Loading...</h4>
  </div>
</template>

<script>
let socket;
export default {
  name: "EmployeeRequests",
  data(){
    return{
      loaded: false,
      requests: null
    }
  },
  components: {
    request: ()=>import('@/views/admin/employees/Request')
  },
  methods:{
    atClickRequest(id){
      this.$router.push('/admin/employees/requests/'+id+'/process');
    }
  },
  created() {
    this.loaded = false;
    socket = this.$store.getters.getSocket;
    socket.emit('sendEmployeeRequests');
    socket.on('getEmployeeRequests', (res)=>{
      this.requests = res;
      this.loaded = true;
      console.log(this.requests);
    });
  }
}
</script>

<style scoped>

</style>

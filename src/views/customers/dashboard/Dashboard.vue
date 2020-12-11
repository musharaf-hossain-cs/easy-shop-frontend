<template>
  <div v-if="loaded">
    <div class="row" v-if="valid">
      <div class="col-sm-12 col-md-5" style="text-align: center">
        <h4 style="text-align: left">Customer Details > <b>{{customer.FIRST_NAME}}</b></h4>
        <b-img
            :src="imageURL"
            alt="Product's Image"
            class="col-sm-12 col-md-10"
        ></b-img>
        <h5>Customer's Photo</h5>
      </div>

      <div class="col-sm-12 col-md-7">
        <b-table striped stacked hover :items="tableData">
        </b-table>
      </div>
    </div>
    <div v-else><h3>There is no customer with this id</h3></div>
  </div>
  <div v-else><h3>Loading...</h3></div>
</template>

<script>
let socket;
export default {
  name: "Dashboard",
  data(){
    return {
      empId: null,
      imageURL:null,
      loaded:false,
      valid: false,
      customer: null
    }
  },
  computed:{
    tableData(){
      let date = new Date(this.customer.DOB);
      return [
        {
          'Name:': this.customer.FIRST_NAME + ' ' + this.customer.LAST_NAME,
          'Username:': this.customer.USERNAME,
          'Email:': this.customer.EMAIL,
          'Mobile': this.customer.MOBILE,
          'Address:': this.customer.ADDRESS,
          'Gender:': this.customer.GENDER,
          'Date Of Birth:': date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
          'Age:': this.customer.AGE + ' Years'

        }
      ];
    }
  },
  created() {
    socket = this.$store.getters.getSocket;
    if(this.$store.getters.getUser != null){
      socket.emit('sendPerson',{
        token: this.$store.getters.getUser.token
      });
    }
    let root = this;
    socket.on('getPerson',(res)=>{
      socket.off('getPerson');
      if(res.length>0){
        this.customer = res[0];
        const buffer = this.customer.IMAGE;
        const blob = new Blob([buffer], {type: 'image/jpeg'});
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageURL = e.target.result;
          root.loaded = true;
          root.valid = true;
        };
        reader.readAsDataURL(blob);
      }else{
        console.log('Cannot find User. Please, sign in again...');
      }

    });
  }

}
</script>

<style scoped>

</style>

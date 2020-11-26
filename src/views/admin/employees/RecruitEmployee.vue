<template>
  <div class="container">
    <h3
        style="margin-bottom: 20px; text-align: center"
    >Recruit New Employee</h3>
    <b-form>
      <b-form-group
        id="job-input"
        label-for="job"
        label="Select Job: "
      >
        <b-form-select
            id="job"
            v-model="formData.job"
            required
            :options="jobOptions"
            :state="jobState"
        ></b-form-select>
      </b-form-group>
      <b-form-group
          id="quantity-input"
          label-for="quantity"
          label="Number of Posts:"
      >
        <b-form-input
            id="quantity"
            type="number"
            v-model="formData.quantity"
            required
            :state="quantityState"
            placeholder="Number of Posts"
        ></b-form-input>
      </b-form-group>
    </b-form>
    <div class="row">
      <b-button
          class="col-6"
          @click="atClickPublish"
          variant="success"
      >Publish</b-button>
      <b-button
          class="col-6"
          @click="atClickReset"
          variant="danger"
      >Reset</b-button>
    </div>
  </div>
</template>

<script>
let socket;
export default {
  name: "RecruitEmployee",
  data(){
    return {
      formData: {
        job: null,
        quantity: null
      },
      jobOptions: [
        {text: 'Select Job', value: null},
        {text: 'Accountant', value: 'Accountant'},
        {text: 'Office Staff', value: 'Office Staff'},
        {text: 'Delivery Boy', value: 'Delivery Boy'}
      ]
    }
  },
  methods:{
    atClickPublish(){
      if(!this.checkValidity()){
        alert('Invalid Input');
        return;
      }
      let data = {
        id: '',
        tablename: 'notices',
        topic: 'Recruitment',
        field: this.formData.job,
        value: this.formData.quantity
      }
      socket.emit('insert',data);

    },
    atClickReset(){
      this.formData.job = null;
      this.formData.quantity = null;
    },
    checkValidity(){
      return this.quantityState && this.jobState;
    }
  },
  computed:{
    jobState(){
      if(this.formData.job == null) return null;
      else return true;
    },
    quantityState(){
      if(this.formData.quantity===null || this.formData.quantity===0
          || this.formData.quantity==='') return null;
      if(this.formData.quantity<0 || this.formData.quantity>1000){
        alert('Out of Range!');
        return false;
      }
      return true;
    }
  },
  created() {
    socket = this.$store.getters.getSocket;
    socket.on('insertNoticeRes',(res)=>{
      if(res){
        this.$router.push('/notices');
        socket.off('insertNoticeRes');
      }else{
        alert('Publish Error!');
      }
    });
  }
}
</script>

<style scoped>

</style>

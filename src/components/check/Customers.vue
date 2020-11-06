<template>
  <div class="">
    <button
        class="btn btn-primary"
        @click="getCustomers"
    >Get Customers</button>
    <div>
      <b-card-group>
        <Customer
            v-for="customer in customers"
            :customer="customer"
        ></Customer>
      </b-card-group>

    </div>
  </div>
</template>

<script>
import Customer from "@/components/check/Customer";
let socket;

export default {
  name: "Customers",
  data(){
    return {
      customers: []
    }
  },
  components:{
    Customer
  },
  methods:{
    getCustomers(){
        socket.emit('sendCustomers');
        socket.on('getCustomers', (data) => {
          this.customers = data;
        });
    }
  },
  created() {
    socket = this.$store.getters.getSocket;
  }
}
</script>

<style scoped>

</style>



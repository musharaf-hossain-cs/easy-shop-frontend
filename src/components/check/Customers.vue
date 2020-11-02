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
import io from 'socket.io-client';
const socket = io('192.168.6.102:3000');

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
  }
}
</script>

<style scoped>

</style>



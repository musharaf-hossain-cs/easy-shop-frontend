<template>
  <div class="col-sm-12 col-md-6 col-lg-4">
    <b-card
        :title="customer.FIRST_NAME+' '+customer.LAST_NAME"
        header-bg-variant="info"
        border-variant="primary"
    >
      <template #header>Customer Details</template>
      <b-img :src="image" alt="User's Image"></b-img>

      <b-card-text>
        ID: {{customer.CUSTOMER_ID}} <br>
        Username: {{customer.USERNAME}} <br>
        Password: {{customer.PASSWORD}} <br>
        Email: {{customer.EMAIL}} <br>
        Mobile: {{customer.MOBILE}} <br>
        Address: {{customer.ADDRESS}} <br>
        Gender: {{customer.GENDER}} <br>
        Date of Birth: {{customer.DOB}} <br>
        Status: {{customer.STATUS}} <br>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Customer",
/*  props: [
      'id', 'fname', 'lname', 'username', 'password',
      'email', 'mobile', 'address', 'gender', 'dob', 'status'
  ],*/
  props: ['customer'],
  data(){
    return {
      image:null
    }
  },
  created() {
    const buffer = this.customer.IMAGE;
    const blob = new Blob([buffer], {type: 'image/jpeg'});
    const reader = new FileReader();
    reader.onload = (e) => {
      this.image = e.target.result;
    };
    reader.readAsDataURL(blob);
  }
}
</script>

<style scoped>

</style>

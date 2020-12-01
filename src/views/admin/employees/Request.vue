<template>
  <div>
    <div
        class="row"
        style="background-color:#69F0AE"
    >
      <div class="col-2" align="right">
        <b-avatar
            variant="primary"
            text="USER"
            :src="imageURL"
            alt="user-photo"
        ></b-avatar>
      </div>
      <div class="col-10">
        My name is <b>{{request.NAME}}</b>. I want to work as
        <b>{{request.JOB_TITLE}}</b> for easyShop.com
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Request",
  props: ['request'],
  data(){
    return {
      imageURL: null
    };
  },
  created() {
    const buffer = this.request.IMAGE;
    const blob = new Blob([buffer], {type: 'image/jpeg'});
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageURL = e.target.result;
    };
    reader.readAsDataURL(blob);
  }
}
</script>

<style scoped>

</style>

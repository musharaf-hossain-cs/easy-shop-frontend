<template>
  <div class="col-md-6 col-lg-4">
    <b-card
        :title="'Job: '+notice.FIELD"
        header-bg-variant="info"
        border-variant="primary"
    >
      <template #header>Recruitment Notice</template>
      <b-card-text>
        <hr>
        Available Post: {{notice.VALUE}}
      </b-card-text>
      <template #footer>
        <b-button
            @click="atClickApply"
            class="col-12"
            variant="success"
        >Apply for the Job</b-button>
      </template>
    </b-card>

  </div>
</template>

<script>
export default {
  name: "JobNotice",
  props: ['notice'],
  methods: {
    atClickApply(){
      this.$store.dispatch('setApplicationJob',this.notice.FIELD);
      this.$router.push('/auth/signup-employee').catch((e)=>{
        console.log('Routing Error in JobNotice.vue');
      });
    }
  }
}
</script>

<style scoped>

</style>

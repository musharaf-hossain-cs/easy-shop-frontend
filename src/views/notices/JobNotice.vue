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
        <router-link
            to="/auth/signup-employee"
            tag="b-button"
            class="success col-12"
        >Apply for the Job</router-link>
      </template>
    </b-card>

  </div>
</template>

<script>
export default {
  name: "JobNotice",
  props: ['notice']
}
</script>

<style scoped>

</style>

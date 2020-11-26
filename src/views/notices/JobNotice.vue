<template>
  <div>
    <p>* Recruitment Notice:
      We need <b>{{notice.VALUE}}</b> employee(s) for the
        following post: <b>{{notice.FIELD}}</b>.
        If interested, <router-link
          tag="a"
          to="/auth/signup-employee"
      >Click Here</router-link> </p>

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

<template>
<div>
  <job-notice></job-notice>
</div>
</template>

<script>
export default {
  name: "NoticeHome",
  components:{
    jobNotice: ()=>import('@/views/notices/JobNotices')
  }
}
</script>

<style scoped>

</style>

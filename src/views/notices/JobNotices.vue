<template>
  <div class="container">
    <h3>Job Notices</h3>
    <div class="row">
      <job-notice
          v-for="(notice,idx) in jobNotices"
          :key="idx"
          :notice="notice"
      ></job-notice>
    </div>

  </div>
</template>

<script>
let socket;
export default {
  name: "JobNotice",
  data(){
    return {
      jobNotices: null
    };
  },
  methods:{

  },
  computed:{

  },
  components:{
    jobNotice: ()=>import('./JobNotice')
  },
  created() {
    socket = this.$store.getters.getSocket;
    socket.emit('sendJobNotices');
    socket.on('getJobNotices', (res)=>{
      this.jobNotices = res;
    });
  }

}
</script>

<style scoped>

</style>

<template>
  <div class="home container">
      <home-header></home-header>
      <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components:{
    homeHeader: () => import('@/components/HomeHeader')
  }
}
</script>

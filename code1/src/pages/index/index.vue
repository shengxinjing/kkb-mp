<template>
<div>
  <todo :title="title"></todo>
</div>
</template>

<script>
import todo from '@/components/todo'
export default {
  components:{
    todo
  },
  data(){
    return {
      title:'mpvue2.0发布拉'
    }
  }
}
</script>

<style scoped>

</style>

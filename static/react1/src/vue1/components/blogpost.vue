<template>
<div class="blog-post">
  <h3>{{ title }}</h3>
  <div v-html="content"></div>
</div>
</template>
<script>
export default {
  name: 'blogpost',
  props: {title:String,content:String},
}
</script>

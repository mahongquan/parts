<template>
<li>{{ todo.text }}</li>
</template>
<script>
export default {
  name: 'ToDoItem',
  props: {todo:Object},
}
</script>

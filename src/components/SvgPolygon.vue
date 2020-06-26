<template>
  <polygon :fill="args.fill" :points="args.points" />
</template>

<script>
export default {
  props: {
    args: {
      type: Object,
      required: true 
    },
  },
}
</script>

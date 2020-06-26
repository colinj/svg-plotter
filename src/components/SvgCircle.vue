<template>
  <circle :fill="args.fill" :cx="args.cx" :cy="args.cy" :r="args.r" />
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

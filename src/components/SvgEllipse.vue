<template>
  <ellipse :fill="args.fill" :cx="args.cx" :cy="args.cy" :rx="args.rx" :ry="args.ry" />
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

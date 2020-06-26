<template>
  <rect :fill="args.fill" :x="args.x" :y="args.y" :width="args.width" :height="args.height" />
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

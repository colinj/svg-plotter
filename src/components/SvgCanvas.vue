<template>
  <svg height="250" width="250">
    <template v-for="shape in shapes">
      <component :is="shape.component" :args="shape" :key="shape.fill"/>
    </template>
  </svg>
</template>

<script>
import SvgRect from '@/components/SvgRect'
import SvgCircle from '@/components/SvgCircle'
import SvgPolygon from '@/components/SvgPolygon'

export default {
  components: {
    SvgRect,
    SvgCircle,
    SvgPolygon
  },
  props: {
    height: {
      type: Number,
      default: 250
    },
    width: {
      type: Number,
      default: 250
    },
    shapes: {
      type: Array,
      required: true
    }
  },  
}
</script>

<style lang="scss" scoped>

</style>
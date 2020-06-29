<template>
  <svg :height="height" :width="width">
    <template v-for="shape in shapes">
      <component :is="shape.component" :args="shape" :key="shape.fill"/>
    </template>
  </svg>
</template>

<script>
import SvgRect from '@/components/SvgRect'
import SvgCircle from '@/components/SvgCircle'
import SvgPolygon from '@/components/SvgPolygon'
import SvgEllipse from '@/components/SvgEllipse'

export default {
  components: {
    SvgRect,
    SvgCircle,
    SvgPolygon,
    SvgEllipse,
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
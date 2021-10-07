<template>
  <svg :height="height" :width="width">
    <template v-for="shape in shapes">
      <component :is="shape.component" :args="shape" :key="shape.fill"/>
    </template>
  </svg>
</template>

<script>
import SvgRect from '@/components/SvgRect.vue'
import SvgCircle from '@/components/SvgCircle.vue'
import SvgPolygon from '@/components/SvgPolygon.vue'
import SvgEllipse from '@/components/SvgEllipse.vue'

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
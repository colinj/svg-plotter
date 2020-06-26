<template>
  <div>
    <h1>Plotter Demo</h1>
    <div class="canvas">
      <svg height="250" width="250">
        <template v-for="shape in shapes">
          <component :is="shape.component" :args="shape" :key="shape.fill"/>
        </template>
      </svg>
    </div>
    <div>
      <textarea v-model="instructions" placeholder="add multiple lines"></textarea>
    </div>
    <div>
      <button @click="draw()">Draw</button>
      <button @click="clearText()">Clear</button>
    </div>
    <div v-if="errorMsgs.length !== 0">
      <template v-for="(errorMsg, idx) in errorMsgs">
        {{ errorMsg }}<br :key="idx">
      </template>
    </div>
    <div>
      {{ shapes }}
    </div>
  </div>
</template>

<script>
import SvgRect from '@/components/SvgRect'
import SvgCircle from '@/components/SvgCircle'
import SvgPolygon from '@/components/SvgPolygon'

const randomColor = () => '#' + Math.random().toString(16).slice(-6)

const createRect = args => {
  if (args.length !== 4) return 'Rectangle requires 4 parameters.'
  if (args.reduce((a, c) => a || isNaN(c), false)) return 'At least one of the parameters is not a valid number.'

  const values = args.map(v => parseInt(v))

  return {
    component: "SvgRect",
    fill: randomColor(),
    x: values[0],
    y: values[1],
    width: values[2],
    height: values[3]
  }
} 

const createCircle = args => {
  if (args.length !== 3) return 'Circle requires 3 parameters.'
  if (args.reduce((a, c) => a || isNaN(c), false)) return 'At least one of the parameters is not a valid number.'

  const values = args.map(v => parseInt(v))

  return {
    component: "SvgCircle",
    fill: randomColor(),
    cx: values[0],
    cy: values[1],
    r: values[2],
  }
}

const createPolygon = args => {
  if (args.length < 3) return 'Polygon requires at least 3 parameters.'
  if (args.reduce((a, c) => a || !/\d+,\d+/.test(c), false)) return 'At least one of the parameters is not a valid number.'

  return {
    component: "SvgPolygon",
    fill: randomColor(),
    points: args.join(' ')
  }
}

const processLine = line => {
  const tokens = line.trim().split(/\s+/)

  switch (tokens[0].toLowerCase()) {
    case 'r':
      return createRect(tokens.slice(1))

    case 'c':
      return createCircle(tokens.slice(1))

    case 'p':
      return createPolygon(tokens.slice(1))

    default:
      return 'Command is invalid.';
  }
}

export default {
  components: {
    SvgRect,
    SvgCircle,
    SvgPolygon
  },
  data () {
    return {
      instructions: '',
      shapes: [],
      errorMsgs: []
    }
  },
  computed: {

  },
  methods: {
    clearText () { return this.instructions = '' }, 
    draw () {
      const lines = this.instructions.split('\n')

      this.shapes = []
      this.errorMsgs = []
      let lineNo = 0
      lines.forEach(line => {
        lineNo++
        const shape = processLine(line)
        if (typeof(shape) === 'object') {
          this.shapes.push(shape)
        } else {
          this.errorMsgs.push(`Line ${lineNo}: ${shape}`)
        }
      }) 
    },
  }
    
}
</script>

<style lang="scss" scoped>

</style>
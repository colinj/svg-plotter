<template>
  <div>
    <h1>Plotter Demo</h1>
    <div class="canvas">
      <svg height="250" width="250">
        <rect x="10" y="10" width="100" height="100" style="fill:green" />
        <circle cx="100" cy="100" r="25" style="fill:orange" />
        <polygon points="200,10 250,190 160,210" style="fill:red" />
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

const randomColor = () => '#' + Math.random().toString(16).slice(-6)

const createRect = args => {
  if (args.length !== 4) return 'Rectangle requires 4 parameters.'
  if (args.reduce((a, c) => a || isNaN(c), false)) return 'At least one of the parameters is not a valid number.'

  const values = args.map(v => parseInt(v))

  return {
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
    draw () {
      const lines = this.instructions.split('\n')

      this.shapes = []
      this.errorMsgs = []
      let lineNo = 0
      lines.forEach(line => {
        lineNo++
        const shape = processLine(line)
        console.log(shape)
        console.log(typeof(shape))
        if (typeof(shape) === 'object') {
          this.shapes.push(shape)
        } else {
          this.errorMsgs.push(`Line ${lineNo}: ${shape}`)
        }
      }) 
    },
    clearText () { return this.instructions = '' }, 
  }
    
}
</script>

<style lang="scss" scoped>

</style>
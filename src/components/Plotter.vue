<template>
  <div>
    <h1>Plotter Demo</h1>
    <div>
      <svg-canvas class="canvas" :shapes="shapes" />
    </div>
    <cmd-editor v-model="instructions" />
    <div>
      <button @click="draw()">Draw</button>
      <button @click="clearText()">Clear</button>
    </div>
    <div v-if="errorMsgs.length !== 0">
      <template v-for="(errorMsg, idx) in errorMsgs">
        {{ errorMsg }}<br :key="idx">
      </template>
    </div>
  </div>
</template>

<script>
import SvgCanvas from '@/components/SvgCanvas'
import CmdEditor from '@/components/CmdEditor'
import parseCommand from '@/utils/parseCommands'

export default {
  components: {
    SvgCanvas,
    CmdEditor
  },
  data () {
    return {
      instructions: [],
      shapes: [],
      errorMsgs: []
    }
  },
  methods: {
    clearText () { return this.instructions = '' }, 
    draw () {
      this.shapes = []
      this.errorMsgs = []
      let lineNo = 0
      this.instructions.forEach(line => {
        lineNo++
        const output = parseCommand(line)
        if (typeof(output) === 'object') {
          this.shapes.push(output)
        } else if (output) {
          this.errorMsgs.push(`Line ${lineNo}: ${output}`)
        }
      }) 
    },
  }
    
}
</script>

<style lang="scss" scoped>
.canvas {
  border: 1px solid black
}
</style>
<template>
  <div>
    <h1>Plotter Demo</h1>
    <div class="canvas">
      <svg-canvas :shapes="shapes" />
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
      instructions: '',
      shapes: [],
      errorMsgs: []
    }
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
        const shape = parseCommand(line)
        if (typeof(shape) === 'object') {
          this.shapes.push(shape)
        } else if (shape) {
          this.errorMsgs.push(`Line ${lineNo}: ${shape}`)
        }
      }) 
    },
  }
    
}
</script>

<style lang="scss" scoped>

</style>
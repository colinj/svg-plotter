<template>
  <div>
    <h1>Plotter Demo</h1>
    <div class="canvas">
      <svg-canvas :shapes="shapes" />
    </div>
    <div>
      <textarea class="gutter" v-model="gutter" readonly/>
      <textarea class="editor" v-model="instructions" @scroll="syncScroll()"></textarea>
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
  </div>
</template>

<script>
import SvgCanvas from '@/components/SvgCanvas'
import parseCommand from '@/utils/parseCommands'

export default {
  components: {
    SvgCanvas
  },
  data () {
    return {
      instructions: '',
      shapes: [],
      errorMsgs: []
    }
  },
  computed: {
    gutter () {
      const lines = this.instructions
        .split('\n')
        .map((val, index) => index + 1)
        .join('\n')
      return lines
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
    syncScroll () {
      document.getElementsByClassName('gutter')[0].scrollTop = document.getElementsByClassName('editor')[0].scrollTop
    }
  }
    
}
</script>

<style lang="scss" scoped>
textarea {
  height: 300px;
  border-color: #aaa;
  // resize: vertical;
}

.gutter {
  padding-right: .5rem;
  width: 2rem;
  background-color: #eee;
  border-right: 0;
  text-align: right;
  overflow: hidden;
  resize: none;
}

.editor {
  padding-left: .5rem;
  width: 40rem;
}
</style>
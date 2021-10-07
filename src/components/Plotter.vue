<template>
  <div class="plotter">
    <h1>Plotter Demo</h1>
    <div>
      <svg-canvas class="canvas" :shapes="shapes" :height="canvas.height" :width="canvas.width"/>
    </div>
    <div class="canvas-controls">
      <span>Canvas size: </span>
      <input type="number" v-model.number.lazy="canvas.height">
      <span> x </span>
      <input type="number" v-model.number.lazy="canvas.width">
    </div>
    <cmd-editor v-model="instructions" />
    <div class="error" v-if="errorMsgs.length !== 0">
      <template v-for="(errorMsg) in errorMsgs">
        {{ errorMsg }}<br :key="errorMsg" />
      </template>
    </div>
    <div class="buttons">
      <button class="btn btn-primary" @click="draw()">Draw</button>
      <button class="btn" @click="clearText()">Clear</button>
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
      canvas: {
        height: 250,
        width: 250
      },
      instructions: [],
      shapes: [],
      errorMsgs: []
    }
  },
  methods: {
    clearText () { return this.instructions = [] }, 
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
.plotter {
  > * {
    margin-bottom: 2rem;
  }
}
.canvas {
  border: 1px solid black
}

.canvas-controls {
  input {
    width: 6ch;
    text-align: right;
  }
}

.error {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: pink;
  border: 1px solid red;
  border-radius: .5rem;
  font-size: .85rem;
  text-align: left;
}

@mixin btn-color($bg-color, $tx-color: #444){
  background-color: $bg-color;
  color: $tx-color;

&:hover, &:focus {
    background-color: darken($bg-color, 5%);
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, .1);
  }
  &:active { 
    background-color: darken($bg-color, 10%);
  }  
}

$btn-default: #ddd;
$btn-primary: #06a713;

.buttons {
  .btn {
    padding: 1rem 3rem;
    border: 0;
    border-radius: .5rem;
    font-size: 1rem;
    font-weight: 700;

    @include btn-color($btn-default);
  }

  .btn-primary {
    @include btn-color($btn-primary, #fff);
  }

  .btn + .btn {
    margin-left: 1rem;
  }
}
</style>
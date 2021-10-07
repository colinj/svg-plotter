<template>
  <div class="editor-container">
    <textarea 
      ref="gutter" 
      class="gutter" 
      v-model="gutter" 
      readonly />
    <textarea 
      ref="editor" 
      class="editor" 
      v-model="inputVal" 
      @mousemove="syncResize()"
      @scroll="syncScroll()" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    },
  },
  computed: {
    inputVal: {
      get() {
        return this.value.join('\n');
      },
      set(val) {
        this.$emit('input', val.split('\n'));
      }
    },
    gutter () {
      return this.value
        .map((val, idx) => idx + 1)
        .join('\n')
    }
  },
  methods: {
    syncResize () {
      this.$refs.gutter.style.height = this.$refs.editor.style.height
    },
    syncScroll () {
      this.$refs.gutter.scrollTop = this.$refs.editor.scrollTop
    },
  },
}
</script>

<style lang="scss" scoped>
.editor-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

textarea {
  height: 5rem;
  border-color: #aaa;
  font-family: monospace;
  resize: vertical;
}

.gutter {
  padding-right: .5rem;
  width: 3.5rem;
  background-color: #eee;
  border-right: 0;
  text-align: right;
  overflow: hidden;
  resize: none;
}

.editor {
  flex-grow: 1;
  padding-left: .5rem;
  width: 40rem;
}
</style>
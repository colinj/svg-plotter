<template>
  <div class="editor-container">
    <textarea ref="gutter" class="gutter" v-model="gutter" readonly/>
    <textarea ref="editor" class="editor" v-model="inputVal" @scroll="syncScroll()"></textarea>
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
  height: 300px;
  border-color: #aaa;
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
<template>
  <dropzone id="foo" ref="el" v-bind:options="options" :destroyDropzone="true"></dropzone>
</template>

<script>
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'

export default {
  components: {
    Dropzone
  },
  props: ["options"],
  watch: {
    options: function(newVal, oldVal) {
      // sadly, I can't get this to work
      delete this.$refs.el.dropzone.options;
      this.$refs.el.dropzone.options = newVal;
    }
  },
  mounted() {
    // Everything is mounted and you can access the dropzone instance
    const instance = this.$refs.el.dropzone
    instance.on("complete", (file) => {
        instance.removeFile(file);
      })
  }
}
</script>
<template>
  <pre class="highlight hljs" v-html="highlightHTML"></pre>
</template>

<script>
// docs
// https://highlightjs.org/usage/
// http://highlightjs.readthedocs.io/en/latest/api.html#configure-options
import highlight from "highlight.js";
import "./g.css";
import htmlFormat from "./htmlFormat";
export default {
  name: "highlight",
  props: {
    code: {
      type: String,
      required: false,
      default: ""
    },
    formatHtml: {
      type: Boolean,
      required: false,
      default: false
    },
    lang: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      highlightHTML: ""
    };
  },
  mounted() {
    this.highlight();
  },
  watch: {
    code() {
      this.highlight();
    }
  },
  methods: {
    highlight() {
      const code = this.formatHtml ? htmlFormat(this.code) : this.code;
      this.highlightHTML = highlight.highlightAuto(code, [
        this.lang,
        "html",
        "javascript",
        "json",
        "css",
        "scss",
        "less"
      ]).value;
    }
  }
};
</script>

<style lang="scss" scoped>
.highlight {
  margin: 0px;
  border-radius: 4px;
}
</style>
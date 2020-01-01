<template>
  <div class="block">
    <history-inner
      v-bind:history="history"
      v-bind:reverse="reverse"
      v-on:revision="$emit('revision', database, resource, $event)"
    ></history-inner>
  </div>
</template>

<script>
import AsyncComputed from "vue-async-computed";
import HistoryInner from "@/components/HistoryInner.vue";
import { Vue } from "vue-property-decorator";

Vue.use(AsyncComputed);
Vue.component("history-inner", HistoryInner);

export default {
  props: ["database", "resource", "accept", "reverse"],

  asyncComputed: {
    history() {
      return this.$axios
        .$get(
          `sirix/${this.database}/${this.resource}/history`,
          { data: {} },
          {
            headers: { accept: `${this.accept}` }
          }
        )
        .then(res => {
          return res.history;
        })
        .catch(e => {
          console.log(e);
          return Promise.resolve({});
        });
    }
  }
};
</script>

<style scoped>
</style>

<template>
  <div class="block">
    <history-inner v-bind:history="history" v-bind:reverse="reverse"></history-inner>
  </div>
</template>

<script>
import AsyncComputed from 'vue-async-computed'
import HistoryInner from '@/components/HistoryInner.vue'
import { Vue } from "vue-property-decorator";
//import "~/mock/mock.js";

Vue.use(AsyncComputed)
Vue.component('history-inner', HistoryInner);

export default {
  props: ["database", "resource", "contentType", "reverse"],

  asyncComputed: {
    history() {
      console.log(this.contentType);
      return this.$axios
        .$get(`sirix/${this.database}/${this.resource}/history`, {data: {}}, {
          headers: { "accept": "application/json", "content-type": `${this.contentType}` }
        })
        .then(res => {
          return res.history;
        })
        .catch((e) => {
          console.log(e)
          return Promise.resolve({});
        });
    }
  }
};
</script>

<style scoped>
</style>

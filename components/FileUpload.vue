<template>
  <div
    style="border-style: dashed;"
    class="dragzone"
    @drop="dragFileUpload"
    @dragover="dragOverHandler"
    @click="click"
    v-on:change="handleFileUploadFromClick()"
  >
      Drag files here to upload
  </div>
</template>

<script>
export default {
  props: ["options"],
  methods: {
    click: function() {
      let input = document.createElement("input");
      input.setAttribute("type", "file");
      input.accept = this.options.acceptedFiles;
      input.click();
      input.addEventListener("change", (ev) => {
        let formData = new FormData();
        formData.append(input.files[0].name, input.files[0]);
        this.$axios.$post(this.options.url, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      });
    },
    dragFileUpload: function(ev) {
      console.log(ev);

      // Prevent default behavior (Prevent file from being opened)
      ev.preventDefault();
      let formData = new FormData();
      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (ev.dataTransfer.items[i].kind === "file") {
            let file = ev.dataTransfer.items[i].getAsFile();
            formData.append(file.name, file);
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.files.length; i++) {
          let file = ev.dataTransfer.files[i];
          console.log(file.name);
          formData.append(file.name, file.getAsFile());
        }
      }
      this.$axios.$post(this.options.url, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    },
    dragOverHandler: function(ev) {
      console.log("File(s) in drop zone");

      // Prevent default behavior (Prevent file from being opened)
      ev.preventDefault();
    }
  },
};
</script>

<style>
input[type="file"] {
  display: none;
}
</style>
<style scoped>
div:hover {
  cursor: pointer;
}
</style>
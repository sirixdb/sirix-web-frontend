<template id="tree-viewer">
  <div>
    <tree :options="treeOptions">
      <span slot-scope="{ node }" class="viewer-item" :class="[node.data.type]">
        <span v-if="node.hasChildren()" class="viewer-item__key">
          {{ node.text }}
          <span v-if="node.collapsed()">
            <template v-if="node.data.type == 'array'">[ {{ node.children.length }} ]</template>
            <template v-else>{ {{ node.children.length }} }</template>
          </span>
        </span>
        <span v-else class="viewer-item__prop">
          <span class="viewer-item__key">{{ node.text }}</span>
          :
          <span class="viewer-item__value">{{ node.data.objectKey }}</span>
        </span>
      </span>
    </tree>
  </div>
</template>
  
<script>
import LiquorTree from "liquor-tree";
import { Vue } from "vue-property-decorator";

Vue.component(LiquorTree.name, LiquorTree);

export default {
  props: ["resource", "database"],

  data() {
    return {
      treeOptions: {
        fetchData: () => {
          return this.$axios
            .$get(`/sirix/${this.database}/${this.resource}`, {
              params: { revision: this.revisionNumber }
            })
            .then(res => {
              return this.parser(res);
            })
            .catch(e => {
              console.log(e);
              return Promise.resolve({});
            });
        }
      }
    };
  },

  methods: {
    isString(value) {
      return "string" == typeof value;
    },

    isNaN(value) {
      return value !== value;
    },

    isBoolean(value) {
      return "boolean" == typeof value;
    },

    isNumber(value) {
      return "number" == typeof value;
    },

    isArray(value) {
      return Array.isArray(value);
    },

    isValue(value) {
      return !this.isArray(value) && !this.isPlainObject(value);
    },

    isPlainObject(value) {
      function isObject(obj) {
        return (
          obj != null && typeof obj === "object" && Array.isArray(obj) === false
        );
      }

      if (
        !isObject(value) ||
        !value.constructor ||
        !value.constructor.prototype
      ) {
        return false;
      }

      return (
        value.constructor.prototype.hasOwnProperty("isPrototypeOf") === true
      );
    },

    isIterable(value) {
      return this.isArray(value) || this.isPlainObject(value);
    },

    map(obj, fn) {
      return Object.keys(obj).map(key => {
        return fn(obj[key], key);
      });
    },

    transformObject(prop, key) {
      let obj = {
        text: key
      };

      if (this.isIterable(prop)) {
        obj.children = this.map(prop, this.transformObject);
        obj.data = {
          type: this.isArray(prop)
            ? "array"
            : this.isPlainObject(prop)
            ? "object"
            : "unknown"
        };
      } else {
        obj.data = {
          objectKey: prop || `${prop}`,
          type: this.getType(prop)
        };
      }

      return obj;
    },

    getType(value) {
      if (this.isNaN(value)) {
        return "viewer-type--nan";
      }

      if (this.isString(value)) {
        return "viewer-type--string";
      }

      if (this.isNumber(value)) {
        return "viewer-type--number";
      }

      if (this.isBoolean(value)) {
        return "viewer-type--boolean";
      }

      if (null === value) {
        return "viewer-type--null";
      }
    },

    parser(obj) {
      return [
        {
          text: this.resource,
          state: { expanded: true },
          data: { type: "root" },
          children: this.map(obj, this.transformObject)
        }
      ];
    }
  }
};
</script>

<style scoped>
.viewer-item__key {
  color: #303030;
}

.viewer-item__key,
.viewer-item__value {
  padding: 0 3px;
}

.viewer-type--boolean .viewer-item__value {
  color: #ff9b21;
}

.viewer-type--number .viewer-item__value {
  color: #f85441;
}

.viewer-type--null .viewer-item__value {
  color: #acabab;
}

.viewer-type--string .viewer-item__value {
  color: green;
}
</style>
<template>
  <div class="card">
    <div class="card-title">
      {{ title }}
    </div>
    <div>
      {{ body }}

      <types :types="types" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Types from './Types.vue';

export default defineComponent({
  components: { Types },
  props: {
    title: { type: String, default: '' },
    body: { type: String, default: '' },
    types: { type: Array, required: true },
  },

  setup() {
    return {};
  },
});
</script>

<style scoped>
.card {
  border: 1px solid black;
  padding: 5px;
  width: 200px;
  height: 200px;
  margin: 5px;
}

.card-title {
  border-bottom: 1px solid black;
}
</style>

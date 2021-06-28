<template>
  <div class="card">
    <div class="card-title">
      {{ title }}
    </div>
    <div>
      {{ body }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: { type: String, default: '' },
    body: { type: String, default: '' },
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

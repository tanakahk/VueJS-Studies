<template>
  <div
    style="
      display: flex;
      width: 200px;
      height: 96px;
      justify-content: center;
      align-items: center;
    "
  >
    <div @click="setCurrent()">Prev</div>
    <img
      style="width: 96px; height: 96px"
      v-if="current === 0"
      :src="images[0]"
    />
    <img style="width: 96px; height: 96px" v-else :src="images[1]" />
    <div @click="setCurrent()">Next</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    images: { type: Array, required: true },
  },

  setup() {
    const current = ref(0);

    const setCurrent = () => {
      if (!current.value) {
        current.value = 1;
      } else {
        current.value = 0;
      }
    };

    return {
      current,
      setCurrent,
    };
  },
});
</script>

<style scoped>
</style>

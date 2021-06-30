<template>
  <div
    style="
      display: flex;
      width: 100%;
      height: 96px;
      justify-content: center;
      align-items: center;
    "
  >
    <div @click="setCurrent()">Prev</div>
    <img v-if="current === 0" :src="images[0]" />
    <img v-else :src="images[1]" />
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

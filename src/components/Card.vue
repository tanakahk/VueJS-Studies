<template>
  <div class="card">
    <div class="card-title">
      {{ pokemon.name }}
    </div>
    <div>
      <carousel :images="images" />
    </div>
    <div>
      <div>Altura: {{ pokemon.height }}</div>
      <div>Peso: {{ pokemon.weight }}</div>
    </div>
    <div>
      <types :types="types" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Carousel from './Carousel.vue';
import Types from './Types.vue';

export default defineComponent({
  components: { Types, Carousel },
  props: {
    pokemon: { type: Object, required: true },
    images: { type: Array, required: true },
    types: { type: Array, required: true },
  },

  setup() {
    return {
    };
  },
});
</script>

<style scoped>
.card {
  border: 1px solid black;
  padding: 5px;
  width: 200px;
  /* height: 200px; */
  height: fit-content;
  margin: 5px;
}

.card-title {
  border-bottom: 1px solid black;
}
</style>

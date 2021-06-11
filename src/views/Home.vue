<template>
  <div class="home">
    Componente home.vue

    <div style="display: flex; flex-wrap: wrap">
        <card title="1" body="Corpo"/>
        <card title="novo título" body="novo card"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Card from '@/components/Card.vue';

export default defineComponent({
  components: {
    Card,
  },
});
</script>

<style scoped>
</style>

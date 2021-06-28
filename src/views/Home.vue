<template>
  <div class="home">
    <div>Pokemons disponiveis</div>
    <div style="display: flex; flex-wrap: wrap">
      <card title="Título 1" body="Corpo" />
      <card title="novo título" body="novo card" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import Card from '@/components/Card.vue';
import useCards from '@/modules/cards';

export default defineComponent({
  components: {
    Card,
  },

  setup() {
    const cards = useCards();
    const state = reactive({});

    console.log(cards);

    cards.actions.loadPokemons();

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped>
</style>

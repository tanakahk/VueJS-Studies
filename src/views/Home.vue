<template>
  <div class="home">
    <div>Pokemons disponiveis</div>

    <select v-model="category">
      <option value="">Sem filtro</option>
      <option v-for="cat in categories" :key="cat" :value="cat">
        {{ cat }}
      </option>
    </select>

    <div style="display: flex; flex-wrap: wrap">
      <div v-for="p in pokemons" :key="p.id">
        <card :pokemon="p" :images="getImages(p)" :types="p.types" />
      </div>
    </div>
    <button @click="loadMore">Carregar mais pokemons</button>

    <div style="margin-top: 50px">Meus Pokemons</div>
    <div style="display: flex; flex-wrap: wrap">
      <div v-for="p in myPokemons" :key="p.id">
        <card :pokemon="p" :images="getImages(p)" :types="p.types" is-mine />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import Card from '@/components/Card.vue';
import useCards, { Pokemon } from '@/modules/cards';

export default defineComponent({
  components: {
    Card,
  },

  setup() {
    const cards = useCards();
    const category = ref();

    const myPokemons = computed(() => cards.state.myPokemons);
    const categories = computed(() => cards.state.categories);
    const pokemons = computed(() => {
      if (category.value) {
        return cards.state.pokemons.filter((p) => {
          const exists = p.types.find(
            (type) => type.type.name === category.value,
          );
          console.log('p', exists, p.types);
          return exists;
        });
      }
      return cards.state.pokemons;
    });

    const getImages = (pokemon: Pokemon) => [
      pokemon.sprites.frontDefault,
      pokemon.sprites.backDefault,
    ];

    const loadMore = () => {
      cards.actions.loadPokemons();
    };

    cards.actions.loadPokemons();
    cards.actions.loadMyPokemons();

    return {
      pokemons,
      myPokemons,
      categories,
      getImages,
      loadMore,
      category,
    };
  },
});
</script>

<style scoped>
</style>

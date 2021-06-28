import axios from 'axios';
import { reactive, readonly } from 'vue';

interface PokemonApi {
  name: string
  url: string
}

interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

interface Pokemon {
  id: number
  name: string
  types: PokemonType
  height: number
  weight: number
  sprites: {
    backDefault: string
    frontDefault: string
  }
}

interface CardState {
  pokemons: Pokemon[]
  myPokemons: Pokemon[]
  busy: boolean
}

const state: CardState = {
  pokemons: [],
  myPokemons: [],
  busy: false,
};

const mutations = {
  setBusy(value: boolean) {
    state.busy = value;
  },

  processPokemon(pokemon: Pokemon) {
    const idx = state.pokemons.findIndex((p) => p.id === pokemon.id);
    if (idx > -1) {
      // se ele existir
      state.pokemons[idx] = pokemon;
      console.log('existe', pokemon.id);
    } else {
      // se ele não existir
      state.pokemons.push(pokemon);
      console.log(' não existe', pokemon.id);
    }
  },
};

const actions = {
  async loadPokemons() {
    mutations.setBusy(true);

    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0');

    res.data.results.forEach((pokemon: PokemonApi) => {
      console.log('pokemon', pokemon);
      actions.loadPokemon(pokemon.url);
    });

  console.log('log state', state.pokemons);
    mutations.setBusy(false);
  },

  async loadPokemon(url: string) {
    const res = await axios.get(url);

    const pokemon: Pokemon = {
      id: res.data.id,
      name: res.data.name,
      types: res.data.types,
      height: res.data.height,
      weight: res.data.weight,
      sprites: {
        backDefault: res.data.sprites.back_default,
        frontDefault: res.data.sprites.front_default,
      },
    };

    mutations.processPokemon(pokemon);
  },
};

export default function useCards() {
  return readonly({
    state,
    mutations,
    actions,
  });
}

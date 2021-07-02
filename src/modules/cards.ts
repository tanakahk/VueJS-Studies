import axios from 'axios';
import { reactive, readonly } from 'vue';

interface PokemonApi {
  name: string
  url: string
}

export interface PokemonType { // quando exportar, ela poderá ser utilzada em qualquer lugar do app
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface Pokemon {
  id: number
  name: string
  types: PokemonType[]
  height: number
  weight: number
  sprites: {
    backDefault: string
    frontDefault: string
  }
}

export interface CardState {
  pokemons: Pokemon[]
  myPokemons: Pokemon[]
  busy: boolean
  nextUrl: string
}

const state: CardState = reactive({
  pokemons: [],
  myPokemons: [],
  busy: false,
  nextUrl: 'https://pokeapi.co/api/v2/pokemon?limit=5&offset=0',
  // limita em 5 pokemons e começa do pokemon 0
});

const mutations = {
  setBusy(value: boolean) {
    state.busy = value;
    if (value === true) {
      console.log('Estou ocupado');
    } else {
      console.log('Estou disponível');
    }
  },

  setNextUrl(url: string) {
    state.nextUrl = url;
  },

  processPokemon(pokemon: Pokemon) {
    const idx = state.pokemons.findIndex((p) => p.id === pokemon.id);
    if (idx > -1) {
      state.pokemons[idx] = pokemon;
    } else {
      state.pokemons.push(pokemon);
    }
  },
};

const actions = {
  async loadPokemons() {
    mutations.setBusy(true);
    const res = await axios.get(state.nextUrl);

    if (res.data.next) {
      mutations.setNextUrl(res.data.next);
    }

    res.data.results.forEach((pokemon: PokemonApi) => {
      actions.loadPokemon(pokemon.url);
    });
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

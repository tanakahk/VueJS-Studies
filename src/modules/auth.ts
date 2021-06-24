import axios from 'axios';
import { reactive, readonly } from 'vue';

interface AuthState {
  id: string;
  username: string;
  password: string;
  token: string;
  resAPI: string;
}

interface AuthMutations {
  logout: () => boolean;
}

interface AuthActions {
  login: (username: string, password: string) => boolean;
  queryApi: (link: string) => string;
}

interface UseAuth {
  state: AuthState;
  mutations: AuthMutations;
  actions: AuthActions;
}

const state: AuthState = reactive({
  id: '',
  username: 'Tanaka',
  password: '',
  token: 'a',
  resAPI: '',
});

const mutations = {
  login(id: string, username: string, token: string) {
    state.id = id;
    state.username = username;
    state.token = token;
  },

  queryApi(resAPI: string) {
    state.resAPI = resAPI;
  },

  logout() {
    state.id = '';
    state.username = '';
    state.token = '';

    return true;
  },
};

const actions = {
  login(username: string, password: string) {
    console.log('Login', username, password);

    mutations.login('id', username, 'tokenAdmin');

    return true;
  },

  queryApi(link: string) {
    console.log('link do queryApi', link);

    axios.get(link).then((res) => {
      const resAPI = JSON.stringify(res, null, 2);

      mutations.queryApi(resAPI);

      // console.log('state.queryLink', state.resAPI);
    });
    return state.resAPI;
  },
};

export default function useAuth(): Readonly<UseAuth> {
  return readonly({
    state,
    mutations,
    actions,
  });
}

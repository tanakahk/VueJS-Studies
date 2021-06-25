<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/challenges">Challenges</router-link> |
    <router-link v-if="!isLogedIn" to="/login">Login</router-link>
    <a v-else href="#" @click="logout">Logout</a>

    <div style="margin-top: 30px">Olá {{ username }}</div>

    <div>
      <button @click="fnSync">Sync</button>
      <button @click="fnAsync">Async</button>
      <button @click="fnPromisse">Promisse</button>
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import useAuth from '@/modules/auth';

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const auth = useAuth();

    if (!auth.state.token) {
      router.push({ name: 'Login' });
    }

    watch(
      () => route.path,
      () => {
        if (!auth.state.token) {
          router.push({ name: 'Login' });
        }
      },
    );

    const isLogedIn = computed(() => auth.state.token);
    const username = computed(() => auth.state.username);

    const logout = () => {
      const res = auth.mutations.logout();
      if (res) {
        router.push({ name: 'Login' });
      }
    };

    const fnSync = () => {
      console.log('Início do fnSync');
      axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
        console.log('pronto', res);
      });
      console.log('fim do fnSync');
    };

    const fnPromise = () => new Promise((resolve, reject) => {
        console.log('Início do promise');

        const ok = true;
        if (ok) {
          setTimeout(() => {
            console.log('resolvido');
            resolve(ok);
          }, 5000);
        } else {
          setTimeout(() => {
            console.log('não resolvido');
            reject(ok);
          }, 5000);
        }

        console.log('Fim do promise');
      });

    const fnAsync = async () => {
      console.log('Início do Async');
      /* const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      console.log('pronto', res); */

      /* fnPromise().then((res) => {
        console.log(res);
      }); */

      const res = await fnPromise();
      console.log(res);

      console.log('FIM do Async');
    };

    return {
      isLogedIn,
      logout,
      username,
      fnSync,
      fnAsync,
      fnPromise,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

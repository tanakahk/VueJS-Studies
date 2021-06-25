<template>
  <div>
    <div><b class="title">Challenges</b></div>
    <div class="container">
      <div class="label">Insira o link aqui:</div>
      <input v-model="queryLink" class="input" type="text" />
      <button @click="query">Consultar</button>
    </div>
    <div>
      <div>Resultado:</div>
      <textarea v-model="res"/>
    </div>
  </div>
</template>

<script lang="ts">
import useAuth from '@/modules/authDAula6';
import {
 defineComponent, reactive, toRefs, computed,
} from 'vue';

export default defineComponent({
  setup() {
    const auth = useAuth();
    const state = reactive({
      queryLink: '',
    });

    const query = () => {
      console.log('query', state.queryLink);
      auth.actions.queryApi(state.queryLink);
    };

    const res = computed(() => auth.state.resAPI);

    return {
      ...toRefs(state),
      query,
      res,
    };
  },
});
</script>

<style scoped>
.title {
  font-size: 40px;
}

.container {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  padding: 20px;
}

.label {
  align-items: center;
  padding: 10px;
}
</style>

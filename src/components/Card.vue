<template>
  <div class="card">

    <div>
      {{a}}

      <button ref="el" @click="clickHandler">++</button>
    </div>

    <div class="card-title">
      {{title}}
    </div>
    <div>
      {{body}}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    title: { type: String, default: '' },
    body: { type: String, default: '' },
  },

  setup() {
    const a = ref(0);
    const el = ref();

    const clickHandler = () => {
      // console.log(e);
      // console.log(a.value);
      console.log(el.value);
      a.value++;
      el.value.innerHTML = 'hello';
    };

    return {
      a,
      el,
      clickHandler,
    };
  },
});
</script>

<style scoped>
.card{
  border: 1px solid black;
  padding: 5px;
  width: 200px;
  height: 200px;
  margin: 5px;
}

.card-title{
  border-bottom: 1px solid black
}
</style>

<template>
  <div class="home">
    <img src="../assets/logo.png">
    <tabset msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import { Component, Vue } from 'vue-property-decorator';
// @ts-ignore
import tabset from '@/components/tabset/index.vue'; // @ is an alias to /src

@Component({
  components: {
  tabset,
  },
  })
export default class Home extends Vue {}
</script>

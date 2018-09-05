<template>
  <div class="home">
  	<tabset/>
  	<tab/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import tabset from '@/components/tabset/tabset'; // @ is an alias to /src
/* @ts-ignore */
import tab from '@/components/tab/tab';


@Component({
  components: {
	  tab,
	  tabset,
  },
})
export default class Home extends Vue {}
</script>


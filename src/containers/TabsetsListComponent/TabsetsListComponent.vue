<template>
  <div class="md-layout md-gutter md-alignment-top-center">
    <md-list v-if="fullTabsetsData.length">
      <div v-for="tabset in fullTabsetsData" :key="tabset.id">
        <TabsetComponent v-if="tabset && tabset.show" :tabset="tabset"/>
      </div>
    </md-list>
  </div>
</template>
<script src="./TabsetsListComponent.ts" lang="ts"></script>
<style src="./TabsetsListComponent.stylus" scoped lang="stylus"></style>


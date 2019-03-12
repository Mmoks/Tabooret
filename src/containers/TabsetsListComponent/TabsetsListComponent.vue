<template>
  <div class="md-layout md-gutter md-alignment-top-center">
    <md-list v-if="fullTabsetsData && fullTabsetsData.length">
      <div v-for="tabset in fullTabsetsData" :key="tabset.id">
        <TabsetComponent
          v-if="tabset && tabset.show"
          :tabset="tabset"
          @delete-tab="deleteTab"
          @delete-tabset="deleteTabset"
          @toggle-lock="toggleLock"
          @toggle-star="toggleStar"
          @change-tabset-name="changeTabsetName"
        />
      </div>
    </md-list>
  </div>
</template>
<script src="./TabsetsListComponent.ts" lang="ts"></script>
<style src="./TabsetsListComponent.stylus" scoped lang="stylus"></style>

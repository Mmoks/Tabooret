<template>
  <md-list>
    <md-list-item  style="cursor:pointer;" @click="toggleShowOnlyStarred">
      <md-icon>move_to_inbox</md-icon>
      <span class="md-list-item-text">Show starred</span>
      <md-badge class="md-primary md-square colored" :md-content="'Starred:' +   starredTabsetsCount"></md-badge>
    </md-list-item>
    <md-list-item>
      <md-icon>send</md-icon>
      <span class="md-list-item-text">Lorem</span>
    </md-list-item>
    <md-list-item>
      <md-icon>delete</md-icon>
      <span class="md-list-item-text">Lorem</span>
    </md-list-item>
    <md-list-item>
      <md-icon>error</md-icon>
      <span class="md-list-item-text">Lorem</span>
    </md-list-item>
  </md-list>
</template>
<script src="./TheNavigationBarComponent.ts" lang="ts"></script>
<style src="./TheNavigationBarComponent.stylus" scoped lang="stylus"></style>

<template>
  <md-list-item
    @mouseenter="tabIsHovered = true"
    @mouseleave="tabIsHovered = false"
    class="tab__list__item"
  >
    <i
      class="delete-tabset-icon material-icons"
      :class="{ hide: !tabIsHovered || lockedTabset }"
      @click="deleteTab"
      >close</i
    >
    <img
      class="link-image"
      :src="
        tab.favIconUrl
          ? tab.favIconUrl
          : 'https://cdn3.iconfinder.com/data/icons/faticons/32/globe-01-256.png'
      "
    />
    <a
      class="tab-link md-list-item-text"
      target="blank"
      :href="tab.url"
      @click="deleteTab"
      >{{ tab.title }}</a
    >
  </md-list-item>
</template>
<script src="./TabComponent.ts" lang="ts"></script>
<style src="./TabComponent.stylus" scoped lang="stylus"></style>

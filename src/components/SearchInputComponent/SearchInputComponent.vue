<template>
  <md-field class="search__input_container md-transparent">
    <i
      :class="{ search__input_icon_focused: isFocused }"
      class="search__input_icon material-icons"
    >search</i>
    <md-input
      @blur="isFocused = false"
      @focus="isFocused = true"
      class="search__input"
      placeholder="Search items"
    ></md-input>
  </md-field>
</template>
<script src="./SearchInputComponent.ts" lang="ts"></script>
<style src="./SearchInputComponent.stylus" scoped lang="stylus"></style>


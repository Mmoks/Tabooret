<template>
  <md-field class="search__input_container md-transparent">
    <i
      :class="{ search__input_icon_focused: isFocused }"
      class="search__input_icon material-icons"
    >search</i>
    <md-input
      @blur="isFocused = false"
      @focus="isFocused = true"
      @input="filterTabsets"
      v-model="query"
      class="search__input"
      placeholder="Filter tabsets"
    ></md-input>
  </md-field>
</template>
<script src="./FilterInputComponent.ts" lang="ts"></script>
<style src="./FilterInputComponent.stylus" scoped lang="stylus"></style>

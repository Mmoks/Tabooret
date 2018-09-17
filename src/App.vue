<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Tabooret</span>
        <SearchInputComponent/>
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>
        <TheNavigationBarComponent/>
      </md-app-drawer>
      <md-app-content style="min-height: 980px; overflow-x: hidden">
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
      
.md-drawer
  width 230px
  max-width calc(100vw - 125px) 
</style>

<script lang="ts">
  import TheNavigationBarComponent from '@/components/TheNavigationBarComponent/TheNavigationBarComponent';
  import SearchInputComponent from '@/components/SearchInputComponent/SearchInputComponent';
  
  export default {
  name: 'App',
  data: () => ({
    menuVisible: false
  }),
  components: {
    TheNavigationBarComponent,
    SearchInputComponent
  },
}
</script>
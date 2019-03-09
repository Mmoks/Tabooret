<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed">
        <md-app-toolbar class="header__bar md-primary md-alignment-center-center md-layout md-gutter">
          <md-button class="menu__icon md-icon-button" @click="menuVisible = !menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="app__title md-title">Tabooret</span>
            <SearchInputComponent/>
        </md-app-toolbar>
      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Menu</md-toolbar>
        <TheNavigationBarComponent/>
      </md-app-drawer>
      <md-app-content style="min-height: 980px; overflow-x: hidden !important">
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

.md-app-container
  overflow-x hidden

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
 
.app__title
  position absolute
  left 60px

.menu__icon
  position absolute
  left 30px

.header__bar
  padding 0px
  width auto
  
.md-drawer
  width 230px
  max-width calc(100vw - 125px) 
</style>

<script lang="ts">
  import TheNavigationBarComponent from '@/containers/TheNavigationBarComponent/TheNavigationBarComponent';
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
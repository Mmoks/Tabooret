<template>
  <md-list-item>
    <md-content
      md-with-hover
      class="tabset__content md-elevation-2"
      :class="{ 'md-elevation-6': isHovered }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <md-list class="tabs__list">
        <div style="height: 60px; padding-top:5px">
          <span
            class="md-title tabset__name md-list-item-text"
            :class="{ hide__tabset__title: nameIsEditing }"
            @click.prevent="startEditingTabsetName"
          >{{ tabset.tabsetName || tabset.tabs.length + ' tabs' }}</span>

          <md-field
            md-inline
            :md-counter="false"
            class="tabsetname__input"
            :class="{ hide__input: !nameIsEditing }"
          >
            <md-input
              ref="tabsetNameInput"
              maxlength="50"
              v-model="tabsetName"
              @blur.native="saveTabsetName"
              @keyup.esc="cancelEditing"
              @keyup.enter="saveTabsetName"
              v-autowidth="{
                maxWidth: '960px',
                minWidth: '20px',
                comfortZone: 0,
              }"
            ></md-input>
          </md-field>

          <span
            class="md-caption created__at md-list-item-text"
          >Created at {{ tabset.createdAt.toLocaleString() }}</span>
          <i
            class="material-icons un__starred"
            :class="{ starred: tabset.starred }"
            @click="toggleStar"
          >{{ tabset.starred ? 'star_rate' : 'star_border' }}</i>
          <i class="md-raised lock__open material-icons" @click="toggleLock">
            {{
            tabset.locked ? 'lock' : 'lock_open'
            }}
          </i>
        </div>
        <md-divider></md-divider>
        <TabComponent
          v-for="tab in tabset.tabs"
          :key="tab.id"
          :lockedTabset="tabset.locked"
          :tab="tab"
          :tabsetId="tabset.id"
          @delete-tab="deleteTab"
        />
        <div class="control__button">
          <md-button class="md-primary" @click="restoreTabset">Restore tabset</md-button>
          <md-button class="md-accent" v-bind:disabled="tabset.locked" @click="deleteTabset">Delete tabset</md-button>
        </div>
      </md-list>
    </md-content>
  </md-list-item>
</template>
<script src="./TabsetComponent.ts" lang="ts"></script>
<style src="./TabsetComponent.stylus" scoped lang="stylus"></style>

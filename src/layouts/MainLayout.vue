<template>
  <q-layout class="flex flex-row bg-grey-1" style="align-content: flex-start">

    <aside class="flex flex-col fixed fixed-left z-top bg-white"
           style="border: 1px solid green; width:50px; align-content: flex-start">
      <q-img class="q-ma-xs q-mt-md" width="36px" height="36px" fit="fill" src="network.svg"></q-img>
      <div class="relative-position text-center q-my-md w-full"
           @mouseleave="showHoverIndicator = false" style="border: 1px solid red">
        <div v-show="showHoverIndicator" ref="hoverIndicator"
             class="absolute absolute-top transition-transform duration-200 bg-grey-3"
             style="width: 36px; height: 36px; border-radius: 5px; transform: translate(-50%, 0)"></div>
        <router-link
          v-for="tab in tabs"
          v-slot="{href, navigate, isActive}"
          :key="tab.name"
          :to="tab.path"
        >
          <div :class="{'is-active': isActive}" @click="navigate" @mouseenter="hoverHandler" :href="href"
               class="flex w-full relative-position items-center justify-center" style="width: 50px">
            <!--            <div class="p-2 rounded-lg transition-colors inline-block">111</div>-->
            <q-icon size="lg" name="add"></q-icon>
          </div>
        </router-link>
      </div>
    </aside>

    <q-page style="border: 1px solid red">
      <router-view/>
    </q-page>
  </q-layout>
</template>

<script setup>
import {ref} from 'vue';

const tabs = [
  {
    name: 'Dashboard',
    icon: 'riHome5Line',
    path: '/',
  },
  {
    name: 'Workflows',
    icon: 'riFlowChart',
    path: '/workflows',
  },
  {
    name: 'Collections',
    icon: 'riFolderLine',
    path: '/collections',
  },
  {
    name: 'Logs',
    icon: 'riHistoryLine',
    path: '/logs',
  },
];
const hoverIndicator = ref(null);
const showHoverIndicator = ref(false);

function hoverHandler({target}) {
  showHoverIndicator.value = true;
  hoverIndicator.value.style.transform = `translate(-50%, ${target.offsetTop}px)`;
}
</script>

<style lang="sass">
.GL
  &__select-GL__menu-link
    .default-type
    visibility: hidden

    &:hover
      background: #0366d6
      color: white

      .q-item__section--side
        color: white

      .default-type
        visibility: visible

  &__toolbar-link
    a
      color: white
      text-decoration: none

      &:hover
        opacity: 0.7

  &__menu-link:hover
    background: #0366d6
    color: white

  &__menu-link-signed-in,
  &__menu-link-status
    &:hover
      & > div
        background: white !important

  &__menu-link-status
    color: $blue-grey-6

    &:hover
      color: $light-blue-9

  &__toolbar-select.q-field--focused
    width: 450px !important

    .q-field__append
      display: none
</style>

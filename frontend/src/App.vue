<template>
  <header>
    <NavBarComponent v-if="nav.statusToggle" />
  </header>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBarComponent from './components/NavBarComponent.vue'
import { useNavStatusStore } from './stores/nav'

const nav = useNavStatusStore()
</script>

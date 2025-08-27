<script setup>
import DefaultTheme from 'vitepress/theme'
import Banner from '../components/Banner.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <Banner />
    </template>
  </Layout>
</template>

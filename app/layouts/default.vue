<script setup lang="ts">
  import { defaultDocument } from '@vueuse/core';
  const title = computed(() => defaultDocument?.title || 'Dashboard');
</script>

<template>
  <TemplateDashboard :title="title">
    <div>
      <slot />
    </div>
  </TemplateDashboard>
</template>

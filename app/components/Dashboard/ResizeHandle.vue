<script lang="ts" setup>
  import { tv } from 'tailwind-variants';

  const resizeHandle = tv({
    base: 'hidden lg:block touch-none select-none cursor-ew-resize relative before:absolute before:inset-y-0 before:-left-1.5 before:-right-1.5',
  });
</script>

<template>
  <div role="separator" :class="resizeHandle({ class: [resizeHandle.base] })" />
</template>

<style scoped></style>

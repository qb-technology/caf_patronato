<script lang="ts" setup>
  import { Primitive, type PrimitiveProps } from 'reka-ui';
  import { tv } from 'tailwind-variants';
  const main = tv({
    base: 'min-h-[calc(100vh-var(--ui-header-height))]',
  });

  export interface PageMainProps extends PrimitiveProps {
    class?: string;
  }
  const props = withDefaults(defineProps<PageMainProps>(), {
    as: 'main',
    class: '',
  });
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="main({ class: [props.class] })"
  >
    <slot />
  </Primitive>
</template>

<style scoped></style>

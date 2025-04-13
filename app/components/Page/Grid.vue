<script setup lang="ts">
  import { tv } from 'tailwind-variants';
  import { Primitive, type PrimitiveProps } from 'reka-ui';
  type UI = {
    base?: string;
  };
  export type PageGrid = PrimitiveProps & {
    class?: string;
    ui?: UI;
  };
  const props = withDefaults(defineProps<PageGrid>(), {
    as: 'div',
    class: '',
    ui: () => ({}),
  });

  const pageGrid = tv({
    slots: {
      base: 'relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8',
    },
  });

  const _ui = computed(() => pageGrid());
</script>

<template>
  <primitive
    :as="as"
    :as-child="asChild"
    :class="[_ui.base({ class: [props.class, ui.base] })]"
  >
    <slot />
  </primitive>
</template>

<script lang="ts" setup>
  import { tv } from 'tailwind-variants';

  const toolbar = tv({
    slots: {
      root: 'shrink-0 flex items-center justify-between border-b border-(--ui-border) px-4 sm:px-6 gap-1.5 overflow-x-auto min-h-[49px]',
      left: 'flex items-center gap-1.5',
      right: 'flex items-center gap-1.5',
    },
  });
  type UI = Partial<(typeof toolbar)['slots']>;

  export type DashboardToolbarProp = {
    class?: string;
    ui?: UI;
  };

  const props = withDefaults(defineProps<DashboardToolbarProp>(), {
    class: '',
    ui: () => ({}),
  });

  const _ui = computed(() => toolbar());
</script>

<template>
  <div :class="_ui.root({ class: [props.class, ui.root] })">
    <div v-if="$slots.left" :class="_ui.left({ class: ui.left })">
      <slot name="left" />
    </div>
    <slot />
    <div v-if="$slots.right" :class="_ui.right({ class: ui.right })">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped></style>

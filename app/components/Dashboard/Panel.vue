<script lang="ts" setup>
  import { tv } from 'tailwind-variants';

  const panel = tv({
    slots: {
      root: 'relative flex flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-(--ui-border) shrink-0',
      body: 'flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6',
      handle: '',
    },
    // variants: {
    //   size: {
    //     true: {
    //       root: 'w-full lg:w-(--width)',
    //     },
    //     false: {
    //       root: 'flex-1',
    //     },
    //   },
    // },
  });

  type UI = Partial<(typeof panel)['slots']>;

  export type DashboardSidebarProp = {
    class?: string;
    ui?: UI;
  };

  const props = withDefaults(defineProps<DashboardSidebarProp>(), {
    class: '',
    ui: () => ({}),
  });

  const _ui = computed(() => panel());
</script>

<template>
  <div :class="_ui.root({ class: [props.class, ui.root] })">
    <slot>
      <slot name="header" />

      <div :class="_ui.body({ class: ui.body })">
        <slot name="body" />
      </div>

      <slot name="footer" />
    </slot>
  </div>
</template>

<style scoped></style>

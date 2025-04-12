<script lang="ts" setup>
  import { tv } from 'tailwind-variants';

  const sidebar = tv({
    slots: {
      root: 'relative hidden lg:flex flex-col min-h-svh min-w-16 w-(--width) shrink-0',
      header: 'h-(--ui-header-height) shrink-0 flex items-center gap-1.5 px-4',
      body: 'flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-2',
      footer: 'shrink-0 flex items-center gap-1.5 px-4 py-2',
      toggle: '',
      handle: '',
      content: 'lg:hidden',
      overlay: 'lg:hidden',
    },
    variants: {
      menu: {
        true: {
          header: 'sm:px-6',
          body: 'sm:px-6',
          footer: 'sm:px-6',
        },
      },
      side: {
        left: {
          root: 'border-r border-(--ui-border)',
        },
        right: {
          root: '',
        },
      },
      toggleSide: {
        left: {
          toggle: '',
        },
        right: {
          toggle: 'ms-auto',
        },
      },
    },
  });

  type UI = Partial<(typeof sidebar)['slots']>;

  export type DashboardSidebarProp = {
    class?: string;
    ui?: UI;
  };

  const props = withDefaults(defineProps<DashboardSidebarProp>(), {
    class: '',
    ui: () => ({}),
  });

  const bodyRef = useTemplateRef('body');

  const _ui = computed(() =>
    sidebar({
      menu: Boolean(bodyRef.value?.childNodes.length),
      side: 'left',
    }),
  );
</script>

<template>
  <div :class="_ui.root({ class: [props.class, ui.root] })">
    <div v-if="$slots.header" :class="_ui.header({ class: ui.header })">
      <slot name="header" />
    </div>

    <div ref="body" :class="_ui.body({ class: ui.body })">
      <slot />
    </div>

    <div :class="_ui.footer({ class: ui.footer })">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped></style>

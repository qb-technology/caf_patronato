<script lang="ts" setup>
  import type { ButtonProps } from '@nuxt/ui';
  import { tv } from 'tailwind-variants';

  const navbar = tv({
    slots: {
      root: 'h-(--ui-header-height) shrink-0 flex items-center justify-between border-b border-(--ui-border) px-4 sm:px-6 gap-1.5',
      left: 'flex items-center gap-1.5 min-w-0',
      icon: 'shrink-0 size-5 self-center me-1.5',
      title:
        'flex items-center gap-1.5 font-semibold text-(--ui-text-highlighted) truncate',
      center: 'hidden lg:flex',
      right: 'flex items-center shrink-0 gap-1.5',
      toggle: 'lg:hidden',
    },
    variants: {
      toggleSide: {
        left: {
          toggle: '',
        },
        right: {
          toggle: '',
        },
      },
    },
  });

  type UI = Partial<(typeof navbar)['slots']>;

  export type DashboardNavbarProp = {
    ui?: UI;
    class?: string;
    icon?: string;
    title?: string;
    toggle?: boolean | Partial<ButtonProps>;
    toggleSide?: 'left' | 'right';
  };
  const props = withDefaults(defineProps<DashboardNavbarProp>(), {
    ui: () => ({}),
    class: '',
    icon: '',
    title: '',
    toggle: true,
    toggleSide: 'left',
  });

  const emits = defineEmits(['openSidebar']);

  const _ui = computed(() => navbar({}));

  const _toggle = computed(() => {
    const _def = {
      icon: 'i-lucide-menu',
      color: 'neutral',
      variant: 'ghost',
    } as ButtonProps;
    return typeof props.toggle === 'boolean'
      ? _def
      : { ..._def, ...props.toggle };
  });
</script>

<template>
  <div :class="_ui.root({ class: [props.class, ui.root] })">
    <div :class="_ui.left({ class: ui.left })">
      <div
        v-if="toggle && toggleSide === 'left'"
        :class="_ui.toggle({ class: ui.toggle })"
      >
        <UButton v-bind="_toggle" @click="() => emits('openSidebar')" />
      </div>
      <slot v-if="icon || $slots.leading" name="leading">
        <UIcon :name="icon" :class="_ui.icon({ class: ui.icon })" />
      </slot>
      <slot v-if="title || $slots.title" name="title">
        <h1 :class="_ui.title({ class: ui.title })">{{ title }}</h1>
      </slot>
    </div>
    <div :class="_ui.center({ class: ui.center })">
      <slot />
    </div>
    <div v-if="$slots.right" :class="_ui.right({ class: ui.right })">
      <slot name="right" />
      <div
        v-if="toggle && toggleSide === 'right'"
        :class="_ui.toggle({ class: ui.toggle })"
      >
        <UButton v-bind="_toggle" @click="() => emits('openSidebar')" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
  import { USlideover } from '#components';
  import { tv } from 'tailwind-variants';
  import type { ButtonProps } from '@nuxt/ui';
  import { Primitive, type PrimitiveProps } from 'reka-ui';

  const pageHeader = tv({
    slots: {
      root: 'bg-(--ui-bg)/75 backdrop-blur border-b border-(--ui-border) h-(--ui-header-height) sticky top-0 z-50',
      container: 'flex items-center justify-between gap-3 h-full',
      left: 'lg:flex-1 flex items-center gap-1.5',
      center: 'hidden lg:flex',
      right: 'flex items-center justify-end lg:flex-1 gap-1.5',
      title:
        'shrink-0 font-bold text-xl text-(--ui-text-highlighted) flex items-end gap-1.5',
      toggle: 'lg:hidden',
      content: 'lg:hidden',
      overlay: 'lg:hidden',
      header:
        'px-4 sm:px-6 h-(--ui-header-height) shrink-0 flex items-center justify-between gap-3',
      body: 'p-4 sm:p-6 overflow-y-auto',
    },
    variants: {
      toggleSide: {
        left: {
          toggle: '-ms-1.5',
        },
        right: {
          toggle: '-me-1.5',
        },
      },
    },
  });
  type UI = Partial<(typeof pageHeader)['slots']>;

  export interface TemplateHeaderProp extends PrimitiveProps {
    class?: string;
    title?: string;
    mode?: 'modal' | 'slideover' | 'drawer';
    to?: string;
    toggle?: boolean | ButtonProps;
    toggleSide?: 'right' | 'left';
    open?: boolean;
    ui?: UI;
  }

  const props = withDefaults(defineProps<TemplateHeaderProp>(), {
    as: 'header',
    class: '',
    mode: 'slideover',
    to: '/',
    title: 'QB Tech',
    toggle: true,
    toggleSide: 'right',
    ui: () => ({}),
  });

  const _ui = computed(() =>
    pageHeader({
      toggleSide: props.toggleSide,
    }),
  );

  const _toggle = computed(() => {
    const _def = {
      variant: 'ghost',
      color: 'neutral',
      icon: 'i-lucide:menu',
    } as ButtonProps;
    return typeof props.toggle === 'boolean'
      ? _def
      : { ..._def, ...props.toggle };
  });

  const _open = ref(props.open);
  function openCloseMenu() {
    if (!props.toggle) return;
    _open.value = !_open.value;
  }

  function close() {
    if (_open.value) {
      _open.value = false;
    }
    return;
  }

  // const leftSlot = templateRef('left');
  // const rightSlot = templateRef('right');
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="asChild"
    :class="_ui.root({ class: [props.class, ui.root] })"
  >
    <UContainer :class="_ui.container({ class: [ui.container] })">
      <!-- <Teleport to="#left">kk</Teleport> -->
      <div ref="left" :class="_ui.left({ class: [ui.left] })">
        <slot name="left">
          <ULink :to="to" :class="_ui.title({ class: [ui.title] })">
            <slot name="title">{{ title }}</slot>
          </ULink>
        </slot>
      </div>
      <div :class="_ui.center({ class: [ui.center] })">
        <slot />
      </div>
      <div ref="right" :class="_ui.right({ class: [ui.right] })">
        <slot name="right" />
        <slot name="toggle">
          <UButton
            v-bind="_toggle"
            :class="_ui.toggle({ class: [ui.toggle] })"
            @click="openCloseMenu"
          />
        </slot>
      </div>
    </UContainer>
    <USlideover
      v-if="mode === 'slideover'"
      v-model:open="_open"
      :side="toggleSide"
      title="Menu"
      :ui="{
        header: _ui.header({ class: [ui.header] }),
        body: _ui.body({ class: ui.body }),
        content: _ui.content({ class: ui.content }),
      }"
    >
      <template #header>
        <div id="left"></div>
        <div class="flex items-center justify-end w-full">
          <UButton variant="ghost" icon="i-lucide-x" @click="close" />
        </div>
      </template>
      <template #body>
        <slot name="body" @click="close" />
      </template>
    </USlideover>
  </Primitive>
</template>

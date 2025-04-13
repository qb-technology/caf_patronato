<script lang="ts" setup>
  import type {
    RouteLocationAsRelativeGeneric,
    RouteLocationAsPathGeneric,
  } from '#vue-router';
  import { tv } from 'tailwind-variants';

  type UI = {
    root?: string;
    leading?: string;
    leadingIcon?: string;
    wrapper?: string;
    title?: string;
    description?: string;
  };

  export type PageFeatureProp = {
    as?: string;
    class?: string;
    title?: string;
    description?: string;
    orientation?: 'horizontal' | 'vertical';
    reverse?: boolean;
    to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
    icon?: string;
    ui?: UI;
  };

  const props = withDefaults(defineProps<PageFeatureProp>(), {
    as: 'div',
    class: '',
    title: '',
    description: '',
    orientation: 'vertical',
    to: '',
    icon: '',
    ui: () => ({}),
  });

  const page_feature = tv({
    slots: {
      root: 'relative',
      wrapper: '',
      leading: 'inline-flex items-center justify-center',
      leadingIcon: 'size-5 shrink-0 text-(--ui-primary)',
      title: 'text-base text-pretty font-semibold text-(--ui-text-highlighted)',
      description: 'text-[15px] text-pretty text-(--ui-text-muted)',
    },
    variants: {
      orientation: {
        horizontal: {
          root: 'flex items-start gap-2.5',
          leading: 'p-0.5',
        },
        vertical: {
          leading: 'mb-2.5',
        },
      },
      title: {
        true: {
          description: 'mt-1',
        },
      },
    },
  });

  const _ui = computed(() =>
    page_feature({
      orientation: props.orientation,
      title: Boolean(props.title),
    }),
  );
</script>

<template>
  <div :class="[_ui.root({ class: [props.class, ui.root] })]">
    <div
      v-if="icon || $slots.leading"
      :class="[_ui.leading({ class: [ui.leading] })]"
    >
      <slot name="leading">
        <UIcon
          :name="icon"
          :class="[_ui.leadingIcon({ class: [ui.leadingIcon] })]"
        />
      </slot>
    </div>

    <div
      v-if="description || $slots.description || title || $slots.title"
      :class="[_ui.wrapper({ class: [ui.wrapper] })]"
    >
      <div
        v-if="title || $slots.title"
        :class="[_ui.title({ class: [ui.title] })]"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div
        v-if="description || $slots.description"
        :class="[_ui.description({ class: [ui.description] })]"
      >
        <slot name="description">{{ description }}</slot>
      </div>
      <ULink v-if="to" :to="to" class="focus:outline-none">
        <span class="absolute inset-0" aria-hidden="true" />
      </ULink>
    </div>
  </div>
</template>

<style scoped></style>

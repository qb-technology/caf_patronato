<script setup lang="ts">
  import type { ButtonProps } from '@nuxt/ui';
  import { tv } from 'tailwind-variants';

  type UI = {
    root?: string;
    container?: string;
    wrapper?: string;
    title?: string;
    headline?: string;
    description?: string;
    links?: string;
  };

  export type PageHeroProps = {
    title?: string;
    description?: string;
    headline?: string;
    class?: string;
    orientation?: 'horizontal' | 'vertical';
    reverse?: boolean;
    links?: ButtonProps[];
    ui?: UI;
  };

  const props = withDefaults(defineProps<PageHeroProps>(), {
    title: '',
    headline: '',
    description: '',
    class: '',
    orientation: 'vertical',
    links: () => [],
    ui: () => ({}),
  });

  const hero = tv({
    slots: {
      root: 'relative isolate',
      container:
        'flex flex-col lg:grid py-24 sm:py-32 lg:py-40 gap-16 sm:gap-y-24',
      wrapper: '',
      headline: 'mb-4',
      title:
        'text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-(--ui-text-highlighted)',
      description: 'text-lg sm:text-xl/8 text-(--ui-text-muted)',
      links: 'mt-10 flex flex-wrap gap-x-6 gap-y-3',
    },
    variants: {
      orientation: {
        horizontal: {
          container: 'lg:grid-cols-2 lg:items-center',
          description: 'text-pretty',
        },
        vertical: {
          container: '',
          headline: 'justify-center',
          wrapper: 'text-center',
          description: 'text-balance',
          links: 'justify-center',
        },
      },
      reverse: {
        true: {
          wrapper: 'order-last',
        },
      },
      headline: {
        true: {
          headline:
            'font-semibold text-(--ui-primary) flex items-center gap-1.5',
        },
      },
      title: {
        true: {
          description: 'mt-6',
        },
      },
    },
  });

  const _ui = computed(() =>
    hero({
      orientation: props.orientation,
      reverse: props.reverse,
      headline: Boolean(props.headline),
      title: Boolean(props.title),
    }),
  );
</script>

<template>
  <div :class="[_ui.root({ class: [props.class, props.ui.root] })]">
    <div :class="[_ui.container({ class: [props.ui.container] })]">
      <div :class="[_ui.wrapper({ class: [props.ui.wrapper] })]">
        <div :class="_ui.headline({ class: [props.ui.headline] })">
          <slot name="headline">{{ headline }}</slot>
        </div>
        <h1 :class="[_ui.title({ class: [props.ui.title] })]">
          <slot name="title">{{ title }}</slot>
        </h1>
        <div :class="[_ui.description({ class: [props.ui.description] })]">
          <slot name="description">{{ description }}</slot>
        </div>
        <div :class="[_ui.links({ class: [props.ui.links] })]">
          <slot name="links">
            <UButton
              v-for="(button, ind) of props.links"
              :key="ind"
              v-bind="button"
              :size="button.size || 'md'"
            />
          </slot>
        </div>
      </div>

      <slot />
    </div>
  </div>
</template>

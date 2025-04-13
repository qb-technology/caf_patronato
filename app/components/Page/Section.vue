<script setup lang="ts">
  import type { ButtonProps } from '@nuxt/ui';
  import { tv } from 'tailwind-variants';
  import type { PageFeatureProp } from './Feature.vue';

  type UI = {
    root?: string;
    container?: string;
    wrapper?: string;
    title?: string;
    description?: string;
    links?: string;
    headline?: string;
    leading?: string;
    leadingIcon?: string;
    features?: string;
  };

  export type PageSectionProps = {
    as?: string;
    class?: string;
    title?: string;
    icon?: string;
    description?: string;
    headline?: string;
    orientation?: 'horizontal' | 'vertical';
    reverse?: boolean;
    links?: ButtonProps[];
    features?: PageFeatureProp[];
    ui?: UI;
  };

  const props = withDefaults(defineProps<PageSectionProps>(), {
    title: '',
    headline: '',
    description: '',
    as: 'div',
    class: 'div',
    icon: '',
    orientation: 'vertical',
    features: () => [],
    links: () => [],
    ui: () => ({}),
  });

  const pageSection = tv({
    slots: {
      root: 'relative isolate',
      container:
        'flex flex-col lg:grid py-16 sm:py-24 lg:py-32 gap-8 sm:gap-16 container',
      wrapper: '',
      headline: 'mb-3',
      leading: 'flex items-center mb-6',
      leadingIcon: 'size-10 shrink-0 text-(--ui-primary)',
      title:
        'text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-(--ui-text-highlighted)',
      description: 'text-base sm:text-lg text-(--ui-text-muted)',
      links: 'mt-8 flex flex-wrap gap-x-6 gap-y-3',
      features: 'mt-8 grid',
    },
    variants: {
      orientation: {
        horizontal: {
          container: 'lg:grid-cols-2 lg:items-center',
          description: 'text-pretty',
          features: 'gap-4',
        },
        vertical: {
          container: '',
          headline: 'justify-center',
          leading: 'justify-center',
          title: 'text-center',
          description: 'text-center text-balance',
          links: 'justify-center',
          features: 'sm:grid-cols-2 lg:grid-cols-3 gap-8',
        },
      },
      reverse: {
        true: {
          wrapper: 'lg:order-last',
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
      description: {
        true: '',
      },
      features: {
        true: '',
      },
    },
    compoundVariants: [
      {
        orientation: 'vertical',
        title: true,
        class: {
          features: 'mt-16',
        },
      },
      {
        orientation: 'vertical',
        description: true,
        class: {
          features: 'mt-16',
        },
      },
      {
        orientation: 'vertical',
        features: true,
        class: {
          links: 'mt-16',
        },
      },
    ],
  });
  const _ui = computed(() =>
    pageSection({
      orientation: props.orientation,
      title: Boolean(props.title),
      reverse: props.reverse,
      headline: Boolean(props.headline),
      description: Boolean(props.description),
      features: Boolean(props.features),
    }),
  );
</script>

<template>
  <div :class="[_ui.root({ class: [props.class, ui.root] })]">
    <div :class="[_ui.container({ class: [ui.container] })]">
      <div :class="[_ui.wrapper({ class: [ui.wrapper] })]">
        <div
          v-if="$slots.leading || icon"
          :class="_ui.leading({ class: [ui.leading] })"
        >
          <slot name="leading">
            <UIcon
              :name="icon"
              :class="_ui.leadingIcon({ class: [ui.leadingIcon] })"
            />
          </slot>
        </div>
        <div
          v-if="$slots.headline || headline"
          :class="_ui.headline({ class: [ui.headline] })"
        >
          <slot name="headline">{{ headline }}</slot>
        </div>
        <h1
          v-if="$slots.title || title"
          :class="[_ui.title({ class: [ui.title] })]"
        >
          <slot name="title">{{ title }}</slot>
        </h1>
        <div
          v-if="$slots.description || description"
          :class="[_ui.description({ class: [ui.description] })]"
        >
          <slot name="description">{{ description }}</slot>
        </div>
        <div
          v-if="$slots.features || features.length"
          :class="[_ui.features({ class: [ui.features] })]"
        >
          <slot name="features">
            <PageFeature
              v-for="(feature, ind) of props.features"
              :key="ind"
              v-bind="feature"
            />
          </slot>
        </div>
        <div
          v-if="$slots.links || links.length"
          :class="[_ui.links({ class: [ui.links] })]"
        >
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

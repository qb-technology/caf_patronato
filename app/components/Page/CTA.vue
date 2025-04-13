<script setup lang="ts">
  import type { ButtonProps } from '@nuxt/ui';
  import { tv } from 'tailwind-variants';
  import { Primitive, type PrimitiveProps } from 'reka-ui';

  type UI = {
    root?: string;
    container?: string;
    wrapper?: string;
    title?: string;
    description?: string;
    links?: string;
  };

  export type PageCTAProps = PrimitiveProps & {
    as?: string;
    class?: string;
    title?: string;
    description?: string;
    variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'naked';
    orientation?: 'horizontal' | 'vertical';
    reverse?: boolean;
    links?: ButtonProps[];
    ui?: UI;
  };

  const props = withDefaults(defineProps<PageCTAProps>(), {
    class: '',
    title: '',
    description: '',
    as: 'div',
    variant: 'outline',
    orientation: 'vertical',
    links: () => [],
    ui: () => ({}),
  });

  const pageCTA = tv({
    slots: {
      root: 'relative isolate rounded-[calc(var(--ui-radius)*3)] overflow-hidden',
      container:
        'flex flex-col lg:grid px-6 py-12 sm:px-12 sm:py-24 lg:px-16 lg:py-24 gap-8 sm:gap-16',
      wrapper: '',
      title:
        'text-3xl sm:text-4xl text-pretty tracking-tight font-bold text-(--ui-text-highlighted)',
      description: 'text-base sm:text-lg text-(--ui-text-muted)',
      links: 'mt-8 flex flex-wrap gap-x-6 gap-y-3',
    },
    variants: {
      orientation: {
        horizontal: {
          container: 'lg:grid-cols-2 lg:items-center',
          description: 'text-pretty',
        },
        vertical: {
          container: '',
          title: 'text-center',
          description: 'text-center text-balance',
          links: 'justify-center',
        },
      },
      reverse: {
        true: {
          wrapper: 'lg:order-last',
        },
      },
      variant: {
        solid: {
          root: 'bg-(--ui-bg-inverted) text-(--ui-bg)',
          title: 'text-(--ui-bg)',
          description: 'text-(--ui-text-dimmed)',
        },
        outline: {
          root: 'bg-(--ui-bg) ring ring-(--ui-border)',
          description: 'text-(--ui-text-muted)',
        },
        soft: {
          root: 'bg-(--ui-bg-elevated)/50',
          description: 'text-(--ui-text-toned)',
        },
        subtle: {
          root: 'bg-(--ui-bg-elevated)/50 ring ring-(--ui-border)',
          description: 'text-(--ui-text-toned)',
        },
        naked: {
          description: 'text-(--ui-text-muted)',
        },
      },
      title: {
        true: {
          description: 'mt-6',
        },
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  });

  const _ui = computed(() =>
    pageCTA({
      orientation: props.orientation,
      reverse: props.reverse,
      variant: props.variant,
      title: Boolean(props.title),
    }),
  );
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="[_ui.root({ class: [props.class, ui.root] })]"
  >
    <div :class="[_ui.container({ class: [ui.container] })]">
      <div :class="[_ui.wrapper({ class: [ui.wrapper] })]">
        <h2 :class="[_ui.title({ class: [ui.title] })]">
          <slot name="title">{{ title }}</slot>
        </h2>
        <div :class="[_ui.description({ class: [ui.description] })]">
          <slot name="description">{{ description }}</slot>
        </div>
        <div :class="[_ui.links({ class: [ui.links] })]">
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
  </Primitive>
</template>

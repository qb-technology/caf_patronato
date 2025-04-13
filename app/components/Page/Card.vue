<script setup lang="ts">
  import type { LinkProps } from '@nuxt/ui';
  import { tv } from 'tailwind-variants';
  import type {
    RouteLocationAsRelativeGeneric,
    RouteLocationAsPathGeneric,
  } from '#vue-router';
  import { Primitive, type PrimitiveProps } from 'reka-ui';

  type UI = {
    root?: string;
    container?: string;
    wrapper?: string;
    header?: string;
    body?: string;
    footer?: string;
    leading?: string;
    leadingIcon?: string;
    title?: string;
    description?: string;
    spotlight?: string;
  };

  export type PageCardProps = PrimitiveProps & {
    title?: string;
    description?: string;
    icon?: string;
    class?: string;
    to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
    spotlight?: boolean;
    spotlightColor?:
      | 'error'
      | 'primary'
      | 'secondary'
      | 'success'
      | 'info'
      | 'warning'
      | 'neutral';
    variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'naked';
    orientation?: 'horizontal' | 'vertical';
    reverse?: boolean;
    highlight?: boolean;
    highlightColor?:
      | 'error'
      | 'primary'
      | 'secondary'
      | 'success'
      | 'info'
      | 'warning'
      | 'neutral';
    link?: LinkProps;
    ui?: UI;
  };

  const props = withDefaults(defineProps<PageCardProps>(), {
    as: 'div',
    class: '',
    title: '',
    description: '',
    highlightColor: 'primary',
    spotlightColor: 'primary',
    to: undefined,
    icon: undefined,
    variant: 'outline',
    orientation: 'vertical',
    link: () => ({}),
    ui: () => ({}),
  });

  const pageCard = tv(
    {
      slots: {
        root: 'relative rounded-[calc(var(--ui-radius)*2)]',
        spotlight:
          'absolute inset-0 rounded-[inherit] pointer-events-none bg-(--ui-bg)/90',
        container:
          'relative flex flex-col flex-1 lg:grid gap-x-8 gap-y-4 p-4 sm:p-6',
        wrapper: '',
        header: 'mb-4',
        body: '',
        footer: 'mt-4',
        leading: 'inline-flex items-center justify-center mb-2.5',
        leadingIcon: 'size-5 shrink-0 text-(--ui-primary)',
        title:
          'text-base text-pretty font-semibold text-(--ui-text-highlighted)',
        description: 'text-[15px] text-pretty',
      },
      variants: {
        orientation: {
          horizontal: {
            container: 'lg:grid-cols-2 lg:items-center',
          },
          vertical: {
            container: '',
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
          ghost: {
            description: 'text-(--ui-text-muted)',
          },
          naked: {
            container: 'p-0 sm:p-0',
            description: 'text-(--ui-text-muted)',
          },
        },
        to: {
          true: {
            root: ['transition'],
          },
        },
        title: {
          true: {
            description: 'mt-1',
          },
        },
        highlight: {
          true: {
            root: 'ring-2',
          },
        },
        highlightColor: {
          primary: '',
          secondary: '',
          success: '',
          info: '',
          warning: '',
          error: '',
          neutral: '',
        },
        spotlight: {
          true: {
            root: '[--spotlight-size:400px] before:absolute before:-inset-px before:pointer-events-none before:rounded-[inherit] before:bg-[radial-gradient(var(--spotlight-size)_var(--spotlight-size)_at_calc(var(--spotlight-x,0px))_calc(var(--spotlight-y,0px)),var(--spotlight-color),transparent_70%)]',
          },
        },
        spotlightColor: {
          primary: '',
          secondary: '',
          success: '',
          info: '',
          warning: '',
          error: '',
          neutral: '',
        },
      },
      compoundVariants: [
        {
          variant: 'solid',
          to: true,
          class: {
            root: 'hover:bg-(--ui-bg-inverted)/90',
          },
        },
        {
          variant: 'outline',
          to: true,
          class: {
            root: 'hover:bg-(--ui-bg-elevated)/50',
          },
        },
        {
          variant: 'soft',
          to: true,
          class: {
            root: 'hover:bg-(--ui-bg-elevated)',
          },
        },
        {
          variant: 'subtle',
          to: true,
          class: {
            root: 'hover:bg-(--ui-bg-elevated)',
          },
        },
        {
          variant: 'subtle',
          to: true,
          highlight: false,
          class: {
            root: 'hover:ring-(--ui-border-accented)',
          },
        },
        {
          variant: 'ghost',
          to: true,
          class: {
            root: 'hover:bg-(--ui-bg-elevated)/50',
          },
        },
        {
          highlightColor: 'primary',
          highlight: true,
          class: {
            root: 'ring-(--ui-primary)',
          },
        },
        {
          highlightColor: 'neutral',
          highlight: true,
          class: {
            root: 'ring-(--ui-border-inverted)',
          },
        },
        {
          spotlightColor: 'primary',
          spotlight: true,
          class: {
            root: '[--spotlight-color:var(--ui-primary)]',
          },
        },
        {
          spotlightColor: 'secondary',
          spotlight: true,
          class: {
            root: '[--spotlight-color:var(--ui-secondary)]',
          },
        },
        {
          spotlightColor: 'success',
          spotlight: true,
          class: {
            root: '[--spotlight-color:var(--ui-success)]',
          },
        },
        {
          spotlightColor: 'info',
          spotlight: true,
          class: {
            root: '[--spotlight-color:var(--ui-info)]',
          },
        },
        {
          spotlightColor: 'warning',
          spotlight: true,
          class: {
            root: '[--spotlight-color:var(--ui-warning)]',
          },
        },
        {
          spotlightColor: 'error',
          spotlight: true,
          class: {
            root: '[--spotlight-color:var(--ui-error)]',
          },
        },
        {
          spotlightColor: 'neutral',
          spotlight: true,
          class: {
            root: '[--spotlight-color:var(--ui-bg-inverted)]',
          },
        },
      ],
      defaultVariants: {
        variant: 'outline',
        highlightColor: 'primary',
        spotlightColor: 'primary',
      },
    },
    {
      twMerge: true,
    },
  );

  const _ui = computed(() =>
    pageCard({
      orientation: props.orientation,
      reverse: props.reverse,
      variant: props.variant,
      to: Boolean(props.to),
      spotlight: props.spotlight,
      spotlightColor: props.spotlightColor,
      highlight: props.highlight,
      highlightColor: props.highlightColor,
    }),
  );

  // const spotlightEl = templateRef('spotlightEl');
  // const parentEl = useParentElement(spotlightEl);
  // const { x: mouse_x, y: mouse_y } = useMouse({ target: parentEl });
  // const spotlight_style = computed(() => ({
  //   '--spotlight-x': `${mouse_x.value}px`,
  //   '--spotlight-y': `${mouse_y.value}px`,
  // }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="[
      _ui.root({
        class: [props.class, ui.root],
      }),
    ]"
  >
    <!-- <div
      ref="spotlightEl"
      :class="[_ui.spotlight({ class: ui.spotlight })]"
    /> -->
    <div v-if="$slots.header" :class="[_ui.header({ class: [ui.header] })]">
      <slot name="header" />
    </div>

    <div
      :class="[
        _ui.body({ class: [ui.body] }),
        _ui.container({ class: [ui.container] }),
      ]"
    >
      <div :class="[_ui.wrapper({ class: [ui.wrapper] })]">
        <div :class="[_ui.leading({ class: [ui.leading] })]">
          <slot name="leading">
            <UIcon
              v-if="icon"
              :name="icon"
              :class="[_ui.leadingIcon({ class: [ui.leadingIcon] })]"
            />
          </slot>
        </div>
        <div v-if="$slots.description || description || $slots.title || title">
          <div
            v-if="$slots.title || title"
            :class="[_ui.title({ class: [ui.title] })]"
          >
            <slot name="title">
              {{ props.title }}
            </slot>
          </div>
          <div
            v-if="$slots.description || description"
            :class="[_ui.description({ class: [ui.description] })]"
          >
            <slot name="description">
              {{ props.description }}
            </slot>
          </div>
        </div>
      </div>

      <slot />
    </div>

    <div v-if="$slots.footer" :class="[_ui.footer({ class: [ui.footer] })]">
      <slot name="footer" />
    </div>

    <ULink v-if="Object.values(props.link).length" v-bind="props.link">
      <span class="absolute inset-0" aria-hidden="true" />
    </ULink>
  </Primitive>
</template>

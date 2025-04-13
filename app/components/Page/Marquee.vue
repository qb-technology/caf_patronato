<script lang="ts" setup>
  import { tv } from 'tailwind-variants';
  import { Primitive, type PrimitiveProps } from 'reka-ui';

  interface UI {
    root?: string;
    content?: string;
  }
  export interface PageMarqueeProps extends PrimitiveProps {
    as?: string;
    pauseOnHover?: boolean;
    reverse?: boolean;
    orientation?: 'horizontal' | 'vertical';
    repeat?: number;
    class?: string;
    overlay?: boolean;
    ui?: UI;
  }
  const props = withDefaults(defineProps<PageMarqueeProps>(), {
    as: 'div',
    orientation: 'horizontal',
    repeat: 4,
    class: '',
    overlay: true,
    ui: () => ({}),
  });

  const pageMarquee = tv({
    slots: {
      root: 'group relative flex items-center overflow-hidden gap-(--gap) [--gap:--spacing(16)] [--duration:20s]',
      content:
        'flex items-center shrink-0 justify-around gap-(--gap) min-w-max',
    },
    variants: {
      orientation: {
        horizontal: {
          content: 'w-full',
        },
        vertical: {
          content: 'h-full',
        },
      },
      pauseOnHover: {
        true: {
          content: 'group-hover:[animation-play-state:paused]',
        },
      },
      reverse: {
        true: {
          content: '[animation-direction:reverse]',
        },
      },
      overlay: {
        true: {
          root: 'before:absolute before:pointer-events-none before:content-[""] before:z-2 before:from-(--ui-bg) before:to-transparent after:absolute after:pointer-events-none after:content-[""] after:z-2 after:from-(--ui-bg) after:to-transparent',
        },
      },
    },
    compoundVariants: [
      {
        orientation: 'horizontal',
        class: {
          root: 'flex-row',
          content:
            'flex-row animate-[marquee_var(--duration)_linear_infinite] rtl:animate-[marquee-rtl_var(--duration)_linear_infinite] backface-hidden',
        },
      },
      {
        orientation: 'horizontal',
        overlay: true,
        class: {
          root: 'before:inset-y-0 before:left-0 before:h-full before:w-1/3 before:bg-gradient-to-r after:inset-y-0 after:right-0 after:h-full after:w-1/3 after:bg-gradient-to-l backface-hidden',
        },
      },
      {
        orientation: 'vertical',
        class: {
          root: 'flex-col',
          content:
            'flex-col animate-[marquee-vertical_var(--duration)_linear_infinite] rtl:animate-[marquee-vertical-rtl_var(--duration)_linear_infinite] h-[fit-content] backface-hidden',
        },
      },
      {
        orientation: 'vertical',
        overlay: true,
        class: {
          root: 'before:inset-x-0 before:top-0 before:w-full before:h-1/3 before:bg-gradient-to-b after:inset-x-0 after:bottom-0 after:w-full after:h-1/3 after:bg-gradient-to-t backface-hidden',
        },
      },
    ],
  });

  const _ui = computed(() =>
    pageMarquee({
      orientation: props.orientation,
      pauseOnHover: props.pauseOnHover,
      reverse: props.reverse,
      overlay: props.overlay,
    }),
  );
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    role="div"
    :class="_ui.root({ class: [props.class, ui.root] })"
  >
    <div
      v-for="i of props.repeat"
      :key="i"
      :class="_ui.content({ class: [ui.content] })"
    >
      <slot />
    </div>
  </Primitive>
</template>

<style scoped></style>

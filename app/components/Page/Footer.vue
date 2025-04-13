<script lang="ts" setup>
  import { tv } from 'tailwind-variants';
  import { Primitive, type PrimitiveProps } from 'reka-ui';

  const footer = tv({
    slots: {
      root: '',
      top: 'py-8 lg:py-12',
      bottom: 'py-8 lg:py-12',
      container:
        'py-8 lg:py-4 lg:flex lg:items-center lg:justify-between lg:gap-x-3',
      left: 'flex items-center justify-center lg:justify-start lg:flex-1 gap-x-1.5 mt-3 lg:mt-0 lg:order-1',
      center: 'mt-3 lg:mt-0 lg:order-2 flex items-center justify-center',
      right:
        'lg:flex-1 flex items-center justify-center lg:justify-end gap-x-1.5 lg:order-3',
    },
  });

  type UI = {
    root?: string;
    top?: string;
    bottom?: string;
    container?: string;
    left?: string;
    center?: string;
    right?: string;
  };
  export interface PageFooterProp extends PrimitiveProps {
    class?: string;
    ui?: UI;
  }
  const props = withDefaults(defineProps<PageFooterProp>(), {
    as: 'footer',
    class: '',
    ui: () => ({}),
  });

  const _ui = computed(() => footer());
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="_ui.root({ class: [props.class, props.ui.root] })"
  >
    <div v-if="$slots.top" :class="_ui.top({ class: [props.ui.top] })">
      <slot name="top"></slot>
    </div>

    <UContainer :class="_ui.container({ class: [props.ui.container] })">
      <div v-if="$slots.left" :class="_ui.left({ class: [props.ui.left] })">
        <slot name="left"></slot>
      </div>
      <div :class="_ui.center({ class: [props.ui.center] })">
        <slot></slot>
      </div>
      <div v-if="$slots.right" :class="_ui.right({ class: [props.ui.right] })">
        <slot name="right"></slot>
      </div>
    </UContainer>

    <div v-if="$slots.bottom" :class="_ui.bottom({ class: [props.ui.bottom] })">
      <slot name="bottom"></slot>
    </div>
  </Primitive>
</template>

<style scoped></style>

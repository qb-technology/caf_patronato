<script lang="ts" setup>
  import type { NuxtError } from '#app';
  import type { ButtonProps } from '@nuxt/ui';
  import { tv } from 'tailwind-variants';
  import { Primitive, type PrimitiveProps } from 'reka-ui';

  type UI = {
    root?: string;
    message?: string;
    statusMessage?: string;
    statusCode?: string;
    links?: string;
  };

  export interface PageError extends PrimitiveProps {
    error?: Partial<NuxtError<unknown> & { message: string }>;
    redirect?: string;
    class?: string;
    clear?: boolean | Partial<ButtonProps>;
    ui?: UI;
  }

  const props = withDefaults(defineProps<PageError>(), {
    error: () => ({}),
    as: 'main',
    class: '',
    redirect: '/',
    clear: true,
    ui: () => ({}),
  });

  const errorEl = tv({
    slots: {
      root: 'min-h-[calc(100vh-var(--ui-header-height))] flex flex-col items-center justify-center text-center',
      statusCode: 'text-base font-semibold text-(--ui-primary)',
      statusMessage:
        'mt-2 text-4xl sm:text-5xl font-bold text-(--ui-text-highlighted) text-balance',
      message: 'mt-4 text-lg text-(--ui-text-muted) text-balance',
      links: 'mt-8 flex items-center justify-center gap-6',
    },
  });

  const _ui = computed(() => errorEl());

  const clearButton = computed(() => {
    const _default = {
      size: 'lg',
      color: 'primary',
      variant: 'solid',
      label: 'Back to home',
    } as ButtonProps;
    if (typeof props.clear == 'boolean') {
      return _default;
    }
    return { ..._default, ...props.clear };
  });

  function errorHandler() {
    clearError({ redirect: props.redirect });
  }
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="_ui.root({ class: [props.class, ui.root] })"
  >
    <p :class="_ui.statusCode({ class: [ui.statusCode] })">
      {{ error.statusCode }}
    </p>
    <h1 :class="_ui.statusMessage({ class: [ui.statusMessage] })">
      {{ error.statusMessage }}
    </h1>
    <p :class="_ui.message({ class: [ui.message] })">{{ error.message }}</p>
    <div :class="_ui.links({ class: [ui.links] })">
      <UButton v-bind="clearButton" @click="errorHandler" />
    </div>
  </Primitive>
</template>

<style scoped></style>

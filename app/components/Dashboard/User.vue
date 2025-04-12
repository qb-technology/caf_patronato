<script lang="ts" setup>
  import type { AvatarProps, ButtonProps, ChipProps } from '@nuxt/ui';
  import type {
    RouteLocationAsRelativeGeneric,
    RouteLocationAsPathGeneric,
  } from '#vue-router';
  import { Primitive, type PrimitiveProps } from 'reka-ui';
  import { tv } from 'tailwind-variants';

  type UI = {
    root?: string;
    wrapper?: string;
    name?: string;
    description?: string;
    avatar?: string;
  };

  export interface BaseUserProp extends PrimitiveProps {
    class?: string;
    name?: string;
    description?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    avatar?: Omit<AvatarProps, 'size'> & { [key: string]: any };
    chip?: boolean | Omit<ChipProps, 'size' | 'inset'>;
    size?: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
    orientation?: 'horizontal' | 'vertical';
    to?: string | RouteLocationAsPathGeneric | RouteLocationAsRelativeGeneric;
    target?: ButtonProps['target'];
    ui?: UI;
  }

  const props = withDefaults(defineProps<BaseUserProp>(), {
    class: '',
    as: 'div',
    name: '',
    description: '',
    avatar: () => ({}),
    chip: () => ({}),
    size: 'md',
    orientation: 'horizontal',
    to: undefined,
    target: null,
    ui: () => ({}),
  });

  const user = tv({
    slots: {
      root: 'relative group/user',
      wrapper: '',
      name: 'font-medium',
      description: 'text-(--ui-text-muted)',
      avatar: 'shrink-0',
    },
    variants: {
      orientation: {
        horizontal: {
          root: 'flex items-center',
        },
        vertical: {
          root: 'flex flex-col',
        },
      },
      to: {
        true: {
          name: [
            'text-(--ui-text) peer-hover:text-(--ui-text-highlighted)',
            'transition-colors',
          ],
          description: [
            'peer-hover:text-(--ui-text-muted-toned)',
            'transition-colors',
          ],
          avatar:
            'transform transition-transform duration-200 group-hover/user:scale-115',
        },
        false: {
          name: 'text-(--ui-text-highlighted)',
          description: '',
        },
      },
      size: {
        '3xs': {
          root: 'gap-1',
          wrapper: 'flex items-center gap-1',
          name: 'text-xs',
          description: 'text-xs',
        },
        '2xs': {
          root: 'gap-1.5',
          wrapper: 'flex items-center gap-1.5',
          name: 'text-xs',
          description: 'text-xs',
        },
        xs: {
          root: 'gap-1.5',
          wrapper: 'flex items-center gap-1.5',
          name: 'text-xs',
          description: 'text-xs',
        },
        sm: {
          root: 'gap-2',
          name: 'text-xs',
          description: 'text-xs',
        },
        md: {
          root: 'gap-2',
          name: 'text-sm',
          description: 'text-xs',
        },
        lg: {
          root: 'gap-2.5',
          name: 'text-sm',
          description: 'text-sm',
        },
        xl: {
          root: 'gap-2.5',
          name: 'text-base',
          description: 'text-sm',
        },
        '2xl': {
          root: 'gap-3',
          name: 'text-base',
          description: 'text-base',
        },
        '3xl': {
          root: 'gap-3',
          name: 'text-lg',
          description: 'text-base',
        },
      },
    },
    defaultVariants: {
      size: 'md',
    },
  });

  const _ui = computed(() =>
    user({
      orientation: props.orientation,
      size: props.size,
      to: Boolean(props.to),
    }),
  );

  const _chip = computed(() => {
    const _ = { inset: true } as ChipProps;
    if (typeof props.chip === 'boolean') return { ..._, show: false };
    return { ..._, ...props.chip };
  });
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="_ui.root({ class: [props.class, ui.root] })"
  >
    <UChip v-bind="_chip">
      <UAvatar v-bind="avatar" :class="_ui.avatar({ class: ui.avatar })" />
    </UChip>
    <div :class="[_ui.wrapper({ class: ui.wrapper })]">
      <ULink v-if="props.to" :to="to">
        <span class="absolute inset-0" aria-hidden="true" />
      </ULink>
      <p :class="_ui.name({ class: ui.name })">{{ name }}</p>
      <p :class="_ui.description({ class: ui.description })">
        {{ description }}
      </p>
    </div>
  </Primitive>
</template>

<style scoped></style>

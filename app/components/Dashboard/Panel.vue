<script lang="ts">
  import { tv } from 'tailwind-variants';
  export type DashboardPanelProp = {
    class?: string;
    minSize?: number;
    resizable?: boolean;
    id?: string;
    maxSize?: number;
    defaultSize?: number;
  };
</script>
<script lang="ts" setup>
  const Panel = tv({
    slots: {
      root: 'relative min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-(--ui-border) shrink-0',
      container: 'flex flex-col ',
      body: 'flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6',
      handle: '',
    },
    variants: {
      size: {
        true: {
          container: 'w-full lg:w-(--width)',
        },
        false: {
          container: 'flex-1',
        },
      },
      resizable: {
        true: { root: 'flex' },
        false: { root: '' },
      },
    },
  });

  const props = withDefaults(
    defineProps<
      DashboardPanelProp & { ui?: Partial<(typeof Panel)['slots']> }
    >(),
    {
      minSize: 15,
      id: () => useId(),
      maxSize: 100,
      defaultSize: 0,
      ui: () => ({}),
      class: '',
    },
  );

  const _ui = computed(() =>
    Panel({
      size: Boolean(props.defaultSize),
      resizable: props.resizable,
    }),
  );

  const width = ref(props.defaultSize);

  const style = computed(() => {
    if (props.resizable) return `--width:${width.value}%`;
    return '';
  });

  const resizeEl = useTemplateRef('resizeHandleEl');

  const { pressed: resizePressed } = useMousePressed({ target: resizeEl });
</script>

<template>
  <div
    :id="id"
    :data-dragging="resizePressed"
    :class="_ui.root({ class: [props.class, ui.root] })"
    :style="style"
  >
    <div :class="_ui.container({ class: ui.container })">
      <div :class="_ui.body({ class: ui.body })">
        <slot />
      </div>
    </div>
    <DashboardResizeHandle
      v-if="resizable"
      ref="resizeHandleEl"
      :class="_ui.handle({ class: ui.handle })"
    />
  </div>
</template>

<style scoped></style>

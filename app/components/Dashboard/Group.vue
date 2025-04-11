<script lang="ts" setup>
  import { tv } from 'tailwind-variants';

  export type DashboardGroupProp = {
    as?: string;
    storage?: 'cookie' | 'local';
    storageKey?: string;
    persistent?: boolean;
    unit?: '%' | 'rem' | 'px';
  };

  const props = withDefaults(defineProps<DashboardGroupProp>(), {
    as: 'div',
    storage: 'cookie',
    storageKey: 'qb-dashboard',
    unit: '%',
  });

  const el = useTemplateRef('el');

  useResizeObserver(el, (entries) => {
    entries.forEach((_el) => {
      console.log(_el.target.children);
    });
  });

  onMounted(() => {
    console.log(props);
  });

  const group = tv({
    base: 'fixed inset-0 flex overflow-hidden',
  });
</script>

<template>
  <div ref="el" :class="group.base">
    <slot />
  </div>
</template>

<style scoped></style>

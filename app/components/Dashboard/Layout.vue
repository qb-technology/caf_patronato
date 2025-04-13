<script setup lang="ts">
  import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'reka-ui';
  import { breakpointsTailwind } from '@vueuse/core';

  type Size = {
    minSize?: number;
    maxSize?: number;
    defaultSize?: number;
    collapsedSize?: number;
  };

  export type DashboardLayoutProp = {
    sidebarSize?: Size;
    collapsible?: boolean;
    storageKey?: string;
  };

  const props = withDefaults(defineProps<DashboardLayoutProp>(), {
    sidebarSize: ({ sidebarSize: _s }) => {
      const _def = {
        minSize: 15,
        maxSize: 25,
        defaultSize: 20,
        collapsedSize: 0,
      };
      if (_s) return { ..._def, ..._s };
      return _def;
    },
    storageKey: 'dashboard',
  });

  const DEFAULT_SIDEBAR_SIZE = {
    minSize: 15,
    maxSize: 25,
    defaultSize: 20,
    collapsedSize: 0,
  } as Required<Size>;

  const _SidebarSize = computed<Required<Size>>(() => {
    return {
      ...DEFAULT_SIDEBAR_SIZE,
      ...props.sidebarSize,
    };
  });

  // Validate:
  // const isValidSidebarSize = computed(() => {
  //   return Object.values(_SidebarSize.value).every(
  //     (num) => typeof num === 'number' && num > 10 && num < 100,
  //   );
  // });

  // if (!isValidSidebarSize.value) {
  //   console.warn('Sidebar size values must all be numbers between 10 and 100.');
  // }

  const layoutStorage = useCookie<number[]>(props.storageKey, {
    default: () => [
      _SidebarSize.value.defaultSize,
      100 - _SidebarSize.value.defaultSize,
    ],
  });

  const dashboardPanel = ref<InstanceType<typeof SplitterGroup>>();
  const sidebarPanel = ref<InstanceType<typeof SplitterPanel>>();
  const mainPanel = ref<InstanceType<typeof SplitterPanel>>();

  defineExpose({
    dashboardPanel,
    sidebarPanel,
    mainPanel,
  });

  const breakPoints = useBreakpoints(breakpointsTailwind);
  function collapseExpand() {
    if (sidebarPanel.value?.isCollapsed) sidebarPanel.value.expand();
    else {
      sidebarPanel.value?.collapse();
    }
  }
</script>

<template>
  <div class="fixed inset-0">
    <SplitterGroup
      :id="useId()"
      ref="dashboardPanel"
      direction="horizontal"
      @layout="(d) => (layoutStorage = d)"
    >
      <SplitterPanel
        v-if="breakPoints.smaller('lg')"
        :id="useId()"
        ref="sidebarPanel"
        :collapsible="props.collapsible"
        :collapsed-size="sidebarSize.collapsedSize"
        :min-size="sidebarSize.minSize"
        :max-size="sidebarSize.maxSize"
        :default-size="layoutStorage[0]"
        as-child
      >
        <slot
          name="sidebar"
          :is-collapse="sidebarPanel?.isCollapsed"
          :collapse-expand
        />
      </SplitterPanel>

      <SplitterResizeHandle
        :id="useId()"
        class="hidden lg:block touch-none select-none cursor-ew-resize relative before:absolute before:inset-y-0 before:-left-1.5 before:-right-1.5"
      />

      <SplitterPanel
        :id="useId()"
        ref="mainPanel"
        :default-size="layoutStorage[1]"
        as="main"
        as-child
      >
        <slot :is-collapse="sidebarPanel?.isCollapsed" :collapse-expand />
      </SplitterPanel>
    </SplitterGroup>
  </div>
</template>

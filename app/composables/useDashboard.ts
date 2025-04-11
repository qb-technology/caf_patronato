import { createSharedComposable } from '@vueuse/core';
import type { ShortcutsConfig } from '@nuxt/ui/runtime/composables/defineShortcuts.js';
import type { MaybeRef } from 'vue';
const _useDashboard = (shortcuts = {} as MaybeRef<ShortcutsConfig>) => {
  const route = useRoute();
  // const router = useRouter();
  const isNotificationsSlideoverOpen = ref(false);

  defineShortcuts(
    shortcuts,
    //   {
    //   'g-h': () => router.push('/'),
    //   'g-i': () => router.push('/inbox'),
    //   'g-c': () => router.push('/customers'),
    //   'g-s': () => router.push('/settings'),
    //   n: () =>
    //     (isNotificationsSlideoverOpen.value =
    //       !isNotificationsSlideoverOpen.value),
    // }
  );

  watch(
    () => route.fullPath,
    () => {
      isNotificationsSlideoverOpen.value = false;
    },
  );

  return {
    isNotificationsSlideoverOpen,
  };
};

export const useDashboard = createSharedComposable(_useDashboard);

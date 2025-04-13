<script setup lang="ts">
  const links = [
    [
      {
        label: 'General',
        icon: 'i-lucide-user',
        to: '/settings',
        // exact: true,
      },
      {
        label: 'Members',
        icon: 'i-lucide-users',
        to: '/settings/members',
      },
      {
        label: 'Security',
        icon: 'i-lucide-shield',
        to: '/settings/security',
      },
    ],
    // [
    //   {
    //     label: 'Documentation',
    //     icon: 'i-lucide-book-open',
    //     to: 'https://ui.nuxt.com/getting-started/installation/pro/nuxt',
    //     target: '_blank',
    //   },
    //   {
    //     label: 'Buy now',
    //     icon: 'i-lucide-shopping-cart',
    //     to: 'https://ui.nuxt.com/pro/purchase',
    //     target: '_blank',
    //   },
    // ],
  ];
</script>

<template>
  <TemplateDashboard id="settings" :ui="{ body: 'lg:py-12' }">
    <template #header="{ collapseExpand }">
      <DashboardNavbar title="Settings">
        <template #leading>
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide:panel-left-close"
            class="hidden lg:block"
            @click="collapseExpand"
          />
        </template>
      </DashboardNavbar>

      <DashboardToolbar>
        <!-- NOTE: The `-mx-1` class is used to align with the `DashboardSidebarCollapse` button here. -->
        <UNavigationMenu :items="links" highlight class="-mx-1 flex-1" />
      </DashboardToolbar>
    </template>

    <div
      class="flex flex-col gap-4 sm:gap-6 lg:gap-12 w-full lg:max-w-2xl mx-auto"
    >
      <slot />
    </div>
  </TemplateDashboard>
</template>

<script setup lang="ts">
  export type TemplateDashboard = {
    title?: string;
  };
  withDefaults(defineProps<TemplateDashboard>(), {
    title: '',
  });
  const open = ref(false);
  const links = [
    {
      label: 'Dashboard',
      icon: 'i-lucide-layout-dashboard',
      to: '/',
    },
    {
      label: 'Inbox',
      icon: 'i-lucide-inbox',
    },
    {
      label: 'Customers',
      icon: 'i-lucide-users',
    },
    {
      label: 'Settings',
      to: '/settings',
      icon: 'i-lucide-settings',
      defaultOpen: true,
      children: [
        {
          label: 'General',
          to: '/settings',
          exact: true,
          onSelect: () => {
            open.value = false;
          },
        },
        {
          label: 'Members',
          to: '/settings/members',
          onSelect: () => {
            open.value = false;
          },
        },
        {
          label: 'Security',
          to: '/settings/security',
          onSelect: () => {
            open.value = false;
          },
        },
      ],
    },
  ];

  const items = [
    [
      {
        label: 'New mail',
        icon: 'i-lucide-send',
        to: '/inbox',
      },
      {
        label: 'New customer',
        icon: 'i-lucide-user-plus',
        to: '/customers',
      },
    ],
  ];
  const toggleSidebar = ref(false);
  function openSidebar() {
    toggleSidebar.value = !toggleSidebar.value;
  }
</script>
<template>
  <div>
    <DashboardLayout :collapsible="true">
      <template #sidebar="{ isCollapse }">
        <DashboardSidebar>
          <template #header>
            <UButton
              color="neutral"
              variant="ghost"
              :label="isCollapse ? undefined : 'QB Tech'"
            >
              <template #leading>
                <UIcon
                  name="i-lucide-earth"
                  :class="isCollapse ? 'size-6' : 'size-8'"
                />
              </template>
            </UButton>
          </template>
          <UNavigationMenu
            :items="links"
            orientation="vertical"
            :collapsed="isCollapse"
          />

          <template #footer>
            <UserMenu
              :collapsed="isCollapse"
              :name="`Andrews Boateng Okyere`"
              :image="`https://i.pravatar.cc/150?u=qb_tech`"
            />
          </template>
        </DashboardSidebar>
      </template>

      <template #default="{ collapseExpand }">
        <DashboardPanel>
          <template #header>
            <slot name="header" :collapse-expand="collapseExpand">
              <DashboardNavbar :title="title" @open-sidebar="openSidebar">
                <template #leading>
                  <UButton
                    color="neutral"
                    variant="ghost"
                    icon="i-lucide:panel-left-close"
                    class="hidden lg:block"
                    @click="collapseExpand"
                  />
                </template>
                <template #right>
                  <UTooltip text="Notifications" :shortcuts="['N']">
                    <UButton color="neutral" variant="ghost" square>
                      <UChip color="error" inset>
                        <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
                      </UChip>
                    </UButton>
                  </UTooltip>

                  <UDropdownMenu :items="items">
                    <UButton
                      icon="i-lucide-plus"
                      size="md"
                      class="rounded-full"
                    />
                  </UDropdownMenu>
                </template>
              </DashboardNavbar>
            </slot>
          </template>

          <template #body>
            <slot :collapse-expand="collapseExpand" />
          </template>
        </DashboardPanel>
      </template>
    </DashboardLayout>

    <USlideover v-model:open="toggleSidebar" side="left">
      <template #header>
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide:x"
          @click="openSidebar"
        />
        <UButton color="neutral" variant="ghost" :label="'QB Tech'">
          <template #leading>
            <UIcon name="i-lucide-earth" :class="'size-8'" />
          </template>
        </UButton>
      </template>

      <template #body>
        <UNavigationMenu :items="links" orientation="vertical" />
      </template>
    </USlideover>
  </div>
</template>

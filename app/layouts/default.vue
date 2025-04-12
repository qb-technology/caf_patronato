<script setup lang="ts">
  const links = [
    {
      label: 'Home',
      icon: 'i-lucide-house',
      active: true,
    },
    {
      label: 'Inbox',
      icon: 'i-lucide-inbox',
    },
    {
      label: 'Contacts',
      icon: 'i-lucide-users',
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
    <DashboardLayout ref="dashboard" :collapsible="true">
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
            <DashboardUser
              :name="isCollapse ? undefined : `Andrews Boateng Okyere`"
              :description="isCollapse ? undefined : `General Manager`"
            />
          </template>
        </DashboardSidebar>
      </template>

      <template #default="{ collapseExpand }">
        <DashboardPanel>
          <template #header>
            <DashboardNavbar title="Homepage" @open-sidebar="openSidebar">
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
          </template>

          <slot />
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

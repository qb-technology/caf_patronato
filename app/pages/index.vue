<template>
  <div>
    <DashboardGroup>
      <DashboardPanel
        :resizable="true"
        :default-size="30"
        :min-size="20"
        :max-size="30"
      />
      <DashboardPanel />
    </DashboardGroup>
  </div>
</template>

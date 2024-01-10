<script lang="ts" setup>
import MonthTap from '@/views/hr/attndmgmt/month/monthTap.vue'

const tab = ref('personal-info')
</script>

<template>
  <h1 class="mb-6">월근태 마감관리</h1>
  <VCard>
    <VTabs
      v-model="tab"
      height="70"
    >
      <VTab value="personal-info">
        월근태 마감관리
      </VTab>
    </VTabs>
  </VCard>
  <VCard flat>
    <VCardText>
      <VWindow
        v-model="tab"
        class="disable-tab-transition"
      >
        <!-- 월근태 마감관리 -->
        <VWindowItem value="personal-info">
          <MonthTap />
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>

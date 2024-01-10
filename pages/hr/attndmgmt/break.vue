<script lang="ts" setup>
import BreakTap from '@/views/hr/attndmgmt/break/breakTap.vue';

const tab = ref('personal-info')
</script>

<template>
  <h1 class="mb-6">근태외 관리</h1>
  <VCard>
    <VTabs v-model="tab" height="70">
      <VTab value="personal-info">
        근태외 조회/승인
      </VTab>
    </VTabs>
  </VCard>
  <VCard flat>
    <VCardText>
      <VWindow v-model="tab" class="disable-tab-transition">
        <VWindowItem value="personal-info">
          <BreakTap />
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>

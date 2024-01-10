<script lang="ts" setup>
import DailyattendBatchTap from '@/views/hr/dailyattend/awrds/dailyattendBatchTap.vue';
import DailyattendSearchTap from '@/views/hr/dailyattend/awrds/dailyattendSearchTap.vue';

const tab = ref('personal-info')
</script>

<template>
  <h1 class="mb-6">일용근로 근태관리</h1>
  <VCard>
    <VTabs v-model="tab" height="70">
      <VTab value="personal-info">
        일용근로 근태 조회
      </VTab>
      <VTab value="account-details">
        일용근로 근태 마감관리
      </VTab>
    </VTabs>
  </VCard>
  <VCard flat>
    <VCardText>
      <VWindow v-model="tab" class="disable-tab-transition">
        <!-- 마감관리 -->
        <VWindowItem value="personal-info">
          <DailyattendSearchTap />
        </VWindowItem>

        <!-- 근태 조회/승인 -->
        <VWindowItem value="account-details">
          <DailyattendBatchTap />
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>

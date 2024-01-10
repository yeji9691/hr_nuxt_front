<script lang="ts" setup>
import DailysalaryBatchTap from '@/views/hr/dailysalary/awrds/dailysalaryBatchTap.vue';
import DailysalarySearchTap from '@/views/hr/dailysalary/awrds/dailysalarySearchTap.vue';

const tab = ref('personal-info')
</script>

<template>
  <h1 class="mb-6">일용근로 급여관리</h1>
  <VCard>
    <VTabs v-model="tab" height="70">
      <VTab value="personal-info">
        일용근로 급여 조회
      </VTab>
      <VTab value="account-details">
        일용근로 급여 마감관리
      </VTab>
    </VTabs>
  </VCard>
  <VCard flat>
    <VCardText>
      <VWindow v-model="tab" class="disable-tab-transition">
        <!-- 마감관리 -->
        <VWindowItem value="personal-info">
          <DailysalarySearchTap />
        </VWindowItem>

        <!-- 근태 조회/승인 -->
        <VWindowItem value="account-details">
          <DailysalaryBatchTap />
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>

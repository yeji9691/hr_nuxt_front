<script lang="ts" setup>
import LeaveReqListTap from '@/views/hr/attendreg/leave/leaveReqListTap.vue';
import LeaveReqTap from '@/views/hr/attendreg/leave/leaveReqTap.vue';

const tab = ref('personal-info')
</script>

<template>
  <h1 class="mb-6">휴가 신청</h1>
  <VCard>
    <VTabs v-model="tab" height="70">
      <VTab value="personal-info">
        휴가 신청서 작성
      </VTab>
      <VTab value="account-details">
        휴가 신청내역
      </VTab>
    </VTabs>
  </VCard>
  <VCard flat>
    <VCardText>
      <VWindow v-model="tab" class="disable-tab-transition">
        <VWindowItem value="personal-info">
          <LeaveReqTap />
        </VWindowItem>

        <VWindowItem value="account-details">
          <LeaveReqListTap />
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>

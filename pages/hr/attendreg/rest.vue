<script lang="ts" setup>
import RestReqListTap from '@/views/hr/attendreg/rest/restReqListTap.vue'
import RestReqTap from '@/views/hr/attendreg/rest/restReqTap.vue'

const tab = ref('personal-info')
</script>

<template>
  <h1 class="mb-6">근태외 신청</h1>
  <VCard>
    <VTabs
      v-model="tab"
      height="70"
    >
      <VTab value="personal-info">
        근태 신청서 작성
      </VTab>
      <VTab value="account-details">
        근태 신청내역
      </VTab>
    </VTabs>
  </VCard>
  <VCard flat>
    <VCardText>
      <VWindow
        v-model="tab"
        class="disable-tab-transition"
      >
        <VWindowItem value="personal-info">
          <RestReqTap />
        </VWindowItem>

        <VWindowItem value="account-details">
          <RestReqListTap />
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>

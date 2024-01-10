<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable';

const headers = [
  { title: '비고', key: 'remark' },
  { title: '권한코드번호', key: 'authority_code_number' },
  { title: '권한코드이름', key: 'authority_code_name' },
  { title: '권한레벨', key: 'authority_level' },
]

const items = [
  { remark: '관리자 권한', authority_code_number: 'MA0001', authority_code_name: 'MASTER', authority_level: '1' },
  { remark: '인사 권한', authority_code_number: 'HR0001', authority_code_name: 'HUMAN_RESOURCE', authority_level: '1' },
  { remark: '회계 권한', authority_code_number: 'AC0001', authority_code_name: 'ACCOUNT', authority_level: '1' },
  { remark: '물류 권한', authority_code_number: 'LOGI0001', authority_code_name: 'LOGISTICS', authority_level: '1' },
]

const tab = ref('personal-info')

</script>

<template>
  <h1 class="mb-6">권한관리</h1>
  <VCard>
    <VTabs
      v-model="tab"
      height="70"
    >
      <VTab value="personal-info">
       권한관리
      </VTab>
    </VTabs>
  </VCard>
  <VDataTable
    :headers="headers"
    :items="items"
    :items-per-page="5"
  />
</template>

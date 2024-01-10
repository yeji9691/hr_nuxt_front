<script setup lang="ts">
import { affairStore } from '@/store/hr/affair';
import { onMounted, ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';

const store = affairStore()
const search = ref<string>('')

const headers = [
  { title: '발령번호', key: 'appointNo' },
  { title: '사번', key: 'empCode' },
  { title: '직원명', key: 'empName' },
  { title: '부서', key: 'deptName' },
  { title: '발령부서', key: 'appointDept' },
  { title: '직급', key: 'positionName' },
  { title: '발령직급', key: 'appointLevel' },
  { title: '근무지', key: 'workPlaceName' },
  { title: '발령근무지', key: 'appointWP' },
  { title: '승인상태', key: 'status' },
]

const appointmentsLog = ref([])

onMounted(async () => {
  try {
    await store.FETCH_APPOINT_LOG()
    appointmentsLog.value = store.all_appointments_log
  }
  catch (error) {
    console.error('Failed to fetch appointments log', error)
  }
})
</script>

<template>
  <div>
    <h1 class="mb-6">인사발령 이력</h1>
    <VCard class="mt-3">
      <AppTextField v-model="search" class="ma-5" density="compact" placeholder="Search" append-inner-icon="tabler-search"
        single-line hide-details dense outlined />
      <VDataTable :headers="headers" :items="appointmentsLog" show-select item-value="appointNo" />
    </VCard>
  </div>
</template>

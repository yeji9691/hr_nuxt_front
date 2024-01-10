<script setup lang="ts">
import { dailyLaborStore } from '@/store/hr/dailylabor';
import { VDataTable } from 'vuetify/labs/VDataTable';

const search = ref('')
const DailyLaborStore = dailyLaborStore()
const empLogList = ref([])
const selectedRows = ref([])

const headers = [
  { title: '성명', key: 'employeeName', align: 'center' },
  { title: '주민등록번호', key: 'residentialNumber', align: 'center' },
  { title: '프로젝트', key: 'project', align: 'center' },
  { title: '부서', key: 'department', align: 'center' },
  { title: '시작날짜', key: 'workStartDate', align: 'center' },
  { title: '종료날짜', key: 'workEndDate', align: 'center' },
  { title: '핸드폰', key: 'phoneNumber', align: 'center' },
]

const fetchData = async () => {
  await DailyLaborStore.FETCH_EMP_LOG()
  empLogList.value = await DailyLaborStore.empLogList
}

const removelog = async () => {
  const payload: any = []

  selectedRows.value.forEach(element => {
    const logData = {
      employeeName: element.employeeName,
      residentialNumber: element.residentialNumber,
    }

    payload.push(logData)
  })
  console.log(payload)

  await DailyLaborStore.DELETE_EMP_LOG(payload)
  await fetchData()
}

const filteredData = computed(() => {
  return empLogList.value.filter((emp: any) => {
    return Object.values(emp).some(field => {
      if (typeof field === 'string')
        return field.toLowerCase().includes(search.value.toLowerCase())

      return false
    })
  })
})

onMounted(fetchData)
</script>

<template>
  <h1 class="mb-6">
    일용근로 직원이력 관리
  </h1>
  <VCard>
    <VContainer>
      <VCardText class="d-flex flex-wrap py-4 gap-4">
        <div style="inline-size: 10rem;">
          <AppTextField v-model="search" placeholder="Search" density="compact" />
        </div>
        <VSpacer />

        <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
          <VBtn prepend-icon="tabler-minus" @click="removelog">
            이력 삭제
          </VBtn>
        </div>
      </VCardText>
      <VDivider />
      <VDataTable v-model="selectedRows" :headers="headers" :items="filteredData" item-value="residentialNumber"
        return-object show-select />
    </VContainer>
  </VCard>
</template>

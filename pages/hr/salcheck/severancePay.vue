<!-- 이거 back단 만져야 함 -->
<script setup lang="ts">
import { paginationMeta } from '@/server/utils/paginationMeta'
import { affairStore } from '@/store/hr/affair'
import { baseStore } from '@/store/hr/base'
import { salaryStore } from '@/store/hr/salary'
import { VDataTable } from 'vuetify/labs/VDataTable'

const search = ref('')
const isSeverance = ref(false)
const selectedYear = ref('')
const selectedEmp = ref('')
const severanceList: any = ref([])
const yearList: any = ref([])
const empList: any = ref([])
const severancePayList = ref([])

const headers = [
  { title: '신청일', key: 'applyDate', align: 'center' },
  { title: '구분', key: 'severanceType', align: 'center' },
  { title: '사원명', key: 'empName', align: 'center' },
  { title: '근속기간', key: 'workDays', align: 'center' },
  { title: '입사일', key: 'hireDate', align: 'center' },
  { title: '퇴사일', key: 'retireDate', align: 'center' },
  { title: '차인지금액', key: 'realSeverancePay', align: 'center' },
]

const options = ref({ page: 1, itemsPerPage: 5, sortBy: [''], sortDesc: [false] })

const fetchData = async () => {
  await useAsyncData(async () => {
    await affairStore().FETCH_ALL_EMP()
    await baseStore().FETCH_YEARLIST()
  })

  const yearListData = baseStore().yearList

  yearList.value = yearListData ? Object.values(yearListData).map(item => item.year) : []

  const empListData = affairStore().all_emp_list

  empList.value = empListData
    ? Object.values(empListData).map(item => {
      return { title: item.empName, value: item.empCode }
    })
    : []
}

const fetchData2 = async () => {
  const findSalaryData = {
    firstDay: `${selectedYear.value}-1-1`,
    today: `${selectedYear.value}-12-31`,
  }

  await salaryStore().FIND_SEVERANCE_PAY(findSalaryData)

  severanceList.value = salaryStore().severanceList

  if (severanceList.value == '')
    isSeverance.value = true
}

const filteredData = computed(() => {
  return severancePayList.value.filter((emp: any) => {
    return Object.values(emp).some(field => {
      if (typeof field === 'string')
        return field.toLowerCase().includes(search.value.toLowerCase())

      return false
    })
  })
})

onBeforeMount(fetchData)
watch([selectedYear], fetchData2, { immediate: true })
</script>

<template>
  <h1 class="mb-6">
    퇴직금 조회
  </h1>
  <VCard class="mb-6">
    <VCardText>
      <VRow>
        <VCol cols="12" sm="4">
          <AppSelect v-model="selectedYear" label="해당 연도" placeholder="해당 연도" :items="yearList" clearable
            clear-icon="tabler-x" />
        </VCol>
        <VCol cols="12" sm="4">
          <AppSelect v-model="selectedEmp" label="해당 사원" placeholder="해당 사원" :items="empList" clearable
            clear-icon="tabler-x" />
        </VCol>
      </VRow>
    </VCardText>
  </Vcard>
  <VCard>
    <VCardText class="d-flex flex-wrap py-4 gap-4">
      <div class="me-3 d-flex gap-3">
        <AppSelect :model-value="options.itemsPerPage" :items="[
          { value: 5, title: '5' },
          { value: 10, title: '10' },
          { value: 25, title: '25' },
          { value: 50, title: '50' },
          { value: -1, title: 'All' },
        ]" style="inline-size: 6.25rem;" @update:model-value="options.itemsPerPage = parseInt($event, 10)" />
      </div>
      <VSpacer />

      <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
        <!-- 👉 Search  -->
        <div style="inline-size: 10rem;">
          <AppTextField placeholder="Search" density="compact" />
        </div>
      </div>
    </VCardText>
    <VDivider />
    <VDataTable :headers="headers" :items="filteredData" :items-per-page="options.itemsPerPage" :page="options.page"
      :options="options">
      <template #bottom>
        <VDivider />
        <VCardText class="pt-2">
          <div class="d-flex flex-wrap justify-center justify-sm-space-between gap-y-2 mt-2">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page: options.page, itemsPerPage: options.itemsPerPage }, filteredData.length) }}
            </p>
            <VPagination v-model="options.page" :total-visible="$vuetify.display.smAndDown ? 3 : 5"
              :length="Math.ceil(filteredData.length / options.itemsPerPage)" />
          </div>
        </VCardText>
      </template>
    </VDataTable>
  </VCard>
  <VSnackbar v-model="isSeverance" location="center" :timeout="3000" color="error">
    <VAlert density="compact" type="error" title="error!" text="현재 테이블 데이터가 없습니다." />
  </VSnackbar>
</template>

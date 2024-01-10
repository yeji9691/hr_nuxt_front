<script lang="ts" setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { baseStore } from '@/store/hr/base'
import { dailyLaborStore } from '@/store/hr/dailylabor'

const isSuccessFunc = ref(false)
const BaseStore = baseStore()
const DailyLaborStore = dailyLaborStore()
const deptList: any = ref([])
const dailyLaborEmpList: any = ref([])
const selectedRows = ref([])
const search = ref('')

const empHeaders = [
  { title: '사번', key: 'employeeId', align: 'center' },
  { title: '직원명', key: 'employeeName', align: 'center' },
  { title: '내/외국인', key: 'nationality', align: 'center' },
  { title: '프로젝트', key: 'project', align: 'center' },
  { title: '부서', key: 'department', align: 'center' },
]

const workHeaders = [
  { title: '사번', key: 'employeeId', align: 'center' },
  { title: '직원명', key: 'employeeName', align: 'center' },
  { title: '내/외국인', key: 'nationality', align: 'center' },
  { title: '프로젝트', key: 'project', align: 'center' },
  { title: '근무날짜', key: 'workDate', align: 'center' },
  { title: '근무시간', key: 'workStartTime', align: 'center' },
]

const fetchData = async () => {
  await DailyLaborStore.SEARCH_EMP_LIST()
  dailyLaborEmpList.value = await DailyLaborStore.dailyLaborEmpList

  console.log(dailyLaborEmpList.value)

  await BaseStore.FETCH_DEPTLIST()
  deptList.value = await BaseStore.deptList.map((e: any) => ({
    title: e.deptName,
    value: e.deptCode,
  }))
}

const filteredEmpList = computed(() => {
  return dailyLaborEmpList.value.filter((emp: any) => {
    return Object.values(emp).some(field => {
      if (typeof field === 'string')
        return field.toLowerCase().includes(search.value.toLowerCase())

      return false
    })
  })
})

const test1 = async () => {
  console.log(selectedRows.value)

  const attendDataList: any = []

  selectedRows.value.forEach(element => {
    const attendData = {
      employeeId: element.employeeId,
      employeeName: element.employeeName,
      project: element.project,
      workDate: element.workDate,
      workStartTime: element.workTime,
      workType: element.normalPayType,
      deadlineRequest: 'N',
    }

    attendDataList.push(attendData)
  })
  console.log(attendDataList)
  await DailyLaborStore.INSERT_ATTEND(attendDataList)
  selectedRows.value = []
  isSuccessFunc.value = true
}

const test2 = async () => {
  console.log(selectedRows.value)

  const attendDataList: any = []

  selectedRows.value.forEach(element => {
    const attendData = {
      employeeId: element.employeeId,
      workDate: element.workDate,
      workEndTime: element.workTime,
    }

    attendDataList.push(attendData)
  })
  console.log(attendDataList)
  await DailyLaborStore.UPDATE_WORK_ATTEND(attendDataList)
  selectedRows.value = []
  isSuccessFunc.value = true
}

onMounted(fetchData)
</script>

<template>
  <h1 class="mb-6">일용근로 근태등록</h1>
  <VCard>
    <VCardText class="d-flex flex-wrap py-4 gap-4">
      <VSpacer />
      <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
        <div style="inline-size: 10rem;">
          <AppTextField
            v-model="search"
            density="compact"
            placeholder="검색"
            append-inner-icon="tabler-search"
            single-line
            hide-details
            dense
            outlined
          />
        </div>
      </div>
    </VCardText>
    <VDivider />
    <VDataTable
      v-model="selectedRows"
      :headers="empHeaders"
      :items="filteredEmpList"
      :items-per-page="5"
      :footer-props="{
        'items-per-page-options': [5, 10, 20],
        'show-current-page': true,
        'show-first-last-page': true,
      }"
      show-select
      item-value="employeeId"
      return-object
    >
      <template #item.deptName="{ item }">
        {{ item.deptName }}
      </template>
    </VDataTable>
  </VCard>
  <br>
  <br>
  <VCard>
    <VCardText class="d-flex flex-wrap py-4 gap-4">
      <VSpacer />
      <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
        <VBtn @click="test1">
          <VIcon
            start
            icon="tabler-checkbox"
          />출근
        </VBtn>
        <VBtn @click="test2">
          <VIcon
            start
            icon="tabler-checkbox"
          />퇴근
        </VBtn>
      </div>
    </VCardText>
    <VDivider />
    <VDataTable
      :headers="workHeaders"
      :items="selectedRows"
    >
      <template #item.workDate="{ item }">
        <VRow>
          <VCol>
            <AppDateTimePicker
              v-model="item.workDate"
              show-adjacent-months
              show-decade-navs
              button-only
              right
            />
          </VCol>
        </VRow>
      </template>
      <template #item.workStartTime="{ item }">
        <VRow>
          <VCol>
            <AppDateTimePicker
              v-model="item.workTime"
              show-adjacent-months
              show-decade-navs
              button-only
              right
              :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
            />
          </VCol>
        </VRow>
      </template>
    </VDataTable>
  </VCard>
  <VSnackbar
    v-model="isSuccessFunc"
    location="top"
    :timeout="3000"
    color="success"
  >
    <VAlert
      density="compact"
      type="success"
      title="success!"
      text="완료되었습니다."
    />
  </VSnackbar>
</template>

<script setup lang="ts">
import { evalStore } from '@/store/hr/eval';
import { ref } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';

const store = evalStore()

const headers = [
  { title: '이름', key: 'empName', width: 80 },
  { title: '부서', key: 'deptName', width: 80 },
  { title: '직급', key: 'positionName', width: 80 },
  { title: '교육', key: 'durationOfTraining', width: 80 },
  { title: '자격증', key: 'numberOfCertificate', width: 100 },
  { title: '근태', key: 'numberOfRestDay', width: 80 },
  { title: '휴가', key: 'remainingHoliday', width: 80 },
  { title: '결격여부', key: 'disqualification', width: 110 },
  { title: '장기근속', key: 'career', width: 110 },
  { title: '총 점수', key: 'score', width: 100 },
  { title: '등급', key: 'grade', width: 80 },
  { title: '승인상태', key: 'status', width: 110 },
]

const isSuccessFunc = ref(false)
const selectYear = ref('')
const selectStatus = ref('')
const selectedRows = ref([])

const statusList = [
  { title: '미승인', value: '승인미완료' },
  { title: '승인', value: '승인완료' },
  { title: '반려', value: '승인반려' },
]

const evalList: any = ref([])

const searchEvalStatus = async () => {
  try {
    const searchYear = selectYear.value
    const status = selectStatus.value

    const selectData = {
      searchYear,
      status,
    }

    console.log(selectData)

    await store.SEARCH_EMP_EVAL_STATUS(selectData)
    evalList.value = await store.evalList
    console.log(evalList.value)
  }
  catch (error: any) {
    throw new Error(error)
  }
}

const approveEmpEval = async () => {
  console.log('승인')
  console.log('one', selectedRows.value)

  for (const row of selectedRows.value) {
    const { searchYear, empCode } = row

    const approvedEval = {
      searchYear,
      empCode,
      status: '승인완료',
    }

    await store.EDIT_EMP_EVAL(approvedEval)
  }

  searchEvalStatus()
  isSuccessFunc.value = true
}

const referEmpEval = async () => {
  console.log('반려')

  console.log('two', selectedRows.value)

  for (const row of selectedRows.value) {
    const { searchYear, empCode } = row

    const referEval = {
      searchYear,
      empCode,
      status: '승인반려',
    }

    await store.EDIT_EMP_EVAL(referEval)
  }

  searchEvalStatus()
  isSuccessFunc.value = true
}

const deleteEmpEval = async () => {
  console.log('삭제')
  console.log('three', selectedRows.value)

  try {
    // 삭제 작업 전에 초기화 작업 또는 필요한 작업 수행

    for (const row of selectedRows.value) {
      const { searchYear, empCode } = row

      const removeEval = {
        searchYear,
        empCode,
      }

      await store.DELETE_EMP_EVAL(removeEval)
    }

    searchEvalStatus()
    isSuccessFunc.value = true
  }
  catch (error) {
    console.error('삭제 중 오류 발생:', error.message)
  }

  // evalList.value = evalList.value.filter(
  //   (item) => !selectedRows.value.includes(item)
  // );

  // selectedRows.value = [];
}
</script>

<template>
<h1 class="mb-6">인사고과 관리</h1>
  <VCard>
    <br>
    <VRow>
      <VCol>
        <VSelect v-model="selectYear" class="ml-4" label="검색년도" :items="['2020', '2021', '2022', '2023']"
          variant="outlined" />
      </VCol>
      <VCol>
        <VSelect v-model="selectStatus" label="승인상태" :items="statusList" variant="outlined" />
      </VCol>
      <VCol>
        <VBtn color="primary" @click="searchEvalStatus">
          승인상태 조회
        </VBtn>
      </VCol>
    </VRow>
    <VDataTable v-model="selectedRows" class="mt-8" :headers="headers" :items="evalList" :items-per-page="10" show-select
      item-value="empCode" return-object />
    <VRow>
      <VCol>
        <VBtn class="ma-1" color="primary" @click="approveEmpEval">
          승인
        </VBtn>
        <VBtn class="ma-1" color="secondary" @click="referEmpEval">
          반려
        </VBtn>
        <VBtn class="ma-1" color="error" @click="deleteEmpEval">
          삭제
        </VBtn>
      </VCol>
    </VRow>
  </VCard>
  <VSnackbar v-model="isSuccessFunc" location="top" :timeout="3000" color="success">
    <VAlert density="compact" type="success" title="success!" text="완료되었습니다." />
  </VSnackbar>
</template>

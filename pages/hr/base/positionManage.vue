<script setup lang="ts">
import { baseStore } from '@/store/hr/base';
import { VDataTable } from 'vuetify/labs/VDataTable';

const list = ref([])

const fetchData = async () => {
  await baseStore().FETCH_POSLIST()
  list.value = baseStore().posList
  console.log(list)
}

const headers = [
  { title: '사업장코드', key: 'workplaceCode' },
  { title: '부서코드', key: 'deptCode' },
  { title: '직급코드', key: 'positionCode' },
  { title: '직급명', key: 'positionName' },
  { title: '설명', key: 'description' },
  { title: '연봉', key: 'baseSalary' },
  { title: '호봉', key: 'hobongRatio' },
]

const tab = ref('personal-info')

onBeforeMount(fetchData)
</script>

<template>
  <h1 class="mb-6">직급정보관리</h1>
  <VCard>
<VTabs
      v-model="tab"
      height="70"
    >
      <VTab value="personal-info">
        직급정보관리
      </VTab>
    </VTabs>
  </VCard>
  <VDataTable
    :headers="headers"
    :items="list"
    :items-per-page="5"
  />
</template>

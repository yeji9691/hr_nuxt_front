import { hrApi } from '@/api';

const conExp = 'conexpense/conexp'

// 전체 조회
function getReqAllList() {
  return hrApi.get(`${conExp}`)
}

// 검색
function findConList(payload: { startDate?: string; endDate?: string; searchEmpCode?: string }) {
  console.log(payload)

  return hrApi.get(`${conExp}/${payload.startDate}/${payload.endDate}/${payload.searchEmpCode}`)
}

// 등록(신규)
function addConRegi(conRegi: any) {
  console.log('경조비 신청 API', conRegi)

  return hrApi.post(`${conExp}`, conRegi)
}

// 수정
function editConExp(conUpdate: any) {
  console.log('내역 수정', conUpdate)

  return hrApi.put(`${conExp}`, conUpdate)
}

// 삭제
function removeConExp(reqNum: string) {
  console.log('내역 삭제', reqNum)

  return hrApi.delete(`${conExp}`, {
    params: {
      reqNum,
    },
  })
}

export {
  addConRegi, editConExp, findConList, getReqAllList, removeConExp
}

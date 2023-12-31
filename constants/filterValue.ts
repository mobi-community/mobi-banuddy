type value = {
  title: string
  itemArray: string[]
}

export const animalcategory = ['전체', '개', '고양이', '기타']
export const animalSex = ['전체', '암컷', '수컷']
export const adoptState = ['전체', '입양대기', '입양진행중', '입양완료']
export const fosterState = ['전체', '센터보호중', '임시보호중']
const dosi = [
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '경기도',
  '강원특별자치도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주특별자치도',
].sort()

const shelterCategory = ['전체', '동물병원', '보호소']

export const filterForShelter: value[] = [
  { title: '지역선택', itemArray: dosi },
  { title: '기관유형', itemArray: shelterCategory },
]

export const filterForSeoul: value[] = [
  { title: '동물구분', itemArray: animalcategory },
  { title: '성별', itemArray: animalSex },
  { title: '입양상태', itemArray: adoptState },
  { title: '임시보호상태', itemArray: fosterState },
]

export const filterForNational: value[] = [
  { title: '지역선택', itemArray: dosi },
  { title: '동물구분', itemArray: animalcategory },
  { title: '입양상태', itemArray: adoptState },
  { title: '임시보호상태', itemArray: fosterState },
]

'use client'

import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FindAddress from '@/components/address/Address'
import '../style.css'
import Modal from '@/components/modal/Modal'

const schema = yup.object().shape({
  name: yup.string().required('이름을 입력하세요'),
  phoneNumber: yup.string().required('휴대폰번호를 입력해주세요'),
  emergencyContact: yup.string().required('비상연락처를 입력해주세요'),
  age: yup.string().required('나이를 입력해주세요'),
  occupation: yup.string().required('직장정보를 입력해주세요'),
  isFemale: yup
    .string()
    .required('성별을 선택해주세요')
    .oneOf(['male', 'female']),
  isMarried: yup
    .string()
    .required('결혼여부를 선택하세요')
    .oneOf(['married', 'unmarried'], '결혼여부를 선택하세요'),
  address: yup.string().required('집주소를 입력하세요'),
  petName: yup.string().required('희망동물 이름을 입력해주세요'),
  shelterName: yup.string().required('보호소명을 입력해주세요'),
  shelterContact: yup.string().required('보호소 연락처를 입력해주세요'),
  consentText: yup
    .string()
    .required('개인정보 수집 및 이용에 대한 동의를 입력하세요'),
  consentCheckbox: yup.boolean().oneOf([true], '동의해야 합니다'),
})

interface ApplicationFormData {
  name: string
  phoneNumber: string
  emergencyContact: string
  age: string
  occupation: string
  isFemale: string
  isMarried: string
  address: string
  petName: string
  shelterName: string
  shelterContact: string
  consentText: string
  consentCheckbox: boolean
}

const ApplicationForm: React.FC = () => {
  const [address, setAddress] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: yupResolver(schema) as any,
    // any 이유를 아직 모르겠음.
  })

  const onSubmit: SubmitHandler<ApplicationFormData> = async (data) => {}
  //   try {
  //     const docRef = await addDoc(collection(db, 'application'), data)
  //     console.log(docRef.id)
  //     setIsModalOpen(true)
  //   } catch (error) {
  //     console.error('Error', error)
  //   }
  // }

  // useEffect(() => {
  //   setValue('address', address)
  //}, [address, setValue])

  return (
    <>
      <div className="w-content m-auto bg-[#eaebf0] pb-20">
        <div>
          <img src="/images/formHeader.png" />
        </div>
        <div className="flex flex-col text-center">
          <h2 className="text-xl font-bold mb-2 pb-[5px] pt-[10px]">
            입양 신청
          </h2>
          <p className="pb-[40px]">
            평생 책임질 준비가 되셨나요? <br />
            동물들에게 입양은 마지막 기회이자 유일한 희망입니다.
          </p>
        </div>
        <div className="pl-[80px] ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2 pb-[20px] pt-[30px]">
                개인정보 입력
              </h2>
              <div className="flex flex mb-4">
                <label className="label-application">성명</label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`input-application p-2 ${
                        errors?.name ? 'border-red-500' : ''
                      }`}
                      placeholder="성함을 입력해주세요"
                    />
                  )}
                />
                {errors?.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex mb-4">
                <label className="label-application">연락처</label>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`input-application p-2 ${
                        errors?.phoneNumber ? 'border-red-500' : ''
                      }`}
                      placeholder="휴대폰번호를 입력해주세요"
                    />
                  )}
                />
                {errors?.phoneNumber && (
                  <p className="text-red-500">{errors.phoneNumber.message}</p>
                )}
              </div>

              <div className="flex flex mb-4">
                <label className="label-application">비상연락처</label>
                <Controller
                  name="emergencyContact"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`input-application p-2 ${
                        errors?.emergencyContact ? 'border-red-500' : ''
                      }`}
                      placeholder="비상연락처를 입력해주세요"
                    />
                  )}
                />
                {errors?.emergencyContact && (
                  <p className="text-red-500">
                    {errors.emergencyContact.message}
                  </p>
                )}
              </div>

              <div className="flex flex mb-4">
                <label className="label-application">성별</label>
                <div className="flex items-center ml-4">
                  <Controller
                    name="isFemale"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="radio"
                          value="female"
                          id="female"
                          className="mr-2"
                        />
                        <label htmlFor="female" className="mr-4  text-sm">
                          여성
                        </label>
                      </>
                    )}
                  />
                  <Controller
                    name="isFemale"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="radio"
                          value="male"
                          id="male"
                          className="mr-2"
                        />
                        <label htmlFor="male" className="text-sm">
                          남성
                        </label>
                      </>
                    )}
                  />
                </div>
                {errors?.isFemale && (
                  <p className="text-red-500">{errors.isFemale.message}</p>
                )}
              </div>

              <div className="flex flex mb-4">
                <label className="label-application">나이</label>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`input-application p-2 ${
                        errors?.age ? 'border-red-500' : ''
                      }`}
                      placeholder="만나이를 입력해주세요"
                    />
                  )}
                />
                {errors?.age && (
                  <p className="text-red-500">{errors.age.message}</p>
                )}
              </div>

              <div className="flex flex mb-4">
                <label className="label-application">집주소</label>
                <Controller
                  name="address"
                  control={control}
                  defaultValue={address}
                  render={({ field }) => (
                    <div className="h-[50px] flex align-center text-center gap-2">
                      <div>{field.value}</div> {/* 값표시 */}
                      <FindAddress setter={setAddress} />
                    </div>
                  )}
                />
                {errors?.address && (
                  <p className="text-red-500">{errors.address.message}</p>
                )}
              </div>

              <div className="flex flex mb-4">
                <label className="label-application">직장정보</label>
                <Controller
                  name="occupation"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`input-application p-2 ${
                        errors?.occupation ? 'border-red-500' : ''
                      }`}
                      placeholder="직장정보를 입력해주세요"
                    />
                  )}
                />
                {errors?.occupation && (
                  <p className="text-red-500">{errors.occupation.message}</p>
                )}
              </div>

              <div className="flex flex mb-4">
                <label className="label-application">결혼여부</label>
                <div className="flex items-center ml-4">
                  <Controller
                    name="isMarried"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="radio"
                          value="married"
                          id="married"
                          className="mr-2"
                        />
                        <label htmlFor="married" className="mr-4 text-sm">
                          기혼
                        </label>
                      </>
                    )}
                  />
                  <Controller
                    name="isMarried"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="radio"
                          value="unmarried"
                          id="unmarried"
                          className="mr-2"
                        />
                        <label htmlFor="unmarried" className="text-sm">
                          미혼
                        </label>
                      </>
                    )}
                  />
                </div>
                {errors?.isMarried && (
                  <p className="text-red-500">{errors.isMarried.message}</p>
                )}
              </div>

              <div className="flex flex-col mb-4">
                <label className="label-application" style={{ width: '500px' }}>
                  개인정보 수집 및 이용에 대한 동의
                </label>
                <div className="border rounded p-4 bg-white w-[600px] text-sm ml-[50px]">
                  - 수집 목적: 반려동물 입양자에 대한 신원 확보 <br />
                  - 수집 항목: 성명, 주소, 연락처 및 반려동물 입양에 필요한 기본
                  정보 <br />- 보유 및 이용 기간: 1년 (해당 정보는 저장되어
                  가공되거나 다른 목적에 의해 사용되지 않습니다.)
                </div>
              </div>

              <div className="flex items-center mb-4 ml-[50px]">
                <label className="pr-3">동의하겠습니까?</label>
                <Controller
                  name="consentCheckbox"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="checkbox"
                      className="mr-2"
                      value="false"
                      onChange={(e) =>
                        field.onChange(e.target.checked ? 'true' : 'false')
                      }
                    />
                  )}
                />
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2 pb-[20px] pt-[30px]">
                입양정보 입력
              </h2>
              <div className="flex mb-4">
                <label className="label-application">희망동물 이름</label>
                <Controller
                  name="petName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="input-application"
                      placeholder="희망동물 이름"
                    />
                  )}
                />
                {errors?.petName && (
                  <p className="text-red-500">{errors.petName.message}</p>
                )}
              </div>
              <div className="flex  mb-4">
                <label className="label-application">보호소명</label>
                <Controller
                  name="shelterName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="input-application"
                      placeholder="보호소명"
                    />
                  )}
                />
                {errors?.shelterName && (
                  <p className="text-red-500">{errors.shelterName.message}</p>
                )}
              </div>
              <div className="flex  mb-4">
                <label className="label-application ">보호소 연락처</label>
                <Controller
                  name="shelterContact"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="input-application"
                      placeholder="보호소 연락처"
                    />
                  )}
                />
                {errors?.shelterContact && (
                  <p className="text-red-500">
                    {errors.shelterContact.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col text-center mt-[50px] mb-[30px] text-sm">
              저희 페이지는 직접 유기동물의 입양을 진행하지 않으며, 입력하신
              개인정보는 저장되지 않습니다. <br /> 입양에 관심이 있으신 분들은
              위의 연락처를 통해 각 보호소의 웹사이트나 연락처로 직접 문의하시기
              바랍니다. <br />
              반려동물 입양은 한 생명에 대한 결정이므로, 책임감과 충분한 사전
              조사를 거친 뒤 결정을 내려주시길 부탁드립니다. <br />
              유기동물에 관심을 가지고 소중한 선택을 하신 여러분들께
              감사드립니다.
            </div>
            <button
              className="submit-btn"
              type="submit"
              style={{ display: 'block', margin: '0 auto' }}
            >
              제출하기
            </button>
          </form>
        </div>
      </div>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>입양 신청이 완료되었습니다! 담당자가 곧 연락드릴 예정입니다.</p>
      </Modal>
    </>
  )
}

export default ApplicationForm

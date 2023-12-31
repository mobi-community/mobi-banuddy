'use client'

import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import './style.css'
import Link from 'next/link'
import Image from 'next/image'
import Banner from '/public/assets/Banuddy.png'
import { useRouter } from 'next/navigation'
import BanuddyIconImage from '/public/images/signup-paw.png'
import { supabase } from '@/supa-auth/lib/supabase'
import { inputFields } from './inputFields'

const schema = yup.object().shape({
  name: yup.string().required('이름을 입력해주세요'),
  email: yup
    .string()
    .email('유효한 이메일을 입력해주세요')
    .required('이메일을 입력해주세요'),
  password: yup.string().required('비밀번호를 입력해주세요'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], '비밀번호가 일치하지 않습니다')
    .required('비밀번호 확인을 입력해주세요'),
  phoneNumber: yup.string().required('휴대폰번호를 입력해주세요'),
})

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
}

export default function SignUp() {
  const [iconColors, setIconColors] = useState([
    'bg-gray-200',
    'bg-gray-200',
    'bg-gray-200',
    'bg-gray-200',
    'bg-gray-200',
  ])
  const [inputValues, setInputValues] = useState(['', '', '', '', ''])
  const router = useRouter()

  useEffect(() => {
    const newIconColors = inputValues.map((value) =>
      value.length > 0 ? 'bg-yellow-500' : 'bg-gray-200',
    )
    setIconColors(newIconColors)
  }, [inputValues])

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues]
    newInputValues[index] = value
    setInputValues(newInputValues)
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('Form submitted:', data)
    if (isValid) {
      try {
        const { data: signUpResponse, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: 'http://localhost:3000/completeSignUp',
            data: {
              user_name: data.name,
              user_phone_number: data.phoneNumber,
            },
          },
        })
        if (error) throw error
        if (signUpResponse?.user) {
          alert('인증메일을 발송했습니다.')
          router.push('/login')
        }
      } catch (error) {
        console.error('Error', error)
      }
    }
  }

  return (
    <div className="w-content m-auto container-signUp">
      <div className="py-6">
        <Image src={Banner} alt="Logo" className=" w-full h-10 " />
      </div>
      <div className="flex justify-center space-x-4">
        {iconColors.map((color, index) => (
          <div
            key={index}
            className={`w-16 h-16 square-full rounded-2xl ${color}`}
          >
            {inputValues[index] ? (
              <Image
                src={BanuddyIconImage}
                alt={`Icon ${index + 1}`}
                width={64}
                height={64}
              />
            ) : null}
          </div>
        ))}
      </div>

      <div className="form">
        <h1 className="text-4xl font-bold mb-4 pb-4	">회원가입</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-1/2 "
        >
          {inputFields.map((field) => (
            <div key={field.name}>
              <input
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.name)}
                onChange={(e) => handleInputChange(field.index, e.target.value)}
                className="input-signup icon-input"
              />
              {errors[field.name] && (
                <span className="input-error-message">
                  {field.errorMessage}
                </span>
              )}
            </div>
          ))}
          <button type="submit" className="submit-btn">
            가입하기
          </button>
          <Link href="/login" className="text-center">
            <button className="text-sm font-bold py-3">로그인 하러가기</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

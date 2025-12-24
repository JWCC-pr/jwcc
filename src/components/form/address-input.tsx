'use client'

import { useEffect, useRef } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Input } from '@chakra-ui/react/input'

import { useFormContext, useFormState } from 'react-hook-form'

import { FormHelper } from '../form-helper'

const AddressInput: React.FC = () => {
  const { register, control, setValue, clearErrors } = useFormContext()
  const { errors } = useFormState({ control })
  const scriptLoaded = useRef(false)

  // 카카오 우편번호 서비스 스크립트 로드
  useEffect(() => {
    if (scriptLoaded.current || typeof window === 'undefined') return

    // 이미 스크립트가 로드되어 있는지 확인
    if (window.daum?.Postcode) {
      scriptLoaded.current = true
      return
    }

    const script = document.createElement('script')
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    script.async = true
    script.onload = () => (scriptLoaded.current = true)

    document.head.appendChild(script)

    return () => void document.head.removeChild(script)
  }, [])

  /** 주소 검색 팝업 열기 */
  const handleAddressSearch = () => {
    if (!scriptLoaded.current || !window.daum) {
      console.error('카카오 우편번호 서비스를 불러올 수 없습니다.')
      return
    }

    new window.daum.Postcode({
      oncomplete: (data) => {
        // 우편번호 설정
        setValue('postcode', data.zonecode)
        clearErrors('postcode')

        // 도로명 주소 선택 시 (R: 도로명, J: 지번)
        const fullAddress = data.address
        let extraAddress = ''

        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.addressType === 'R') {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddress += data.bname
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== '' && data.buildingName !== '') {
            extraAddress +=
              extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraAddress !== '') {
            extraAddress = ` (${extraAddress})`
          }
        }

        // 주소 필드에 값 설정
        setValue('address', fullAddress + extraAddress)
        clearErrors('address')
      },
    }).open()
  }

  return (
    <Box display="flex" flexDirection="column" gap="4px">
      <FormHelper
        required
        label="주소"
        message={{ error: errors.address?.message?.toString() }}
      >
        <Box w="full" display="flex" alignItems="center" gap="8px">
          <Input
            size="lg"
            variant="outline"
            colorPalette="grey"
            placeholder="주소"
            {...register('address')}
            flex="1"
            readOnly
          />
          <Button
            type="button"
            size="lg"
            variant="solid"
            colorPalette="primary"
            onClick={handleAddressSearch}
          >
            주소 검색
          </Button>
        </Box>
      </FormHelper>
      <FormHelper
        message={{
          error: errors.addressDetail?.message?.toString(),
        }}
      >
        <Input
          size="lg"
          variant="outline"
          colorPalette="grey"
          placeholder="상세 주소(선택)"
          {...register('addressDetail')}
        />
      </FormHelper>
    </Box>
  )
}

export default AddressInput

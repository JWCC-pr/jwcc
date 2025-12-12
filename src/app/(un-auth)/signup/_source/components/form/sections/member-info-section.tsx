'use client'

import { Box } from '@chakra-ui/react/box'
import { Input } from '@chakra-ui/react/input'
import { Text } from '@chakra-ui/react/text'

import { useFormContext, useFormState } from 'react-hook-form'

import { FormHelper } from '@/components/form-helper'
import AddressInput from '@/components/form/address-input'
import Select from '@/components/select'

import { SignupFormDataType } from '../../../hooks/useSignupForm'

const MemberInfoSection: React.FC = () => {
  const { register, control } = useFormContext<SignupFormDataType>()
  const { errors } = useFormState({ control })

  return (
    <Box display="flex" flexDirection="column">
      <Text
        py="10px"
        textStyle="pre-heading-6"
        color="grey.8"
        borderBottom="1px solid"
        borderColor="grey.10"
      >
        회원 정보
      </Text>
      <Box py="16px" display="flex" flexDirection="column" gap="32px">
        <FormHelper
          required
          label="이름"
          message={{
            error: errors.name?.message,
            help: '교적에 등록된 실명을 입력해주세요.',
          }}
        >
          <Input
            size="lg"
            variant="outline"
            colorPalette="grey"
            placeholder="이름"
            {...register('name')}
          />
        </FormHelper>

        <FormHelper
          required
          label="세례명"
          message={{
            error: errors.baptismName?.message,
          }}
        >
          <Input
            size="lg"
            variant="outline"
            colorPalette="grey"
            placeholder="세례명"
            {...register('baptismName')}
          />
        </FormHelper>

        <AddressInput />

        <FormHelper
          required
          label="생년월일"
          message={{
            error: errors.birthDate?.message,
          }}
        >
          <Box w="full" display="flex" gap="4px">
            <Select
              options={[]}
              placeholder="년도"
              {...register('birthDate.year')}
              flex="1"
            />
            <Select
              options={[]}
              placeholder="월"
              {...register('birthDate.month')}
              flex="1"
            />
            <Select
              options={[]}
              placeholder="일"
              {...register('birthDate.day')}
              flex="1"
            />
          </Box>
        </FormHelper>

        <FormHelper
          required
          label="분과"
          message={{
            error: errors.baptismName?.message,
          }}
        >
          <Select
            options={[]}
            placeholder="분과 선택"
            {...register('department')}
          />
        </FormHelper>
      </Box>
    </Box>
  )
}

export default MemberInfoSection

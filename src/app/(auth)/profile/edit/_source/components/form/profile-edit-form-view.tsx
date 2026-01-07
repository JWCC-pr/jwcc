'use client'

import { Badge } from '@chakra-ui/react/badge'
import { Box } from '@chakra-ui/react/box'
import { Input } from '@chakra-ui/react/input'
import { Text } from '@chakra-ui/react/text'

import { useFormContext, useFormState } from 'react-hook-form'

import { FormHelper } from '@/components/form-helper'
import AddressInput from '@/components/form/address-input'
import Select from '@/components/select'

import { ProfileEditFormDataType } from '../../hooks/useProfileEditForm'

const TODAY_YEAR = new Date().getFullYear()

interface ProfileEditFormViewProps {
  grade: string
  departments: string[]
}

const ProfileEditFormView: React.FC<ProfileEditFormViewProps> = ({
  grade,
  departments,
}) => {
  const { register, control } = useFormContext<ProfileEditFormDataType>()
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
        <Box display="flex" flexDirection="column" gap="6px">
          <Text textStyle="pre-body-5" color="grey.7">
            이름
          </Text>
          <Text textStyle="pre-body-4" color="grey.10">
            {grade}
          </Text>
        </Box>

        <FormHelper
          required
          label="이름"
          message={{
            error: errors.name?.message,
            help: '교적에 등록된 실명을 입력해 주세요.',
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
            help: `세례를 받지 않으신 분은 '없음' 또는 '예비신자'로 입력해 주세요.`,
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
              options={Array(120)
                .fill(0)
                .map((_, index) => ({
                  label: (TODAY_YEAR - index).toString() + '년',
                  value: (TODAY_YEAR - index).toString(),
                }))}
              placeholder="년도"
              flex="1"
              {...register('birthDate.year')}
            />
            <Select
              options={Array(12)
                .fill(0)
                .map((_, index) => ({
                  label: (index + 1).toString() + '월',
                  value: (index + 1).toString(),
                }))}
              placeholder="월"
              flex="1"
              {...register('birthDate.month')}
            />
            <Select
              options={Array(31)
                .fill(0)
                .map((_, index) => ({
                  label: (index + 1).toString() + '일',
                  value: (index + 1).toString(),
                }))}
              placeholder="일"
              flex="1"
              {...register('birthDate.day')}
            />
          </Box>
        </FormHelper>

        <Box display="flex" flexDirection="column" gap="4px">
          <Box display="flex" alignItems="center" gap="4px">
            <Text textStyle="pre-body-5" color="grey.7">
              소속 단체
            </Text>
            <Box w="4px" h="4px" bg="primary.4" rounded="full" />
          </Box>
          <Box display="flex" flexWrap="wrap" gap="4px">
            {departments.map((department) => (
              <Badge
                key={department}
                size="lg"
                variant="subtle"
                colorPalette="grey"
              >
                {department}
              </Badge>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileEditFormView

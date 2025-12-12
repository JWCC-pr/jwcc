'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Checkbox } from '@chakra-ui/react/checkbox'
import { Text } from '@chakra-ui/react/text'
import { CaretRightIcon } from '@phosphor-icons/react'

import { useFormContext, useWatch } from 'react-hook-form'

import { SignupFormDataType } from '../../../hooks/useSignupForm'

const AgreementSection: React.FC = () => {
  const { control, setValue } = useFormContext<SignupFormDataType>()
  const { agreement } = useWatch({ control })

  const privacyPolicyChecked = agreement?.privacyPolicy ?? false
  const termsOfServiceChecked = agreement?.termsOfService ?? false

  const isAllChecked = privacyPolicyChecked && termsOfServiceChecked
  const isIndeterminate =
    (privacyPolicyChecked || termsOfServiceChecked) && !isAllChecked

  const handleToggleAll = () => {
    const newValue = !isAllChecked

    setValue('agreement.privacyPolicy', newValue, {
      shouldValidate: true,
    })
    setValue('agreement.termsOfService', newValue, { shouldValidate: true })
  }
  const handleChange = (
    name: keyof SignupFormDataType['agreement'],
    checked: boolean,
  ) => {
    setValue(`agreement.${name}`, checked, { shouldValidate: true })
  }

  return (
    <Box display="flex" flexFlow="column nowrap" gap="10px">
      <Checkbox.Root
        py="6px"
        size="md"
        variant="solid"
        colorPalette="primary"
        checked={isIndeterminate ? 'indeterminate' : isAllChecked}
        onCheckedChange={handleToggleAll}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label textStyle="pre-body-5" color="grey.10">
          모든 약관에 동의합니다
        </Checkbox.Label>
      </Checkbox.Root>

      <Box w="full" h="1px" bg="border.basic.2" />

      <Box display="flex" flexFlow="column nowrap" px="12px">
        <Box
          py="6px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Checkbox.Root
            size="md"
            variant="solid"
            colorPalette="primary"
            checked={privacyPolicyChecked}
            onCheckedChange={({ checked }) =>
              handleChange('privacyPolicy', checked === true)
            }
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label display="flex" alignItems="center" gap="4px">
              <Text color="primary.4" textStyle="pre-body-5">
                [필수]
              </Text>
              <Text textStyle="pre-body-6" color="grey.10">
                서비스 이용 약관
              </Text>
            </Checkbox.Label>
          </Checkbox.Root>
          <Button type="button" size="sm" variant="ghost" colorPalette="grey">
            더보기
            <CaretRightIcon size="16px" />
          </Button>
        </Box>
        <Box
          py="6px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Checkbox.Root
            size="md"
            variant="solid"
            colorPalette="primary"
            checked={termsOfServiceChecked}
            onCheckedChange={({ checked }) =>
              handleChange('termsOfService', checked === true)
            }
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label display="flex" alignItems="center" gap="4px">
              <Text color="primary.4" textStyle="pre-body-5">
                [필수]
              </Text>
              <Text textStyle="pre-body-6" color="grey.10">
                개인정보 수집 및 이용 동의
              </Text>
            </Checkbox.Label>
          </Checkbox.Root>
          <Button type="button" size="sm" variant="ghost" colorPalette="grey">
            더보기
            <CaretRightIcon size="16px" />
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default AgreementSection

'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'

import { useFormContext, useFormState } from 'react-hook-form'

import useMe from '@/hooks/useMe'

import { ProfileEditFormDataType } from '../../hooks/useProfileEditForm'
import PasswordResetButton from '../password-reset-button'
import SignOutButton from '../sign-out-button'

interface ProfileEditFormContainerProps {
  onSubmit: () => void
  view: React.ReactNode
}

const ProfileEditFormContainer: React.FC<ProfileEditFormContainerProps> = ({
  onSubmit,
  view,
}) => {
  const { data: me } = useMe()

  const { control } = useFormContext<ProfileEditFormDataType>()
  const { isValid } = useFormState({ control })

  if (!me) return null

  return (
    <Box
      as="form"
      onSubmit={onSubmit}
      py="56px 120px"
      w="362px"
      display="flex"
      flexDirection="column"
      gap="36px"
      mx="auto"
    >
      <Box display="flex" flexDirection="column" gap="32px">
        <Box display="flex" flexDirection="column" gap="36px">
          <Text textStyle="pre-heading-2" color="grey.10">
            내 정보 수정
          </Text>

          <Box display="flex" flexDirection="column">
            <Box py="10px" borderBottom="1px solid" borderColor="grey.10">
              <Text textStyle="pre-heading-6" color="grey.8">
                로그인 정보
              </Text>
            </Box>
            <Box py="10px" display="flex" flexDirection="column" gap="32px">
              <Box display="flex" flexDirection="column" gap="4px">
                <Box display="flex" alignItems="center" gap="4px">
                  <Text textStyle="pre-body-5" color="grey.7">
                    이메일
                  </Text>
                  <Box w="4px" h="4px" bg="primary.4" rounded="full" />
                </Box>
                <Text textStyle="pre-body-4" color="grey.10">
                  {me.email}
                </Text>
              </Box>
              <Box display="flex" flexDirection="column" gap="4px">
                <Box display="flex" alignItems="center" gap="4px">
                  <Text textStyle="pre-body-5" color="grey.7">
                    비밀번호
                  </Text>
                  <Box w="4px" h="4px" bg="primary.4" rounded="full" />
                </Box>

                <PasswordResetButton />
              </Box>
            </Box>
          </Box>
        </Box>

        {view}
      </Box>

      <Box
        py="16px"
        display="flex"
        flexDirection="column"
        gap="10px"
        alignItems="center"
      >
        <Button
          w="full"
          type="submit"
          size="lg"
          variant="solid"
          disabled={!isValid}
        >
          수정
        </Button>
        <SignOutButton />
      </Box>
    </Box>
  )
}

export default ProfileEditFormContainer

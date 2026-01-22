'use client'

import { useRouter } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'

import { useFormContext, useFormState } from 'react-hook-form'

import { EditorialFormDataType } from '../hooks/useEditorialForm'

interface EditorialFormContainerProps {
  onSubmit: () => void
  view: React.ReactNode
}

const EditorialFormContainer: React.FC<EditorialFormContainerProps> = ({
  onSubmit,
  view,
}) => {
  const router = useRouter()
  const { control } = useFormContext<EditorialFormDataType>()
  const { isValid } = useFormState({ control })

  const handleCancel = () => {
    router.back()
  }

  return (
    <Box as="form" onSubmit={onSubmit} display="flex" flexDirection="column">
      <Box py="20px" borderTop="1.5px solid" borderColor="grey.10">
        <Text textStyle="pre-heading-2" color="grey.10">
          게시글 작성
        </Text>
      </Box>

      {view}

      <Box w={['320px', '362px']} py="16px" display="flex" gap="10px" mx="auto">
        <Button
          type="button"
          size="lg"
          variant="solid"
          colorPalette="grey"
          flex="1"
          onClick={handleCancel}
        >
          취소
        </Button>
        <Button
          type="submit"
          size="lg"
          variant="solid"
          colorPalette="primary"
          flex="1"
          disabled={!isValid}
        >
          등록
        </Button>
      </Box>
    </Box>
  )
}

export default EditorialFormContainer

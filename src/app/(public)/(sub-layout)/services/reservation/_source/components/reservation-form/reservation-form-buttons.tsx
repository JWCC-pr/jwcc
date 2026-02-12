'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'

import { useFormContext, useFormState } from 'react-hook-form'

interface ReservationFormButtonsProps {
  confirmText: string
  onCancel: () => void
}

const ReservationFormButtons: React.FC<ReservationFormButtonsProps> = ({
  confirmText,
  onCancel,
}) => {
  const { control } = useFormContext()
  const { isValid } = useFormState({ control })

  return (
    <Box w={['320px', '362px']} py="16px" display="flex" gap="10px" mx="auto">
      <Button
        type="button"
        size="lg"
        variant="solid"
        colorPalette="grey"
        flex="1"
        onClick={onCancel}
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
        {confirmText}
      </Button>
    </Box>
  )
}

export default ReservationFormButtons

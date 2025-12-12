import { Field as ChakraField, Text, TextProps } from '@chakra-ui/react'

interface FormHelperProps extends Omit<ChakraField.RootProps, 'label'> {
  label?: React.ReactNode
  children: React.ReactNode | React.ReactNode[]

  isError?: boolean

  message?: {
    help?: string
    error?: string
    success?: string
  }

  styles?: {
    label?: TextProps
    help?: TextProps
    error?: TextProps
    success?: TextProps
  }
}

/**
 * Chakra 의 Field를 Wrapping 하여 Label, Error Text, Success Text 등을 추가로 넘겨 줄수 있는 컴포넌트입니다.
 *
 * Chakra Field를
 * Chakra 의 Form Element 를 children 으로 받아, isInvalid, isDisabled, isRequired 와 같은 상태를
 * 자식 Chakra Form Component 에게 Context 로 전달해줍니다.
 *
 * @see https://chakra-ui.com/docs/components/field
 * */
export const FormHelper = ({
  //
  children,
  label,

  isError = false,

  message,
  styles,

  ...basisProps
}: FormHelperProps) => {
  const isShowErrorText = !!message?.error
  const isShowSuccessText = !!message?.success && !isShowErrorText
  const isShowHelperText =
    !!message?.help && !isShowErrorText && !isShowSuccessText

  return (
    <ChakraField.Root invalid={isShowErrorText || isError} {...basisProps}>
      {!!label && (
        <ChakraField.Label>
          <Text textStyle="pre-body-5" color="content.3" {...styles?.label}>
            {label}
          </Text>
        </ChakraField.Label>
      )}
      {children}
      {isShowErrorText && (
        <ChakraField.ErrorText
          textStyle="pre-caption-2"
          color="accent.red2"
          {...styles?.error}
        >
          {message?.error}
        </ChakraField.ErrorText>
      )}
      {isShowSuccessText && (
        <ChakraField.HelperText {...styles?.success}>
          <Text textStyle="pre-cation-2" color="accent.green.2" mt="8px">
            {message?.success}
          </Text>
        </ChakraField.HelperText>
      )}
      {isShowHelperText && (
        <ChakraField.HelperText {...styles?.help}>
          <Text textStyle="pre-cation-2" color="content.4" mt="8px">
            {message?.help}
          </Text>
        </ChakraField.HelperText>
      )}
    </ChakraField.Root>
  )
}

import { defineRecipe } from '@chakra-ui/react'

export const textareaRecipe = defineRecipe({
  className: 'chakra-textarea',
  base: {
    width: '100%',
    minWidth: '0',
    outline: '0',
    position: 'relative',
    appearance: 'none',
    textAlign: 'start',
    resize: 'none',
  },
  variants: {
    size: {
      sm: {
        textStyle: 'pre-caption-2',
        p: '4px 8px',
        rounded: '6px',
      },
      md: {
        textStyle: 'pre-body-6',
        p: '6px 10px',
        rounded: '8px',
      },
      lg: {
        textStyle: 'pre-body-4',
        p: '8px 12px',
        rounded: '10px',
      },
    },
    variant: {
      outline: {
        bg: 'grey.0',
        border: '1px solid',
        borderColor: 'grey.2',
        color: 'grey.8',
        _placeholder: {
          color: 'grey.5',
        },
        _focus: {
          borderWidth: '1.5px',
          borderColor: 'primary.4',
        },
        _invalid: {
          borderWidth: '1.5px',
          borderColor: 'accent.red2',
        },
        _disabled: {
          borderColor: 'grey.1',
          opacity: 0.4,
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
})

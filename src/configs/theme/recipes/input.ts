import { defineRecipe } from '@chakra-ui/react'

export const inputRecipe = defineRecipe({
  className: 'chakra-input',
  base: {
    width: '100%',
    minWidth: '0',
    outline: '0',
    position: 'relative',
    appearance: 'none',
    textAlign: 'start',
    height: 'var(--input-height)',
    minW: 'var(--input-height)',
    '--focus-color': 'colors.colorPalette.focusRing',
    '--error-color': 'colors.accent.red2',
    color: 'grey.8',
    _placeholder: {
      color: 'grey.5',
    },
    _focus: {
      borderWidth: '1.5px',
      borderColor: 'primary.4',
    },
    _invalid: {
      focusRingColor: 'var(--error-color)',
      borderColor: 'var(--error-color)',
    },
    _disabled: {
      borderColor: 'grey.1',
      opacity: 0.4,
    },
  },
  variants: {
    size: {
      sm: {
        textStyle: 'pre-caption-2',
        px: '8px',
        '--input-height': '32px',
        rounded: '6px',
      },
      md: {
        textStyle: 'pre-body-6',
        px: '10px',
        '--input-height': '40px',
        rounded: '8px',
      },
      lg: {
        textStyle: 'pre-body-4',
        px: '12px',
        '--input-height': '48px',
        rounded: '10px',
      },
    },
    variant: {
      outline: {
        bg: 'grey.0',
        border: '1px solid',
        borderColor: 'grey.2',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
})

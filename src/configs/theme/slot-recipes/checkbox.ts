import { defineSlotRecipe } from '@chakra-ui/react'

export const checkboxSlotRecipe = defineSlotRecipe({
  slots: ['root', 'label', 'control', 'indicator', 'group'],
  className: 'chakra-checkbox',
  base: {
    root: {
      display: 'inline-flex',
      gap: '2',
      alignItems: 'center',
      verticalAlign: 'top',
      position: 'relative',
    },
    control: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: '0',
      color: 'white',
      borderWidth: '1px',
      borderColor: 'transparent',
      focusVisibleRing: 'outside',
      rounded: '4px',
      _icon: {
        boxSize: 'full',
      },
      _invalid: {
        colorPalette: 'red',
        borderColor: 'border.error',
      },
      _disabled: {
        opacity: '0.5',
      },
    },
    label: {
      fontWeight: 'medium',
      userSelect: 'none',
      _disabled: {
        opacity: '0.5',
      },
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          gap: '4px',
        },
        label: {
          textStyle: 'pre-caption-1',
        },
        control: {
          boxSize: '16px',
          p: '3px',
        },
      },
      md: {
        root: {
          gap: '6px',
        },
        label: {
          textStyle: 'pre-body-5',
        },
        control: {
          boxSize: '20px',
          p: '4px',
        },
      },
    },
    variant: {
      solid: {
        control: {
          borderColor: 'grey.3',
          '&:is([data-state=checked], [data-state=indeterminate])': {
            bg: 'primary.4',
            borderColor: 'primary.4',
          },
          _checked: {
            bgColor: 'primary.4',
            color: 'grey.0',
            borderColor: 'primary.4',
          },
          _disabled: {
            opacity: '0.4',
          },
        },
        label: {
          _disabled: {
            opacity: '0.4',
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})

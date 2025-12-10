import { defineSlotRecipe } from '@chakra-ui/react'

export const radioGroupSlotRecipe = defineSlotRecipe({
  className: 'chakra-radio-group',
  slots: [
    'root',
    'label',
    'item',
    'itemText',
    'itemControl',
    'indicator',
    'itemAddon',
    'itemIndicator',
  ],
  base: {
    item: {
      display: 'inline-flex',
      alignItems: 'center',
      position: 'relative',
      fontWeight: 'medium',
      _disabled: {
        cursor: 'disabled',
      },
    },
    itemControl: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      verticalAlign: 'top',
      color: 'white',
      borderWidth: '1px',
      borderColor: 'transparent',
      borderRadius: 'full',
      cursor: 'radio',
      _focusVisible: {
        outline: '2px solid',
        outlineColor: 'colorPalette.focusRing',
        outlineOffset: '2px',
      },
      _invalid: {
        colorPalette: 'red',
        borderColor: 'red.500',
      },
      _disabled: {
        opacity: '0.5',
        cursor: 'disabled',
      },
      '& .dot': {
        height: '100%',
        width: '100%',
        borderRadius: 'full',
        bg: 'currentColor',
        scale: '0.4',
      },
    },
    label: {
      userSelect: 'none',
      textStyle: 'sm',
      _disabled: {
        opacity: '0.5',
      },
    },
  },
  variants: {
    variant: {
      solid: {
        itemControl: {
          borderColor: 'grey.3',
          _checked: {
            bg: 'primary.4',
            color: 'grey.0',
            borderColor: 'primary.4',
          },
        },
      },
    },
    size: {
      sm: {
        item: {
          gap: '4px',
        },
        label: {
          textStyle: 'pre-caption-1',
        },
        itemControl: {
          boxSize: '16px',
          p: '0.75px',
        },
      },
      md: {
        item: {
          gap: '6px',
        },
        label: {
          textStyle: 'pre-body-5',
        },
        itemControl: {
          boxSize: '20px',
          p: '1.5px',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
})

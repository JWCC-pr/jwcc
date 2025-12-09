import { defineRecipe } from '@chakra-ui/react/styled-system'

import { makeButtonCompoundVariants } from '@/utils/theme/make-button-compound-varients'

export const buttonRecipe = defineRecipe({
  className: 'chakra-button',
  base: {
    display: 'inline-flex',
    appearance: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    position: 'relative',
    borderRadius: 'l2',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    borderWidth: '1px',
    borderColor: 'transparent',
    cursor: 'button',
    flexShrink: '0',
    outline: '0',
    lineHeight: '1.2',
    isolation: 'isolate',
    fontWeight: 'medium',
    transitionProperty: 'common',
    transitionDuration: 'moderate',
    focusVisibleRing: 'outside',
    _disabled: {
      layerStyle: 'disabled',
    },
    _icon: {
      flexShrink: '0',
    },
  },
  variants: {
    size: {
      sm: {
        h: '32px',
        px: '12px',
        gap: '4px',
        textStyle: 'pre-caption-1',
        rounded: '6px',
        _icon: {
          width: '16px',
          height: '16px',
        },
      },
      md: {
        h: '40px',
        px: '16px',
        gap: '6px',
        textStyle: 'pre-body-5',
        rounded: '8px',
        _icon: {
          width: '20px',
          height: '20px',
        },
      },
      lg: {
        h: '48px',
        px: '24px',
        gap: '8px',
        textStyle: 'pre-body-3',
        rounded: '10px',
        _icon: {
          width: '24px',
          height: '24px',
        },
      },
    },
    variant: {
      solid: {},
      outline: {},
      ghost: {},
    },
    colorPalette: {
      primary: {},
      grey: {},
    },
  },
  compoundVariants: makeButtonCompoundVariants(
    ['solid', 'outline', 'ghost'],
    ['primary', 'grey'],
  ),
  defaultVariants: {
    size: 'md',
    variant: 'solid',
    colorPalette: 'primary',
  },
})

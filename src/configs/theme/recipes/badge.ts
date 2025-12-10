import { defineRecipe } from '@chakra-ui/react'

import { makeBadgeCompoundVariants } from '@/utils/theme/make-badge-compound-varients'

export const badgeRecipe = defineRecipe({
  className: 'chakra-badge',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    rounded: '6px',
    fontVariantNumeric: 'tabular-nums',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    textStyle: 'pre-caption-1',
    w: 'fit-content',
  },
  variants: {
    size: {
      md: {
        px: '6px',
        gap: '2px',
        h: '24px',
        minH: '24px',
        _icon: {
          width: '16px',
          height: '16px',
        },
      },
      lg: {
        px: '10px',
        gap: '4px',
        minH: '28px',
        textStyle: 'pre-caption-1',
        _icon: {
          width: '16px',
          height: '16px',
        },
      },
    },
    variant: {
      solid: {},
      subtle: {},
    },
    colorPalette: {
      grey: {},
      primary: {},
      green: {},
      yellow: {},
      blue: {},
      red: {},
      pink: {},
      violet: {},
    },
  },
  compoundVariants: makeBadgeCompoundVariants(
    ['solid', 'subtle'],
    ['grey', 'primary', 'green', 'yellow', 'blue', 'red', 'pink', 'violet'],
  ),
  defaultVariants: {
    variant: 'solid',
    size: 'lg',
  },
})

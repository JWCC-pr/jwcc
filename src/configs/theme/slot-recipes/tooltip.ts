import { defineSlotRecipe } from '@chakra-ui/react'

export const tooltipSlotRecipe = defineSlotRecipe({
  slots: ['trigger', 'arrow', 'arrowTip', 'positioner', 'content'],
  className: 'chakra-tooltip',
  base: {
    content: {
      '--tooltip-bg': 'colors.grey-transparent.600',
      bg: 'var(--tooltip-bg)',
      color: 'grey.0',
      p: '4px 8px',
      rounded: '6px',
      textStyle: 'pre-body-6',
      maxW: 'xs',
      zIndex: 'tooltip',
      transformOrigin: 'var(--transform-origin)',
      _open: {
        animationStyle: 'scale-fade-in',
        animationDuration: 'fast',
      },
      _closed: {
        animationStyle: 'scale-fade-out',
        animationDuration: 'fast',
      },
    },
    arrow: {
      '--arrow-size': 'sizes.2',
      '--arrow-background': 'grey.0',
    },
    arrowTip: {
      borderColor: 'var(--tooltip-bg)',
    },
  },
})

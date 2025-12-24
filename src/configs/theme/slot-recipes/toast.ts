import { defineSlotRecipe } from '@chakra-ui/react'

export const toastSlotRecipe = defineSlotRecipe({
  slots: [
    'root',
    'title',
    'description',
    'indicator',
    'closeTrigger',
    'actionTrigger',
  ],
  className: 'chakra-toast',
  base: {
    root: {
      width: ['full', '362px'],
      display: 'flex',
      alignItems: 'flex-start',
      position: 'relative',
      gap: '3',
      p: '12px',
      borderRadius: '8px',
      translate: 'var(--x) var(--y)',
      scale: 'var(--scale)',
      zIndex: 'var(--z-index)',
      height: 'var(--height)',
      opacity: 'var(--opacity)',
      willChange: 'translate, opacity, scale',
      transition:
        'translate 400ms, scale 400ms, opacity 400ms, height 400ms, box-shadow 200ms',
      transitionTimingFunction: 'cubic-bezier(0.21, 1.02, 0.73, 1)',
      _closed: {
        transition: 'translate 400ms, scale 400ms, opacity 200ms',
        transitionTimingFunction: 'cubic-bezier(0.06, 0.71, 0.55, 1)',
      },
      bg: 'grey-transparent.600',
      '--toast-trigger-bg': 'colors.bg.muted',
    },
    title: {
      textStyle: 'pre-body-6',
      color: 'grey.0',
    },
    description: {
      display: 'inline',
      textStyle: 'sm',
      opacity: '0.8',
    },
    indicator: {
      flexShrink: '0',
      p: '3px',
      w: '24px',
      h: '24px',
    },
    actionTrigger: {
      textStyle: 'pre-body-5',
      color: 'grey.0',
      cursor: 'pointer',
      h: '22px',
    },
    closeTrigger: {
      position: 'absolute',
      top: '1',
      insetEnd: '1',
      padding: '1',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '{currentColor/60}',
      borderRadius: 'l2',
      textStyle: 'md',
      transition: 'background 200ms',
      _icon: {
        boxSize: '1em',
      },
    },
  },
})

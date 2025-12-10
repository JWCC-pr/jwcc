import { defineSlotRecipe } from '@chakra-ui/react'

export const switchSlotRecipe = defineSlotRecipe({
  slots: ['root', 'label', 'control', 'thumb', 'indicator'],
  className: 'chakra-switch',
  base: {
    root: {
      display: 'inline-flex',
      gap: '2.5',
      alignItems: 'center',
      position: 'relative',
      verticalAlign: 'middle',
      '--switch-diff': 'calc(var(--switch-width) - var(--switch-height))',
      '--switch-x': {
        base: 'var(--switch-diff)',
        _rtl: 'calc(var(--switch-diff) * -1)',
      },
    },
    label: {
      lineHeight: '1',
      userSelect: 'none',
      fontSize: 'sm',
      fontWeight: 'medium',
      _disabled: {
        opacity: '0.5',
      },
    },
    indicator: {
      position: 'absolute',
      height: 'var(--switch-height)',
      width: 'var(--switch-height)',
      flexShrink: 0,
      userSelect: 'none',
      display: 'grid',
      placeContent: 'center',
      transition: 'inset-inline-start 0.12s ease',
      insetInlineStart: 'calc(var(--switch-x) - 2px)',
      _checked: {
        insetInlineStart: '2px',
      },
    },
    control: {
      display: 'inline-flex',
      gap: '0.5rem',
      flexShrink: 0,
      justifyContent: 'flex-start',
      cursor: 'switch',
      borderRadius: 'full',
      position: 'relative',
      width: 'var(--switch-width)',
      height: 'var(--switch-height)',
      bgColor: 'grey.3',
      _disabled: {
        opacity: '0.5',
        cursor: 'not-allowed',
      },
      _invalid: {
        outline: '2px solid',
        outlineColor: 'border.error',
        outlineOffset: '2px',
      },
    },
    thumb: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transitionProperty: 'translate',
      transitionDuration: 'fast',
      borderRadius: 'inherit',
      width: 'var(--switch-thumb-size)',
      height: 'var(--switch-thumb-size)',
      _checked: {
        translate: 'var(--switch-x) 0',
      },
    },
  },
  variants: {
    variant: {
      solid: {
        control: {
          bgColor: 'grey.3',
          focusVisibleRing: 'outside',
          _checked: {
            bgColor: 'primary.4',
          },
          _disabled: {
            opacity: '0.4',
          },
        },
        thumb: {
          bg: 'white',
          boxShadow: 'sm',
          _checked: {
            bg: 'colorPalette.contrast',
          },
        },
      },
    },
    size: {
      md: {
        root: {
          '--switch-width': '42px',
          '--switch-height': '24px',
          '--switch-thumb-size': '18px',
        },
        control: {
          p: '3px',
        },
        label: {
          textStyle: 'pre-caption-1',
        },
      },
      lg: {
        root: {
          '--switch-width': '56px',
          '--switch-height': '32px',
          '--switch-thumb-size': '24px',
        },
        control: {
          p: '4px',
        },
        label: {
          textStyle: 'pre-body-5',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})

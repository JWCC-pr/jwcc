import { defineSlotRecipe } from '@chakra-ui/react'

export const tabsSlotRecipe = defineSlotRecipe({
  slots: ['root', 'trigger', 'list', 'content', 'contentGroup', 'indicator'],
  className: 'chakra-tabs',
  base: {
    root: {
      '--tabs-trigger-radius': 'radii.l2',
      position: 'relative',
      _horizontal: {
        display: 'block',
      },
      _vertical: {
        display: 'flex',
      },
    },
    list: {
      display: 'inline-flex',
      position: 'relative',
      isolation: 'isolate',
      '--tabs-indicator-shadow': 'shadows.xs',
      '--tabs-indicator-bg': 'colors.bg',
      minH: 'var(--tabs-height)',
      _horizontal: {
        flexDirection: 'row',
      },
      _vertical: {
        flexDirection: 'column',
      },
    },
    trigger: {
      outline: '0',
      minW: 'var(--tabs-height)',
      height: 'var(--tabs-height)',
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'medium',
      position: 'relative',
      cursor: 'button',
      gap: '2',
      _focusVisible: {
        zIndex: 1,
        outline: '2px solid',
        outlineColor: 'colorPalette.focusRing',
      },
      _disabled: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
    content: {
      focusVisibleRing: 'inside',
      _horizontal: {
        width: '100%',
      },
      _vertical: {
        height: '100%',
      },
    },
    indicator: {
      width: 'var(--width)',
      height: 'var(--height)',
      borderRadius: 'var(--tabs-indicator-radius)',
      bg: 'var(--tabs-indicator-bg)',
      shadow: 'var(--tabs-indicator-shadow)',
      zIndex: -1,
    },
  },
  variants: {
    fitted: {
      true: {
        list: {
          display: 'flex',
        },
        trigger: {
          flex: 1,
          textAlign: 'center',
          justifyContent: 'center',
        },
      },
    },
    justify: {
      start: {
        list: {
          justifyContent: 'flex-start',
        },
      },
      center: {
        list: {
          justifyContent: 'center',
        },
      },
      end: {
        list: {
          justifyContent: 'flex-end',
        },
      },
    },
    size: {
      sm: {
        root: {
          '--tabs-height': '32px',
        },
        trigger: {
          textStyle: 'pre-caption-1',
          gap: '4px',
          px: '10px',
          rounded: '6px',
          _icon: {
            width: '18px',
            height: '18px',
          },
        },
      },
      md: {
        root: {
          '--tabs-height': '40px',
        },
        trigger: {
          textStyle: 'pre-body-5',
          gap: '6px',
          px: '12px',
          rounded: '8px',
          _icon: {
            width: '24px',
            height: '24px',
          },
        },
      },
      lg: {
        root: {
          '--tabs-height': '48px',
        },
        trigger: {
          textStyle: 'pre-body-1',
          gap: '8px',
          px: '16px',
          rounded: '10px',
          _icon: {
            width: '26px',
            height: '26px',
          },
        },
      },
    },
    variant: {
      line: {
        trigger: {
          color: 'grey.7',
          borderBottom: '1px solid',
          borderColor: 'grey.2',
          rounded: '0px',
          _hover: {
            color: 'grey.10',
            borderColor: 'grey.2',
          },
          _active: {
            color: 'grey.10',
            borderColor: 'grey.2',
          },
          _selected: {
            color: 'grey.10',
            borderColor: 'grey.10',
            _hover: {
              color: 'grey.10',
              borderColor: 'grey.10',
            },
          },
          _disabled: {
            color: 'grey.7',
            borderColor: 'grey.2',
            opacity: '0.4',
          },
        },
      },
      subtle: {
        list: {
          gap: '4px',
        },
        trigger: {
          color: 'grey.7',
          _hover: {
            color: 'grey.7',
            bgColor: 'grey.transparent.1',
          },
          _active: {
            color: 'grey.7',
            bgColor: 'grey.transparent.1',
          },
          _selected: {
            color: 'grey.10',
            bgColor: 'grey.transparent.1',
            _hover: {
              color: 'grey.10',
              bgColor: 'grey.transparent.1',
            },
          },
          _disabled: {
            color: 'grey.7',
            opacity: '0.4',
          },
        },
      },
      enclosed: {
        list: {
          p: '4px',
          gap: '4px',
          bgColor: 'grey.2',
          rounded: '12px',
        },
        trigger: {
          color: 'grey.7',
          _hover: {
            color: 'grey.7',
            bgColor: 'grey.transparent.1',
          },
          _active: {
            color: 'grey.7',
            bgColor: 'grey.transparent.1',
          },
          _selected: {
            color: 'grey.0',
            bgColor: 'primary.4',
            _hover: {
              color: 'grey.0',
              bgColor: 'primary.4',
            },
          },
          _disabled: {
            color: 'grey.7',
            opacity: '0.4',
          },
        },
      },
    },
  },
  compoundVariants: [
    {
      size: 'sm',
      variant: 'enclosed',
      css: {
        root: {
          '--tabs-height': '24px',
        },
      },
    },
    {
      size: 'md',
      variant: 'enclosed',
      css: {
        root: {
          '--tabs-height': '32px',
        },
      },
    },
    {
      size: 'lg',
      variant: 'enclosed',
      css: {
        root: {
          '--tabs-height': '40px',
        },
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'line',
  },
})

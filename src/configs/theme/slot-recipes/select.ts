import { defineSlotRecipe } from '@chakra-ui/react'

export const selectSlotRecipe = defineSlotRecipe({
  className: 'chakra-select',
  slots: [
    'label',
    'positioner',
    'trigger',
    'indicator',
    'clearTrigger',
    'item',
    'itemText',
    'itemIndicator',
    'itemGroup',
    'itemGroupLabel',
    'list',
    'content',
    'root',
    'control',
    'valueText',
    'indicatorGroup',
  ],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      width: 'full',
    },
    trigger: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 'full',
      minH: 'var(--select-trigger-height)',
      px: 'var(--select-trigger-padding-x)',
      gap: '2001px',
      borderRadius: 'l2',
      userSelect: 'none',
      textAlign: 'start',
      focusVisibleRing: 'inside',
      '--focus-color': 'colors.primary.4',
      '--error-color': 'colors.accent.red2',
      color: 'grey.8',
      _disabled: {
        layerStyle: 'disabled',
        opacity: 0.4,
      },
      _placeholderShown: {
        color: 'grey.5',
      },
    },
    indicatorGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '1',
      pos: 'absolute',
      right: '0',
      top: '0',
      bottom: '0',
      px: 'var(--select-indicator-padding-x)',
      pointerEvents: 'none',
    },
    indicator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: {
        base: 'grey.5',
        _disabled: 'fg.subtle',
        _invalid: 'fg.error',
      },
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      zIndex: 'dropdown',
      outline: 0,
      maxH: '96',
      overflowY: 'auto',
      bg: 'grey.0',
      boxShadow: `0 20px 80px 0 rgba(27, 28, 29, 0.04), 0 4px 10px 0 rgba(27, 28, 29, 0.04)`,
      border: '1px solid',
      borderColor: 'grey.2',
      _open: {
        animationStyle: 'slide-fade-in',
        animationDuration: 'fast',
      },
      _closed: {
        animationStyle: 'slide-fade-out',
        animationDuration: 'fastest',
      },
    },
    item: {
      position: 'relative',
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      cursor: 'pointer',
      justifyContent: 'space-between',
      flex: '1',
      textAlign: 'start',
      borderRadius: 'l1',
      color: 'grey.8',
      _highlighted: {
        bg: 'bg.emphasized/60',
      },
      _disabled: {
        pointerEvents: 'none',
        opacity: '0.4',
      },
      _hover: {
        bgColor: 'grey-transparent.100',
      },
      _active: {
        bgColor: 'grey-transparent.200',
      },
      _selected: {
        bgColor: 'grey-transparent.200',
      },
    },
    control: {
      pos: 'relative',
    },
    itemText: {
      flex: '1',
    },
    itemGroup: {
      _first: {
        mt: '0',
      },
    },
    itemGroupLabel: {
      py: '1',
      fontWeight: 'medium',
    },
    label: {
      fontWeight: 'medium',
      userSelect: 'none',
      textStyle: 'sm',
      _disabled: {
        layerStyle: 'disabled',
      },
    },
    valueText: {
      lineClamp: '1',
      maxW: '80%',
    },
  },
  variants: {
    variant: {
      solid: {
        trigger: {
          bgColor: 'grey.1',
          _focus: {
            bgColor: 'primary.1',
            border: '1.5px solid',
            borderColor: 'var(--focus-color)',
          },
          _invalid: {
            bgColor: 'accent.red1',
            border: '1.5px solid',
            borderColor: 'var(--error-color)',
          },
        },
      },
      outline: {
        trigger: {
          bgColor: 'grey.0',
          border: '1px solid',
          borderColor: 'grey.2',
          _focus: {
            border: '1.5px solid',
            borderColor: 'var(--focus-color)',
          },
          _invalid: {
            border: '1.5px solid',
            borderColor: 'var(--error-color)',
          },
        },
      },
      flushed: {
        trigger: {
          borderBottom: '1px solid',
          borderBottomColor: 'grey.2',
          rounded: '0',
          _focus: {
            borderBottom: '1.5px solid',
            borderBottomColor: 'var(--focus-color)',
          },
          _invalid: {
            borderBottom: '1.5px solid',
            borderBottomColor: 'var(--error-color)',
          },
        },
      },
    },
    size: {
      sm: {
        root: {
          '--select-trigger-height': '32px',
          '--select-trigger-padding-x': '8px',
          '--select-indicator-padding-x': '4px 8px',
        },
        trigger: {
          textStyle: 'pre-caption-2',
          rounded: '6px',
        },
        indicator: {
          _icon: {
            width: '12px',
            height: '12px',
          },
        },
        item: {
          p: '8px',
          textStyle: 'pre-caption-2',
          h: '35px',
        },
        content: {
          rounded: '6px',
          minW: '126px',
        },
      },
      md: {
        root: {
          '--select-trigger-height': '40px',
          '--select-trigger-padding-x': '10px',
          '--select-indicator-padding-x': '6px 10px',
        },
        trigger: {
          textStyle: 'pre-body-6',
          rounded: '8px',
        },
        indicator: {
          _icon: {
            width: '16px',
            height: '16px',
          },
        },
        item: {
          p: '8px 10px',
          textStyle: 'pre-body-6',
          h: '38px',
        },
        content: {
          rounded: '8px',
        },
      },
      lg: {
        root: {
          '--select-trigger-height': '48px',
          '--select-trigger-padding-x': '12px',
          '--select-indicator-padding-x': '8px 12px',
        },
        trigger: {
          textStyle: 'pre-body-4',
          rounded: '10px',
        },
        indicator: {
          _icon: {
            width: '16px',
            height: '16px',
          },
        },
        item: {
          p: '10px 12px',
          textStyle: 'pre-body-4',
          h: '46px',
        },
        content: {
          rounded: '10px',
        },
      },
    },
  },
  compoundVariants: [
    ...(['sm', 'md', 'lg'] as const).map((size) => ({
      variant: 'flushed' as const,
      size,
      css: {
        root: {
          '--select-trigger-padding-x': '0px',
        },
      },
    })),
  ],
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
})

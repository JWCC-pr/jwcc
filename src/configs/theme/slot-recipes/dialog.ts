import { defineSlotRecipe } from '@chakra-ui/react'

export const dialogSlotRecipe = defineSlotRecipe({
  slots: [
    'trigger',
    'backdrop',
    'positioner',
    'content',
    'title',
    'description',
    'closeTrigger',
    'header',
    'body',
    'footer',
    'backdrop',
  ],
  className: 'chakra-dialog',
  base: {
    backdrop: {
      bg: 'grey.transparent.4',
      pos: 'fixed',
      left: 0,
      top: 0,
      w: '100vw',
      h: '100dvh',
      zIndex: 'modal',
      _open: {
        animationName: 'fade-in',
        animationDuration: 'slow',
      },
      _closed: {
        animationName: 'fade-out',
        animationDuration: 'moderate',
      },
    },
    positioner: {
      display: 'flex',
      width: '100vw',
      height: '100dvh',
      position: 'fixed',
      left: 0,
      top: 0,
      '--dialog-z-index': 'zIndex.modal',
      zIndex: 'calc(var(--dialog-z-index) + var(--layer-index, 0))',
      justifyContent: 'center',
      overscrollBehaviorY: 'none',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width: '100%',
      outline: 0,
      borderRadius: '20px',
      textStyle: 'sm',
      my: 'var(--dialog-margin, var(--dialog-base-margin))',
      '--dialog-z-index': 'zIndex.modal',
      zIndex: 'calc(var(--dialog-z-index) + var(--layer-index, 0))',
      bg: 'grey.0',
      boxShadow: 'lg',
      p: '32px 16px 16px',
      _open: {
        animationDuration: 'moderate',
      },
      _closed: {
        animationDuration: 'faster',
      },
    },
    header: {
      flex: 0,
    },
    body: {
      flex: '1',
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '8px',
    },
    title: {
      color: 'grey.10',
      textStyle: 'pre-heading-4',
    },
    description: {
      color: 'grey.7',
      textStyle: 'pre-body-6',
    },
  },
  variants: {
    placement: {
      center: {
        positioner: {
          alignItems: 'center',
        },
        content: {
          '--dialog-base-margin': 'auto',
          mx: 'auto',
        },
      },
      top: {
        positioner: {
          alignItems: 'flex-start',
        },
        content: {
          '--dialog-base-margin': 'spacing.16',
          mx: 'auto',
        },
      },
      bottom: {
        positioner: {
          alignItems: 'flex-end',
        },
        content: {
          '--dialog-base-margin': 'spacing.16',
          mx: 'auto',
        },
      },
    },
    scrollBehavior: {
      inside: {
        positioner: {
          overflow: 'hidden',
        },
        content: {
          maxH: 'calc(100% - 7.5rem)',
        },
        body: {
          overflow: 'auto',
        },
      },
      outside: {
        positioner: {
          overflow: 'auto',
          pointerEvents: 'auto',
        },
      },
    },
    size: {
      sm: {
        content: {
          maxW: '320px',
        },
      },
      md: {
        content: {
          maxW: '460px',
        },
      },
      lg: {
        content: {
          maxW: '600px',
        },
      },
    },
    motionPreset: {
      scale: {
        content: {
          _open: {
            animationName: 'scale-in, fade-in',
          },
          _closed: {
            animationName: 'scale-out, fade-out',
          },
        },
      },
      'slide-in-bottom': {
        content: {
          _open: {
            animationName: 'slide-from-bottom, fade-in',
          },
          _closed: {
            animationName: 'slide-to-bottom, fade-out',
          },
        },
      },
      'slide-in-top': {
        content: {
          _open: {
            animationName: 'slide-from-top, fade-in',
          },
          _closed: {
            animationName: 'slide-to-top, fade-out',
          },
        },
      },
      'slide-in-left': {
        content: {
          _open: {
            animationName: 'slide-from-left, fade-in',
          },
          _closed: {
            animationName: 'slide-to-left, fade-out',
          },
        },
      },
      'slide-in-right': {
        content: {
          _open: {
            animationName: 'slide-from-right, fade-in',
          },
          _closed: {
            animationName: 'slide-to-right, fade-out',
          },
        },
      },
      none: {},
    },
  },
  defaultVariants: {
    size: 'md',
    scrollBehavior: 'outside',
    placement: 'top',
    motionPreset: 'scale',
  },
})

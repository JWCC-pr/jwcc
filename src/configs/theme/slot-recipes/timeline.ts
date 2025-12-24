import { defineSlotRecipe } from '@chakra-ui/react'

export const timelineSlotRecipe = defineSlotRecipe({
  slots: [
    'root',
    'item',
    'content',
    'separator',
    'indicator',
    'connector',
    'title',
    'description',
  ],
  className: 'chakra-timeline',
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: 'full',
      '--timeline-thickness': '2px',
      '--timeline-gutter': '4px',
      '--timeline-indicator-size': '12px',
    },
    item: {
      display: 'flex',
      position: 'relative',
      alignItems: 'flex-start',
      flexShrink: 0,
      gap: '24px',
      _last: {
        '& :where(.chakra-timeline__content)': {
          pb: '0',
        },
      },
    },
    separator: {
      position: 'absolute',
      borderStartWidth: 'var(--timeline-thickness)',
      ms: 'calc(-1 * var(--timeline-thickness) / 2)',
      insetInlineStart: 'calc(var(--timeline-indicator-size) / 2)',
      insetBlock: '0',
      borderColor: 'primary.4',
    },
    indicator: {
      position: 'relative',
      flexShrink: '0',
      w: 'var(--timeline-indicator-size)',
      h: 'var(--timeline-indicator-size)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'full',
      bgColor: 'primary.4',
      top: '6px',
    },
    connector: {
      alignSelf: 'stretch',
      position: 'relative',
    },
    content: {
      pb: '40px',
      width: 'full',
    },
    title: {},
    description: {
      color: 'grey.10',
      textStyle: 'pre-body-4',
    },
  },
})

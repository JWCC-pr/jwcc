import { defineSemanticTokens } from '@chakra-ui/react'

export const shadows = defineSemanticTokens.shadows({
  'shadow-top': {
    value: `0 -20px 80px 0 rgba(27, 28, 29, 0.04), 0 -4px 10px 0 rgba(27, 28, 29, 0.04)`,
  },
  'shadow-bottom': {
    value: `0 20px 80px 0 rgba(27, 28, 29, 0.04), 0 4px 10px 0 rgba(27, 28, 29, 0.04)`,
  },
  'shadow-left': {
    value: `-20px 0 80px 0 rgba(27, 28, 29, 0.04), -4px 0 10px 0 rgba(27, 28, 29, 0.04)`,
  },
  'shadow-right': {
    value: `20px 0 80px 0 rgba(27, 28, 29, 0.04), 4px 0 10px 0 rgba(27, 28, 29, 0.04)`,
  },
  'shadow-center': {
    value: `2px 4px 80px 0 rgba(27, 28, 29, 0.04), 1px 2px 10px 0 rgba(27, 28, 29, 0.04)`,
  },
})

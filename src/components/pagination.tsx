import { ButtonGroup, IconButton } from '@chakra-ui/react/button'
import { Pagination as ChakraPagination } from '@chakra-ui/react/pagination'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'

const PAGINATION_BUTTON_GAP = {
  sm: '4px',
  md: '6px',
  lg: '8px',
} as const

const ICON_BUTTON_RADIUS = {
  sm: '8px',
  md: '8px',
  lg: '10px',
} as const

interface PaginationProps extends ChakraPagination.RootProps {
  size: 'sm' | 'md' | 'lg'
}

const Pagination: React.FC<PaginationProps> = ({ size, ...props }) => {
  return (
    <ChakraPagination.Root key={size} {...props}>
      <ButtonGroup
        variant="ghost"
        size={size}
        gap={PAGINATION_BUTTON_GAP[size]}
      >
        <ChakraPagination.PrevTrigger asChild>
          <IconButton
            variant="ghost"
            rounded={ICON_BUTTON_RADIUS[size]}
            color="grey.8"
          >
            <CaretLeftIcon />
          </IconButton>
        </ChakraPagination.PrevTrigger>

        <ChakraPagination.Items
          render={(page) => (
            <IconButton
              variant="ghost"
              rounded={ICON_BUTTON_RADIUS[size]}
              _selected={{ bgColor: 'primary.4', color: 'grey.0' }}
            >
              {page.value}
            </IconButton>
          )}
        />

        <ChakraPagination.NextTrigger asChild>
          <IconButton
            variant="ghost"
            rounded={ICON_BUTTON_RADIUS[size]}
            color="grey.8"
          >
            <CaretRightIcon />
          </IconButton>
        </ChakraPagination.NextTrigger>
      </ButtonGroup>
    </ChakraPagination.Root>
  )
}

export default Pagination

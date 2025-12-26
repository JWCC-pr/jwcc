'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { ButtonGroup, IconButton } from '@chakra-ui/react/button'
import { Pagination as ChakraPagination } from '@chakra-ui/react/pagination'
import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from '@phosphor-icons/react'

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

const Pagination: React.FC<PaginationProps> = ({
  size,
  count,
  pageSize,
  onPageChange,
  defaultPage,
  page: controlledPage,
  ...props
}) => {
  const [internalPage, setInternalPage] = useState(defaultPage || 1)
  const totalPages = Math.ceil((count || 0) / (pageSize || 1))

  const isControlled = controlledPage !== undefined
  const currentPage = isControlled ? controlledPage : internalPage

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const handlePageChange = (details: { page: number; pageSize: number }) => {
    if (!isControlled) {
      setInternalPage(details.page)
    }
    onPageChange?.(details)
  }

  const handleFirstPage = () => {
    handlePageChange({ page: 1, pageSize: pageSize || 10 })
  }

  const handleLastPage = () => {
    handlePageChange({ page: totalPages, pageSize: pageSize || 10 })
  }

  return (
    <ChakraPagination.Root
      key={size}
      count={count}
      pageSize={pageSize}
      page={currentPage}
      onPageChange={handlePageChange}
      {...props}
    >
      <ButtonGroup
        variant="ghost"
        size={size}
        gap={PAGINATION_BUTTON_GAP[size]}
      >
        <Box display="flex" alignItems="center">
          <IconButton
            variant="ghost"
            rounded={ICON_BUTTON_RADIUS[size]}
            color="grey.8"
            onClick={handleFirstPage}
            disabled={isFirstPage}
            _disabled={{
              opacity: 0.4,
              cursor: 'not-allowed',
            }}
          >
            <CaretDoubleLeftIcon />
          </IconButton>
          <ChakraPagination.PrevTrigger asChild>
            <IconButton
              variant="ghost"
              rounded={ICON_BUTTON_RADIUS[size]}
              color="grey.8"
            >
              <CaretLeftIcon />
            </IconButton>
          </ChakraPagination.PrevTrigger>
        </Box>

        <ChakraPagination.Items
          render={(page) => (
            <IconButton
              variant="ghost"
              rounded={ICON_BUTTON_RADIUS[size]}
              color="grey.8"
              _selected={{ bgColor: 'primary.4', color: 'grey.0' }}
            >
              {page.value}
            </IconButton>
          )}
        />

        <Box display="flex" alignItems="center">
          <ChakraPagination.NextTrigger asChild>
            <IconButton
              variant="ghost"
              rounded={ICON_BUTTON_RADIUS[size]}
              color="grey.8"
            >
              <CaretRightIcon />
            </IconButton>
          </ChakraPagination.NextTrigger>
          <IconButton
            variant="ghost"
            rounded={ICON_BUTTON_RADIUS[size]}
            color="grey.8"
            onClick={handleLastPage}
            disabled={isLastPage}
            _disabled={{
              opacity: 0.4,
              cursor: 'not-allowed',
            }}
          >
            <CaretDoubleRightIcon />
          </IconButton>
        </Box>
      </ButtonGroup>
    </ChakraPagination.Root>
  )
}

export default Pagination

'use client'

import { useMemo } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Table as ChakraTable } from '@chakra-ui/react/table'

import Pagination from './pagination'

// 컬럼 너비 설정 타입
export type ColumnWidth =
  | { type: 'fixed'; value: number } // 고정 px 값
  | { type: 'flex'; value: number; minWidth?: number } // flex 비율 + 최소 너비

export interface TableColumn<T = unknown> {
  key: string
  label: React.ReactNode
  width?: ColumnWidth
  textAlign?: 'left' | 'center' | 'right'
  render: (item: T) => React.ReactNode
}

export interface TableProps<T = unknown> extends Omit<
  ChakraTable.RootProps,
  'columns'
> {
  columns: TableColumn<T>[]
  data: T[]
  getRowKey: (item: T) => string | number
  onRowClick?: (item: T) => void
  // 페이지네이션 props
  pagination?: {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChange: (page: number) => void
  }
  // 테이블 스타일 props
  size?: 'sm' | 'md' | 'lg'
  variant?: 'line' | 'outline'
  striped?: boolean
  interactive?: boolean
  // Row 커스터마이징
  getRowProps?: (item: T) => Record<string, any>
  // 빈 데이터 처리
  emptyContent?: React.ReactNode
}

const Table = <T,>({
  columns,
  data,
  getRowKey,
  onRowClick,
  pagination,
  size = 'sm',
  variant = 'line',
  striped = false,
  interactive = true,
  getRowProps,
  emptyContent,
  ...rootProps
}: TableProps<T>) => {
  // 컬럼 너비 계산
  const { columnStyles, minTableWidth } = useMemo(() => {
    let totalFixed = 0
    const flexColumns: Array<{
      index: number
      value: number
      minWidth?: number
    }> = []

    columns.forEach((col, index) => {
      if (!col.width) {
        // 기본값: flex 1
        flexColumns.push({ index, value: 1 })
      } else if (col.width.type === 'fixed') {
        totalFixed += col.width.value
      } else {
        flexColumns.push({
          index,
          value: col.width.value,
          minWidth: col.width.minWidth,
        })
      }
    })

    // 최소 테이블 너비 계산
    const minFlexWidth = flexColumns.reduce(
      (sum, col) => sum + (col.minWidth || 0),
      0,
    )
    const calculatedMinWidth = totalFixed + minFlexWidth

    // 각 컬럼의 스타일 계산
    const styles = columns.map((col) => {
      if (!col.width) {
        return {
          flex: 1,
          minWidth: '0px',
        }
      }

      if (col.width.type === 'fixed') {
        return {
          width: `${col.width.value}px`,
          flexShrink: 0,
        }
      }

      return {
        flex: col.width.value,
        minWidth: col.width.minWidth ? `${col.width.minWidth}px` : '0px',
      }
    })

    return {
      columnStyles: styles,
      minTableWidth: calculatedMinWidth,
    }
  }, [columns])

  const tableHeaderStyles = {
    h: '40px',
    p: '0 10px',
    textStyle: 'pre-caption-1',
    color: 'grey.8',
  }

  const tableBodyRowCellStyle = {
    minH: '64px',
    p: '10px',
    textStyle: 'pre-body-6',
    color: 'grey.10',
  }

  return (
    <>
      <ChakraTable.ScrollArea w="full">
        <ChakraTable.Root
          size={size}
          variant={variant}
          striped={striped}
          interactive={interactive}
          unstyled
          w="full"
          minW={minTableWidth > 0 ? `${minTableWidth}px` : undefined}
          tableLayout="fixed"
          {...rootProps}
        >
          <ChakraTable.Header borderTop="1.5px solid" borderColor="grey.10">
            <ChakraTable.Row
              borderBottom="1px solid"
              borderColor="border.basic.1"
            >
              {columns.map((column, index) => (
                <ChakraTable.ColumnHeader
                  key={column.key}
                  {...tableHeaderStyles}
                  {...columnStyles[index]}
                  textAlign={column.textAlign || 'center'}
                >
                  {column.label}
                </ChakraTable.ColumnHeader>
              ))}
            </ChakraTable.Row>
          </ChakraTable.Header>
          <ChakraTable.Body>
            {data.map((item) => (
              <ChakraTable.Row
                key={getRowKey(item)}
                borderBottom="1px solid"
                borderColor="border.basic.1"
                cursor={onRowClick ? 'pointer' : undefined}
                onClick={() => onRowClick?.(item)}
                _hover={
                  onRowClick ?
                    {
                      bgColor: 'background.basic.2',
                      '& > *:first-of-type .cell-content': {
                        textDecoration: 'underline',
                      },
                    }
                  : undefined
                }
                {...(getRowProps ? getRowProps(item) : {})}
              >
                {columns.map((column, index) => (
                  <ChakraTable.Cell
                    key={column.key}
                    {...tableBodyRowCellStyle}
                    {...columnStyles[index]}
                    p="0"
                  >
                    <Box
                      className="cell-content"
                      display="flex"
                      alignItems="center"
                      minH="64px"
                      p="10px"
                      justifyContent={
                        column.textAlign === 'left' ? 'flex-start'
                        : column.textAlign === 'right' ?
                          'flex-end'
                        : 'center'
                      }
                    >
                      <Box
                        lineClamp="1"
                        w="full"
                        textAlign={column.textAlign || 'center'}
                        textStyle="pre-body-4"
                        color="grey.10"
                      >
                        {column.render(item)}
                      </Box>
                    </Box>
                  </ChakraTable.Cell>
                ))}
              </ChakraTable.Row>
            ))}

            {data.length === 0 && emptyContent ? emptyContent : null}
          </ChakraTable.Body>
        </ChakraTable.Root>
      </ChakraTable.ScrollArea>

      {pagination && (
        <Box py="24px" display="flex" justifyContent="center">
          <Pagination
            size="sm"
            count={pagination.totalCount}
            pageSize={pagination.pageSize}
            defaultPage={pagination.currentPage}
            onPageChange={(details) => pagination.onPageChange(details.page)}
          />
        </Box>
      )}
    </>
  )
}

export default Table

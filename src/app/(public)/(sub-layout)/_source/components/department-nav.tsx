'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'
import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react'

import { ROUTES } from '@/constants/routes'
import { useDepartmentListQuery } from '@/generated/apis/Department/Department.query'

const DepartmentNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: departments } = useDepartmentListQuery()

  if (!departments || departments.length === 0) return null

  return (
    <Box
      position="fixed"
      bottom="36px"
      right="24px"
      zIndex="dropdown"
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      gap="8px"
    >
      {isOpen && (
        <Box
          bg="bg.panel"
          border="1px solid"
          borderColor="border.basic.1"
          borderRadius="l3"
          shadow="lg"
          p="12px"
          display="flex"
          flexDirection="column"
          gap="4px"
          maxH="400px"
          overflowY="auto"
          minW="200px"
        >
          {departments.map((department) => (
            <Link
              key={department.id}
              href={ROUTES.DEPARTMENT_BOARD(department.id)}
              _hover={{ textDecoration: 'none' }}
            >
              <Button
                w="100%"
                justifyContent="flex-start"
                size="sm"
                variant="ghost"
                colorPalette="grey"
                onClick={() => setIsOpen(false)}
              >
                <Text textStyle="pre-body-4" color="grey.10">
                  {department.name}
                </Text>
              </Button>
            </Link>
          ))}
        </Box>
      )}

      <Button
        size="md"
        variant="solid"
        colorPalette="primary"
        onClick={() => setIsOpen(!isOpen)}
        borderRadius="full"
        boxShadow="lg"
      >
        <Text textStyle="pre-body-3" mr="8px">
          분과
        </Text>
        {isOpen ?
          <CaretUpIcon size="20px" />
        : <CaretDownIcon size="20px" />}
      </Button>
    </Box>
  )
}

export default DepartmentNav

'use client'

import { Suspense } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Link } from '@chakra-ui/react/link'

import { NewsFreeBoardPencilSimpleLineIcon } from '@/generated/icons/MyIcons'

import { EditorialType, editorialRoutes } from '../utils'
import EditorialSearchSection from './editorial-search-section'
import EditorialTableSection from './editorial-table-section'

interface EditorialListPageProps {
  type: EditorialType
  baseRoute: string
}

const EditorialListPage: React.FC<EditorialListPageProps> = ({
  type,
  baseRoute,
}) => {
  return (
    <Suspense>
      <Box display="flex" flexDirection="column">
        <Box py="20px" display="flex" justifyContent="space-between">
          <EditorialSearchSection baseRoute={baseRoute} />

          <Link
            href={editorialRoutes.EDITORIAL_CREATE(type)}
            _hover={{ textDecoration: 'none' }}
          >
            <Button
              size="md"
              variant="solid"
              colorPalette="primary"
              w={['initial', '140px']}
            >
              <NewsFreeBoardPencilSimpleLineIcon w="20px" h="20px" />
              게시글 작성
            </Button>
          </Link>
        </Box>

        <EditorialTableSection type={type} baseRoute={baseRoute} />
      </Box>
    </Suspense>
  )
}

export default EditorialListPage

'use client'

import { useRouter } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns/format'

import AdminEditorContent from '@/app/(public)/(sub-layout)/_source/components/admin-editor-content'
import FileDown from '@/components/file-down'
import {
  useEditorialsDraftRetrieveQuery,
  useEditorialsFinalRetrieveQuery,
  useEditorialsMyeongdoRetrieveQuery,
  useEditorialsTemplateRetrieveQuery,
} from '@/generated/apis/Editorials/Editorials.query'

import { EditorialType } from '../utils'

interface EditorialDetailPageProps {
  type: EditorialType
  editorialId: number
}

const EditorialDetailPage: React.FC<EditorialDetailPageProps> = ({
  type,
  editorialId,
}) => {
  const router = useRouter()

  const draftQuery = useEditorialsDraftRetrieveQuery({
    variables: { id: editorialId },
    options: { enabled: type === 'draft' },
  })
  const finalQuery = useEditorialsFinalRetrieveQuery({
    variables: { id: editorialId },
    options: { enabled: type === 'final' },
  })
  const myeongdoQuery = useEditorialsMyeongdoRetrieveQuery({
    variables: { id: editorialId },
    options: { enabled: type === 'myeongdo' },
  })
  const templateQuery = useEditorialsTemplateRetrieveQuery({
    variables: { id: editorialId },
    options: { enabled: type === 'template' },
  })

  // 타입에 따라 적절한 데이터 선택
  const editorial =
    type === 'draft' ? draftQuery.data
    : type === 'final' ? finalQuery.data
    : type === 'myeongdo' ? myeongdoQuery.data
    : templateQuery.data

  if (!editorial) return null

  return (
    <Box display="flex" flexDirection="column">
      <Box
        py="20px"
        display="flex"
        flexDirection="column"
        gap="10px"
        borderTop="1px solid"
        borderTopColor="grey.10"
        borderBottom="1px solid"
        borderBottomColor="border.basic.1"
      >
        <Text textStyle="pre-heading-2" color="grey.10" lineClamp="1">
          {editorial.title}
        </Text>
        <Text textStyle="pre-caption-2" color="grey.7">
          {format(new Date(editorial.createdAt), 'yyyy-MM-dd')}
        </Text>
        <Box display="flex" flexFlow="row wrap" gap="4px">
          {editorial.fileSet.map(({ file }) => (
            <FileDown key={file} path={file} size="l" />
          ))}
        </Box>
      </Box>

      <AdminEditorContent body={editorial.body} />

      <Box py="16px" display="flex" justifyContent="center">
        <Box onClick={() => router.back()} cursor="pointer">
          <Button
            w="120px"
            type="button"
            size="md"
            variant="solid"
            colorPalette="grey"
          >
            목록으로
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default EditorialDetailPage

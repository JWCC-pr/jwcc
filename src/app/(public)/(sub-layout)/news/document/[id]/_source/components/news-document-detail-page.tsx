'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns/format'

import AdminEditorContent from '@/app/(public)/(sub-layout)/_source/components/admin-editor-content'
import AlertDialog from '@/components/dialogs/alert-dialog'
import FileDown from '@/components/file-down'
import { ROUTES } from '@/constants/routes'
import { useDocumentRetrieveQuery } from '@/generated/apis/Document/Document.query'
import useMe from '@/hooks/useMe'

interface NewsDocumentDetailPageProps {
  documentId: number
}

const NewsDocumentDetailPage: React.FC<NewsDocumentDetailPageProps> = ({
  documentId,
}) => {
  const { isNotParishMember } = useMe()

  const { data: document } = useDocumentRetrieveQuery({
    variables: { id: documentId },
  })

  if (!document) return null

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
          {document.title}
        </Text>
        <Text textStyle="pre-caption-2" color="grey.7">
          {format(document.createdAt, 'yyyy-MM-dd')}
        </Text>
        <Box display="flex" flexFlow="row nowrap" gap="4px">
          {isNotParishMember ?
            document.fileSet.map(({ file }) => (
              <AlertDialog
                key={file}
                size="sm"
                trigger={
                  <Box>
                    <FileDown path={file} size="l" enableDownload={false} />
                  </Box>
                }
                buttons={{
                  actionProps: {
                    text: '확인',
                  },
                }}
                title="다운로드 불가"
                description="본당 신자만 다운로드 가능합니다."
              />
            ))
          : document.fileSet.map(({ file }) => (
              <FileDown key={file} path={file} size="l" />
            ))
          }
        </Box>
      </Box>

      <AdminEditorContent body={document.body} />

      <Box py="16px" display="flex" justifyContent="center">
        <Link href={ROUTES.NEWS_DOCUMENT} _hover={{ textDecoration: 'none ' }}>
          <Button
            w="120px"
            type="button"
            size="md"
            variant="solid"
            colorPalette="grey"
          >
            목록으로
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default NewsDocumentDetailPage

'use client'

import { useRouter } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns/format'

import AdminEditorContent from '@/app/(public)/(sub-layout)/_source/components/admin-editor-content'
import FileDown from '@/components/file-down'
import { useNoticeRetrieveQuery } from '@/generated/apis/Notice/Notice.query'

interface NoticesDetailPageProps {
  noticeId: number
}

const NoticesDetailPage: React.FC<NoticesDetailPageProps> = ({ noticeId }) => {
  const router = useRouter()
  const { data: notice } = useNoticeRetrieveQuery({
    variables: {
      id: noticeId,
    },
  })

  if (!notice) return null

  return (
    <Box>
      <Box
        py="20px"
        display="flex"
        flexFlow="column nowrap"
        gap="10px"
        borderTop="1.5px solid"
        borderTopColor="grey.10"
        borderBottom="1px solid"
        borderBottomColor="border.basic.1"
      >
        <Text textStyle="pre-heading-2" color="grey.10">
          {notice.title}
        </Text>
        <Text textStyle="pre-caption-2" color="grey.7">
          {format(new Date(notice.createdAt), 'yyyy-MM-dd')}
        </Text>
        <Box display="flex" gap="4px" flexFlow="row wrap">
          {notice.fileSet.map(({ file }) => (
            <FileDown key={file} path={file} />
          ))}
        </Box>
      </Box>

      <AdminEditorContent body={notice.body} />

      <Box py="16px" display="flex" justifyContent="center">
        <Box onClick={() => router.back()} cursor="pointer">
          <Button
            type="button"
            size="md"
            variant="solid"
            colorPalette="grey"
            w="120px"
          >
            목록으로
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default NoticesDetailPage

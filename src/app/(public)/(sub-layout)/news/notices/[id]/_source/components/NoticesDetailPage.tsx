'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns/format'

import FileDown from '@/components/file-down'
import { ROUTES } from '@/constants/routes'
import { useNoticeRetrieveQuery } from '@/generated/apis/Notice/Notice.query'

interface NoticesDetailPageProps {
  noticeId: number
}

const NoticesDetailPage: React.FC<NoticesDetailPageProps> = ({ noticeId }) => {
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
        <Box display="flex" gap="4px">
          {notice.fileSet.map(({ file }) => (
            <FileDown key={file} path={file} />
          ))}
        </Box>
      </Box>

      <Box
        py="20px"
        borderBottom="1px solid"
        borderBottomColor="border.basic.1"
      >
        <Box
          dangerouslySetInnerHTML={{ __html: notice.body }}
          css={{
            '& h2': {
              fontSize: '1.5em',
              fontWeight: 'bold',
              margin: '0.83em 0',
              display: 'block',
            },
            '& h3': {
              fontSize: '1.17em',
              fontWeight: 'bold',
              margin: '1em 0',
              display: 'block',
            },
            '& h4': {
              fontSize: '1em',
              fontWeight: 'bold',
              margin: '1.33em 0',
              display: 'block',
            },
            '& p': {
              display: 'block',
              margin: '1em 0',
            },
            '& strong': {
              fontWeight: 'bold',
            },
            '& a': {
              color: 'inherit',
              textDecoration: 'underline',
              cursor: 'pointer',
            },
            '& figure.image': {
              display: 'flex',
            },
            '& figure.image-style-align-right': {
              justifyContent: 'flex-end',
            },
            '& figure.image-style-align-left': {
              justifyContent: 'flex-start',
            },
            '& figure.image-style-align-center': {
              justifyContent: 'center',
            },
          }}
        />
      </Box>

      <Box py="16px" display="flex" justifyContent="center">
        <Link href={ROUTES.NEWS_NOTICES} _hover={{ textDecoration: 'none' }}>
          <Button
            type="button"
            size="md"
            variant="solid"
            colorPalette="grey"
            w="120px"
          >
            목록으로
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default NoticesDetailPage

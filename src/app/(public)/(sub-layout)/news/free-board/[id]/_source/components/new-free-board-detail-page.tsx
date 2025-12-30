'use client'

import { useRouter } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'

import { useBoardRetrieveQuery } from '@/generated/apis/Board/Board.query'

import FreeBoardDetailBodySection from './sections/free-board-detail-body-section'
import FreeBoardDetailCommentInfoSection from './sections/free-board-detail-comment-info-section'
import FreeBoardDetailCommentInputSection from './sections/free-board-detail-comment-input-section'
import FreeBoardDetailCommentListSection from './sections/free-board-detail-comment-list-section'
import FreeBoardDetailHeaderSection from './sections/free-board-detail-header-section'

interface NewFreeBoardDetailPageProps {
  id: string
}

const NewFreeBoardDetailPage: React.FC<NewFreeBoardDetailPageProps> = ({
  id,
}) => {
  const router = useRouter()

  const { data } = useBoardRetrieveQuery({
    variables: {
      id: Number(id),
    },
  })

  if (!data) return

  return (
    <Box display="flex" flexFlow="column">
      <FreeBoardDetailHeaderSection data={data} />

      <FreeBoardDetailBodySection data={data} />

      <FreeBoardDetailCommentInfoSection data={data} />

      <FreeBoardDetailCommentListSection boardId={Number(id)} />

      <FreeBoardDetailCommentInputSection boardId={Number(id)} />

      <Box py="16px" display="flex" justifyContent="center">
        <Box onClick={() => router.back()} cursor="pointer">
          <Button type="button" size="md" variant="solid" colorPalette="grey">
            목록으로
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default NewFreeBoardDetailPage

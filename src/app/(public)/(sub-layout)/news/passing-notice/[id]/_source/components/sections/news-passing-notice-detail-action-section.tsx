import { useRouter } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'

const NewsPassingNoticeDetailActionSection = () => {
  const router = useRouter()

  return (
    <Box py="16px" display="flex" justifyContent="center">
      <Box onClick={() => router.back()} cursor="pointer">
        <Button type="button" size="md" variant="solid" colorPalette="grey">
          목록으로
        </Button>
      </Box>
    </Box>
  )
}

export default NewsPassingNoticeDetailActionSection

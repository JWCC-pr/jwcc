import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Link } from '@chakra-ui/react/link'

import { ROUTES } from '@/constants/routes'

const NewsPassingNoticeDetailActionSection = () => {
  return (
    <Box py="16px" display="flex" justifyContent="center">
      <Link
        href={ROUTES.NEWS_PASSING_NOTICE}
        _hover={{ textDecoration: 'none' }}
      >
        <Button type="button" size="md" variant="solid" colorPalette="grey">
          목록으로
        </Button>
      </Link>
    </Box>
  )
}

export default NewsPassingNoticeDetailActionSection

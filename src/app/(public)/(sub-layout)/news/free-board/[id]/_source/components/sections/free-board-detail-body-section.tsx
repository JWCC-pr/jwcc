import { Box } from '@chakra-ui/react/box'

import { BoardType } from '@/generated/apis/@types/data-contracts'

interface FreeBoardDetailBodySectionProps {
  data: Pick<BoardType, 'body'>
}

const FreeBoardDetailBodySection: React.FC<FreeBoardDetailBodySectionProps> = ({
  data,
}) => {
  return (
    <Box
      py="24px"
      dangerouslySetInnerHTML={{ __html: data.body }}
      textStyle="pre-body-4"
      color="grey.10"
      css={{
        '& em, & i': {
          fontStyle: 'italic',
        },
      }}
    />
  )
}

export default FreeBoardDetailBodySection

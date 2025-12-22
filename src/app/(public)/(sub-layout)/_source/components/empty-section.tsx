import { Box, BoxProps } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { EmptyCDoveIcon } from '@/generated/icons/MyIcons'

interface EmptySectionProps extends BoxProps {
  title?: string
}

const EmptySection: React.FC<EmptySectionProps> = ({
  title = '등록된 게시글이 없습니다.',
  ...props
}) => {
  return (
    <Box
      p="36px 12px"
      display="flex"
      flexFlow="column nowrap"
      gap="10px"
      justifyContent="center"
      alignItems="center"
      borderBlock="1px solid"
      borderColor="border.basic.1"
      {...props}
    >
      <EmptyCDoveIcon w="64px" h="64px" />
      <Text textStyle="pre-body-6" color="grey.6">
        {title}
      </Text>
    </Box>
  )
}

export default EmptySection

'use client'

import { useParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

const NoticesDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <Box>
      <Text>NoticesDetailPage - {id}</Text>
    </Box>
  )
}

export default NoticesDetailPage

'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import type { SelectRootProps } from '@chakra-ui/react/select'

import Select from '@/components/select'
import { NewsFreeBoardPencilSimpleLineIcon } from '@/generated/icons/MyIcons'

const options = [
  {
    label: '최신순',
    value: '-created_at',
  },
  {
    label: '공감순',
    value: '-like_count',
  },
]

const NewFreeBoardTopSection: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sort = searchParams.get('sort') || options[0].value

  const handleSortChange: SelectRootProps['onValueChange'] = (e) => {
    const selectedValue = e.value[0]
    if (!selectedValue) return

    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', selectedValue)
    router.replace(`?${params.toString()}`)
  }

  return (
    <Box py="20px" display="flex" justifyContent="space-between">
      <Select
        w="160px"
        h="40px"
        size="md"
        variant="outline"
        colorPalette="grey"
        options={options}
        value={[sort]}
        onValueChange={handleSortChange}
      />
      <Button size="md" variant="solid" colorPalette="primary">
        <NewsFreeBoardPencilSimpleLineIcon w="20px" h="20px" />
        게시글 작성
      </Button>
    </Box>
  )
}

export default NewFreeBoardTopSection

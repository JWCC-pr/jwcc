import { useRouter, useSearchParams } from 'next/navigation'

import { type SelectRootProps } from '@chakra-ui/react/select'

import Select from '@/components/select'
import { type BoardListParamsOrderingEnumType } from '@/generated/apis/@types/data-contracts'

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

const OrderingSelect: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const ordering = (searchParams.get('ordering') ||
    options[0].value) as BoardListParamsOrderingEnumType

  const handleOrderingChange: SelectRootProps['onValueChange'] = (e) => {
    const selectedValue = e.value[0]
    if (!selectedValue) return

    const params = new URLSearchParams(searchParams.toString())
    params.set('ordering', selectedValue)
    router.replace(`?${params.toString()}`)
  }

  return (
    <Select
      w="160px"
      h="40px"
      size="md"
      variant="outline"
      colorPalette="grey"
      options={options}
      value={[ordering]}
      onValueChange={handleOrderingChange}
    />
  )
}

export default OrderingSelect

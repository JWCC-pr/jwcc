import { useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Input } from '@chakra-ui/react/input'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

import { InputGroup } from '@/components/ui/input-group'

const SearchInput: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialSearch = searchParams.get('search') ?? undefined
  const [search, setSearch] = useState(() => initialSearch)
  const [isFocused, setIsFocused] = useState(false)
  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value)
  }
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== 'Enter') return

    handleSearch()
  }
  const handleSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('search', search?.trim() ?? '')
    router.replace(`?${newSearchParams.toString()}`)
  }

  return (
    <InputGroup
      w={['full', '280px']}
      endElement={
        <MagnifyingGlassIcon
          size="20px"
          color={isFocused ? '#780536' : '#9FA4A9'}
          onClick={handleSearch}
          cursor="pointer"
        />
      }
    >
      <Input
        type="search"
        size="lg"
        variant="outline"
        colorPalette="grey"
        placeholder="검색"
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </InputGroup>
  )
}

export default SearchInput

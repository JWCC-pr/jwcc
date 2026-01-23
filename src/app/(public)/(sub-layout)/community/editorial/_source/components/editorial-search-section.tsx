'use client'

import { useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Input } from '@chakra-ui/react/input'
import { InputGroup } from '@chakra-ui/react/input-group'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

interface EditorialSearchSectionProps {
  baseRoute: string
}

const EditorialSearchSection: React.FC<EditorialSearchSectionProps> = ({
  baseRoute,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTitle = searchParams.get('title') ?? undefined

  const [title, setTitle] = useState(() => initialTitle)
  const [isFocused, setIsFocused] = useState(false)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value)
  }
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== 'Enter') return

    handleSearch()
  }
  const handleSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('title', title?.trim() ?? '')
    router.replace(`${baseRoute}?${newSearchParams.toString()}`)
  }
  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  return (
    <Box w={['full', '280px']}>
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
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </InputGroup>
    </Box>
  )
}

export default EditorialSearchSection

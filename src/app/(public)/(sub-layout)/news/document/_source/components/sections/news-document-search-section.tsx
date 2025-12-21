'use client'

import { useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Input } from '@chakra-ui/react/input'
import { InputGroup } from '@chakra-ui/react/input-group'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

import { ROUTES } from '@/constants/routes'

const NewsDocumentSearchSection: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialTitle = searchParams.get('title') ?? undefined

  const [title, setTitle] = useState(() => initialTitle)

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
    router.replace(`${ROUTES.NEWS_DOCUMENT}?${newSearchParams.toString()}`)
  }

  return (
    <Box py="20px">
      <InputGroup
        w={['full', '280px']}
        endElement={
          <MagnifyingGlassIcon
            size="20px"
            color="#9FA4A9"
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
        />
      </InputGroup>
    </Box>
  )
}

export default NewsDocumentSearchSection

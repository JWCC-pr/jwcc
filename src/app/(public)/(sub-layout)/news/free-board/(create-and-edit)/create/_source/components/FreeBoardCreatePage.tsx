'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Input } from '@chakra-ui/react/input'
import { Text } from '@chakra-ui/react/text'

import { FormHelper } from '@/components/form-helper'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

const FreeBoardCreatePage: React.FC = () => {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleCancel = () => {
    router.back()
  }
  const handleSubmit = () => {
    console.log('🐬 title, content >> ', title, content)

    // FIXME: API 연동 후 수정
    // router.push(ROUTES.NEWS_FREE_BOARD_DETAIL(createdBoardId))
  }

  const isValid = !!title && !!content

  return (
    <Box display="flex" flexDirection="column">
      <Box py="20px" borderTop="1.5px solid" borderColor="grey.10">
        <Text textStyle="pre-heading-2" color="grey.10">
          게시글 작성
        </Text>
      </Box>

      <Box py="24px" display="flex" flexDirection="column" gap="20px">
        <FormHelper
          message={{ help: `${title.length}/50` }}
          styles={{ help: { w: 'full', textAlign: 'right' } }}
        >
          <Input
            placeholder="제목"
            size="lg"
            variant="outline"
            colorPalette="grey"
            maxLength={50}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </FormHelper>

        <SimpleEditor
          content={content}
          onChange={setContent}
          placeholder="내용"
        />
      </Box>

      <Box w="362px" py="16px" display="flex" gap="10px" mx="auto">
        <Button
          type="button"
          size="lg"
          variant="solid"
          colorPalette="grey"
          flex="1"
          onClick={handleCancel}
        >
          취소
        </Button>
        <Button
          type="button"
          size="lg"
          variant="solid"
          colorPalette="primary"
          flex="1"
          disabled={!isValid}
          onClick={handleSubmit}
        >
          등록
        </Button>
      </Box>
    </Box>
  )
}

export default FreeBoardCreatePage

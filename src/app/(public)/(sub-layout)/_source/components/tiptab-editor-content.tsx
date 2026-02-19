'use client'

import { Box } from '@chakra-ui/react/box'
import { Link } from '@chakra-ui/react/link'

import parse, {
  type Element as DOMElement,
  type DOMNode,
  domToReact,
} from 'html-react-parser'

import LinkPreview from '@/components/link-preview/link-preview'

interface TiptabEditorContentProps {
  body: string
}

/** DOM 노드가 Element 타입인지 확인하는 타입 가드 */
const isElement = (domNode: DOMNode): domNode is DOMElement => {
  return domNode.type === 'tag'
}

const TiptabEditorContent: React.FC<TiptabEditorContentProps> = ({ body }) => {
  // HTML 파싱 및 <a> 태그를 LinkPreview로 교체
  const parseOptions = {
    replace: (domNode: DOMNode) => {
      // <a> 태그인지 확인
      if (isElement(domNode) && domNode.name === 'a' && domNode.attribs?.href) {
        const href = domNode.attribs.href
        const children = domNode.children || []

        // <a> 태그를 감싸는 Fragment: 원본 링크 + LinkPreview 카드
        return (
          <Box display="flex" flexDirection="column" gap="2px">
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              _hover={{ textDecoration: 'none' }}
              color="blue.500"
              w="fit-content"
            >
              {domToReact(children as DOMNode[], parseOptions)}
            </Link>
            <LinkPreview url={href} />
          </Box>
        )
      }

      return domNode
    },
  }

  const parsedContent = parse(body, parseOptions)

  return (
    <Box
      py="24px"
      textStyle="pre-body-2"
      color="grey.10"
      css={{
        '& em, & i': {
          fontStyle: 'italic',
        },
        '& img': {
          marginBlock: '0.5em',
        },
      }}
    >
      {parsedContent}
    </Box>
  )
}

export default TiptabEditorContent

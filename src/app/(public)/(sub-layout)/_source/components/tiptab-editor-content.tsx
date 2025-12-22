import { Box } from '@chakra-ui/react/box'

interface TiptabEditorContentProps {
  body: string
}

const TiptabEditorContent: React.FC<TiptabEditorContentProps> = ({ body }) => {
  return (
    <Box
      py="24px"
      dangerouslySetInnerHTML={{ __html: body }}
      textStyle="pre-body-4"
      color="grey.10"
      css={{
        '& em, & i': {
          fontStyle: 'italic',
        },
        '& a': {
          textDecoration: 'underline',
          color: 'var(--chakra-colors-blue-500)',
        },
      }}
    />
  )
}

export default TiptabEditorContent

import { Box } from '@chakra-ui/react/box'

interface AdminEditorContentProps {
  body: string
}

const AdminEditorContent: React.FC<AdminEditorContentProps> = ({ body }) => {
  return (
    <Box
      py="24px"
      borderBottom="1px solid"
      borderBottomColor="border.basic.1"
      dangerouslySetInnerHTML={{ __html: body }}
      css={{
        '& em, & i': {
          fontStyle: 'italic',
        },
        '& a': {
          textDecoration: 'underline',
        },
        '& figure.image': {
          display: 'flex',
        },
        '& figure.image-style-align-right': {
          justifyContent: 'flex-end',
        },
        '& figure.image-style-align-left': {
          justifyContent: 'flex-start',
        },
        '& figure.image-style-align-center': {
          justifyContent: 'center',
        },
      }}
    />
  )
}

export default AdminEditorContent

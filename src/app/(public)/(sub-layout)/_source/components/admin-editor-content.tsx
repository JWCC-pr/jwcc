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
        '& h2': {
          fontSize: '1.5em',
          fontWeight: 'bold',
          margin: '0.83em 0',
          display: 'block',
        },
        '& h3': {
          fontSize: '1.17em',
          fontWeight: 'bold',
          margin: '1em 0',
          display: 'block',
        },
        '& h4': {
          fontSize: '1em',
          fontWeight: 'bold',
          margin: '1.33em 0',
          display: 'block',
        },
        '& p': {
          display: 'block',
          margin: '1em 0',
        },
        '& strong': {
          fontWeight: 'bold',
        },
        '& a': {
          color: 'inherit',
          textDecoration: 'underline',
          cursor: 'pointer',
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

import { Box, BoxProps } from '@chakra-ui/react/box'

interface AdminEditorContentProps extends BoxProps {
  body: string
  hasBorderBottom?: boolean
}

const AdminEditorContent: React.FC<AdminEditorContentProps> = ({
  body,
  hasBorderBottom = true,
  ...props
}) => {
  return (
    <Box
      py="24px"
      textStyle="pre-body-4"
      {...(hasBorderBottom && {
        borderBottom: '1px solid',
        borderBottomColor: 'border.basic.1',
      })}
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
      {...props}
    />
  )
}

export default AdminEditorContent

import { Box } from '@chakra-ui/react/box'
import { Button, ButtonProps } from '@chakra-ui/react/button'
import { Dialog } from '@chakra-ui/react/dialog'
import { Portal } from '@chakra-ui/react/portal'

interface AlertDialogProps extends Omit<Dialog.RootProps, 'children'> {
  trigger?: React.ReactNode
  title: string
  description: string | React.ReactNode
  buttons: {
    cancelProps: ButtonProps & { text: string }
    actionProps: ButtonProps & { text: string }
  }

  descriptionProps?: Dialog.DescriptionProps
  contentProps?: Dialog.ContentProps
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  trigger,
  title,
  description,
  buttons,
  descriptionProps,
  contentProps,
  ...props
}) => {
  return (
    <Dialog.Root {...props}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            display="flex"
            flexDirection="column"
            gap="24px"
            {...contentProps}
          >
            <Box display="flex" flexDirection="column" gap="6px">
              <Dialog.Header>
                <Dialog.Title textAlign="center">{title}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Dialog.Description
                  textAlign="center"
                  whiteSpace="pre-line"
                  {...descriptionProps}
                >
                  {description}
                </Dialog.Description>
              </Dialog.Body>
            </Box>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <Button
                  variant="solid"
                  size="lg"
                  colorPalette="grey"
                  flex="1"
                  rounded="10px"
                  {...buttons.cancelProps}
                >
                  {buttons.cancelProps.text}
                </Button>
              </Dialog.CloseTrigger>
              <Dialog.CloseTrigger asChild>
                <Button
                  variant="solid"
                  size="lg"
                  colorPalette="primary"
                  flex="1"
                  rounded="10px"
                  {...buttons.actionProps}
                >
                  {buttons.actionProps.text}
                </Button>
              </Dialog.CloseTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default AlertDialog

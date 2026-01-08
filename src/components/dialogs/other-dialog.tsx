import { Button, ButtonProps, IconButton } from '@chakra-ui/react/button'
import { Dialog } from '@chakra-ui/react/dialog'
import { Portal } from '@chakra-ui/react/portal'
import { XIcon } from '@phosphor-icons/react'

interface OtherDialogProps extends Dialog.RootProps {
  trigger: React.ReactNode
  title: string
  contentProps?: Dialog.ContentProps
  buttons: {
    cancelProps: ButtonProps & { text: string }
    actionProps: ButtonProps & { text: string }
  }
}

const OtherDialog: React.FC<OtherDialogProps> = ({
  trigger,
  title,
  children,
  buttons,
  contentProps,
  ...props
}) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p="0" {...contentProps}>
            <Dialog.Header
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="16px 16px 8px"
            >
              <Dialog.Title textAlign="center">{title}</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <IconButton size="sm" variant="ghost" colorPalette="grey">
                  <XIcon size="16px" />
                </IconButton>
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body p="16px">{children}</Dialog.Body>
            <Dialog.Footer p="8px 16px 16px">
              <Dialog.ActionTrigger asChild>
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
              </Dialog.ActionTrigger>
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
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default OtherDialog

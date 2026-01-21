import { Button } from '@chakra-ui/react/button'

import AlertDialog from '@/components/dialogs/alert-dialog'
import { useUserPasswordResetCreateMutation } from '@/generated/apis/User/User.query'
import useMe from '@/hooks/useMe'

const PasswordResetButton: React.FC = () => {
  const { data: me } = useMe()

  const { mutateAsync } = useUserPasswordResetCreateMutation({})
  const onResetPassword = async () => {
    if (!me) return

    try {
      await mutateAsync({ data: { email: me.email } })
    } catch (error) {
      console.error('🐬 error >> ', error)
    }
  }

  return (
    <AlertDialog
      size="sm"
      trigger={
        <Button
          type="button"
          size="lg"
          variant="solid"
          colorPalette="grey"
          w="full"
          onClick={onResetPassword}
        >
          비밀번호 재설정
        </Button>
      }
      buttons={{
        actionProps: {
          text: '확인',
        },
      }}
      title="이메일 전송 완료"
      description={`비밀번호 재설정 링크가 포함된 메일이\n전송되었습니다. 메일함을 확인해주세요.\n재설정 링크는 3일 동안 유효합니다.`}
    />
  )
}

export default PasswordResetButton

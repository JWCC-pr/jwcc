import { useRouter } from 'next/navigation'

import { Button } from '@chakra-ui/react/button'

import AlertDialog from '@/components/dialogs/alert-dialog'
import { toaster } from '@/components/ui/toaster'
import { ROUTES } from '@/constants/routes'
import { useUserDestroyMutation } from '@/generated/apis/User/User.query'
import useMe from '@/hooks/useMe'

const SignOutButton: React.FC = () => {
  const router = useRouter()

  const { data: me } = useMe()

  const { mutateAsync } = useUserDestroyMutation({})
  const onSignOut = async () => {
    if (!me) return

    try {
      await mutateAsync({
        id: String(me.id),
      })
      toaster.create({
        title: '탈퇴 완료되었습니다. 평화를 빕니다.',
        type: 'success',
      })
      router.replace(ROUTES.HOME)
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
          size="md"
          variant="ghost"
          colorPalette="grey"
          w="fit-content"
        >
          회원탈퇴
        </Button>
      }
      buttons={{
        actionProps: {
          type: 'button',
          text: '탈퇴',
          onClick: onSignOut,
        },
        cancelProps: {
          type: 'button',
          text: '취소',
        },
      }}
      title="회원 탈퇴"
      description={`회원 탈퇴 후 재가입 시\n관리자 승인을 다시 받아야합니다.\n탈퇴하시겠습니까?`}
    />
  )
}

export default SignOutButton

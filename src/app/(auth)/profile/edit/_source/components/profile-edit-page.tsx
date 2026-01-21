'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { toaster } from '@/components/ui/toaster'
import { ROUTES } from '@/constants/routes'
import useMe from '@/hooks/useMe'

import ProfileEditForm from './form/profile-edit-form'
import ProfileEditFormSkeleton from './profile-edit-form-skeleton'

const ProfileEditPage: React.FC = () => {
  const { data: me, isLoading } = useMe()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return
    if (me) return

    router.replace(ROUTES.HOME)
    setTimeout(() => {
      toaster.create({
        title: '로그인 후 이용해주세요.',
        type: 'error',
      })
    }, 0)
  }, [isLoading, me, router])

  if (!me) return <ProfileEditFormSkeleton />

  const [year, month, day] = me.birth.split('-').map((v) => String(Number(v)))

  return (
    <ProfileEditForm
      defaultValues={{
        name: me.name,
        baptismName: me.baptismalName,
        address: me.baseAddress,
        addressDetail: me.detailAddress,
        postcode: me.postcode,
        birthDate: { year, month, day },
      }}
    />
  )
}

export default ProfileEditPage

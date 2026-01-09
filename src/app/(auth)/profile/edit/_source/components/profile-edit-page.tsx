'use client'

import useMe from '@/hooks/useMe'

import ProfileEditForm from './form/profile-edit-form'

const ProfileEditPage: React.FC = () => {
  const { data: me } = useMe()

  if (!me) return null

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

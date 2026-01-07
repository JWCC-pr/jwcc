import { useEffect } from 'react'

import { FormProvider } from 'react-hook-form'

import { UserGradeEnumTypeMap } from '@/generated/apis/@types/data-contracts'
import { useUserUpdateMutation } from '@/generated/apis/User/User.query'
import useMe from '@/hooks/useMe'

import { useProfileEditForm } from '../../hooks/useProfileEditForm'
import ProfileEditFormContainer from './profile-edit-form-container'
import ProfileEditFormView from './profile-edit-form-view'

const ProfileEditForm: React.FC = () => {
  const { data: me } = useMe()
  const { mutateAsync: userUpdateMutateAsync } = useUserUpdateMutation({})

  const methods = useProfileEditForm()

  useEffect(() => {
    if (!me) return

    const [year, month, day] = me.birth.split('-').map((v) => String(Number(v)))

    methods.reset({
      name: me.name,
      baptismName: me.baptismalName,
      address: me.baseAddress,
      addressDetail: me.detailAddress,
      postcode: me.postcode,
      birthDate: {
        year,
        month,
        day,
      },
    })
  }, [me, methods])

  const onSubmit = methods.handleSubmit(async (formData) => {
    if (!me) return

    try {
      await userUpdateMutateAsync({
        id: String(me.id),
        data: {
          name: formData.name,
          baptismalName: formData.baptismName,
          baseAddress: formData.address,
          detailAddress: formData.addressDetail,
          postcode: formData.postcode,
          birth: `${formData.birthDate.year}-${formData.birthDate.month.padStart(2, '0')}-${formData.birthDate.day.padStart(2, '0')}`,
        },
      })
    } catch (error) {
      console.error(error)
    }
  })

  if (!me) return null

  const grade = UserGradeEnumTypeMap[me.grade || 7]
  const departments = me.departmentSet.flatMap((v) =>
    v.subDepartment.map((v) => v.name),
  )

  return (
    <FormProvider {...methods}>
      <ProfileEditFormContainer
        onSubmit={onSubmit}
        view={<ProfileEditFormView grade={grade} departments={departments} />}
      />
    </FormProvider>
  )
}

export default ProfileEditForm

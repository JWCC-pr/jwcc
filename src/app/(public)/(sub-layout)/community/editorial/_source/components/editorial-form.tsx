'use client'

import { useRouter } from 'next/navigation'

import { FormProvider } from 'react-hook-form'

import { WeeklyBulletinEditorialType } from '@/generated/apis/@types/data-contracts'
import {
  useEditorialsDraftCreateMutation,
  useEditorialsFinalCreateMutation,
  useEditorialsMyeongdoCreateMutation,
  useEditorialsTemplateCreateMutation,
} from '@/generated/apis/Editorials/Editorials.query'

import { useEditorialForm } from '../hooks/useEditorialForm'
import { EditorialType, editorialRoutes } from '../utils'
import EditorialFormContainer from './editorial-form-container'
import EditorialFormView from './editorial-form-view'

interface EditorialFormProps {
  type: EditorialType
  isEditMode?: boolean
  initialData?: WeeklyBulletinEditorialType & { content?: string }
}

const EditorialForm: React.FC<EditorialFormProps> = ({ type, initialData }) => {
  const router = useRouter()

  const methods = useEditorialForm({
    defaultValues: {
      title: initialData?.title ?? '',
      content: initialData?.content ?? '',
      fileSet: initialData?.fileSet,
    },
  })

  const { mutateAsync: draftCreateMutateAsync } =
    useEditorialsDraftCreateMutation({})
  const { mutateAsync: finalCreateMutateAsync } =
    useEditorialsFinalCreateMutation({})
  const { mutateAsync: myeongdoCreateMutateAsync } =
    useEditorialsMyeongdoCreateMutation({})
  const { mutateAsync: templateCreateMutateAsync } =
    useEditorialsTemplateCreateMutation({})

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const formData = {
        title: data.title,
        body: data.content,
        fileSet:
          data.fileSet?.map((file) => ({
            file: file.file,
          })) ?? [],
      }

      let result: WeeklyBulletinEditorialType | null = null

      switch (type) {
        case 'draft':
          result = await draftCreateMutateAsync({ data: formData })
          break
        case 'final':
          result = await finalCreateMutateAsync({ data: formData })
          break
        case 'myeongdo':
          result = await myeongdoCreateMutateAsync({ data: formData })
          break
        case 'template':
          result = await templateCreateMutateAsync({ data: formData })
          break
      }

      router.replace(editorialRoutes.EDITORIAL_DETAIL(type, result.id))
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <FormProvider {...methods}>
      <EditorialFormContainer
        onSubmit={onSubmit}
        view={<EditorialFormView />}
      />
    </FormProvider>
  )
}

export default EditorialForm

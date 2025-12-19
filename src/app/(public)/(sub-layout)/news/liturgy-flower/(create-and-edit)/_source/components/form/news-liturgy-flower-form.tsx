'use client'

import { useParams, useRouter } from 'next/navigation'

import { FormProvider } from 'react-hook-form'

import { ROUTES } from '@/constants/routes'
import {
  useLiturgyFlowerCreateMutation,
  useLiturgyFlowerUpdateMutation,
} from '@/generated/apis/LiturgyFlower/LiturgyFlower.query'

import {
  LiturgyFlowerFormDataType,
  useLiturgyFlowerForm,
} from '../../hooks/useLiturgyFlowerForm'
import NewsLiturgyFlowerFormContainer from './news-liturgy-flower-form-container'
import NewsLiturgyFlowerFormView from './news-liturgy-flower-form-view'

interface NewsLiturgyFlowerFormProps {
  isEditMode?: boolean
  initialData?: LiturgyFlowerFormDataType
}

const NewsLiturgyFlowerForm: React.FC<NewsLiturgyFlowerFormProps> = ({
  isEditMode = false,
  initialData,
}) => {
  const router = useRouter()
  const { id: liturgyFlowerId } = useParams<{ id: string }>()

  const methods = useLiturgyFlowerForm({
    defaultValues: {
      title: initialData?.title ?? '',
      images: initialData?.images ?? [],
    },
  })

  const { mutateAsync: createLiturgyFlowerMutateAsync } =
    useLiturgyFlowerCreateMutation({})
  const { mutateAsync: updateLiturgyFlowerMutateAsync } =
    useLiturgyFlowerUpdateMutation({})
  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      let id: number | undefined

      // 수정
      if (isEditMode) {
        const result = await updateLiturgyFlowerMutateAsync({
          id: Number(liturgyFlowerId),
          data: {
            title: data.title,
            imageSet: data.images.map((image) => ({ image: image.url })),
          },
        })

        id = result.id
      }
      // 생성
      else {
        const result = await createLiturgyFlowerMutateAsync({
          data: {
            title: data.title,
            imageSet: data.images.map((image) => ({ image: image.url })),
          },
        })

        id = result.id
      }
      router.replace(ROUTES.NEWS_LITURGY_FLOWER_DETAIL(id))
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <FormProvider {...methods}>
      <NewsLiturgyFlowerFormContainer
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        view={<NewsLiturgyFlowerFormView />}
      />
    </FormProvider>
  )
}

export default NewsLiturgyFlowerForm

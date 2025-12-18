'use client'

import { useLiturgyFlowerRetrieveQuery } from '@/generated/apis/LiturgyFlower/LiturgyFlower.query'

import NewsLiturgyFlowerForm from '../../../../_source/components/form/news-liturgy-flower-form'

interface NewsLiturgyFlowerEditPageProps {
  liturgyFlowerId: number
}

const NewsLiturgyFlowerEditPage: React.FC<NewsLiturgyFlowerEditPageProps> = ({
  liturgyFlowerId,
}) => {
  const { data: initialData } = useLiturgyFlowerRetrieveQuery({
    variables: {
      id: liturgyFlowerId,
    },
  })

  if (!initialData) return

  console.log('🐬 initialData >> ', initialData)

  return (
    <NewsLiturgyFlowerForm
      isEditMode
      initialData={{
        ...initialData,
        images: initialData.imageSet.map((image) => ({
          url: image.image,
          // FIXME: 이미지 이름 임시 처리
          name: image.image.split('/').pop() ?? '',
        })),
      }}
    />
  )
}

export default NewsLiturgyFlowerEditPage

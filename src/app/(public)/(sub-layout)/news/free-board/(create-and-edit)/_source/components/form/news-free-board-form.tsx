'use client'

import { useParams, useRouter } from 'next/navigation'

import { FormProvider } from 'react-hook-form'

import { ROUTES } from '@/constants/routes'
import {
  useBoardCreateMutation,
  useBoardUpdateMutation,
} from '@/generated/apis/Board/Board.query'

import {
  NewsFreeBoardFormDataType,
  useNewsFreeBoardForm,
} from '../../hooks/useFreeboardForm'
import NewsFreeBoardFormContainer from './news-free-board-form-container'
import NewsFreeBoardView from './news-free-board-form-view'

interface NewsFreeBoardFormProps {
  isEditMode?: boolean
  initialData?: NewsFreeBoardFormDataType
}

const NewsFreeBoardForm: React.FC<NewsFreeBoardFormProps> = ({
  isEditMode = false,
  initialData,
}) => {
  const router = useRouter()
  const { id: boardId } = useParams<{ id: string }>()

  const methods = useNewsFreeBoardForm({
    defaultValues: {
      title: initialData?.title ?? '',
      content: initialData?.content ?? '',
    },
  })

  const { mutateAsync: createBoardMutateAsync } = useBoardCreateMutation({})
  const { mutateAsync: updateBoardMutateAsync } = useBoardUpdateMutation({})
  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      let id: number | undefined

      // 수정
      if (isEditMode) {
        const result = await updateBoardMutateAsync({
          id: Number(boardId),
          data: { title: data.title, body: data.content },
        })

        id = result.id
      }
      // 생성
      else {
        const result = await createBoardMutateAsync({
          data: { title: data.title, body: data.content },
        })

        id = result.id
      }
      router.replace(ROUTES.NEWS_FREE_BOARD_DETAIL(id))
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <FormProvider {...methods}>
      <NewsFreeBoardFormContainer
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        view={<NewsFreeBoardView />}
      />
    </FormProvider>
  )
}

export default NewsFreeBoardForm

'use client'

import { useBoardRetrieveQuery } from '@/generated/apis/Board/Board.query'

import NewsFreeBoardForm from '../../../../_source/components/form/news-free-board-form'

interface NewFreeBoardEditPageProps {
  id: string
}

const NewFreeBoardEditPage: React.FC<NewFreeBoardEditPageProps> = ({ id }) => {
  const { data: initialData } = useBoardRetrieveQuery({
    variables: {
      id: Number(id),
    },
  })

  if (!initialData) return

  return (
    <NewsFreeBoardForm
      isEditMode
      initialData={{ ...initialData, content: initialData.body }}
    />
  )
}

export default NewFreeBoardEditPage

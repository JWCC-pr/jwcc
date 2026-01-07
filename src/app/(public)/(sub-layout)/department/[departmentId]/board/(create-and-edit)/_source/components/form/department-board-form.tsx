'use client'

import { useParams, useRouter } from 'next/navigation'

import { FormProvider } from 'react-hook-form'

import { ROUTES } from '@/constants/routes'
import { DepartmentBoardType } from '@/generated/apis/@types/data-contracts'
import {
  useDepartmentBoardCreateMutation,
  useDepartmentBoardUpdateMutation,
} from '@/generated/apis/DepartmentBoard/DepartmentBoard.query'

import { useDepartmentBoardForm } from '../../hooks/useDepartmentBoardForm'
import DepartmentBoardFormContainer from './department-board-form-container'
import DepartmentBoardFormView from './department-board-form-view'

interface DepartmentBoardFormProps {
  departmentId: number
  isEditMode?: boolean
  initialData?: DepartmentBoardType & { content?: string }
}

const DepartmentBoardForm: React.FC<DepartmentBoardFormProps> = ({
  departmentId,
  isEditMode = false,
  initialData,
}) => {
  const router = useRouter()
  const { boardId } = useParams<{ boardId?: string }>()

  const methods = useDepartmentBoardForm({
    defaultValues: {
      title: initialData?.title ?? '',
      content: initialData?.content ?? '',
      subDepartment: initialData?.subDepartment ?? undefined,
    },
  })

  const { mutateAsync: createBoardMutateAsync } =
    useDepartmentBoardCreateMutation({})
  const { mutateAsync: updateBoardMutateAsync } =
    useDepartmentBoardUpdateMutation({})
  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      let id: number | undefined

      // 수정
      if (isEditMode) {
        if (!initialData) return

        const result = await updateBoardMutateAsync({
          id: Number(boardId),
          data: {
            title: data.title,
            body: data.content,
            subDepartment: initialData.subDepartment,
          },
        })

        id = result.id
      }
      // 생성
      else {
        const result = await createBoardMutateAsync({
          data: {
            title: data.title,
            body: data.content,
            subDepartment: data.subDepartment,
          },
        })

        id = result.id
      }
      router.replace(ROUTES.DEPARTMENT_BOARD_DETAIL(departmentId, id))
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <FormProvider {...methods}>
      <DepartmentBoardFormContainer
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        view={<DepartmentBoardFormView />}
      />
    </FormProvider>
  )
}

export default DepartmentBoardForm

'use client'

import { useParams, useRouter } from 'next/navigation'

import { FormProvider } from 'react-hook-form'

import { toaster } from '@/components/ui/toaster'
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
      fileSet: initialData?.fileSet ?? [],
      isFixed: Boolean(initialData?.isFixed),
      isSecret: Boolean(initialData?.isSecret),
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
            subDepartment: data.subDepartment,
            fileSet: data.fileSet,
            isFixed: data.isFixed,
            isSecret: data.isSecret,
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
            fileSet: data.fileSet,
            isFixed: data.isFixed,
            isSecret: data.isSecret,
          },
        })

        id = result.id
      }
      router.replace(ROUTES.COMMUNITY_DEPARTMENT_BOARD_DETAIL(departmentId, id))
    } catch (error: any) {
      console.error(error)

      const isFixedError = !!error?.error?.isFixed

      if (isFixedError) {
        toaster.create({
          type: 'error',
          title: '고정된 게시글은 최대 5개까지 가능합니다',
        })
      }
    }
  })

  return (
    <FormProvider {...methods}>
      <DepartmentBoardFormContainer
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        view={<DepartmentBoardFormView departmentId={departmentId} />}
      />
    </FormProvider>
  )
}

export default DepartmentBoardForm

'use client'

import { Box } from '@chakra-ui/react/box'
import { Input } from '@chakra-ui/react/input'

import { useFormContext, useFormState, useWatch } from 'react-hook-form'

import { FormHelper } from '@/components/form-helper'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

import { DepartmentBoardFormDataType } from '../../hooks/useDepartmentBoardForm'
import AttachmentFileSection from './attachment-file-section'
import SubDepartmentSelect from './sub-department-select'

interface DepartmentBoardFormViewProps {
  departmentId: number
}

const DepartmentBoardFormView: React.FC<DepartmentBoardFormViewProps> = ({
  departmentId,
}) => {
  const { register, control, setValue } =
    useFormContext<DepartmentBoardFormDataType>()
  const { errors } = useFormState({ control })

  const [title, content] = useWatch({
    control,
    name: ['title', 'content'],
  })

  return (
    <Box py="24px" display="flex" flexDirection="column" gap="20px">
      <FormHelper message={{ error: errors.subDepartment?.message }}>
        <SubDepartmentSelect departmentId={departmentId} />
      </FormHelper>
      <FormHelper
        message={{
          help: errors.title?.message ? undefined : `${title.length}/50`,
          error: errors.title?.message,
        }}
        styles={{ help: { w: 'full', textAlign: 'right' } }}
      >
        <Input
          placeholder="제목"
          size="lg"
          variant="outline"
          colorPalette="grey"
          maxLength={50}
          {...register('title')}
        />
      </FormHelper>

      <FormHelper message={{ error: errors.content?.message }}>
        <SimpleEditor
          hasError={!!errors.content?.message}
          content={content}
          onChange={(value) =>
            setValue('content', value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          placeholder="내용"
          fieldChoice="department_board.DepartmentBoardImage.image"
        />
      </FormHelper>

      <AttachmentFileSection />
    </Box>
  )
}

export default DepartmentBoardFormView

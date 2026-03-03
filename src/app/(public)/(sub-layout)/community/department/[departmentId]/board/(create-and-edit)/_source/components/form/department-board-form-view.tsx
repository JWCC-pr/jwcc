'use client'

import { Box } from '@chakra-ui/react/box'
import { Checkbox } from '@chakra-ui/react/checkbox'
import { Input } from '@chakra-ui/react/input'

import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form'

import { FormHelper } from '@/components/form-helper'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import useMe from '@/hooks/useMe'

import { DepartmentBoardFormDataType } from '../../hooks/useDepartmentBoardForm'
import AttachmentFileSection from './attachment-file-section'
import SubDepartmentSelect from './sub-department-select'

interface DepartmentBoardFormViewProps {
  departmentId: number
}

const DepartmentBoardFormView: React.FC<DepartmentBoardFormViewProps> = ({
  departmentId,
}) => {
  const { data: me } = useMe()

  /** 단체장 이상인지 여부 */
  const isLeaderOrAbove = me?.grade != null && me.grade <= 4

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

      <Box display="flex" flexDirection="column" gap="12px">
        <Box display="flex" gap="20px">
          <Controller
            name="isSecret"
            control={control}
            render={({ field: { value, onChange, name } }) => (
              <Checkbox.Root
                name={name}
                checked={value}
                onCheckedChange={(details) => {
                  const checked = details.checked === true
                  onChange(checked)
                }}
                size="sm"
                variant="solid"
                colorPalette="grey"
                gap="8px"
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label textStyle="pre-body-4" color="grey.10">
                  단체만 보기
                </Checkbox.Label>
              </Checkbox.Root>
            )}
          />
          {isLeaderOrAbove && (
            <Controller
              name="isFixed"
              control={control}
              render={({ field: { value, onChange, name } }) => (
                <Checkbox.Root
                  name={name}
                  checked={value}
                  onCheckedChange={(details) => {
                    const checked = details.checked === true
                    onChange(checked)
                  }}
                  size="sm"
                  variant="solid"
                  colorPalette="grey"
                  gap="8px"
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label textStyle="pre-body-4" color="grey.10">
                    고정글
                  </Checkbox.Label>
                </Checkbox.Root>
              )}
            />
          )}
        </Box>

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
      </Box>

      <AttachmentFileSection />
    </Box>
  )
}

export default DepartmentBoardFormView

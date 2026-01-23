'use client'

import { Box } from '@chakra-ui/react/box'
import { Input } from '@chakra-ui/react/input'

import { useFormContext, useFormState, useWatch } from 'react-hook-form'

import { FormHelper } from '@/components/form-helper'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

import { EditorialFormDataType } from '../hooks/useEditorialForm'
import EditorialAttachmentFileSection from './editorial-attachment-file-section'

const EditorialFormView: React.FC = () => {
  const { register, control, setValue } =
    useFormContext<EditorialFormDataType>()
  const { errors } = useFormState({ control })

  const [title, content] = useWatch({
    control,
    name: ['title', 'content'],
  })

  return (
    <Box py="24px" display="flex" flexDirection="column" gap="20px">
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
          fieldChoice="weekly_bulletin_editorial.WeeklyBulletinEditorialFile.file"
        />
      </FormHelper>
      <EditorialAttachmentFileSection />
    </Box>
  )
}

export default EditorialFormView

'use client'

import { Box } from '@chakra-ui/react/box'
import { Input } from '@chakra-ui/react/input'

import { useFormContext, useWatch } from 'react-hook-form'

import { FormHelper } from '@/components/form-helper'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

import { EditorialFormDataType } from '../hooks/useEditorialForm'
import EditorialAttachmentFileSection from './editorial-attachment-file-section'

const EditorialFormView: React.FC = () => {
  const { register, control, setValue } =
    useFormContext<EditorialFormDataType>()

  const [title, content] = useWatch({
    control,
    name: ['title', 'content'],
  })

  return (
    <Box py="24px" display="flex" flexDirection="column" gap="20px">
      <FormHelper
        message={{ help: `${title.length}/50` }}
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

      <SimpleEditor
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

      <EditorialAttachmentFileSection />
    </Box>
  )
}

export default EditorialFormView

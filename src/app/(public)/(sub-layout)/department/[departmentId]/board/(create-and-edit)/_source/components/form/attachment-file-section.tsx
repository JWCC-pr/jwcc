'use client'

import { useCallback, useRef, useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'
import { FileArrowDownIcon } from '@phosphor-icons/react'

import { useFormContext, useWatch } from 'react-hook-form'

import { uploadFiles } from '@/apis/s3-file-uploader/S3FileUploaderApi.query'
import { toaster } from '@/components/ui/toaster'
import { DepartmentCXCircleFillIcon } from '@/generated/icons/MyIcons'

import { DepartmentBoardFormDataType } from '../../hooks/useDepartmentBoardForm'

const MAX_FILE_COUNT = 20

const getFileName = (url: string) => {
  return url.split('/').pop()?.split('.').shift() ?? ''
}

const AttachmentFileSection = () => {
  const { control, setValue } = useFormContext<DepartmentBoardFormDataType>()

  const [fileSet] = useWatch({
    control,
    name: ['fileSet'],
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const files = event.target.files
      if (!files) return

      const fileArray = Array.from(files)
      const currentFiles = fileSet || []
      const remainingSlots = MAX_FILE_COUNT - currentFiles.length

      if (remainingSlots <= 0) {
        toaster.create({
          title: `파일은 최대 ${MAX_FILE_COUNT}개까지 업로드 가능합니다.`,
          type: 'error',
        })
        return
      }

      const filesToAdd = fileArray.slice(0, remainingSlots)

      const { fulfilled } = await uploadFiles(
        filesToAdd.map((file) => ({
          file,
          fieldChoice: 'department_board.DepartmentBoardImage.image',
        })),
      )

      const uploadedUrls = fulfilled.map((result) => result.url)

      setValue(
        'fileSet',
        [
          ...currentFiles,
          ...uploadedUrls.map((url) => ({
            file: url,
            fileName: getFileName(url),
          })),
        ],
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      )

      // 같은 파일을 다시 선택할 수 있도록 input 값 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error(error)
      toaster.create({
        title: '파일 업로드 중 오류가 발생했습니다.',
        type: 'error',
      })
    }
  }

  const handleRemoveFile = useCallback(
    (index: number) => {
      const newFiles = (fileSet || []).filter((_, i) => i !== index)
      setValue('fileSet', newFiles, {
        shouldValidate: true,
        shouldDirty: true,
      })
    },
    [fileSet, setValue],
  )

  const handleBoxClick = useCallback(() => {
    const currentFiles = fileSet || []
    if (currentFiles.length >= MAX_FILE_COUNT) {
      toaster.create({
        title: `파일은 최대 ${MAX_FILE_COUNT}개까지 업로드 가능합니다.`,
        type: 'error',
      })
      return
    }
    fileInputRef.current?.click()
  }, [fileSet])

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const files = e.dataTransfer.files
      if (!files || files.length === 0) return

      const currentFiles = fileSet || []
      const remainingSlots = MAX_FILE_COUNT - currentFiles.length

      if (remainingSlots <= 0) {
        toaster.create({
          title: `파일은 최대 ${MAX_FILE_COUNT}개까지 업로드 가능합니다.`,
          type: 'error',
        })
        return
      }

      const fileArray = Array.from(files)
      const filesToAdd = fileArray.slice(0, remainingSlots)

      try {
        const { fulfilled } = await uploadFiles(
          filesToAdd.map((file) => ({
            file,
            fieldChoice: 'department_board.DepartmentBoardImage.image',
          })),
        )

        const uploadedUrls = fulfilled.map((result) => result.url)

        setValue(
          'fileSet',
          [
            ...currentFiles,
            ...uploadedUrls.map((url) => ({
              file: url,
              fileName: getFileName(url),
            })),
          ],
          {
            shouldValidate: true,
            shouldDirty: true,
          },
        )
      } catch (error) {
        console.error(error)
        toaster.create({
          title: '파일 업로드 중 오류가 발생했습니다.',
          type: 'error',
        })
      }
    },
    [fileSet, setValue],
  )

  return (
    <Box display="flex" flexFlow="column wrap" gap="16px">
      <Box display="flex" flexFlow="column wrap" gap="6px">
        <Box display="flex" alignItems="center" gap="4px">
          <Text textStyle="pre-body-5" color="grey.10">
            첨부파일
          </Text>
          <Text textStyle="pre-body-6" color="primary.4">
            ({fileSet?.length || 0}/{MAX_FILE_COUNT})
          </Text>
        </Box>
        <>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            hidden
            onChange={handleFileSelect}
          />
          <Box
            p="24px"
            border="1px dashed"
            borderColor={isDragging ? 'primary.4' : 'border.basic.2'}
            bg={isDragging ? 'primary.1' : 'transparent'}
            rounded="6px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="10px"
            cursor="pointer"
            transition="all 0.2s"
            onClick={handleBoxClick}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            _hover={{
              borderColor: 'border.basic.3',
              bg: 'background.basic.2',
            }}
          >
            <Button
              size="md"
              variant="solid"
              colorPalette="grey"
              onClick={(e) => {
                e.stopPropagation()
                handleBoxClick()
              }}
            >
              파일 선택
            </Button>
            <Text textStyle="pre-body-6" color="grey.7">
              또는 여기로 파일을 끌어오세요
            </Text>
          </Box>
        </>
        {fileSet && fileSet.length > 0 && (
          <Box display="flex" flexFlow="row wrap" gap="8px">
            {fileSet.map(({ file, fileName }, index) => {
              return (
                <Box
                  key={file}
                  p="8px 10px"
                  display="flex"
                  alignItems="center"
                  gap="4px"
                  border="1px solid"
                  borderColor="border.basic.1"
                  rounded="8px"
                >
                  <FileArrowDownIcon size="20px" color="#6A6D71" />
                  <Text textStyle="pre-body-6" color="grey.10">
                    {fileName}
                  </Text>
                  <DepartmentCXCircleFillIcon
                    w="20px"
                    h="20px"
                    color="grey.4"
                    cursor="pointer"
                    onClick={() => handleRemoveFile(index)}
                  />
                </Box>
              )
            })}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default AttachmentFileSection

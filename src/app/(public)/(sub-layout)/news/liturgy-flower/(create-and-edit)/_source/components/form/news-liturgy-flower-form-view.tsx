'use client'

import { useCallback, useRef, useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Image } from '@chakra-ui/react/image'
import { Input } from '@chakra-ui/react/input'
import { Text } from '@chakra-ui/react/text'
import { PlusIcon } from '@phosphor-icons/react'

import { useFormContext, useWatch } from 'react-hook-form'

import { uploadFiles } from '@/apis/s3-file-uploader/S3FileUploaderApi.query'
import { FormHelper } from '@/components/form-helper'
import { NewsLiturgyFlowerCXCircleFillIcon } from '@/generated/icons/MyIcons'

import { LiturgyFlowerFormDataType } from '../../hooks/useLiturgyFlowerForm'

const MAX_IMAGES = 20

const NewsLiturgyFlowerFormView: React.FC = () => {
  const { register, control, setValue } =
    useFormContext<LiturgyFlowerFormDataType>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const [title, images] = useWatch({ control, name: ['title', 'images'] })

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const files = event.target.files
      if (!files) return

      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith('image/'),
      )

      if (imageFiles.length === 0) return

      const currentImages = images || []
      const remainingSlots = MAX_IMAGES - currentImages.length

      if (remainingSlots <= 0) {
        alert(`이미지는 최대 ${MAX_IMAGES}개까지 업로드 가능합니다.`)
        return
      }

      const filesToAdd = imageFiles.slice(0, remainingSlots)

      const { fulfilled } = await uploadFiles(
        filesToAdd.map((file) => ({
          file,
          fieldChoice: 'liturgy_flower.LiturgyFlowerImage.image',
        })),
      )

      const createdImages = fulfilled.map((image) => ({
        url: image.url,
        name: image.name,
      }))

      setValue('images', [...currentImages, ...createdImages], {
        shouldValidate: true,
      })

      // 같은 파일을 다시 선택할 수 있도록 input 값 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemoveImage = useCallback(
    (index: number) => {
      const newImages = images.filter((_, i) => i !== index)
      setValue('images', newImages, { shouldValidate: true })
    },
    [images, setValue],
  )

  const handleBoxClick = useCallback(() => {
    if (images.length >= MAX_IMAGES) {
      alert(`이미지는 최대 ${MAX_IMAGES}개까지 업로드 가능합니다.`)
      return
    }
    fileInputRef.current?.click()
  }, [images.length])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !scrollContainerRef.current) return
      e.preventDefault()
      const x = e.pageX - scrollContainerRef.current.offsetLeft
      const walk = (x - startX) * 2
      scrollContainerRef.current.scrollLeft = scrollLeft - walk
    },
    [isDragging, startX, scrollLeft],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

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

      <Box display="flex" flexDirection="column" gap="10px">
        <Box display="flex" gap="4px">
          <Text textStyle="pre-body-5" color="grey.7">
            이미지 업로드
          </Text>
          <Text textStyle="pre-body-5" color="grey.7">
            ({images.length}/{MAX_IMAGES})
          </Text>
        </Box>
        <Box
          ref={scrollContainerRef}
          display="flex"
          gap="12px"
          overflowX="auto"
          cursor={isDragging ? 'grabbing' : 'grab'}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {images.length < MAX_IMAGES && (
            <Box flexShrink="0">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleFileSelect}
              />

              <Box
                w="120px"
                h="120px"
                rounded="6px"
                border="1px dashed"
                borderColor="border.basic.3"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                onClick={handleBoxClick}
                _hover={{
                  borderColor: 'border.basic.4',
                  bgColor: 'background.basic.3',
                }}
              >
                <PlusIcon size="24px" color="#B8BCC0" />
              </Box>
            </Box>
          )}

          {images.map((image, index) => (
            <Box
              key={index}
              flexShrink="0"
              display="flex"
              flexDirection="column"
              gap="2px"
              w="120px"
            >
              <Image
                src={image.url}
                alt={image.name}
                w="120px"
                h="120px"
                objectFit="cover"
                rounded="6px"
                border="1px solid"
                borderColor="border.basic.3"
              />
              <Box display="flex" gap="4px" alignItems="center" minW="0">
                <Text
                  flex="1"
                  textStyle="pre-caption-2"
                  color="grey.7"
                  lineClamp={1}
                  minW="0"
                >
                  {image.name}
                </Text>

                <NewsLiturgyFlowerCXCircleFillIcon
                  w="16px"
                  h="16px"
                  flexShrink="0"
                  cursor="pointer"
                  onClick={() => handleRemoveImage(index)}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default NewsLiturgyFlowerFormView

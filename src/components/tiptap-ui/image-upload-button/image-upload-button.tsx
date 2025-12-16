'use client'

import { forwardRef, useCallback } from 'react'

import type { IconButtonProps } from '@chakra-ui/react/button'
import { IconButton } from '@chakra-ui/react/button'

// --- Tiptap UI ---
import type { UseImageUploadConfig } from '@/components/tiptap-ui/image-upload-button'
import { useImageUpload } from '@/components/tiptap-ui/image-upload-button'
// --- Hooks ---
import { useTiptapEditor } from '@/hooks/use-tiptap-editor'

export interface ImageUploadButtonProps
  extends
    Omit<IconButtonProps, 'aria-label' | 'aria-pressed' | 'type'>,
    UseImageUploadConfig {}

/**
 * Button component for uploading/inserting images in a Tiptap editor.
 *
 * For custom button implementations, use the `useImageUpload` hook instead.
 */
export const ImageUploadButton = forwardRef<
  HTMLButtonElement,
  ImageUploadButtonProps
>(
  (
    {
      editor: providedEditor,
      hideWhenUnavailable = false,
      onInserted,
      onClick,
      children,
      ...iconButtonProps
    },
    ref,
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const { isVisible, canInsert, handleImage, label, isActive, Icon } =
      useImageUpload({
        editor,
        hideWhenUnavailable,
        onInserted,
      })

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleImage()
      },
      [handleImage, onClick],
    )

    if (!isVisible) {
      return null
    }

    return (
      <IconButton
        variant="ghost"
        size="md"
        disabled={!canInsert}
        aria-label={label}
        aria-pressed={isActive}
        onClick={handleClick}
        colorPalette={isActive ? 'primary' : 'grey'}
        {...iconButtonProps}
        ref={ref}
      >
        {children ?? <Icon />}
      </IconButton>
    )
  },
)

ImageUploadButton.displayName = 'ImageUploadButton'

'use client'

import { forwardRef, useCallback } from 'react'

import type { IconButtonProps } from '@chakra-ui/react/button'
import { IconButton } from '@chakra-ui/react/button'

// --- Tiptap UI ---
import type { UseTextAlignConfig } from '@/components/tiptap-ui/text-align-button'
import { useTextAlign } from '@/components/tiptap-ui/text-align-button'
// --- Hooks ---
import { useTiptapEditor } from '@/hooks/use-tiptap-editor'

export interface TextAlignButtonProps
  extends
    Omit<IconButtonProps, 'aria-label' | 'aria-pressed' | 'type'>,
    UseTextAlignConfig {}

/**
 * Button component for setting text alignment in a Tiptap editor.
 *
 * For custom button implementations, use the `useTextAlign` hook instead.
 */
export const TextAlignButton = forwardRef<
  HTMLButtonElement,
  TextAlignButtonProps
>(
  (
    {
      editor: providedEditor,
      align,
      hideWhenUnavailable = false,
      onAligned,
      onClick,
      children,
      ...iconButtonProps
    },
    ref,
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const { isVisible, handleTextAlign, label, canAlign, isActive, Icon } =
      useTextAlign({
        editor,
        align,
        hideWhenUnavailable,
        onAligned,
      })

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleTextAlign()
      },
      [handleTextAlign, onClick],
    )

    if (!isVisible) {
      return null
    }

    return (
      <IconButton
        variant="ghost"
        size="md"
        disabled={!canAlign}
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

TextAlignButton.displayName = 'TextAlignButton'

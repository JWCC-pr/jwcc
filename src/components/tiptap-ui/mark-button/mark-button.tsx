'use client'

import { forwardRef, useCallback } from 'react'

import type { IconButtonProps } from '@chakra-ui/react/button'
import { IconButton } from '@chakra-ui/react/button'

// --- Tiptap UI ---
import type { UseMarkConfig } from '@/components/tiptap-ui/mark-button'
import { useMark } from '@/components/tiptap-ui/mark-button'
// --- Hooks ---
import { useTiptapEditor } from '@/hooks/use-tiptap-editor'

export interface MarkButtonProps
  extends
    Omit<IconButtonProps, 'aria-label' | 'aria-pressed' | 'type'>,
    UseMarkConfig {}

/**
 * Button component for toggling marks in a Tiptap editor.
 *
 * For custom button implementations, use the `useMark` hook instead.
 */
export const MarkButton = forwardRef<HTMLButtonElement, MarkButtonProps>(
  (
    {
      editor: providedEditor,
      type,
      hideWhenUnavailable = false,
      onToggled,
      onClick,
      children,
      ...iconButtonProps
    },
    ref,
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const { isVisible, handleMark, label, canToggle, isActive, Icon } = useMark(
      {
        editor,
        type,
        hideWhenUnavailable,
        onToggled,
      },
    )

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleMark()
      },
      [handleMark, onClick],
    )

    if (!isVisible) {
      return null
    }

    return (
      <IconButton
        variant="ghost"
        size="md"
        disabled={!canToggle}
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

MarkButton.displayName = 'MarkButton'

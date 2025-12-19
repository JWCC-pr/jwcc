'use client'

import { forwardRef, useCallback } from 'react'

import type { IconButtonProps } from '@chakra-ui/react/button'
import { IconButton } from '@chakra-ui/react/button'

// --- Tiptap UI ---
import type { UseLinkConfig } from '@/components/tiptap-ui/link-button'
import { useLink } from '@/components/tiptap-ui/link-button'
// --- Hooks ---
import { useTiptapEditor } from '@/hooks/use-tiptap-editor'

export interface LinkButtonProps
  extends
    Omit<IconButtonProps, 'aria-label' | 'aria-pressed' | 'type'>,
    UseLinkConfig {}

/**
 * Button component for setting/unsetting links in a Tiptap editor.
 *
 * For custom button implementations, use the `useLink` hook instead.
 */
export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(
  (
    {
      editor: providedEditor,
      hideWhenUnavailable = false,
      onToggled,
      onClick,
      children,
      ...iconButtonProps
    },
    ref,
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const { isVisible, canToggle, handleLink, label, isActive, Icon } = useLink(
      {
        editor,
        hideWhenUnavailable,
        onToggled,
      },
    )

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleLink()
      },
      [handleLink, onClick],
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

LinkButton.displayName = 'LinkButton'

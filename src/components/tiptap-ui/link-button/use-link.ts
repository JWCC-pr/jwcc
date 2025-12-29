'use client'

import { useCallback, useEffect, useState } from 'react'

import type { Editor } from '@tiptap/react'

// --- Icons ---
import { LinkIcon } from '@/components/tiptap-icons/link-icon'
// --- Hooks ---
import { useTiptapEditor } from '@/hooks/use-tiptap-editor'
// --- Lib ---
import { isNodeTypeSelected } from '@/lib/tiptap-utils'

/**
 * Configuration for the link functionality
 */
export interface UseLinkConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null
  /**
   * Whether the button should hide when link is not available.
   * @default false
   */
  hideWhenUnavailable?: boolean
  /**
   * Callback function called after a successful link operation.
   */
  onToggled?: () => void
}

/**
 * Checks if a link can be set in the current editor state
 */
export function canSetLink(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  if (isNodeTypeSelected(editor, ['image'])) return false

  return editor.can().setLink({ href: '' })
}

/**
 * Checks if a link is currently active
 */
export function isLinkActive(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  return editor.isActive('link')
}

/**
 * Gets the current link href if active
 */
export function getLinkHref(editor: Editor | null): string | null {
  if (!editor || !editor.isEditable) return null
  const attrs = editor.getAttributes('link')
  return attrs.href || null
}

/**
 * Normalizes a URL by adding https:// prefix if needed
 */
function normalizeUrl(url: string): string {
  if (!url || url.trim() === '') return url

  const trimmedUrl = url.trim()

  // 이미 http:// 또는 https://로 시작하면 그대로 반환
  if (/^https?:\/\//i.test(trimmedUrl)) {
    return trimmedUrl
  }

  // 그 외의 경우 https://를 접두사로 추가
  return `https://${trimmedUrl}`
}

/**
 * Sets a link in the editor
 */
export function setLink(editor: Editor | null, href: string): boolean {
  if (!editor || !editor.isEditable) return false
  if (!canSetLink(editor)) return false

  if (href) {
    const normalizedHref = normalizeUrl(href)
    return editor.chain().focus().setLink({ href: normalizedHref }).run()
  } else {
    return editor.chain().focus().unsetLink().run()
  }
}

/**
 * Toggles a link in the editor
 */
export function toggleLink(editor: Editor | null, href?: string): boolean {
  if (!editor || !editor.isEditable) return false
  if (!canSetLink(editor)) return false

  if (isLinkActive(editor)) {
    return editor.chain().focus().unsetLink().run()
  } else {
    const url = href || window.prompt('Enter URL:')
    if (url) {
      // setLink에서 normalizeUrl을 처리하므로 여기서는 그대로 전달
      return setLink(editor, url)
    }
    return false
  }
}

/**
 * Determines if the link button should be shown
 */
export function shouldShowLinkButton(props: {
  editor: Editor | null
  hideWhenUnavailable: boolean
}): boolean {
  const { editor, hideWhenUnavailable } = props

  if (!editor || !editor.isEditable) return false

  if (hideWhenUnavailable) {
    return canSetLink(editor)
  }

  return true
}

/**
 * Custom hook that provides link functionality for Tiptap editor
 */
export function useLink(config: UseLinkConfig) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onToggled,
  } = config

  const { editor } = useTiptapEditor(providedEditor)
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const canToggle = canSetLink(editor)
  const isActive = isLinkActive(editor)

  useEffect(() => {
    if (!editor) return

    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowLinkButton({ editor, hideWhenUnavailable }))
    }

    handleSelectionUpdate()

    editor.on('selectionUpdate', handleSelectionUpdate)

    return () => {
      editor.off('selectionUpdate', handleSelectionUpdate)
    }
  }, [editor, hideWhenUnavailable])

  const handleLink = useCallback(() => {
    if (!editor) return false

    const success = toggleLink(editor)
    if (success) {
      onToggled?.()
    }
    return success
  }, [editor, onToggled])

  return {
    isVisible,
    isActive,
    handleLink,
    canToggle,
    label: 'Link',
    Icon: LinkIcon,
  }
}

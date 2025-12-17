'use client'

import { Box } from '@chakra-ui/react/box'
import { Image } from '@tiptap/extension-image'
import { TextAlign } from '@tiptap/extension-text-align'
import { EditorContent, EditorContext, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'

import '@/components/tiptap-node/image-node/image-node.scss'
import { ImageUploadNode } from '@/components/tiptap-node/image-upload-node/image-upload-node-extension'
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'
import '@/components/tiptap-templates/simple/simple-editor.scss'
import { Toolbar, ToolbarGroup } from '@/components/tiptap-ui-primitive/toolbar'
import { ImageUploadButton } from '@/components/tiptap-ui/image-upload-button'
import { MarkButton } from '@/components/tiptap-ui/mark-button'
import { TextAlignButton } from '@/components/tiptap-ui/text-align-button'
import { usePresignedUrlCreateMutation } from '@/generated/apis/PresignedUrl/PresignedUrl.query'
import { MAX_FILE_SIZE } from '@/lib/tiptap-utils'

interface SimpleEditorProps {
  content?: string
  onChange?: (content: string) => void
  placeholder?: string
}

export function SimpleEditor({
  content = '',
  onChange,
  placeholder = '내용',
}: SimpleEditorProps) {
  const { mutateAsync: presignedUrlCreateMutateAsync } =
    usePresignedUrlCreateMutation({})

  const handleImageUpload = async (
    file: File,
    onProgress?: (event: { progress: number }) => void,
    abortSignal?: AbortSignal,
  ) => {
    // FIXME: API 연동 후 수정
    // const { url, fields } = await presignedUrlCreateMutateAsync({
    //   data: {
    //     fileName: file.name,
    //     fieldChoice: 'document.DocumentFile.file',
    //     isDownload: false,
    //   },
    // })

    return 'https://avatars.githubusercontent.com/u/63289318?v=4'
  }

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.',
        class: 'simple-editor',
        'data-placeholder': placeholder,
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        heading: false,
        blockquote: false,
        codeBlock: false,
        listItem: false,
        bulletList: false,
        orderedList: false,
      }),
      TextAlign.configure({ types: ['paragraph'] }),
      Image,
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 1,
        upload: handleImageUpload,
        onError: (error) => console.error('Upload failed:', error),
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <Box w="full" overflow="hidden">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          style={{
            padding: '4px 0px',
            borderBlock: '1px solid #EAEBEC',
          }}
        >
          <ToolbarGroup>
            <MarkButton type="bold" />
            <MarkButton type="italic" />
            <MarkButton type="strike" />
            <MarkButton type="underline" />
          </ToolbarGroup>

          <Box w="1px" h="24px" bg="border.basic.1" />

          <ToolbarGroup>
            <TextAlignButton align="left" />
            <TextAlignButton align="center" />
            <TextAlignButton align="right" />
            <TextAlignButton align="justify" />
          </ToolbarGroup>

          <Box w="1px" h="24px" bg="border.basic.1" />

          <ToolbarGroup>
            <ImageUploadButton />
          </ToolbarGroup>
        </Toolbar>

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    </Box>
  )
}

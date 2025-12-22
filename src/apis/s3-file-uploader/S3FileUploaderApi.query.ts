import { useMutation } from '@tanstack/react-query'
import { assertItemOf, createS3UploadFlow } from '@toktokhan-dev/universal'

import { PresignedRequestFieldChoiceEnumType } from '@/generated/apis/@types/data-contracts'
import { presignedUrlApi } from '@/generated/apis/PresignedUrl/PresignedUrl.query'
import { UseMutationParams } from '@/types/module/react-query/use-mutation-params'

/**
 * presigned url s3 Flow
 *
 * @description
 * createUploadFlow 함수는 S3 파일 업로드를 위한 플로우를 생성합니다.
 * 해당 함수는 prepareUpload 와 uploadFileToS3 두개의 함수를 받아 연속 실행하는 함수를 반환합니다.
 *
 * - prepareUpload: 파일을 업로드하기 전에 필요한 정보를 준비합니다. (주로 presigned url 을 생성하는 역할을 수행합니다.)
 * - uploadFileToS3: S3에 파일을 업로드합니다.
 *
 * 반환되는 함수는 prepareUpload 함수의 parameter type 을 input type 으로 가지며, uploadFileToS3 함수의 return type 을 반환합니다.
 *
 * @example
 * ```
 * // input
 * prepareUpload: async (number) => { someField: string };
 * uploadFileToS3: async ({ someField: string }) => stirng;
 *
 * // output
 * uploadFile : (number) => string;
 * uploadFiles: (number[]) => { fulfilled: string[], rejected: PromiseRejectedResult[] }
 * ```
 *
 */

export const { uploadFile, uploadFiles } = createS3UploadFlow({
  prepareUpload: async ({
    file,
    fieldChoice,
    isDownload = false,
  }: {
    file: File
    fieldChoice?: PresignedRequestFieldChoiceEnumType
    isDownload?: boolean
  }) => {
    const { name, type } = file
    const [mime] = type.split('/')
    assertItemOf(
      ['image', 'audio', 'text', 'video', 'application'] as const,
      mime,
    )

    const { fields, url } = await presignedUrlApi.presignedUrlCreate({
      data: {
        fileName: name,
        fieldChoice,
        isDownload,
      },
    })
    const formData = new FormData()
    Object.entries(fields).forEach(([k, v]) => formData.append(k, v as string))
    formData.append('file', file)

    return {
      url,
      formData,
      fields,
      file,
    }
  },
  uploadFileToS3: async ({ url, formData, file, fields }) => {
    await fetch(url, { method: 'POST', body: formData })
    return {
      url: url + '/' + fields.key,
      name: file.name,
      file,
    }
  },
})

export const useUploadFileToS3Mutation = (
  params?: UseMutationParams<typeof uploadFile>,
) => {
  return useMutation({
    mutationFn: uploadFile,
    ...params?.options,
  })
}

export const useUploadFilesToS3Mutation = (
  params?: UseMutationParams<typeof uploadFiles>,
) => {
  return useMutation({
    mutationFn: uploadFiles,
    ...params?.options,
  })
}

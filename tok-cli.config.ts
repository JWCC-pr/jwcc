import { RootConfig } from '@toktokhan-dev/cli'
import { commit } from '@toktokhan-dev/cli-plugin-commit'
import { genApi } from '@toktokhan-dev/cli-plugin-gen-api-react-query'
import { genIcon } from '@toktokhan-dev/cli-plugin-gen-icon-chakra'
import { genImg } from '@toktokhan-dev/cli-plugin-gen-img'
import { genTheme } from '@toktokhan-dev/cli-plugin-gen-theme-chakra'

const config: RootConfig<{
  plugins: [
    typeof genImg,
    typeof genApi,
    typeof genTheme,
    typeof genIcon,
    typeof commit,
  ]
}> = {
  plugins: [genImg, genApi, genTheme, genIcon, commit],
  'gen:img': {
    input: 'public/images',
    oneDepth: true,
    basePath: '/images',
  },
  'gen:api': {
    swaggerSchemaUrl: 'https://api.jwcc.or.kr/openapi.json/',
    httpClientType: 'fetch',
    instancePath: '@/configs/fetch/fetch-extend',
    paginationSets: [
      {
        keywords: ['offset', 'limit'],
        nextKey: 'offset',
        getNextPage: (param) => {
          const { pagination, apiInstanceName, functionName } = param
          const { nextKey } = pagination
          return `({ pageParam }) => {
             const ${nextKey} = pageParam ?? params?.variables?.query?.${nextKey} ?? 0;
             return ${apiInstanceName}.${functionName}({
              ...params?.variables,
              query: { ...params?.variables?.query, ${nextKey} },
            });
          }`
        },
        getNextPageParam: `(lastPage, allPages) => {
          if (!lastPage?.isNext) return null;
          const fetchedLength = allPages?.length || 0;
          const initialOffset = params?.variables?.query?.offset || 0;
          const limit = params?.variables?.query?.limit || 0;

          return initialOffset + fetchedLength * limit;
        }`,
      },
      {
        keywords: ['cursor'],
        nextKey: 'cursor',
        /**
         * @type undefined | string | (param: {apiInstanceName: string; functionName: string, pagination: { keywords: string[], nextKey: string }}) => string
         */
        getNextPage: (param) => {
          const { pagination, apiInstanceName, functionName } = param
          const { nextKey } = pagination
          const query = `pageParam ? { ...params?.variables?.query, ${nextKey}: pageParam } :  { ...params?.variables?.query }`
          return `({ pageParam }: { pageParam: any }) => {
             return ${apiInstanceName}.${functionName}({
              ...params?.variables,
              query: ${query},
            });
          }`
        },
        /**
         * @type undefined | string | (param: {apiInstanceName: string; functionName: string, pagination: { keywords: string[], nextKey: string }}) => string
         */
        getNextPageParam: () => `(lastPage) => {
          return lastPage.cursor;
        }`,
      },
    ],
  },
  'gen:theme': {
    tokenModes: {
      colors: {
        light: 'light',
        dark: 'dark',
      },
      textStyles: {
        base: 'mobile',
        sm: 'tablet',
        md: 'desktop',
      },
    },
    version: 'v3',
    input: './token.json',
  },
  'gen:icon': {
    input: 'public/icons',
    version: 'v3',
  },
}
export default config

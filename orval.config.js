module.exports = {
  api: {
    input: 'https://rhwlgns4386.github.io/WEB5_7_4Please_API/openapi.json',
    output: {
      // API를 태그 기준으로 파일을 분리하여 생성합니다.
      mode: 'tags-split',
      // 생성될 파일들이 위치할 타겟 디렉토리입니다.
      target: 'src/api',
      // tanstack-query v5 클라이언트를 사용합니다.
      client: 'react-query',
      // 생성된 파일에 Prettier를 적용하여 코드 스타일을 통일합니다.
      prettier: true,
      // 생성된 모든 파일에 대한 재정의 옵션입니다.
      override: {
        // orval이 API 요청을 보낼 때 사용할 함수(mutator)를 설정합니다.
        mutator: {
          // 이전에 만든 axios 설정 파일 경로입니다.
          path: './src/lib/axiosConfig.ts',
          // axios 설정 파일에서 `export default`로 내보냈으므로 'default'를 사용합니다.
          name: 'default',
        },
        // tanstack-query v5에 맞게 옵션을 설정합니다.
        query: {
          useQuery: true,
          useMutation: true,
          // 생성되는 훅 이름에 'query' 접미사를 붙이지 않습니다. (예: useGetProducts)
          signal: true,
        },
        // zod 스키마를 생성하도록 설정합니다.
        schemas: {
          // zod 스키마가 저장될 경로입니다.
          target: 'src/api/model',
        },
      },
    },
    // 생성된 파일 상단에 추가될 주석입니다.
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
};

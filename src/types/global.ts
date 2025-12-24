export {}

declare global {
  interface Window {
    daum: {
      // 카카오 우편번호 서비스 타입 정의
      Postcode: new (options: {
        oncomplete: (data: {
          zonecode: string
          address: string
          addressEnglish: string
          addressType: 'R' | 'J'
          bname: string
          buildingName: string
        }) => void
      }) => {
        open: () => void
      }

      // 카카오 맵 서비스 타입 정의
      roughmap: {
        Lander: new (options: {
          timestamp: string
          key: string
          mapWidth: string
          mapHeight: string
        }) => {
          render: () => void
        }
      }
    }
  }
}

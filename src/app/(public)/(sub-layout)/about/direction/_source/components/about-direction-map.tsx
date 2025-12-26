import { useCallback, useEffect, useRef } from 'react'

import { Box } from '@chakra-ui/react/box'

const AboutDirectionMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(false)

  const renderMap = useCallback(() => {
    // 기존 맵 제거
    const container = document.getElementById(
      'daumRoughmapContainer1766567029490',
    )
    if (container) {
      container.innerHTML = ''
    }

    // 새로 맵 렌더링
    if (window?.daum?.roughmap?.Lander) {
      const mapInstance = new window.daum.roughmap.Lander({
        timestamp: '1766567029490',
        key: 'efcd5vmoax8',
        mapWidth: '100%',
        mapHeight: '100%',
      })
      mapInstance.render()
    }
  }, [])

  // 카카오맵 넓이 100%
  useEffect(() => {
    if (isFirstRender.current) return
    isFirstRender.current = true

    const styleId = 'daum-roughmap-responsive-style'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
          #daumRoughmapContainer1766567029490,
          #daumRoughmapContainer1766567029490 > *,
          #daumRoughmapContainer1766567029490 iframe {
            width: 100% !important;
            max-width: 100% !important;
            height: 100% !important;
            min-height: 100% !important;
          }
        `
      document.head.appendChild(style)
    }

    // 초기 맵 렌더링
    renderMap()
  }, [isFirstRender, renderMap])

  // 브라우저 사이즈 변경 시 맵 렌더링
  useEffect(() => {
    if (!containerRef.current) return

    let resizeTimeout: NodeJS.Timeout | null = null

    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      resizeTimeout = setTimeout(() => {
        if (window.daum && containerRef.current) {
          renderMap()
        }
      }, 300)
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(containerRef.current)

    // window resize 이벤트도 감지 (모바일 회전 등)
    window.addEventListener('resize', handleResize)

    return () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      resizeObserver.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [renderMap])

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js" />

      <Box
        ref={containerRef}
        w="full"
        h={['240px', '420px', '420px']}
        overflow="hidden"
      >
        <Box
          id="daumRoughmapContainer1766567029490"
          className="root_daum_roughmap root_daum_roughmap_landing"
          w="full"
          h="full"
        />
      </Box>
    </>
  )
}

export default AboutDirectionMap

import { useMemo } from 'react'

import { NAV_ITEMS } from '@/constants/nav-items'
import { ROUTES } from '@/constants/routes'
import { useDepartmentListQuery } from '@/generated/apis/Department/Department.query'

import useMe from './useMe'

const useNavItems = () => {
  const { isMyeongdoMember, isAdmin } = useMe()
  const { data: departmentList } = useDepartmentListQuery()

  /** 각종 자료실 제외한 nav */
  const navItems = useMemo(() => {
    if (!departmentList) {
      return NAV_ITEMS
    }

    return NAV_ITEMS.map((item) => {
      const isCommunity = item.startPath.startsWith('/community')

      if (!isCommunity) return item

      return {
        ...item,
        subItems: [
          ...item.subItems,
          ...departmentList
            // 소속 없음 제외
            .filter((department) => department.name !== '소속 없음')
            // 하위 분과가 있는 분과만 표시
            .filter((department) => department.subDepartmentSet.length > 0)
            .map((department) => ({
              label: department.name,
              href: ROUTES.COMMUNITY_DEPARTMENT_BOARD(department.id),
              disabled: false,
            })),
        ],
      }
    })
  }, [departmentList])

  /** 각종 자료실만 포함된 nav */
  const editorialNavItems = useMemo(() => {
    return {
      startPath: '/community/editorial',
      label: '자료실',
      subItems:
        isMyeongdoMember || isAdmin ?
          [
            {
              label: '명도회 자료실',
              href: ROUTES.COMMUNITY_EDITORIAL_MYEONGDO,
              disabled: false,
            },
            {
              label: '주보 7면 편집',
              href: ROUTES.COMMUNITY_EDITORIAL_DRAFT,
              disabled: false,
            },
            {
              label: '주보 7면 최종본',
              href: ROUTES.COMMUNITY_EDITORIAL_FINAL,
              disabled: false,
            },
            {
              label: '주보 7면 양식',
              href: ROUTES.COMMUNITY_EDITORIAL_TEMPLATE,
              disabled: false,
            },
          ]
        : [],
    }
  }, [isMyeongdoMember, isAdmin])

  /** 각종 자료실 모두 포함한 nav items */
  const allNavItems = useMemo(
    () =>
      navItems.map((navItem) => {
        const isCommunity = navItem.startPath.startsWith('/community')

        if (!isCommunity) return navItem

        return {
          ...navItem,
          subItems: [...navItem.subItems, ...editorialNavItems.subItems],
        }
      }),
    [navItems, editorialNavItems],
  )

  return { navItems, editorialNavItems, allNavItems }
}

export default useNavItems

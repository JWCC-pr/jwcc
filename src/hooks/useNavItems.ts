import { useMemo } from 'react'

import { NAV_ITEMS } from '@/constants/nav-items'
import { ROUTES } from '@/constants/routes'
import { useDepartmentListQuery } from '@/generated/apis/Department/Department.query'

const useNavItems = () => {
  const { data: departmentList } = useDepartmentListQuery()

  /** 각종 자료실 제외한 nav */
  const navItems = useMemo(() => {
    if (!departmentList) {
      return NAV_ITEMS
    }

    return [
      ...NAV_ITEMS.filter((item) => item.startPath !== '/department'),
      {
        startPath: '/department',
        label: '분과 게시판',
        subItems: departmentList
          // 소속 없음 제외
          .filter((department) => department.name !== '소속 없음')
          // 하위 분과가 있는 분과만 표시
          .filter((department) => department.subDepartmentSet.length > 0)
          .map((department) => ({
            label: department.name + ' 게시판',
            href: ROUTES.DEPARTMENT_BOARD(department.id),
            disabled: false,
          })),
      },
    ]
  }, [departmentList])

  /** 각종 자료실만 포함된 nav */
  const editorialNavItems = useMemo(() => {
    return {
      startPath: '/editorial',
      label: '자료실',
      subItems: [
        {
          label: '명도회 자료실',
          href: ROUTES.EDITORIAL_MYEONGDO,
          disabled: false,
        },
        {
          label: '주보 7면 편집',
          href: ROUTES.EDITORIAL_DRAFT,
          disabled: false,
        },
        {
          label: '주보 7면 최종본',
          href: ROUTES.EDITORIAL_FINAL,
          disabled: false,
        },
        {
          label: '주보 7면 양식',
          href: ROUTES.EDITORIAL_TEMPLATE,
          disabled: false,
        },
      ],
    }
  }, [])

  /** 각종 자료실 모두 포함한 nav items */
  const allNavItems = useMemo(
    () =>
      navItems.map((navItem) => {
        if (navItem.startPath === '/department') {
          return {
            ...navItem,
            subItems: [...navItem.subItems, ...editorialNavItems.subItems],
          }
        }

        return navItem
      }),
    [navItems, editorialNavItems],
  )

  return { navItems, editorialNavItems, allNavItems }
}

export default useNavItems

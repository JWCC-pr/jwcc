'use client'

import { Link, LinkProps } from '@chakra-ui/react/link'

interface HeaderSubMenuProps extends LinkProps {}

const HeaderSubMenu: React.FC<HeaderSubMenuProps> = ({
  children,
  ...props
}) => {
  return (
    <Link
      w="180px"
      textStyle="pre-body-6"
      color="grey.8"
      _hover={{
        color: 'grey.10',
        textDecoration: 'underline',
      }}
      {...props}
    >
      {children}
    </Link>
  )
}

export default HeaderSubMenu

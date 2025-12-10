import { RecipeCompoundVariant } from '@chakra-ui/react'

type BadgeVariant = 'solid' | 'subtle'
type BadgeColorPalette =
  | 'grey'
  | 'primary'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'red'
  | 'pink'
  | 'violet'

export const makeBadgeCompoundVariants = (
  variants: BadgeVariant[],
  colorPalettes: BadgeColorPalette[],
): RecipeCompoundVariant<{
  variant: BadgeVariant
  colorPalette: BadgeColorPalette
}>[] => {
  return colorPalettes.flatMap((colorPalette) =>
    variants.map((variant) => badgeCompoundVariantMap[variant][colorPalette]),
  )
}

const badgeCompoundVariantMap: Record<
  BadgeVariant,
  Record<
    BadgeColorPalette,
    RecipeCompoundVariant<{
      variant: BadgeVariant
      colorPalette: BadgeColorPalette
    }>
  >
> = {
  solid: {
    grey: {
      variant: 'solid',
      colorPalette: 'grey',
      css: {
        bgColor: 'grey.6',
        color: 'grey.0',
        _icon: {
          color: 'grey.0',
        },
      },
    },
    primary: {
      variant: 'solid',
      colorPalette: 'primary',
      css: {
        bgColor: 'primary.4',
        color: 'grey.0',
        _icon: {
          color: 'grey.0',
        },
      },
    },
    green: {
      variant: 'solid',
      colorPalette: 'green',
      css: {
        bgColor: 'accent.green2',
        color: 'grey.0',
        _icon: {
          color: 'grey.0',
        },
      },
    },
    yellow: {
      variant: 'solid',
      colorPalette: 'yellow',
      css: {
        bgColor: 'accent.yellow2',
        color: 'grey.0',
        _icon: {
          color: 'grey.0',
        },
      },
    },
    blue: {
      variant: 'solid',
      colorPalette: 'blue',
      css: {
        bgColor: 'accent.blue2',
        color: 'grey.0',
        _icon: {
          color: 'grey.0',
        },
      },
    },
    red: {
      variant: 'solid',
      colorPalette: 'red',
      css: {
        bgColor: 'accent.red2',
        color: 'grey.0',
        _icon: {
          color: 'grey.0',
        },
      },
    },
    pink: {
      variant: 'solid',
      colorPalette: 'pink',
      css: {
        bgColor: 'accent.pink2',
        color: 'grey.0',
        _icon: {
          color: 'grey.0',
        },
      },
    },
    violet: {
      variant: 'solid',
      colorPalette: 'violet',
      css: {
        bgColor: 'accent.violet2',
        color: 'grey.0',
        _icon: {
          color: 'grey.0',
        },
      },
    },
  },
  subtle: {
    grey: {
      variant: 'subtle',
      colorPalette: 'grey',
      css: {
        bgColor: 'grey.2',
        color: 'grey.7',
        _icon: {
          color: 'grey.7',
        },
      },
    },
    primary: {
      variant: 'subtle',
      colorPalette: 'primary',
      css: {
        bgColor: 'primary.1',
        color: 'primary.4',
        _icon: {
          color: 'primary.4',
        },
      },
    },
    green: {
      variant: 'subtle',
      colorPalette: 'green',
      css: {
        bgColor: 'accent.green1',
        color: 'accent.green2',
        _icon: {
          color: 'accent.green2',
        },
      },
    },
    yellow: {
      variant: 'subtle',
      colorPalette: 'yellow',
      css: {
        bgColor: 'accent.yellow1',
        color: 'accent.yellow3',
        _icon: {
          color: 'accent.yellow3',
        },
      },
    },
    blue: {
      variant: 'subtle',
      colorPalette: 'blue',
      css: {
        bgColor: 'accent.blue1',
        color: 'accent.blue2',
        _icon: {
          color: 'accent.blue2',
        },
      },
    },
    red: {
      variant: 'subtle',
      colorPalette: 'red',
      css: {
        bgColor: 'accent.red1',
        color: 'accent.red2',
        _icon: {
          color: 'accent.red2',
        },
      },
    },
    pink: {
      variant: 'subtle',
      colorPalette: 'pink',
      css: {
        bgColor: 'accent.pink1',
        color: 'accent.pink2',
        _icon: {
          color: 'accent.pink2',
        },
      },
    },
    violet: {
      variant: 'subtle',
      colorPalette: 'violet',
      css: {
        bgColor: 'accent.violet1',
        color: 'accent.violet2',
        _icon: {
          color: 'accent.violet2',
        },
      },
    },
  },
}

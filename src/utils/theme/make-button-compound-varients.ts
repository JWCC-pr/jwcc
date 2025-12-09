import { RecipeCompoundVariant } from '@chakra-ui/react/styled-system'

type ButtonVariant = 'solid' | 'outline' | 'ghost'
type ButtonColorPalette = 'primary' | 'grey'

export const makeButtonCompoundVariants = (
  variants: ButtonVariant[],
  colorPalettes: ButtonColorPalette[],
): RecipeCompoundVariant<{
  variant: ButtonVariant
  colorPalette: ButtonColorPalette
}>[] => {
  return colorPalettes.flatMap((colorPalette) =>
    variants.map((variant) => buttonCompoundVariantMap[variant][colorPalette]),
  )
}

const buttonCompoundVariantMap: Record<
  ButtonVariant,
  Record<
    ButtonColorPalette,
    RecipeCompoundVariant<{
      variant: ButtonVariant
      colorPalette: ButtonColorPalette
    }>
  >
> = {
  solid: {
    primary: {
      variant: 'solid',
      colorPalette: 'primary',
      css: {
        bgColor: 'primary.4',
        color: 'grey.0',
        _hover: {
          bgColor: 'primary.5',
        },
        _active: {
          bgColor: 'primary.5',
        },
        _disabled: {
          bgColor: 'primary.4',
          color: 'grey.0',
          opacity: '0.4',
        },
      },
    },
    grey: {
      variant: 'solid',
      colorPalette: 'grey',
      css: {
        bgColor: 'grey.2',
        color: 'grey.8',
        _hover: {
          bgColor: 'grey.3',
        },
        _active: {
          bgColor: 'grey.3',
        },
        _disabled: {
          bgColor: 'grey.2',
          color: 'grey.8',
          opacity: '0.4',
        },
      },
    },
  },
  outline: {
    primary: {
      variant: 'outline',
      colorPalette: 'primary',
      css: {
        borderColor: 'primary.4',
        bgColor: 'grey.0',
        color: 'primary.4',
        _hover: {
          bgColor: 'primary.1',
        },
        _active: {
          bgColor: 'primary.1',
        },
        _disabled: {
          borderColor: 'primary.4',
          bgColor: 'grey.0',
          color: 'primary.4',
          opacity: '0.4',
        },
      },
    },
    grey: {
      variant: 'outline',
      colorPalette: 'grey',
      css: {
        borderColor: 'grey.3',
        bgColor: 'grey.0',
        color: 'grey.8',
        _hover: {
          bgColor: 'grey.1',
        },
        _active: {
          bgColor: 'grey.1',
        },
        _disabled: {
          borderColor: 'grey.3',
          bgColor: 'grey.0',
          color: 'grey.8',
          opacity: '0.4',
        },
      },
    },
  },
  ghost: {
    primary: {
      variant: 'ghost',
      colorPalette: 'primary',
      css: {
        color: 'primary.4',
        _hover: {
          color: 'primary.4',
          bgColor: 'grey-transparent.100',
        },
        _active: {
          color: 'primary.4',
          bgColor: 'grey-transparent.100',
        },
        _disabled: {
          color: 'primary.4',
          opacity: '0.4',
        },
      },
    },
    grey: {
      variant: 'ghost',
      colorPalette: 'grey',
      css: {
        color: 'grey.8',
        _hover: {
          color: 'grey.8',
          bgColor: 'grey-transparent.100',
        },
        _active: {
          color: 'grey.8',
          bgColor: 'grey-transparent.100',
        },
        _disabled: {
          color: 'grey.8',
          opacity: '0.4',
        },
      },
    },
  },
}

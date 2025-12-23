import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

interface ServicesCatechumenInfoSectionProps {
  title: string
  description: string
}

const ServicesCatechumenInfoSection: React.FC<
  ServicesCatechumenInfoSectionProps
> = ({ title, description }) => {
  return (
    <Box display="flex" flexDirection="column" gap="8px">
      <Text textStyle="pre-heading-4" color="grey.10">
        {title}
      </Text>
      <Text textStyle="pre-body-4" color="grey.10" whiteSpace="pre-line">
        {description}
      </Text>
    </Box>
  )
}

export default ServicesCatechumenInfoSection

'use client'

import { Box } from '@chakra-ui/react/box'
import { Stack } from '@chakra-ui/react/stack'
import { Tabs } from '@chakra-ui/react/tabs'

const option = {
  sizes: ['sm', 'md', 'lg'],
  variants: ['line', 'subtle', 'enclosed'],
} as const

const TabsSections: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box display="flex" flexDirection="column" gap="12px">
        <Stack direction="column" gap="40px">
          {option.variants.map((variant) => (
            <Stack key={variant} direction="row" gap="24px">
              {option.sizes.map((size) => (
                <Tabs.Root
                  key={`${variant}-${size}`}
                  defaultValue="members"
                  size={size}
                  variant={variant}
                >
                  <Tabs.List>
                    <Tabs.Trigger value="members">Members</Tabs.Trigger>
                    <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
                    <Tabs.Trigger value="tasks">Settings</Tabs.Trigger>
                  </Tabs.List>
                  <Tabs.Content value="members">
                    {`${variant}-${size}`} members
                  </Tabs.Content>
                  <Tabs.Content value="projects">
                    {`${variant}-${size}`} projects
                  </Tabs.Content>
                  <Tabs.Content value="tasks">
                    {`${variant}-${size}`} freelancers
                  </Tabs.Content>
                </Tabs.Root>
              ))}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default TabsSections

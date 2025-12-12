'use client'

import { Box } from '@chakra-ui/react/box'

import AgreementSection from './sections/agreement-section'
import LoginInfoSection from './sections/login-info-section'
import MemberInfoSection from './sections/member-info-section'

const SignupFormView: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="32px">
      <LoginInfoSection />
      <MemberInfoSection />
      <AgreementSection />
    </Box>
  )
}

export default SignupFormView

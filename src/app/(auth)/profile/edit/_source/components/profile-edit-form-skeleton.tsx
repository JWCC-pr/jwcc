'use client'

import { Box } from '@chakra-ui/react/box'
import { Skeleton } from '@chakra-ui/react/skeleton'
import { Text } from '@chakra-ui/react/text'

const ProfileEditFormSkeleton: React.FC = () => {
  return (
    <Box
      py="56px 120px"
      w="362px"
      display="flex"
      flexDirection="column"
      gap="36px"
      mx="auto"
    >
      <Box display="flex" flexDirection="column" gap="32px">
        <Box display="flex" flexDirection="column" gap="36px">
          <Skeleton loading>
            <Text textStyle="pre-heading-2" color="grey.10">
              내 정보 수정
            </Text>
          </Skeleton>

          <Box display="flex" flexDirection="column">
            <Box py="10px" borderBottom="1px solid" borderColor="grey.10">
              <Skeleton loading>
                <Text textStyle="pre-heading-6" color="grey.8">
                  로그인 정보
                </Text>
              </Skeleton>
            </Box>
            <Box py="10px" display="flex" flexDirection="column" gap="32px">
              <Box display="flex" flexDirection="column" gap="4px">
                <Box display="flex" alignItems="center" gap="4px">
                  <Skeleton loading w="40px" h="20px">
                    <Text textStyle="pre-body-5" color="grey.7">
                      이메일
                    </Text>
                  </Skeleton>
                  <Box w="4px" h="4px" bg="primary.4" rounded="full" />
                </Box>
                <Skeleton loading h="24px" w="200px">
                  <Text textStyle="pre-body-4" color="grey.10">
                    email@example.com
                  </Text>
                </Skeleton>
              </Box>
              <Box display="flex" flexDirection="column" gap="4px">
                <Box display="flex" alignItems="center" gap="4px">
                  <Skeleton loading w="50px" h="20px">
                    <Text textStyle="pre-body-5" color="grey.7">
                      비밀번호
                    </Text>
                  </Skeleton>
                  <Box w="4px" h="4px" bg="primary.4" rounded="full" />
                </Box>
                <Skeleton loading h="48px" w="120px">
                  <Box h="48px" />
                </Skeleton>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column">
          <Box py="10px" borderBottom="1px solid" borderColor="grey.10">
            <Skeleton loading>
              <Text textStyle="pre-heading-6" color="grey.8">
                회원 정보
              </Text>
            </Skeleton>
          </Box>
          <Box py="16px" display="flex" flexDirection="column" gap="32px">
            <Box display="flex" flexDirection="column" gap="6px">
              <Skeleton loading w="30px" h="20px">
                <Text textStyle="pre-body-5" color="grey.7">
                  권한
                </Text>
              </Skeleton>
              <Skeleton loading h="24px" w="80px">
                <Text textStyle="pre-body-4" color="grey.10">
                  일반
                </Text>
              </Skeleton>
            </Box>

            <Box display="flex" flexDirection="column" gap="6px">
              <Skeleton loading w="30px" h="20px">
                <Text textStyle="pre-body-5" color="grey.7">
                  이름
                </Text>
              </Skeleton>
              <Skeleton loading h="48px" w="full">
                <Box h="48px" />
              </Skeleton>
            </Box>

            <Box display="flex" flexDirection="column" gap="6px">
              <Skeleton loading w="50px" h="20px">
                <Text textStyle="pre-body-5" color="grey.7">
                  세례명
                </Text>
              </Skeleton>
              <Skeleton loading h="48px" w="full">
                <Box h="48px" />
              </Skeleton>
            </Box>

            <Box display="flex" flexDirection="column" gap="4px">
              <Skeleton loading w="30px" h="20px">
                <Text textStyle="pre-body-5" color="grey.7">
                  주소
                </Text>
              </Skeleton>
              <Box w="full" display="flex" alignItems="center" gap="8px">
                <Skeleton loading h="48px" flex="1">
                  <Box h="48px" />
                </Skeleton>
                <Skeleton loading h="48px" w="100px">
                  <Box h="48px" />
                </Skeleton>
              </Box>
              <Skeleton loading h="48px" w="full">
                <Box h="48px" />
              </Skeleton>
            </Box>

            <Box display="flex" flexDirection="column" gap="6px">
              <Skeleton loading w="60px" h="20px">
                <Text textStyle="pre-body-5" color="grey.7">
                  생년월일
                </Text>
              </Skeleton>
              <Box w="full" display="flex" gap="4px">
                <Skeleton loading h="48px" flex="1">
                  <Box h="48px" />
                </Skeleton>
                <Skeleton loading h="48px" flex="1">
                  <Box h="48px" />
                </Skeleton>
                <Skeleton loading h="48px" flex="1">
                  <Box h="48px" />
                </Skeleton>
              </Box>
            </Box>

            <Box display="flex" flexDirection="column" gap="4px">
              <Box display="flex" alignItems="center" gap="4px">
                <Skeleton loading w="70px" h="20px">
                  <Text textStyle="pre-body-5" color="grey.7">
                    소속 단체
                  </Text>
                </Skeleton>
                <Box w="4px" h="4px" bg="primary.4" rounded="full" />
              </Box>
              <Box display="flex" flexWrap="wrap" gap="4px">
                <Skeleton loading h="32px" w="80px">
                  <Box h="32px" />
                </Skeleton>
                <Skeleton loading h="32px" w="100px">
                  <Box h="32px" />
                </Skeleton>
                <Skeleton loading h="32px" w="90px">
                  <Box h="32px" />
                </Skeleton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        py="16px"
        display="flex"
        flexDirection="column"
        gap="10px"
        alignItems="center"
      >
        <Skeleton loading h="48px" w="full">
          <Box h="48px" />
        </Skeleton>
        <Skeleton loading h="48px" w="full">
          <Box h="48px" />
        </Skeleton>
      </Box>
    </Box>
  )
}

export default ProfileEditFormSkeleton

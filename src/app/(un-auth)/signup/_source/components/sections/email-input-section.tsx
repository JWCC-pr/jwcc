'use client'

import { useEffect, useRef, useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Flex } from '@chakra-ui/react/flex'
import { Input } from '@chakra-ui/react/input'
import { Text } from '@chakra-ui/react/text'

import { useFormContext, useFormState, useWatch } from 'react-hook-form'

import { FormHelper } from '@/components/form-helper'
import { InputGroup } from '@/components/ui/input-group'
import { toaster } from '@/components/ui/toaster'
import { REGEX } from '@/constants/form/regex'
import {
  useEmailVerifierConfirmCreateMutation,
  useEmailVerifierCreateMutation,
} from '@/generated/apis/EmailVerifier/EmailVerifier.query'
import { SignupCCheckCircleFillIcon } from '@/generated/icons/MyIcons'

import { SignupFormDataType } from '../../hooks/useSignupForm'

/**
 * 이메일 자동완성에 사용되는 도메인 목록
 * 사용자가 '@' 이후 도메인을 입력하면 이 목록에서 필터링하여 제안합니다.
 */
const EMAIL_LIST = [
  'gmail.com',
  'naver.com',
  'hanmail.net',
  'nate.com',
  'daum.net',
]

const formatRemainTime = (seconds: number) => {
  const remainMinute = Math.floor(seconds / 60)
  const remainSecond = seconds % 60

  return `${remainMinute}:${remainSecond.toString().padStart(2, '0')}`
}

/** 인증번호 전송 후 유지 시간 (s 단위) */
const VERIFICATION_TIME = 5 * 60

const EmailInputSection: React.FC = () => {
  const { register, setValue, control, trigger, setError } =
    useFormContext<SignupFormDataType>()
  const [
    watchedEmailVerificationCode,
    watchedIsEmailVerified,
    watchedEmailValue,
  ] = useWatch({
    control,
    name: ['email.verificationCode', 'email.isVerified', 'email.value'],
  })
  const { errors } = useFormState({
    control,
    name: ['email.value', 'email.verificationCode'],
  })

  const [verification, setVerification] = useState({
    /** 인증번호 전송 여부 */
    isCodeSent: false,
    /** 전송 중 */
    isSendingCode: false,
    /** 인증 완료 여부 */
    isVerified: false,
    /** 남은 시간 */
    timeLeft: VERIFICATION_TIME,
    /** 인증 에러 메시지 */
    verificationFailureMessage: '',
  })

  /**
   * 이메일 자동완성 관련 상태
   * - selectedIndex: 방향키로 선택된 자동완성 항목의 인덱스
   * - isAutocompleteOpen: 자동완성 드롭다운 표시 여부
   */
  const [autocomplete, setAutocomplete] = useState({
    selectedIndex: -1,
    isOpen: false,
  })

  /** 자동완성 드롭다운의 각 항목에 대한 ref 배열 (스크롤 제어용) */
  const autocompleteItemRefs = useRef<(HTMLElement | null)[]>([])
  /** 이메일 입력 필드와 자동완성 드롭다운을 감싸는 컨테이너 ref (외부 클릭 감지용) */
  const emailInputContainerRef = useRef<HTMLDivElement>(null)

  const hasEmailCode = !!watchedEmailVerificationCode
  const isTimeOut = verification.timeLeft <= 0 && verification.isCodeSent

  /**
   * 이메일 주소를 로컬 파트와 도메인 파트로 분리
   * 예: "user@naver" -> local: "user", domain: "naver"
   */
  const [local, domain] = watchedEmailValue?.split('@') || []

  /**
   * 현재 입력된 도메인과 일치하는 이메일 도메인 목록 필터링
   * 사용자가 '@' 이후 텍스트를 입력하면 해당 텍스트를 포함하는 도메인만 표시
   */
  const filteredEmailList = EMAIL_LIST.filter((el) => el.includes(domain || ''))

  /**
   * 자동완성 드롭다운 표시 조건
   * - 이메일 형식이 완전히 맞지 않아야 함 (아직 입력 중)
   * - '@' 문자가 포함되어 있어야 함
   * - 필터링된 도메인 목록이 있어야 함
   * - 인증번호가 전송되지 않았거나 인증이 완료되지 않은 상태여야 함
   */
  const shouldShowAutocomplete =
    !watchedEmailValue?.match(REGEX.EMAIL) &&
    watchedEmailValue?.includes('@') &&
    filteredEmailList.length > 0 &&
    !verification.isCodeSent &&
    !verification.isVerified

  /**
   * 자동완성 드롭다운 열림/닫힘 상태 관리
   * shouldShowAutocomplete 조건에 따라 자동으로 업데이트됩니다.
   */
  useEffect(() => {
    setAutocomplete((prev) => ({
      ...prev,
      isOpen: shouldShowAutocomplete,
      // 드롭다운이 닫히면 선택 인덱스 초기화
      selectedIndex: shouldShowAutocomplete ? prev.selectedIndex : -1,
    }))
  }, [shouldShowAutocomplete])

  /**
   * 선택된 자동완성 항목으로 스크롤
   * 방향키로 이동할 때 해당 항목이 보이도록 자동 스크롤합니다.
   */
  useEffect(() => {
    if (
      autocomplete.selectedIndex >= 0 &&
      autocompleteItemRefs.current[autocomplete.selectedIndex]
    ) {
      autocompleteItemRefs.current[autocomplete.selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      })
    }
  }, [autocomplete.selectedIndex])

  /**
   * 외부 클릭 감지 및 자동완성 드롭다운 닫기
   * 사용자가 이메일 입력 필드나 자동완성 드롭다운 외부를 클릭하면 드롭다운을 닫습니다.
   * ESC 키와 동일한 동작을 수행합니다.
   */
  useEffect(() => {
    if (!autocomplete.isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      // 이메일 입력 컨테이너 내부 클릭인지 확인
      if (
        emailInputContainerRef.current &&
        emailInputContainerRef.current.contains(target)
      ) {
        return
      }

      // 외부 클릭 시 드롭다운 닫기
      setAutocomplete({
        selectedIndex: -1,
        isOpen: false,
      })
    }

    // 클릭 이벤트 리스너 등록
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      // 컴포넌트 언마운트 또는 드롭다운이 닫힐 때 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [autocomplete.isOpen])

  /** 인증번호 타이머 */
  useEffect(() => {
    if (!verification.isCodeSent) return
    if (verification.isVerified) return

    const decreaseTimeLeft = () => {
      setVerification((prev) => ({
        ...prev,
        timeLeft: prev.timeLeft - 1,
      }))
    }

    decreaseTimeLeft()
    const timer = setInterval(decreaseTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [verification.isCodeSent, verification.isVerified])
  /** 인증번호 타이머 종료 */
  useEffect(() => {
    if (verification.timeLeft > 0) return
    if (!verification.isCodeSent) return
    if (verification.isVerified) return

    setVerification((prev) => ({
      ...prev,
      verificationFailureMessage: `인증번호가 만료되었습니다. 다시 시도해 주세요.`,
    }))
  }, [verification.isCodeSent, verification.isVerified, verification.timeLeft])

  const { mutateAsync: createEmailVerifierMutateAsync } =
    useEmailVerifierCreateMutation({})

  /** 인증번호 전송 (첫 전송) */
  const onSendCode = async () => {
    // 이메일 형식 검증
    const isEmailValid = await trigger('email.value')

    // 이메일 형식이 맞지 않으면 검증만 실행하고 함수 종료
    if (!isEmailValid) {
      return
    }

    try {
      setVerification((prev) => ({
        ...prev,
        isSendingCode: true,
        verificationFailureMessage: '',
      }))

      await createEmailVerifierMutateAsync({
        data: { email: watchedEmailValue },
      })

      setVerification((prev) => ({
        ...prev,
        isCodeSent: true,
        timeLeft: VERIFICATION_TIME,
      }))
      setValue('email.verificationCode', '')

      toaster.create({
        title: '인증번호가 전송되었습니다.',
        type: 'success',
        duration: 2_000,
      })
    } catch (error: any) {
      if (error?.status === 400) {
        setError('email.value', { message: '이미 가입된 이메일입니다.' })
      } else {
        setVerification((prev) => ({
          ...prev,
          verificationFailureMessage: `인증번호 전송에 실패했습니다. 다시 시도해 주세요.`,
        }))
      }
    } finally {
      setVerification((prev) => ({
        ...prev,
        isSendingCode: false,
      }))
    }
  }

  /** 인증번호 재전송 */
  const onResendCode = async () => {
    try {
      // 재전송 시 모든 메시지와 상태 초기화
      setVerification((prev) => ({
        ...prev,
        isSendingCode: true,
        verificationFailureMessage: '',
      }))

      await createEmailVerifierMutateAsync({
        data: { email: watchedEmailValue },
      })

      // 타이머 및 입력값 완전 초기화
      setVerification((prev) => ({
        ...prev,
        timeLeft: VERIFICATION_TIME,
        verificationFailureMessage: '',
      }))
      setValue('email.verificationCode', '')

      toaster.create({
        title: '인증번호가 재전송되었습니다.',
        type: 'success',
        duration: 2_000,
      })
    } catch (error) {
      console.error('error >> ', error)
      setVerification((prev) => ({
        ...prev,
        verificationFailureMessage: `인증번호 재전송에 실패했습니다. 다시 시도해 주세요.`,
      }))
    } finally {
      setVerification((prev) => ({
        ...prev,
        isSendingCode: false,
      }))
    }
  }

  /**
   * 자동완성 항목 선택 핸들러
   * 사용자가 자동완성 항목을 클릭하거나 Enter 키로 선택할 때 호출됩니다.
   * 선택된 도메인으로 이메일 주소를 완성하고 폼 값을 업데이트합니다.
   */
  const handleSelectEmail = (selectedDomain: string) => {
    setValue('email.value', `${local}@${selectedDomain}`, {
      shouldValidate: true,
    })

    // 자동완성 드롭다운 닫기
    setAutocomplete({
      selectedIndex: -1,
      isOpen: false,
    })
  }

  /** 이메일 입력 필드 키보드 이벤트 핸들러 */
  const handleEmailInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // 자동완성이 열려있지 않으면 기본 동작 수행
    if (!autocomplete.isOpen || filteredEmailList.length === 0) {
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        // 아래 방향키 -> 다음 항목 선택 (마지막 항목이면 첫 번째로 순환)
        setAutocomplete((prev) => ({
          ...prev,
          selectedIndex:
            prev.selectedIndex < filteredEmailList.length - 1 ?
              prev.selectedIndex + 1
            : 0,
        }))
        break

      case 'ArrowUp':
        e.preventDefault()
        // 위 방향키 -> 이전 항목 선택 (첫 번째 항목이면 마지막으로 순환)
        setAutocomplete((prev) => ({
          ...prev,
          selectedIndex:
            prev.selectedIndex > 0 ?
              prev.selectedIndex - 1
            : filteredEmailList.length - 1,
        }))
        break

      case 'Enter':
        e.preventDefault()
        // Enter -> 선택된 항목 적용
        if (autocomplete.selectedIndex >= 0) {
          handleSelectEmail(filteredEmailList[autocomplete.selectedIndex])
        } else if (filteredEmailList.length === 1) {
          // 항목이 하나만 있으면 자동 선택
          handleSelectEmail(filteredEmailList[0])
        }
        break

      case 'Escape':
        e.preventDefault()
        // Escape -> 자동완성 드롭다운 닫기
        setAutocomplete({
          selectedIndex: -1,
          isOpen: false,
        })
        break

      default:
        // 다른 키 입력 시 선택 인덱스 초기화
        setAutocomplete((prev) => ({
          ...prev,
          selectedIndex: -1,
        }))
    }
  }

  const { mutateAsync: verifyEmailVerifierConfirmMutateAsync } =
    useEmailVerifierConfirmCreateMutation({})

  /** 인증번호 확인 (6자리 입력 시 자동 실행) */
  useEffect(() => {
    if (!hasEmailCode) return
    if (verification.isVerified) return
    if (watchedEmailVerificationCode.length !== 6) return
    if (isTimeOut) return

    const verifyCode = async () => {
      // 에러 메시지 초기화
      setVerification((prev) => ({
        ...prev,
        verificationFailureMessage: '',
      }))

      try {
        const { token } = await verifyEmailVerifierConfirmMutateAsync({
          data: {
            email: watchedEmailValue,
            code: watchedEmailVerificationCode,
          },
        })

        setValue('email.token', token, { shouldValidate: true })

        setVerification((prev) => ({
          ...prev,
          isVerified: true,
        }))

        setValue('email.isVerified', true, { shouldValidate: true })

        toaster.create({
          title: '인증이 완료되었습니다.',
          type: 'success',
          duration: 2_000,
        })
      } catch (error) {
        // 인증 실패
        setVerification((prev) => ({
          ...prev,
          verificationFailureMessage: '인증번호를 다시 확인해주세요',
        }))
      }
    }

    verifyCode()
  }, [
    hasEmailCode,
    watchedEmailVerificationCode,
    verification.isVerified,
    isTimeOut,
    setValue,
    verifyEmailVerifierConfirmMutateAsync,
    watchedEmailValue,
  ])

  return (
    <Box display="flex" flexFlow="column nowrap" gap="6px">
      {/* 이메일 입력 */}
      <FormHelper
        label="이메일"
        required
        message={{ error: errors.email?.value?.message }}
      >
        <Box w="full" display="flex" gap="8px">
          <Box w="full" position="relative" ref={emailInputContainerRef}>
            <Input
              size="lg"
              variant="outline"
              placeholder="이메일"
              w="100%"
              autoComplete="off"
              disabled={verification.isCodeSent || verification.isVerified}
              onKeyDown={handleEmailInputKeyDown}
              {...register('email.value')}
            />
            {watchedIsEmailVerified && (
              <SignupCCheckCircleFillIcon
                w="20px"
                position="absolute"
                bottom="24px"
                right="12px"
                transform="translateY(50%)"
              />
            )}

            {/* 이메일 자동완성 드롭다운 */}
            {autocomplete.isOpen && (
              <Flex
                position="absolute"
                top="calc(100% + 10px)"
                zIndex="10"
                direction="column"
                w="100%"
                maxH="144px"
                overflow="auto"
                bg="grey.0"
                border="1px"
                borderColor="grey.2"
                rounded="10px"
                boxShadow="shadow-bottom"
              >
                {filteredEmailList.map((item, index) => (
                  <Flex
                    ref={(el) => {
                      autocompleteItemRefs.current[index] = el
                    }}
                    as="button"
                    key={item}
                    p="10px 12px"
                    bg={
                      index === autocomplete.selectedIndex ?
                        'rgba(112, 115, 124, 0.08)'
                      : 'transparent'
                    }
                    _hover={{
                      bg: 'rgba(112, 115, 124, 0.08)',
                    }}
                    onClick={() => handleSelectEmail(item)}
                    onMouseEnter={() => {
                      // 마우스 호버 시 선택 인덱스 업데이트
                      setAutocomplete((prev) => ({
                        ...prev,
                        selectedIndex: index,
                      }))
                    }}
                  >
                    <Text>
                      {local}@{item}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            )}
          </Box>
          {!verification.isCodeSent ?
            <Button
              type="button"
              variant="solid"
              size="lg"
              colorPalette="primary"
              alignSelf="end"
              onClick={onSendCode}
              loading={verification.isSendingCode}
            >
              인증
            </Button>
          : <Button
              type="button"
              variant="solid"
              size="lg"
              colorPalette="primary"
              alignSelf="end"
              disabled={verification.isVerified}
              onClick={onResendCode}
              loading={verification.isSendingCode}
            >
              재발송
            </Button>
          }
        </Box>
      </FormHelper>

      {/* 인증번호 입력 ( 인증번호 전송 후에만 표시 ) */}
      {!watchedIsEmailVerified && verification.isCodeSent && (
        <FormHelper
          message={{
            error: verification.verificationFailureMessage,
          }}
          styles={{
            success: {
              color: 'primary.5',
              textStyle: 'pre-body-6',
            },
            error: {
              color: 'accent.red2',
              textStyle: 'pre-body-6',
            },
          }}
        >
          <InputGroup
            w="100%"
            endElement={
              !verification.isVerified && verification.timeLeft > 0 ?
                <Text color="grey.5" textStyle="pre-body-6">
                  {formatRemainTime(verification.timeLeft)}
                </Text>
              : null
            }
          >
            <Input
              size="lg"
              variant="outline"
              placeholder="인증번호"
              w="100%"
              maxLength={6}
              inputMode="numeric"
              disabled={verification.isVerified || verification.timeLeft <= 0}
              readOnly={verification.isVerified}
              {...register('email.verificationCode', {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  // 숫자만 허용하고 6자리로 제한
                  const value = e.target.value.replace(/[^0-9]/g, '')
                  if (value.length > 6) {
                    e.target.value = value.slice(0, 6)
                  } else {
                    e.target.value = value
                  }
                },
              })}
            />
          </InputGroup>
        </FormHelper>
      )}
    </Box>
  )
}

export default EmailInputSection

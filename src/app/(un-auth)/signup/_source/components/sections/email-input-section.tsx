'use client'

import { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Input } from '@chakra-ui/react/input'
import { Text } from '@chakra-ui/react/text'

import { useFormContext, useFormState, useWatch } from 'react-hook-form'

import { FormHelper } from '@/components/form-helper'
import { InputGroup } from '@/components/ui/input-group'
import { toaster } from '@/components/ui/toaster'
import { SignupCCheckCircleFillIcon } from '@/generated/icons/MyIcons'

import { SignupFormDataType } from '../../hooks/useSignupForm'

const formatRemainTime = (seconds: number) => {
  const remainMinute = Math.floor(seconds / 60)
  const remainSecond = seconds % 60

  return `${remainMinute}:${remainSecond.toString().padStart(2, '0')}`
}

/** 인증번호 전송 후 유지 시간 (s 단위) */
const VERIFICATION_TIME = 5 * 60

const EmailInputSection: React.FC = () => {
  const { register, setValue, control, trigger } =
    useFormContext<SignupFormDataType>()
  const [watchedEmailVerificationCode, watchedIsEmailVerified] = useWatch({
    control,
    name: ['email.verificationCode', 'email.isVerified'],
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

  const hasEmailCode = !!watchedEmailVerificationCode
  const isTimeOut = verification.timeLeft <= 0 && verification.isCodeSent

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

      // FIXME: API
      await new Promise((resolve) => setTimeout(resolve, 1000))

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
    } catch (error) {
      console.error('error >> ', error)
      setVerification((prev) => ({
        ...prev,
        verificationFailureMessage: `인증번호 전송에 실패했습니다. 다시 시도해 주세요.`,
      }))
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

      // FIXME: API
      await new Promise((resolve) => setTimeout(resolve, 1000))

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

  /** 인증번호 확인 (4자리 입력 시 자동 실행) */
  useEffect(() => {
    if (!hasEmailCode) return
    if (verification.isVerified) return
    if (watchedEmailVerificationCode.length !== 4) return
    if (isTimeOut) return

    const verifyCode = async () => {
      // 에러 메시지 초기화
      setVerification((prev) => ({
        ...prev,
        verificationFailureMessage: '',
      }))

      try {
        // FIXME: API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // FIXME: API
        const isSuccess = Math.random() > 0.5

        if (isSuccess) {
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

          return
        }

        // 인증 실패
        setVerification((prev) => ({
          ...prev,
          verificationFailureMessage: '인증번호를 다시 확인해주세요',
        }))
      } catch (error) {
        console.error('error >> ', error)
        setVerification((prev) => ({
          ...prev,
          verificationFailureMessage: `인증 확인에 실패했습니다. 다시 시도해 주세요.`,
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
  ])

  return (
    <Box display="flex" flexFlow="column nowrap" gap="6px">
      {/* 휴대폰 번호 입력 */}
      <FormHelper
        label="이메일"
        required
        message={{ error: errors.email?.value?.message }}
      >
        <Box w="full" display="flex" gap="8px">
          <Box w="full" position="relative">
            <Input
              size="lg"
              variant="outline"
              placeholder="이메일"
              w="100%"
              disabled={verification.isCodeSent || verification.isVerified}
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
              maxLength={4}
              inputMode="numeric"
              disabled={verification.isVerified || verification.timeLeft <= 0}
              readOnly={verification.isVerified}
              {...register('email.verificationCode', {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  // 숫자만 허용하고 4자리로 제한
                  const value = e.target.value.replace(/[^0-9]/g, '')
                  if (value.length > 4) {
                    e.target.value = value.slice(0, 4)
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

'use client'

import { Box } from '@chakra-ui/react/box'
import { Tabs } from '@chakra-ui/react/tabs'

import { Controller, useFormContext, useFormState } from 'react-hook-form'

import { FormHelper } from '@/components/form-helper'
import Select from '@/components/select'
import DatePicker from '@/components/ui/date-picker'

import { RoomReservationFormDataType } from '../../hooks/useRoomReservationForm'
import WeekOfMonthMultiSelect from './week-of-month-multi-select'
import WeekdayMultiSelect from './weekday-multi-select'

const TAB_VALUES = {
  WEEKLY: 'weekly',
  MONTHLY_DATE: 'monthly_date',
} as const

const RecurringFormView: React.FC = () => {
  const { control } = useFormContext<RoomReservationFormDataType>()
  const { errors } = useFormState({ control })

  return (
    <Box py="12px">
      <Controller
        control={control}
        name="repeatType"
        render={({ field }) => (
          <Tabs.Root
            value={field.value}
            onValueChange={(details) => field.onChange(details.value)}
            size="lg"
            variant="enclosed"
          >
            <Tabs.List>
              <Tabs.Trigger value={TAB_VALUES.WEEKLY}>요일 반복</Tabs.Trigger>
              <Tabs.Trigger value={TAB_VALUES.MONTHLY_DATE}>
                날짜 반복
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content
              value={TAB_VALUES.WEEKLY}
              pt="10px"
              display="flex"
              flexDirection="column"
              gap="10px"
            >
              <Box
                display="flex"
                gap="10px"
                flexDirection={['column', 'row', 'row']}
              >
                <FormHelper
                  w={['full', '362px']}
                  label="반복 시작일"
                  message={{ error: errors.startDate?.message }}
                >
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field: dateField }) => (
                      <DatePicker
                        w="full"
                        variant="select"
                        positioning={{ placement: 'top-start' }}
                        value={
                          dateField.value ?
                            new Date(dateField.value)
                          : undefined
                        }
                        onChange={(date) =>
                          dateField.onChange(date?.toISOString() || '')
                        }
                        onBlur={dateField.onBlur}
                      />
                    )}
                  />
                </FormHelper>
                <FormHelper
                  w={['full', '362px']}
                  label="반복 종료일"
                  message={{ error: errors.endDate?.message }}
                >
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field: dateField }) => (
                      <DatePicker
                        w="full"
                        variant="select"
                        positioning={{ placement: 'top-end' }}
                        value={
                          dateField.value ?
                            new Date(dateField.value)
                          : undefined
                        }
                        onChange={(date) =>
                          dateField.onChange(date?.toISOString() || '')
                        }
                        onBlur={dateField.onBlur}
                      />
                    )}
                  />
                </FormHelper>
              </Box>

              <Box
                display="flex"
                gap="10px"
                flexDirection={['column', 'row', 'row']}
              >
                <FormHelper
                  w={['full', '362px']}
                  label="반복 요일"
                  message={{ error: errors.weekdays?.message }}
                >
                  <Controller
                    control={control}
                    name="weekdays"
                    render={({ field: weekdaysField }) => (
                      <WeekdayMultiSelect
                        value={weekdaysField.value || []}
                        onChange={weekdaysField.onChange}
                        onBlur={weekdaysField.onBlur}
                      />
                    )}
                  />
                </FormHelper>
                <FormHelper
                  w={['full', '362px']}
                  label="주차 선택"
                  message={{ error: errors.weekOfMonth?.message }}
                >
                  <Controller
                    control={control}
                    name="weekOfMonth"
                    render={({ field: weekOfMonthField }) => (
                      <WeekOfMonthMultiSelect
                        value={weekOfMonthField.value || []}
                        onChange={weekOfMonthField.onChange}
                        onBlur={weekOfMonthField.onBlur}
                      />
                    )}
                  />
                </FormHelper>
              </Box>
            </Tabs.Content>
            <Tabs.Content
              value={TAB_VALUES.MONTHLY_DATE}
              pt="10px"
              display="flex"
              flexDirection="column"
              gap="10px"
            >
              <Box
                display="flex"
                gap="10px"
                flexDirection={['column', 'row', 'row']}
              >
                <FormHelper
                  w={['full', '362px']}
                  label="반복 시작일"
                  message={{ error: errors.startDate?.message }}
                >
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field: dateField }) => (
                      <DatePicker
                        w="full"
                        variant="select"
                        positioning={{ placement: 'top-start' }}
                        value={
                          dateField.value ?
                            new Date(dateField.value)
                          : undefined
                        }
                        onChange={(date) =>
                          dateField.onChange(date?.toISOString() || '')
                        }
                        onBlur={dateField.onBlur}
                      />
                    )}
                  />
                </FormHelper>
                <FormHelper
                  w={['full', '362px']}
                  label="반복 종료일"
                  message={{ error: errors.endDate?.message }}
                >
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field: dateField }) => (
                      <DatePicker
                        w="full"
                        variant="select"
                        positioning={{ placement: 'top-end' }}
                        value={
                          dateField.value ?
                            new Date(dateField.value)
                          : undefined
                        }
                        onChange={(date) =>
                          dateField.onChange(date?.toISOString() || '')
                        }
                        onBlur={dateField.onBlur}
                      />
                    )}
                  />
                </FormHelper>
              </Box>

              <FormHelper
                w={['full', '362px']}
                label="반복 일자"
                message={{ error: errors.monthDay?.message }}
              >
                <Select
                  size="lg"
                  name="monthDay"
                  positioning={{ sameWidth: true }}
                  contentProps={{ zIndex: 'max' }}
                  options={[
                    { label: '1일', value: '1' },
                    { label: '2일', value: '2' },
                    { label: '3일', value: '3' },
                    { label: '4일', value: '4' },
                    { label: '5일', value: '5' },
                    { label: '6일', value: '6' },
                    { label: '7일', value: '7' },
                    { label: '8일', value: '8' },
                    { label: '9일', value: '9' },
                    { label: '10일', value: '10' },
                    { label: '11일', value: '11' },
                    { label: '12일', value: '12' },
                    { label: '13일', value: '13' },
                    { label: '14일', value: '14' },
                    { label: '15일', value: '15' },
                    { label: '16일', value: '16' },
                    { label: '17일', value: '17' },
                    { label: '18일', value: '18' },
                    { label: '19일', value: '19' },
                    { label: '20일', value: '20' },
                    { label: '21일', value: '21' },
                    { label: '22일', value: '22' },
                    { label: '23일', value: '23' },
                    { label: '24일', value: '24' },
                    { label: '25일', value: '25' },
                    { label: '26일', value: '26' },
                    { label: '27일', value: '27' },
                    { label: '28일', value: '28' },
                    { label: '29일', value: '29' },
                    { label: '30일', value: '30' },
                    { label: '31일', value: '31' },
                  ]}
                />
              </FormHelper>
            </Tabs.Content>
          </Tabs.Root>
        )}
      />
    </Box>
  )
}

export default RecurringFormView

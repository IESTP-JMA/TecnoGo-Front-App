import { useEfsrtContext } from '@/contexts/efsrtContext'
import Chip from '@components/Chip'
import { useNavigation, useRouter } from 'expo-router'
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  DotIcon,
  MapPin
} from 'lucide-react-native'
import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Calendar, LocaleConfig } from 'react-native-calendars'

export default function AsistenciaCalendario () {
  const { moduleData } = useEfsrtContext()
  const [selectedDay, setSelectedDay] = useState(null)
  const navigation = useNavigation()
  const router = useRouter()
  LocaleConfig.locales.es = {
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],
    monthNamesShort: [
      'Ene.',
      'Feb.',
      'Mar.',
      'Abr.',
      'May.',
      'Jun.',
      'Jul.',
      'Ago.',
      'Sep.',
      'Oct.',
      'Nov.',
      'Dic.'
    ],
    dayNames: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    today: 'Hoy'
  }
  LocaleConfig.defaultLocale = 'es'

  const eventData = {
    '2024-11-26': {
      type: 'asistencia',
      details: 'Asistió a clase de matemáticas',
      hora: '9:00 AM',
      color: '#50C878'
    },
    '2024-11-25': {
      type: 'falta',
      details: 'No asistió a clase de física',
      justificacion: 'Enfermedad',
      color: '#FF6B6B'
    },
    '2024-11-23': {
      type: 'proximo',
      details: 'Examen de química',
      hora: '10:30 AM',
      salon: 'Lab 101',
      color: '#4A90E2'
    }
  }

  const startTimestamp = 1730789091000
  const endTimestamp = 1734677091000

  // Convertir timestamps a fechas en formato YYYY-MM-DD
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toISOString().split('T')[0]
  }

  // const startDate = formatDate(startTimestamp);
  // const endDate = formatDate(endTimestamp);

  const attendanceStatuses = {
    '2024-11-06': { status: 'Asisti', color: '#10B981' },
    '2024-11-08': { status: 'Falte', color: '#F43F5E' }
  }

  const startDate = formatDate(moduleData.startDate)
  const endDate = formatDate(moduleData.endDate)

  const generateMarkedDates = () => {
    const markedDates = {}
    const currentDate = new Date(startDate)
    const endDateObj = new Date(endDate)

    while (currentDate <= endDateObj) {
      const dateString = currentDate.toISOString().split('T')[0]
      const dayOfWeek = currentDate.getDay()

      const dayMarking = {}
      // Ignorar sábados (6) y domingos (0)
      if (dayOfWeek !== 6 && dayOfWeek !== 5) {
        dayMarking.color = '#D1FAE5'

        if (dateString === startDate) {
          dayMarking.startingDay = true
        }
        if (dateString === endDate) {
          dayMarking.endingDay = true
        }

        // Sobrescribir con estados específicos si existen
        if (attendanceStatuses[dateString]) {
          dayMarking.color = attendanceStatuses[dateString].color
          dayMarking.textColor = 'white'
        }

        if (selectedDay === dateString) {
          dayMarking.marked = true
          dayMarking.dotColor = '#d946ef'
        }
        markedDates[dateString] = dayMarking
      }
      if (Object.keys(dayMarking).length > 0) {
        markedDates[dateString] = dayMarking
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return markedDates
  }

  const markedDates = generateMarkedDates()

  const onDayPress = (day) => {
    setSelectedDay(day.dateString)
  }

  function isDisabledRegister () {
    const targetDate = new Date(selectedDay)
    const start = new Date(startDate)
    const end = new Date(endDate)
    return targetDate >= start && targetDate <= end
  }

  return (
    <View className='flex-1 bg-[#e6f7f1] p-4'>
      <View className='px-4'>
        <Calendar
          firstDay={1}
          enableSwipeMonths
          markedDates={markedDates}
          markingType='period'
          onDayPress={onDayPress}
          renderArrow={(direction) => {
            return direction === 'left'
              ? (
                <ChevronLeft color='#881337' size={26} strokeWidth={2.75} />
                )
              : (
                <ChevronRight color='#881337' size={26} strokeWidth={2.75} />
                )
          }}
          theme={{
            textMonthFontFamily: 'SenMedium',
            textDayFontFamily: 'SenRegular',
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 15,
            todayTextColor: '#2563EB',
            'stylesheet.calendar.header': {
              dayTextAtIndex5: { color: '#FF6B6B' },
              dayTextAtIndex6: { color: '#FF6B6B' }
            }
          }}
        />
      </View>
      <View className='flex-row gap-2 my-2'>
        <Chip label='Asistí' bgColor='bg-green-500' textColor='text-green-50' />
        <Chip label='Falté' bgColor='bg-red-500' textColor='text-red-50' />
        <View className='flex-row border border-fuchsia-500 rounded-full pr-2 py-0.5 items-center '>
          <DotIcon color='#d946ef' strokeWidth={3.5} fill='#d946ef' />
          <Text className='text-fuchsia-500 font-SenMedium'>Seleccionado</Text>
        </View>
      </View>
      <View className='mt-2'>
        <Pressable
          disabled={!isDisabledRegister()}
          className='bg-emerald-600 items-center py-2 rounded-lg disabled:opacity-50'
          onPress={() => {
            router.push({
              pathname: '../apuntes',
              params: { headerTitle: selectedDay }
            })
          }}
        >
          <Text className='font-SenMedium text-white'>
            Registrar Actividad Diaria
          </Text>
        </Pressable>
      </View>
      <View className='mt-2'>
        <Text className='text-lg font-semibold text-emerald-800 mb-3'>
          Agenda para el {selectedDay}
        </Text>
        <View className='bg-white rounded-lg p-4 shadow-md'>
          {selectedDay && eventData[selectedDay]
            ? (
              <View className='border-l-4 border-emerald-500 pl-3 mb-3'>
                <View className='flex-row items-center mb-1'>
                  <Clock size={16} color='#666' />
                  <Text className='ml-2 text-gray-600'>
                    {eventData[selectedDay].hora}
                  </Text>
                </View>
                <Text className='font-semibold text-gray-800'>
                  {eventData[selectedDay].details}
                </Text>
                <View className='flex-row items-center mt-1'>
                  <MapPin name='location-outline' size={16} color='#666' />
                  <Text className='ml-2 text-gray-600'>Sala de Seminarios 2</Text>
                </View>
              </View>
              )
            : (
              <Text className='text-center text-gray-500 py-2'>
                No hay actividades programadas para este día.
              </Text>
              )}
        </View>
      </View>
    </View>
  )
}

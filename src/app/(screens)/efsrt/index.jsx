import { View, Text, Pressable } from 'react-native'
import { BriefcaseIcon, ChatsIcon } from '../../../components/Icons'
import { Stack, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ChevronRightIcon } from 'lucide-react-native'
import { useGetEFSRT } from '@/hooks/useEFSRTMutation'
import { useSnackBar } from '@/contexts/SnackBarContext'
import LoadingSnackBar from '@components/LoadingSnackBar'
import SnackBar from '@components/SnackBar'
import { useEfsrtContext } from '@/contexts/efsrtContext'

const ModuleCard = ({ label, isActive, hasUuid, progress, onPress }) => (
  <Pressable
    disabled={!isActive && !hasUuid}
    className='bg-white rounded-lg p-4 justify-between gap-2 disabled:opacity-60 active:scale-95'
    onPress={onPress}
  >
    <View className='flex-row justify-between'>
      <View className='flex-row items-center gap-4'>
        <BriefcaseIcon size={36} color='#4ade80' />
        <Text className='text-lg font-SenSemiBold'>{label}</Text>
      </View>

      <View className='flex-row items-center'>
        {isActive && (
          <Text className='text-[#4ade80] mr-2 font-SenRegular'>
            En desarrollo
          </Text>
        )}
        {hasUuid && <ChevronRightIcon size={28} color='#f87171' />}
      </View>
    </View>
    {isActive && (
      <View className='h-2 bg-[#fee2e2] rounded-full mt-2'>
        <View
          style={{ width: `${progress}%` }}
          className='h-2 bg-[#f87171] rounded-full'
        />
      </View>
    )}
  </Pressable>
)

export default function InicioEfsrt () {
  const router = useRouter()
  const { setModuleNumber } = useEfsrtContext()
  const { message } = useSnackBar()
  const { data, isFetching } = useGetEFSRT()
  const [moduleData, setModuleData] = useState({
    moduleActive: 0,
    module_1ProcedureUuid: null,
    module_2ProcedureUuid: null,
    module_3ProcedureUuid: null,
    progressPercentage: 0
  })

  useEffect(() => {
    if (data) {
      console.log(data)
      setModuleData(data)
    }
  }, [data])

  const handleModulePress = (module) => {
    const cdpUuid = moduleData[`module_${module.number}ProcedureUuid`]
    if (cdpUuid) {
      setModuleNumber(cdpUuid)
      router.push({
        pathname: 'efsrt/module/information',
        params: {
          headerTitle: module.label
        }
      })
    }
  }

  function headerHandler () {
    return (
      <Pressable
        className='-mr-3 py-1 pl-3 pr-2'
        onPress={() => {
          router.push({
            pathname: 'efsrt/chats',
            params: {
              headerTitle: 'Chats'
            }
          })
        }}
      >
        <View className='flex-row items-center border border-rose-500 py-0.5 px-2.5 rounded-full gap-x-1.5'>
          <ChatsIcon size={25} strokeWidth={1} color='#F43F5E' />
          <Text className='font-SenMedium text-rose-500'>Chats</Text>
        </View>
      </Pressable>
    )
  }

  const modules = [
    { number: 1, label: 'Modulo I' },
    { number: 2, label: 'Modulo II' },
    { number: 3, label: 'Modulo III' }
  ]

  return (
    <>
      <Stack.Screen options={{ headerRight: headerHandler }} />
      {isFetching && <LoadingSnackBar />}
      {message && !isFetching && <SnackBar />}
      <View className='flex-1 bg-[#E6F2EC] p-4 gap-5'>
        {modules.map((module) => {
          const isActive = moduleData.moduleActive === module.number
          const hasUuid = Boolean(
            moduleData[`module_${module.number}ProcedureUuid`]
          )

          return (
            <ModuleCard
              key={module.number}
              label={module.label}
              isActive={isActive && !isFetching}
              hasUuid={hasUuid && !isFetching}
              progress={moduleData.progressPercentage}
              onPress={() => handleModulePress(module)}
            />
          )
        })}
      </View>
    </>
  )
}

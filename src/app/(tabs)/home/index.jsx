import { View, Text, Pressable, ScrollView } from 'react-native'
import { Link } from 'expo-router'
import {
  CalendarIcon,
  DocumentCheckIcon,
  DocumentPlusIcon,
  UserFolderIcon
} from '@components/Icons'
import { useGetUser } from '@/hooks/useUserMutation'
import { LockKeyhole } from 'lucide-react-native'
import { ProgressBar } from 'react-native-paper'

export default function Home () {
  const { isPending } = useGetUser()

  return (
    <>
      <View className='bg-[#E6F2EC]'>
        <ProgressBar visible={isPending} style={{ backgroundColor: '#E6F2EC' }} indeterminate color='#00695c' />
      </View>
      <ScrollView className='flex-1 bg-[#e5f5f3] px-4 py-6'>
        <View className='flex-row gap-5 justify-evenly flex-wrap'>
          {[
            {
              Icon: DocumentPlusIcon,
              text: 'Nuevo trámite',
              path: '/(screens)/tramites/initiate',
              isDisabled: false
            },
            {
              Icon: UserFolderIcon,
              text: 'EFSRT',
              path: '/(screens)/efsrt',
              isDisabled: false
            },
            {
              Icon: CalendarIcon,
              text: 'Horario',
              path: '',
              isDisabled: true
            },
            {
              Icon: DocumentCheckIcon,
              text: 'Calificaciones',
              path: '',
              isDisabled: true
            }
          ].map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`${item.isDisabled ? 'bg-gray-100' : 'bg-white'} w-40`}
              asChild
            >
              <Pressable
                disabled={item.isDisabled}
                className={`${item.isDisabled ? 'opacity-50' : 'opacity-100 shadow'} rounded-lg p-4 items-center justify-between active:scale-95`}
              >
                {item.isDisabled &&
                  <View className='self-end -mb-5'>
                    <LockKeyhole color='#6b7280' size={20} />
                  </View>}

                <item.Icon size={72} accentColor='#9f1239' />
                <View className='flex-1 flex-row gap-1 justify-center'>
                  <Text className='font-SenMedium text-center text-emerald-950'>
                    {item.text}
                  </Text>
                </View>
                {item.isDisabled && <Text className='text-sm mt-0.5 text-emerald-700'>Proximamente</Text>}
              </Pressable>
            </Link>
          ))}
        </View>
      </ScrollView>
    </>
  )
}

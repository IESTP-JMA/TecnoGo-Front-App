import { Text, Pressable, View } from 'react-native'
import { Tabs, useRouter } from 'expo-router'
import { HomeIcon, HomeIconOutline } from '../../components/Icons'
import { CircleHelp, User } from 'lucide-react-native'
import { useUser } from '@/contexts/UserContext'
import Avatar from '@components/Avatar'

export default function TabsLayout () {
  const router = useRouter()
  const { user } = useUser()

  return (
    <Tabs
      screenOptions={{
        headerTintColor: '#065F46',
        tabBarActiveTintColor: '#881337',
        // tabBarInactiveTintColor: '#fb7185',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 55,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15
          // marginHorizontal: 45,
        },
        tabBarLabelStyle: {
          fontFamily: 'SenMedium',
          fontSize: 12
        },
        animation: 'shift'
      }}
    >
      <Tabs.Screen
        name='home/index'
        options={{
          headerStyle: {
            backgroundColor: '#064E3B',
            height: 66
          },
          headerLeft: () => (
            <Pressable
              className='mx-2.5 size-16'
              onPress={() => router.navigate('/(tabs)/profile')}
            >
              <Avatar />
            </Pressable>
          ),
          headerTitle: () => (
            <View className='py-2.5 flex-1'>
              <Text className='text-white text-xl font-SenMedium'>
                Hola, {user.firstNames} 👋
              </Text>
              <Text className='text-zinc-200 font-SenRegular'>
                Bienvenida
              </Text>
            </View>
          ),
          headerRight: () => (
            <Pressable className='p-2.5 mr-2' onPress={() => router.navigate('/(tabs)/home/help')}>
              <CircleHelp color='white' />
            </Pressable>
          ),
          tabBarIcon: ({ color, focused }) => {
            if (focused) {
              return <HomeIcon size={28} color={color} />
            } else {
              return <HomeIconOutline size={28} color={color} />
            }
          },
          tabBarLabel: 'Inicio'
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          title: 'Mi Perfil',
          headerTitle: 'Mi Perfil',
          headerStyle: {
            backgroundColor: '#E6F2EC',
            height: 56
          },
          headerTitleStyle: {
            fontFamily: 'SenBold',
            color: '#064E3B',
            fontSize: 23
          },
          tabBarLabel: 'Mi Perfil',
          tabBarHideOnKeyboard: true,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, focused }) => (
            <User size={28} color={color} fill={focused ? color : 'none'} />
          )
        }}
      />
      <Tabs.Screen
        name='home/help'
        options={{
          href: null,
          title: 'Ayuda'
        }}
      />
    </Tabs>
  )
}

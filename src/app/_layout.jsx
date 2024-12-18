import { enableScreens } from 'react-native-screens'
import { Slot } from 'expo-router'
import { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { AuthProvider } from '../contexts/AuthContext'
import { UserProvider } from '@/contexts/UserContext'
import './global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SQLiteProvider } from 'expo-sqlite'
import { PaperProvider } from 'react-native-paper'
import { CREATE_PROFESSIONAL_CAREERS_TABLE, CREATE_USERS_TABLE } from '@/constants/schemes_database'

enableScreens()
SplashScreen.preventAutoHideAsync()
const queryClient = new QueryClient()

export default function RootLayout () {
  const [dbInitialized, setDbInitialized] = useState(false)
  const [loaded] = useFonts({
    SenRegular: require('../../assets/fonts/Sen-Regular.ttf'),
    SenMedium: require('../../assets/fonts/Sen-Medium.ttf'),
    SenSemiBold: require('../../assets/fonts/Sen-SemiBold.ttf'),
    SenBold: require('../../assets/fonts/Sen-Bold.ttf'),
    SenExtraBold: require('../../assets/fonts/Sen-ExtraBold.ttf')
  })

  const handleDbInitialization = async (db) => {
    console.log(db)
    try {
      await db.execAsync(CREATE_PROFESSIONAL_CAREERS_TABLE)
      await db.execAsync(CREATE_USERS_TABLE)
      console.log('Database tables initialized successfully.')
    } catch (error) {
      console.error('Error initializing database tables:', error)
    }
    setDbInitialized(true)
  }

  useEffect(() => {
    if (loaded && dbInitialized) {
      console.log('[STATUS] -> ', loaded, dbInitialized)
      SplashScreen.hideAsync()
    }
  }, [loaded, dbInitialized])

  if (!loaded) {
    return null
  }

  return (
    <SQLiteProvider databaseName='app.db' onInit={handleDbInitialization}>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <PaperProvider>
              <Slot />
            </PaperProvider>
          </AuthProvider>
        </QueryClientProvider>
      </UserProvider>
    </SQLiteProvider>
  )
}

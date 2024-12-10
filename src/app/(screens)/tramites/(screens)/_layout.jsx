import { ProceduresProvider } from '@/contexts/ProceduresContext'
import { Stack } from 'expo-router'
import NavBar from '@components/NavBar'

const tabs = [
  { id: 'initiate', title: 'Iniciar' },
  { id: 'progress', title: 'Progreso' },
  { id: 'response', title: 'Respuesta' }
]

export default function LayoutProcedure () {
  return (
    <ProceduresProvider>
      <NavBar tabs={tabs} />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name='initiate' />
        <Stack.Screen name='progress' />
        <Stack.Screen name='response' />
      </Stack>
    </ProceduresProvider>
  )
}

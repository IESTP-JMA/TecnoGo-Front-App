import { Pressable, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import {
  Camera,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Cake,
  IdCard,
  Pencil
} from 'lucide-react-native'
import { launchImageLibraryAsync } from 'expo-image-picker'
import { useImageUpload } from '@/hooks/useImageUpload '
import { useUser } from '@/contexts/UserContext'
import { useUpdateUser } from '@/hooks/useUserMutation'
import BottomUpModal from '@components/BottomUpModal'
import { Snackbar, ProgressBar } from 'react-native-paper'
import AvatarPlaceHolder from '@components/AvatarPlaceHolder'
import { Image } from 'expo-image'
import { Blurhash } from 'react-native-blurhash'

const profileFields = [
  {
    icon: Mail,
    label: 'Correo Electrónico',
    key: 'email',
    isEditable: true
  },
  {
    icon: Phone,
    label: 'Número de Teléfono',
    key: 'phoneNumber',
    isEditable: true
  },
  {
    icon: Cake,
    label: 'Fecha de Nacimiento',
    key: 'birthDate',
    isEditable: false
  },
  {
    icon: IdCard,
    label: 'DNI',
    key: 'dni',
    isEditable: false
  }
]

const ValueDisplay = ({ value }) => {
  return (
    <Text className='self-start text-lg font-SenMedium text-gray-800'>
      {value || 'No establecido'}
    </Text>
  )
}

function FieldDisplay ({ icon: Icon, label, value, isEditable, onEdit }) {
  return (
    <View className='flex-row items-center gap-2'>
      <Icon color='#022c22' size={26} />
      <Pressable className='flex-1 flex-row items-center' onPress={onEdit}>
        <View className='flex-1 ml-3'>
          <Text className='text-base font-SenBold text-emerald-900'>
            {label}
          </Text>
          <ValueDisplay value={value} />
        </View>
        {isEditable && <Pencil color='#881337' size={20} />}
      </Pressable>
    </View>
  )
}

const Divider = () => {
  return <View className='bg-gray-200 h-0.5 mx-3 rounded-full' />
}

export default function Profile () {
  const [blurhash, setBlurhash] = useState()
  const [nameField, setNameField] = useState('')
  const [nameKey, setNameKey] = useState('')
  const [editValue, setEditValue] = useState('')
  const [originalValue, setOriginalValue] = useState('')
  const [messageSnackbar, setMessageSnackbar] = useState('')
  const [visibleSnackbar, setVisibleSnackbar] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const { user } = useUser()
  const {
    mutate: updateUser,
    isPending: isPendingUser
  } = useUpdateUser()

  const { mutate, isPending } = useImageUpload((data) => {
    console.log('data.display_url -> ', data.display_url, blurhash)
    updateUser({ urlImage: data.display_url, blurhash })
  })

  const handleUpload = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true
    })

    if (!result.didCancel) {
      const blurhash = await Blurhash.encode(result.assets[0].uri, 3, 3)
      setBlurhash(blurhash)
      mutate(result.assets[0].base64)
    }
  }

  function onEdit (label, key) {
    setNameField(label)
    setNameKey(key)
    // Set initial value to current value of the field
    const currentValue = user[key] || ''
    setEditValue(currentValue)
    setOriginalValue(currentValue)
    setIsVisibleModal(true)
  }

  function handleSave () {
    updateUser({
      [nameKey]: editValue
    }, {
      onSuccess: () => {
        setMessageSnackbar(`${nameField} actualizado exitosamente`)
        setVisibleSnackbar(true)
      },
      onError: () => {
        setMessageSnackbar(`Error al actualizar ${nameField}`)
        setVisibleSnackbar(true)
      }
    })
    setIsVisibleModal(false)
  }

  return (
    <>
      <View className='bg-[#E6F2EC]'>
        <ProgressBar visible={isPendingUser || isPending} style={{ backgroundColor: '#E6F2EC' }} indeterminate color='#00695c' />
      </View>
      <ScrollView className='bg-[#E6F2EC] px-4 py-3'>
        <View className='flex-row gap-2.5 mb-6'>
          <View className='justify-center'>
            <View className='relative'>

              {user.urlImage && (
                <Image
                  source={user.urlImage}
                  style={{ width: 142, height: 142, borderRadius: 100 }}
                  placeholder={{ blurhash: user.blurhash }}
                  contentFit='cover'
                  transition={1000}
                />
              )}

              {!user.urlImage && (
                <AvatarPlaceHolder
                  customStyle={{ width: 142, height: 142 }}
                  customTextClass='text-7xl -mb-3'
                />
              )}
              <Pressable
                className='bottom-0 right-0 bg-rose-900 rounded-full px-3 py-3 absolute'
                onPress={handleUpload}
              >
                <Camera color='white' size={22} strokeWidth={1.75} />
              </Pressable>
            </View>
          </View>
          <View className=' flex-1 gap-2.5 justify-center'>
            <Text className='font-SenSemiBold text-2xl'>
              {`${user.firstNames} ${user.lastNames}`}
            </Text>
            <View className='ml-1 gap-1'>
              <View className='flex-row items-center gap-2'>
                <GraduationCap color='#4b5563' size={18} />
                <View>
                  <Text className='text-xs font-SenRegular text-gray-500'>
                    Carrera profesional
                  </Text>
                  <Text className='font-SenMedium text-gray-600'>
                    {user.professionalCareer}
                  </Text>
                </View>
              </View>
              <View className='flex-row items-center gap-2'>
                <Calendar color='#4b5563' size={18} />
                <View>
                  <Text className='text-xs font-SenRegular text-gray-500'>
                    Semestre
                  </Text>
                  <Text className='font-SenMedium text-gray-600'>
                    {user.semester}
                  </Text>
                </View>
              </View>
            </View>
          </View>

        </View>

        <View className='ml-2 mr-1 gap-2.5'>
          {profileFields.map((field, index) => (
            <React.Fragment key={field.key}>
              <FieldDisplay
                icon={field.icon}
                label={field.label}
                value={user[field.key]}
                isEditable={field.isEditable}
                onEdit={field.isEditable
                  ? () => onEdit(field.label, field.key)
                  : undefined}
              />
              {index < profileFields.length - 1 && <Divider />}
            </React.Fragment>
          ))}

        </View>

      </ScrollView>
      <BottomUpModal
        isVisible={isVisibleModal}
        onClose={() => setIsVisibleModal(false)}
        label={nameField}
        value={editValue}
        originalValue={originalValue}
        onChangeText={setEditValue}
        onSave={handleSave}
      />

      <Snackbar
        visible={visibleSnackbar}
        onDismiss={() => setVisibleSnackbar(false)}
        onIconPress={() => setVisibleSnackbar(false)}

      >
        <Text>{messageSnackbar}</Text>
      </Snackbar>
    </>
  )
}

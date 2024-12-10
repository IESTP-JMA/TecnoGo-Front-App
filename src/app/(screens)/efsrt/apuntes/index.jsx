import { Stack, useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert
  , Image
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Audio } from 'expo-av'

import { Camera, ImageIcon, Mic, Smile, X } from 'lucide-react-native'

export default function DailyNote () {
  const { headerTitle } = useLocalSearchParams()

  const [noteText, setNoteText] = useState('')
  const [attachments, setAttachments] = useState([])
  const [recording, setRecording] = useState()
  const [isRecording, setIsRecording] = useState(false)

  useEffect(() => {
    return () => {
      if (recording) {
        recording.unloadAsync()
      }
    }
  }, [recording])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      setAttachments([
        ...attachments,
        { type: 'image', uri: result.assets[0].uri }
      ])
    }
  }

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      setAttachments([
        ...attachments,
        { type: 'image', uri: result.assets[0].uri }
      ])
    }
  }

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      })

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      )
      setRecording(recording)
      setIsRecording(true)
    } catch (err) {
      console.error('Failed to start recording', err)
    }
  }

  const stopRecording = async () => {
    setIsRecording(false)
    try {
      await recording.stopAndUnloadAsync()
      const uri = recording.getURI()
      setAttachments([...attachments, { type: 'audio', uri }])
    } catch (err) {
      console.error('Failed to stop recording', err)
    }
  }

  const deleteAttachment = (index) => {
    Alert.alert(
      'Eliminar adjunto',
      '¿Estás seguro de que quieres eliminar este adjunto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const newAttachments = [...attachments]
            newAttachments.splice(index, 1)
            setAttachments(newAttachments)
          }
        }
      ]
    )
  }
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <Stack.Screen options={{ headerTitle: `Apunte  ${headerTitle}` }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className='flex-1 p-4 pb-12 bg-white'
        >
          <TextInput
            className='text-base leading-6 flex-1'
            multiline
            placeholder='Escribe tu nota aquí...'
            value={noteText}
            onChangeText={setNoteText}
            textAlignVertical='top'
          />
        </ScrollView>
        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <View className='flex-row flex-wrap gap-2 p-2 rounded-t-lg bg-emerald-50'>
            {attachments.map((attachment, index) => (
              <View
                key={index}
                className='w-20 h-20 bg-gray-200 rounded-lg overflow-hidden relative'
              >
                {attachment.type === 'image'
                  ? (
                    <Image
                      source={{ uri: attachment.uri }}
                      className='w-full h-full'
                    />
                    )
                  : (
                    <View className='w-full h-full justify-center items-center'>
                      <Mic size={24} color='#666' />
                      <Text className='text-xs mt-1'>Audio</Text>
                    </View>
                    )}
                <TouchableOpacity
                  onPress={() => deleteAttachment(index)}
                  className='absolute top-0 right-0 bg-black bg-opacity-50 rounded-bl-lg p-1'
                >
                  <X size={16} color='#fff' />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        {/* Bottom Toolbar */}
        <View className='border-t border-gray-200 bg-gray-50 px-4 py-2'>
          <View className='flex-row justify-between items-center'>
            <View className='flex-row gap-4'>
              <TouchableOpacity onPress={takePhoto}>
                <Camera size={24} color='#666' />
              </TouchableOpacity>
              <TouchableOpacity onPress={pickImage}>
                <ImageIcon size={24} color='#666' />
              </TouchableOpacity>
            </View>
            <View className='flex-row gap-4'>
              <TouchableOpacity
                onPress={isRecording ? stopRecording : startRecording}
              >
                <Mic size={24} color={isRecording ? '#f00' : '#666'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

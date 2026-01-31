import { ScrollView, View, Image, Alert, ActivityIndicator, Dimensions, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useState } from 'react';
import SignField from '@/components/fields/sign-field';
import Login from '@/components/buttons/login';
import { icons, images } from '@/constants'
import '@/global.css'
import { signUp } from '@/lib/Api/ApiRest'
import { storeData } from '@/lib/Storage/LocalStorage';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '@/store/Reducers/reducer';

const { width, height} = Dimensions.get('screen')
//const size = (4*width + height) /5

const SignUp = () => {

  const dispatch = useDispatch();

  const [field, setField] = useState({
    userName: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sizeHiddenAboutKeyBoard, setSizeHiddenAboutKeyBoard] = useState(0)

  const submit = async () => {
    if(field.userName.length < 1) {
      Alert.alert('Veuillez remplir tous les champs')
    } else {
      setIsSubmitting(true)
          try {
            await signUp(field.userName).then(data => {
              //console.log(data)
              if(!data) {
                Alert.alert('Probleme de connexion au serveur !')
              } else if(data.error) {
                if(data.error)
                  Alert.alert(data.error)
              } else if(data._id) {
                dispatch(setUser(data))
                dispatch(setToken(data.token))
                storeData('token', data.token)
                router.replace('/home')
              } else {
                Alert.alert('Une erreur inconnue est survenue');
              }
            })
          } catch(error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue est survenue';
            Alert.alert(errorMessage);
          } finally {
            setIsSubmitting(false)
          }
      }
  }

  const showComponentHidden = (size: number) => {
    setSizeHiddenAboutKeyBoard(size)
  }

  return (
    <SafeAreaView className='h-full'>
      <ScrollView scrollEnabled={false} contentContainerStyle={{height: '100%'}} keyboardShouldPersistTaps="handled">
        <View style={{marginTop: -sizeHiddenAboutKeyBoard}} className='w-full h-full items-center'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[25vh] h-[25vh] mt-[5vh]'
          />
          <View className="items-center flex-1 w-full mt-[7vh]">
            <SignField
              title="USERNAME"
              icon={icons.user}
              globalViewOtherStyle='mb-[2vh]'
              keyboardType='email-address'
              handleChangeText={(value) => setField({...field, userName: value})}
              handleSubmitSearch={() => {}}
              showComponentHidden={showComponentHidden}
              placeholder={process.env.EXPO_PUBLIC_BOT_NAME}
            />
            <View className='w-full items-center'>
              <Login 
                handlePress={submit}
                buttonLabel="JOIN"
                ortherSyles= {isSubmitting ? '':'bg-secondary' }
                isLoading={isSubmitting}
              />
            </View>
            {
              isSubmitting && <View className='absolute w-full h-[5vh] top-[21vh] items-center'>
                                <ActivityIndicator className='color-secondary' size="large" />
                              </View>
            }
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}

export default SignUp;

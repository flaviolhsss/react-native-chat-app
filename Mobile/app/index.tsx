import { Text, View, Image, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { icons, images } from '@/constants'
import '@/global.css'
import { getData } from '@/lib/Storage/LocalStorage';
import { tokenIsEnable } from '@/lib/Api/ApiRest'
import { useDispatch } from 'react-redux'
import { setUser, setToken } from '@/store/Reducers/reducer';

const { width, height} = Dimensions.get('screen')
const size = (4*width + height) /5

const IndexScreen = () => {

  const dispatch = useDispatch()

  const [again, setAgain] = useState(false);

  useEffect(() => {
    nextScreen()
  }, [])

  async function nextScreen() {
    const token = await getData('token')
    if(token == null) {
      router.replace('/sign-up')
    } else {
      dispatch(setToken(token))
      //console.log({token})
      await tokenIsEnable(token).then(data => {
        //console.log({data})
        if(!data) { // si pas de data, alors pas de connexion à 90%, on redirige vers sign-in
          // Une fois là-bas, on va le signaler à l'utilisateur lors de la connexion
          // Apres il faut créer un screen special pour les problemes de connexions
          //router.replace('/sign-in')
          setAgain(true)
        } else if(data.userName) {
          dispatch(setUser(data))
          router.replace('/home')
        } else {
          router.replace('/sign-up')
        }
      })
    }
  }

  const do_again = () => {
    setAgain(false)
    nextScreen()
  }


  return (
    <SafeAreaView className='h-full'>
        <View className='w-full h-full items-center'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[30vh] h-[30vh] mt-[20vh]'
          />
          <View className='items-center mt-[10vh]'>
            {!again && <ActivityIndicator className='color-primary' size="large" />}
            {again && <TouchableOpacity
            onPress={do_again}
            className={`items-center justify-center`}>
              <Image
                source={icons.reload}
                className='w-[5vh] h-[5vh]'
              />
              <Text style={{fontSize: 0.02*size}} className='font-psemibold text-white text-center leading-normal'>Reessayer</Text>
            </TouchableOpacity>}
          </View>
        </View>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}

export default IndexScreen

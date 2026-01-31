import { Text, View, Image, Dimensions } from 'react-native'
import { avatars } from '@/constants'
import '../../global.css'
import { DataMessage } from '@/types/global';
import moment from 'moment';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store'

const { width, height} = Dimensions.get('screen')
const size = (4*width + height) /5

const Message = ({ userId, userName, userAvatar, contenu, dateSended }: DataMessage) => {

  const user = useSelector((state: RootState) => state.app_state.user);

  if(user?._id !== userId) {
    return (
    <View className='w-[100vw]'>
      <Image
        source={avatars.tabAvatars[userAvatar]}
        resizeMode='contain'
        className='ml-[2vw] w-[5vh] h-[5vh]'
      />
      <View className='ml-[2vw] max-w-[60vw]'>
        <Text style={{fontSize: 0.03*size}} className='font-plight max-w-[60vw] px-[2vw] text-gray-400 text-base leading-normal'>{userName}</Text>
        <Text style={{fontSize: 0.03*size}} className='font-plight max-w-[60vw] px-[2vw] text-gray-400 text-sm leading-normal'>{"Sent on " + moment(new Date(dateSended)).format("DD.MM.YYYY, hh:mm A")}</Text>
        <Text style={{fontSize: 0.03*size}} className='font-plight max-w-[60vw] bg-sky-300 px-[2vw] text-primary-200 text-base rounded-xl leading-normal'>{contenu}</Text>
      </View>
    </View>
  )
  } else {
    return (
    <View className=' flex-wrap-reverse w-[100vw]'>
      <Image
        source={avatars.tabAvatars[userAvatar]}
        resizeMode='contain'
        className='ml-[50vw] w-[5vh] h-[5vh]'
      />
      <View className='ml-[2vw] max-w-[60vw]'>
        <Text style={{fontSize: 0.03*size}} className='font-plight max-w-[60vw] px-[2vw] text-gray-400 text-base leading-normal'>You</Text>
        <Text style={{fontSize: 0.03*size}} className='font-plight max-w-[60vw] px-[2vw] text-gray-400 text-sm leading-normal'>{"Sent on " + moment(new Date(dateSended)).format("DD.MM.YYYY, hh:mm A")}</Text>
        <Text style={{fontSize: 0.03*size}} className='font-plight max-w-[60vw] bg-vert-100 px-[2vw] text-primary-200 text-base rounded-xl leading-normal'>{contenu}</Text>
      </View>
    </View>
  )
  }
}

export default Message

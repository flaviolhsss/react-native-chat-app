import { ScrollView, Text, View, Image, TouchableOpacity, Alert, ActivityIndicator, Dimensions, TextInput,
  Keyboard, KeyboardEvent } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import React, { useEffect, useState, useRef } from 'react';
import { icons, images } from '../../constants'
import '@/global.css'
import { useDispatch, useSelector } from 'react-redux';
import { setSocket, increment_new_msg_counter } from '@/store/Reducers/reducer';
import Message from '@/components/chats/message';
import type { RootState } from '@/store/store'
import { getMessages, sendMessage } from '@/lib/Api/ApiRest';
import { DataMessage } from '@/types/global';
import { closeWebSocket } from '@/lib/Api/ApiWS';

const { width, height} = Dimensions.get('screen')
const size = (4*width + height) /5
const TextField_Pr = (0.04*width + 0.05*height)
const HEIGTH = height
const WS_URL = process.env.EXPO_PUBLIC_WS_URL;
let render = false

const Home = () => {

  const new_msg_counter = useSelector((state: RootState) => state.app_state.new_msg_counter);
  const token = useSelector((state: RootState) => state.app_state.token);
  const socket = useSelector((state: RootState) => state.app_state.socket);
  const dispatch = useDispatch();

  const [sizeHiddenAboutKeyBoard, setSizeHiddenAboutKeyBoard] = useState(0)
  const [textField, setTextField] = useState('');
  const [messages, setMessages] = useState<DataMessage[]>([]);
  const refField = useRef<TextInput>(null);
  const refScrollView = useRef<ScrollView>(null);
  let hidden = false

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
  
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  async function getMessagesData() {
    getMessages(token).then(data => {
      //console.log({data})
      if(!data) {
        Alert.alert('Probleme de connexion au serveur !')
      } else if(data.error) {
        Alert.alert('Probleme inattendu !')
        //router.replace('/sign-in')
      } else {
        setMessages(data.messages)
      }
    })
  }

  async function sendMessageData() {
    if(textField.length == 0) Alert.alert("The message is empty !")
    else {
      setTextField("")
      sendMessage(textField, token).then(data => {
        //console.log({data})
        if(!data) {
          Alert.alert('Probleme de connexion au serveur !')
        } else if(data.error) {
          Alert.alert('Probleme inattendu !')
          //router.replace('/sign-in')
        }
      })
    }
  }

  const handleKeyboardShow = (event: KeyboardEvent) => {
    if(refField.current?.isFocused()) {
      refField.current?.measure((x, y, width, height, pageX, pageY) => {
        let diff = pageY + height - event.endCoordinates.screenY + 0.02*HEIGTH
        if(diff > 0) {
          hidden = true
          showComponentHidden(diff)
        }
      });
    }
  };

  const handleKeyboardHide = (event: KeyboardEvent) => {
    if(hidden) {
      hidden = false
      showComponentHidden(0)
    }
  };

  const showComponentHidden = (size: number) => {
    setSizeHiddenAboutKeyBoard(size)
  }

  useEffect(() => {
    getMessagesData()
  }, [new_msg_counter])

  const scrollToEnd = () => {
    refScrollView.current?.scrollToEnd( { animated: true } )
  }

  const initWebSocket = () => {

    console.log('Tentative de connexion WebSocket...');

    const socket = new WebSocket(WS_URL + "/ws");

    socket.onopen = () => {
      console.log('WebSocket connecté');
      dispatch(setSocket(socket))
    };

    socket.onmessage = (event) => {
      const dataObj = JSON.parse(event.data)
      //console.log({dataObj})
      if(dataObj.send_msg) {
        dispatch(increment_new_msg_counter())
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error :', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
      closeWebSocket(socket)
      dispatch(setSocket(null))
      router.replace('/')
    };
  }

  if(socket === null && !render) {
    initWebSocket()
    render = true
  }

  return (
    <SafeAreaView className='h-full'>
      <ScrollView scrollEnabled={false} contentContainerStyle={{height: '100%'}} keyboardShouldPersistTaps="handled">
        <View className='w-full h-full items-center'>
          <View style={{bottom: (sizeHiddenAboutKeyBoard + 0.1*height)}} className="absolute items-center justify-center w-full h-[80vh] mt-[8vh] rounded-lg">
            <ScrollView
              ref={refScrollView}
              onContentSizeChange={scrollToEnd}
            >
              <View className='w-full h-[10vh]'></View>
              {messages.map((item, index) => (
                <React.Fragment key={index}>
                  <Message 
                    userId={item.userId} 
                    userName={item.userName}
                    userAvatar={item.userAvatar}
                    contenu={item.contenu} 
                    dateSended={item.dateSended}
                  />
                  <View className='w-full h-[5vh]'></View>
                </React.Fragment>
              ))}
            </ScrollView>
          </View>
          <View style={{bottom: sizeHiddenAboutKeyBoard}} className={`absolute flex-row items-center justify-center w-full h-[10vh]`}>
            <TextInput
              ref={refField}
              style={{paddingRight: TextField_Pr}}
              className='w-[90%] h-[8vh] pl-[2vw] py-0 font-plight bg-champ border-2 rounded-3xl border-champ
              text-primary focus:border-secondary text-lg'
              onChangeText={(text) => {setTextField(text)}}
              value={textField}
              multiline={true}
              placeholderTextColor='#111155'
            />
            <TouchableOpacity onPress={sendMessageData} className='absolute right-[7%]'>
              <Image
                source={icons.send}
                resizeMode='contain'
                className='w-[5vh] h-[5vh]'
              />
            </TouchableOpacity>
          </View>

          <View className="w-full h-[9vh] bg-gray-100">
            <View className="flex-row items-center justify-center w-full h-[7vh] border-b-2 border-b-primary">
              <Image
                source={images.logo}
                resizeMode='contain'
                className='absolute w-[5vh] h-[5vh] left-[1vw]'
              />
              <Text style={{fontSize: 0.04*size}} className='absolute right-[1vw] font-pbayon text-primary text-2xl text-center mt-[1vh] leading-normal'>Chat</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='dark'/>
    </SafeAreaView>
  )
}

export default Home;

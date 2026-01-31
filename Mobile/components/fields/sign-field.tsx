import { Text, View, TextInput, Image, ImageSourcePropType,
     KeyboardTypeOptions, Platform, Dimensions, Keyboard, KeyboardEvent } from 'react-native'
import { useEffect, useState, useRef } from 'react';
import '@/global.css'

const { width, height} = Dimensions.get('screen')
const size = (4*width + height) /5
const WIDTH = width
const HEIGTH = height

interface params {
  title?: string;
  value?: string;
  placeholder?: string;
  handleChangeText?: (text: string) => void;
  handleSubmitSearch: () => void;
  showComponentHidden: (size: number) => void;
  icon?: ImageSourcePropType;
  globalViewOtherStyle?: string;
  keyboardType?: KeyboardTypeOptions;
}

const SignField = ({ title, value, placeholder, handleChangeText, handleSubmitSearch, showComponentHidden,
    icon, globalViewOtherStyle, keyboardType }: params) => {

    const ref = useRef<View>(null);
    const refField = useRef<TextInput>(null);
    let hidden = false

    async function playButton() {
        handleSubmitSearch()
    }

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const handleKeyboardShow = (event: KeyboardEvent) => {
        if(refField.current?.isFocused()) {
            ref.current?.measure((x, y, width, height, pageX, pageY) => {
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

    return (
        <View 
            ref={ref}
            className={`w-[95%] ${globalViewOtherStyle}`}>
            <Text style={{fontSize: 0.03*size}} className='text-primary font-pbayon ml-[1vw] leading-normal'>{title}</Text>
            <View className='flex-row w-full h-[5vh] items-center rounded-3xl'>
                <TextInput
                    ref={refField}
                    style={{fontSize: 0.03*size, borderRadius: 0.02*size, borderWidth: 0.004*size}}
                    className='w-full h-full px-[5vh] py-0 bg-champ border-champ focus:border-secondary
                     text-primary font-pregular'
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor='#7b7b8b'
                    onChangeText={handleChangeText}
                    keyboardType={Platform.OS === 'android' ? 'default' : keyboardType}
                />
                <Image
                    source={icon}
                    resizeMode='contain'
                    className="absolute w-[3vh] h-[3vh] left-[1vh]"
                />
            </View>
        </View>
    )
}

export default SignField

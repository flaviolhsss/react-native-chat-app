import { Text, TouchableOpacity, Dimensions } from 'react-native'
import '@/global.css'
import { playButtonSound } from '@/lib/Utils/Sound';

const { width, height} = Dimensions.get('screen')
const size = (4*width + height) /5

interface params {
  handlePress: () => void;
  buttonLabel?: string;
  ortherSyles?: string;
  isLoading?: boolean;
}

const Login = ({ handlePress, buttonLabel, ortherSyles, isLoading }: params) => {

    async function playButton() {
        playButtonSound()
        handlePress()
    }

    return (
        <TouchableOpacity
            onPress= {() => {playButton()}}
            //activeOpacity={0.7}
            style={{borderRadius: 0.02*size, borderWidth: 0.003*size}}
            className={`w-[95%] h-[5vh] items-center justify-center text-white font-pbayon border-champ ${ortherSyles}`}
            disabled={isLoading}
        >
            <Text style={{fontSize: 0.03*size}} className='font-pmontserratbold text-primary text-center'>{buttonLabel}</Text>
        </TouchableOpacity>
    )
}

export default Login

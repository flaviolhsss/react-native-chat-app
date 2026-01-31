import { Audio } from 'expo-av';
import { audios } from '@/constants';

export async function playButtonSound() {
  const { sound } = await Audio.Sound.createAsync(audios.bluetooth_button_press_001)
  //sound.setVolumeAsync(0.9)
  await sound.playAsync()
      
  //let count = 0
  const interval = setInterval(() => {
    stopMusic(sound)
    clearInterval(interval)}
  , 1000);
}

export async function playMusic() {
  const { sound } = await Audio.Sound.createAsync(audios.african_fun_long)
  //sound.setVolumeAsync(0.9)
  sound.setIsLoopingAsync(true)
  await sound.playAsync()

  return sound
}

export async function stopMusic(sound: Audio.Sound | null) {
  if(sound !== null) {
    await sound.stopAsync();
    await sound.unloadAsync();
    sound = null
  }
  return sound
}

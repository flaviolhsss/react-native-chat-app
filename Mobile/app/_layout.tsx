import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { Provider } from "react-redux";
import { store } from '@/store/store';

SplashScreen.preventAutoHideAsync();

const boolAffiche = false;

const RootLayout = () => {

  const [fontsLoaded, error] = useFonts({
    "Bayon-Regular": require("../assets/fonts/Bayon-Regular.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if(error) throw error
    if(fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])

  if(!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name='index' options={{headerShown: boolAffiche}} />
        <Stack.Screen name='(auth)' options={{headerShown: boolAffiche}} />
        <Stack.Screen name='(home)' options={{headerShown: boolAffiche}} />
      </Stack>
    </Provider>
  )
}

export default RootLayout

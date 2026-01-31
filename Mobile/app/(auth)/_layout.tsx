import { Stack } from 'expo-router';

const AuthentificationLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  )
}

export default AuthentificationLayout

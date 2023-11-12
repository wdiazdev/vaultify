import { Stack, SplashScreen } from 'expo-router'
import CustomHeader from '@/Components/CustomHeader'
import { useFonts } from 'expo-font'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'

export {
  // Catch any errors thrown by the Layout Component.
  ErrorBoundary
} from 'expo-router'

export const unstable_settings = {
  //Ensure that reloading on '/modal' keeps a back button present.
  InitialRouteName: '(tabs)'
}

//Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const queryClient = new QueryClient()

  const [fontsLoaded, fontError] = useFonts({
    'm-regular': require('../assets/fonts/m-regular.ttf'),
    'm-medium': require('../assets/fonts/m-medium.ttf'),
    'm-bold': require('../assets/fonts/m-bold.ttf')
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return undefined
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            header: () => <CustomHeader />
          }}
        />
      </Stack>
    </QueryClientProvider>
  )
}

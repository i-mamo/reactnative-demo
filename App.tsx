import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Colors from './constants/Colors';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  console.log(colorScheme);



  const styles = StyleSheet.create({
    appbar: {
      backgroundColor: Colors[colorScheme].subColor,
      color: Colors[colorScheme].text

    },
    content: {
      color: Colors[colorScheme].text
    }
  })


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Appbar.Header style={styles.appbar}>
          <Appbar.Action color={Colors[colorScheme].text} icon="book" onPress={() => { }} />
          <Appbar.Content color={Colors[colorScheme].text} title="TapDiary" />
          <Appbar.Action icon="dots-vertical" onPress={() => { }} />
        </Appbar.Header>
        <Navigation colorScheme={colorScheme} />
      </SafeAreaProvider>
    );
  }
}


import { ReactElement } from "react"
import { StyleSheet, View, Text } from "react-native"
import useColorScheme from "../hooks/useColorScheme"
import Colors from "./Colors";


export const Diaries = (props: any) => {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    time: {
      fontSize: 14,
      color:Colors[colorScheme].text,
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    emoji: {
      fontSize: 42,
      marginRight: 10,
    },
    body: {
      fontSize: 18,
      color:Colors[colorScheme].text,
    }
  })
  const items:ReactElement = props.items.map((item: {id:number,emoji:string,body:string,created_at:string}) => {
    return (
      <View key={item.id}>
        <Text style={styles.time}>{item.created_at}</Text>
        <Text style={styles.container}>
          <Text style={styles.emoji}>{item.emoji}</Text>
          <Text style={styles.body}>{item.body||'empty'}</Text>
        </Text>
      </View>
    )
  })
  return items
}

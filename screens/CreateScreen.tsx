import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TextInput, Alert } from 'react-native';

import { Text, View } from '../components/Themed';

import { firestore } from '../helpers/firebase';
import { collection, addDoc, query, getDocs } from "firebase/firestore";

import { db, insertDiary } from '../helpers/sqlite';

import { RootTabScreenProps } from '../types';
import { gstyle } from '../constants/Styles';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Button } from 'react-native-paper';

export default function CreateScreen({ navigation }: RootTabScreenProps<'Create'>) {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    flatList: {
      maxHeight: '40%',
      width: '100%',
    },
    emoji: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      textAlign: 'center',
      fontSize: 30,
      marginHorizontal: 25,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    templateList: {
      // minHeight:'35%',
      maxHeight: '40%',
      width: '100%',
    },
    template: {
      fontSize: 14,
      lineHeight: 40,
      color: Colors[colorScheme].text
    },
    input: {
      color:Colors[colorScheme].text,
      fontSize: 14,
      width: '90%',
      marginHorizontal: '5%',
      height:30,
      margin: 30,
      backgroundColor:Colors[colorScheme].backGroundColor,
      textAlignVertical:'center'
    },
    button: {
      width: '50%',
      marginHorizontal: '25%',
      marginBottom:40,
      borderColor:Colors[colorScheme].text,
      borderWidth:1,
      backgroundColor:Colors[colorScheme].backGroundColor,
    },
  });

  const [feels, setFeels] = useState([]);
  const [body, setBody] = useState('');
  const [templates, setTemplates] = useState([]);
  const [selectedTemplates, setselectedTemplates] = useState<any>({});

  useEffect(() => {
    // fireStore からとってくる
    getEmojies()
  }, [])
  const getEmojies = async () => {
    try {
      const q = query(collection(firestore, 'feels'));
      let tmpFeels: string[] | any = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const array: any = doc.data();
        array['id'] = doc.id;
        tmpFeels.push(array);
      })
      setFeels(tmpFeels);

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const emojiPress = (name: string) => {
    const selectedEmoji: any = feels.find((v: any) => v.name === name) ?? {};
    setTemplates(selectedEmoji.templates)
    setselectedTemplates(selectedEmoji)
  }

  const templatePress = (template: string) => {
    setBody(template)
  }

  const onSubmit = () => {
    insertDiary(db, body, selectedTemplates)
    Alert.alert(
      "Tap Diary",
      "Diary worte",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () =>{
          setBody('')
          navigation.navigate('Home')
        }  }
      ]
    );
  }

  return (
    <View style={gstyle.bgimage}>
      <Text style={gstyle.heading}>Diary Create</Text>

      <FlatList
        style={styles.flatList}
        data={feels}
        horizontal={true}
        renderItem={({ item }: any) =>
          <Text style={styles.emoji} onPress={() => emojiPress(item.name)}>{item.emoji + '\n' + item.name}</Text>
        }
      // keyExtractor={(item) => item.id}
      // extraData={selectedId}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        style={styles.templateList}
        data={templates}
        renderItem={({ item }) =>
          <Text style={styles.template} onPress={() => templatePress(item)}>{item}</Text>
        }
      // keyExtractor={(item) => item.id}
      // extraData={selectedId}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={3} // Androd限定
        onChangeText={setBody}
        placeholder={'diary Content'}
        value={body}
      />

      <Button
        style={styles.button}
        buttonColor={Colors[colorScheme].accentColor}
        icon={'pen'}
        mode={'contained'}
        labelStyle={{fontSize:20}}
        disabled={body.length < 10}
        onPress={() => onSubmit()}
      >
        Write Diary
      </Button>
    </View>
  );
}


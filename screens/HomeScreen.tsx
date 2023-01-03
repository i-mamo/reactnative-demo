import { StyleSheet, ScrollView, Image, RefreshControl, ImageBackground } from 'react-native';

import dayjs from 'dayjs';
import { Text, View } from '../components/Themed';
import { Button } from 'react-native-paper';
import { RootTabScreenProps } from '../types';

import { createTable, insert, select } from '../helpers/sqlite';
import { useEffect, useState } from 'react';

import { Diaries } from '../constants/Diaries';
import { hourMessage } from '../helpers/functions';

import { gstyle } from '../constants/Styles';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';



export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    welcome: {
      borderColor: '#fff',
      backgroundColor: Colors[colorScheme].backGroundColor,
      marginTop: 20,
      borderRadius: 10,
      width: '80%',
      marginHorizontal: '10%',
      padding: 20,
    },
    welcomeImage: {
      flex:1,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'transparent',
      marginBottom:10,
    },
    welcomeText:{
      textAlign:'center',
      marginBottom:10
    },
    welcomeButton:{
      backgroundColor:Colors[colorScheme].mainColor
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    tips:{
      flex:1,
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
      backgroundColor:'transparent'
      
    },
    tipsCard:{
      width:'40%',
      padding:15,
      borderRadius:15,
      marginBottom:20,
      backgroundColor:Colors[colorScheme].backGroundColor
    },
    tipsImage:{
      width:'80%',
      marginHorizontal:'10%',
      marginBottom:10,

    },
    tipsText:{
      color:Colors[colorScheme].text,
      textAlign:'center',
    },

  });

  createTable(); // 「diaries_table」というテーブル作成
  const [diaries, setDiaries] = useState([])
  const [refreshing, setRefreshing] = useState(true);
  const welcomeMessage: string = hourMessage()

  useEffect(() => {
    console.log('useEffect Home');
    init();
  }, [])

  const init = async () => {
    // SQLiteから最新５件をとってくる
    const results: string[] | any = await select();
    await setDiaries(results);
    setRefreshing(false)

  }
  console.log(dayjs().format('HH'));
  const backgroundSource:number = colorScheme === 'dark'?require('../assets/images/background2.jpeg'): require('../assets/images/background3.jpeg');
  


  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={init} />
      }
    >
      <ImageBackground source={backgroundSource} resizeMode='cover'
        style={gstyle.bgimage}
      >
        <View style={styles.welcome}>
          <View style={styles.welcomeImage}>
            <Image source={require('../assets/images/welcome.png')}></Image>
          </View>
          <Text style={styles.welcomeText}>{dayjs().format('YYYY-MM-DD')}</Text>
          <Text style={[gstyle.heading,styles.welcomeText]}>{welcomeMessage}</Text>
          <Button style={styles.welcomeButton} icon={'note'} mode={'contained'} onPress={() => navigation.navigate('Create')}>Checl In</Button>
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={gstyle.heading}>Past Diaries</Text>
        <Diaries items={diaries} />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={gstyle.heading}>Diariy Tips</Text>
        <View style={styles.tips}>
          <View style={styles.tipsCard} onTouchEnd={() => navigation.navigate('WebView', { url: 'https://tapdiary.net' })}>
            <Image style={styles.tipsImage} source={require('../assets/images/tips1.png')} />
            <Text style={styles.tipsText}>App Philosophy</Text>
          </View>
          <View style={styles.tipsCard} onTouchEnd={() => navigation.navigate('WebView', { url: 'https://tapdiary.net/we-philosophy/' })}>
            <Image style={styles.tipsImage} source={require('../assets/images/tips2.png')} />
            <Text style={styles.tipsText}>Diary Benefits</Text>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}



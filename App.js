/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Modal,
  Button,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpScreen from './component/account/SignUpScreen';
import LoginScreen from './component/account/LoginScreen';
import FindAccountScreen from './component/account/FindAccountScreen';
import MainScreen from './component/main/MainScreen'
const Stack = createNativeStackNavigator();

function App() {


  /*
  const [selectedDate, setSelectedDate] = useState(null);

  const [isModalVisibleSearch, setIsModalVisibleSearch] = useState(false);
  const [isModalVisibleRecord, setIsModalVisibleRecord] = useState(false);
  const [isModalVisibleStatistics, setIsModalVisibleStatistics] = useState(false);

  const [searchModalKey, setSearchModalKey] = useState(0);
  const [recordModalKey, setRecordModalKey] = useState(0);
  const [statisticsModalKey, setStatisticsModalKey] = useState(0);

  const onPressModalOpenSearch = () => {
    setSearchModalKey(prev => prev + 1); // 키 변경
    setIsModalVisibleSearch(true);
  };

  const onPressModalCloseSearch = () => {
    setIsModalVisibleSearch(false);
  };

  const onPressModalOpenRecord = () => {
    setRecordModalKey(prev => prev + 1); // 키 변경
    setIsModalVisibleRecord(true);
  };

  const onPressModalCloseRecord = () => {
    setIsModalVisibleRecord(false);
  };

  const onPressModalOpenStatistics = () => {
    setStatisticsModalKey(prev => prev + 1); // 키 변경
    setIsModalVisibleStatistics(true);
  };

  const onPressModalCloseStatistics = () => {
    setIsModalVisibleStatistics(false);
  };*/

  return (
    <>

      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="FindAccount" component={FindAccountScreen} />
            <Stack.Screen name="MainScreen" component={MainScreen}  options={{ headerBackVisible: false ,headerLeft: () => null }} />
          </Stack.Navigator>
      </NavigationContainer>  
      </SafeAreaView>

      {/*<View>
        <Modal
          animationType="slide"
          visible={isModalVisibleSearch}
          transparent={true}>
          <View style={styles.modalView}>
            <Pressable onPress={onPressModalCloseSearch} selectedDate={selectedDate}>
              <Text style={{ color: 'red' }}>Modal Close!</Text>
            </Pressable>
            <UserBookScreen key={searchModalKey} />
          </View>
        </Modal>
      </View>

      <View>
        <Modal
          animationType="slide"
          visible={isModalVisibleRecord}
          transparent={true}>
          <View style={styles.modalView}>
            <Pressable onPress={onPressModalCloseRecord} >
              <Text style={{ color: 'red' }}>Modal Close!</Text>
            </Pressable>
            <UserBookRecordScreen key={recordModalKey} selectedDate={selectedDate} />
          </View>
        </Modal>
      </View>
      <View>
        <Modal
          animationType="slide"
          visible={isModalVisibleStatistics}
          transparent={true}>
          <View style={styles.modalView}>
            <Pressable onPress={onPressModalCloseStatistics} >
              <Text style={{ color: 'red' }}>Modal Close!</Text>
            </Pressable>
            <UserStatistics key={recordModalKey} selectedDate={selectedDate} />
          </View>
        </Modal>
      </View>*/}
    </>
  );
}

const styles = StyleSheet.create({

  container: {
    width: '100%',
    height: '100%',
    backgroundColor: "white"
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 400,
  },
  /**
   * 일반 화면 영역
   */
  item: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    margin: 30
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // 왼쪽 정렬
    alignItems: 'center', // 요소들을 수직 방향으로 가운데 정렬
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 400,
  },

  /**
   * 모달 화면 영역
   */
  modalView: {
    height: '100%',
    marginTop: 35,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextStyle: {
    color: '#17191c',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50
  },
});

export default App;


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

import TimelineScreen from './TimelineScreen';
import UserBookRecordScreen from '../book/UserBookRecordScreen';
import CalendarMain from './CalMain';
import UserBookScreen from '../book/UserBookScreen';
import UserStatisticsScreen from "../book/UserStatisticsScreen";
import UserRecommendScreeen from "../recommend/UserRecommendScreen";
import UserQnaScreeen from "../qna/UserQnaScreeen"


const MainScreen = ({ }) => {

  const [selectedDate, setSelectedDate] = useState(null);

  const [isModalVisibleSearch, setIsModalVisibleSearch] = useState(false);
  const [isModalVisibleRecord, setIsModalVisibleRecord] = useState(false);
  const [isModalVisibleStatistics, setIsModalVisibleStatistics] = useState(false);
  const [isModalVisibleRecommned, setIsModalVisibleRecommned] = useState(false);

  const [isModalVisibleQnA, setIsModalVisibleQnA] = useState(false);

  const [searchModalKey, setSearchModalKey] = useState(0);
  const [recordModalKey, setRecordModalKey] = useState(0);
  const [statisticsModalKey, setStatisticsModalKey] = useState(0);
  const [recommendModalKey, setRecommendModalKey] = useState(0);
   const [qnaModalKey, setQnAModalKey] = useState(0);

  const onPressModalOpenSearch = ({ }) => {
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
  };

  const onPressModalCloseRecommend = () => {
    setIsModalVisibleRecommned(false);
  };

  const onPressModalOpenRecommend = () => {
    setRecommendModalKey(prev => prev + 1); // 키 변경
    setIsModalVisibleRecommned(true);
  };

  const onPressModalOpenQnA = () => {
    setQnAModalKey(prev => prev + 1); // 키 변경
    setIsModalVisibleQnA(true);
  };

  const onPressModalCloseQnA= () => {
    setIsModalVisibleQnA(false);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <CalendarMain onDateSelect={setSelectedDate} />
        <TimelineScreen selectedDate={selectedDate} />
        <View style={styles.row}>
          <View>
            <Pressable onPress={onPressModalOpenSearch} >
              <Text style={styles.item}>책장에 쏙!</Text>
            </Pressable>
          </View>
          <View>
            <Pressable onPress={onPressModalOpenRecord}>
              <Text style={styles.item}>기록을 쏙!</Text>
            </Pressable>
          </View>
          <View>
            <Pressable onPress={onPressModalOpenStatistics}>
              <Text style={styles.item}>통계을 쏙!</Text>
            </Pressable>
          </View>
          <View>
            <Pressable onPress={onPressModalOpenRecommend}>
              <Text style={styles.item}>추천을 쏙!</Text>
            </Pressable>
          </View>
          <View>
            <Pressable onPress={onPressModalOpenQnA}>
              <Text style={styles.item}>검색을 쏙!</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      <View>
        <Modal
          animationType="slide"
          visible={isModalVisibleSearch}
          transparent={true}>
          <View style={styles.modalView}>
            <Pressable onPress={onPressModalCloseSearch} >
              <Text style={{ color: 'red' }}>Modal Close!</Text>
            </Pressable>
            <UserBookScreen key={searchModalKey} selectedDate={selectedDate} />
          </View>
        </Modal>
      </View>

      < View>
        <Modal
          animationType="fade"
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
            <UserStatisticsScreen key={statisticsModalKey} selectedDate={selectedDate} />
          </View>
        </Modal>
      </View>

      <View>
        <Modal
          animationType="slide"
          visible={isModalVisibleRecommned}
          transparent={true}>
          <View style={styles.modalView}>
            <Pressable onPress={onPressModalCloseRecommend} >
              <Text style={{ color: 'red' }}>Modal Close!</Text>
            </Pressable>
            <UserRecommendScreeen key={recommendModalKey} selectedDate={selectedDate} />
          </View>
        </Modal>
      </View>

      <View>
        <Modal
          animationType="fade"
          visible={isModalVisibleQnA}
          transparent={true}>
          <View style={styles.modalView}>
            <Pressable onPress={onPressModalCloseQnA} >
              <Text style={{ color: 'red' }}>Modal Close!</Text>
            </Pressable>
            <UserQnaScreeen key={qnaModalKey} selectedDate={selectedDate} />
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({

  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'

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
  },
  row: {
    /*flexDirection: 'row',
    justifyContent: 'flex-start', // 왼쪽 정렬
    alignItems: 'center', // 요소들을 수직 방향으로 가운데 정렬*/
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    marginLeft: 20

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

export default MainScreen;
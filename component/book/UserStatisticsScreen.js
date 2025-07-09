import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
//import { View } from '@ant-design/react-native';
import { BarChart, LineChart, PieChart, PopulationPyramid, RadarChart } from "react-native-gifted-charts";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const UserStatisticsScreen = ({ selectedDate }) => {
  const url = Platform.OS === 'android' ?
    'http://10.0.2.2:8080' : 'http://localhost:8080';

  const [dataReadCount, setDataReadCount] = useState([]);
  const [dataBookMoney, setDataBookMoney] = useState([]);
  const [dataBookCategory, setDataBookCategory] = useState([]);
  const pieData = [
    {value: 50, color: '#F44336', text: '빨강'},
    {value: 30, color: '#2196F3', text: '파랑'},
    {value: 20, color: '#4CAF50', text: '초록'},
  ];

  useEffect(() => {
    getKey();

  }, [selectedDate]);

  const getKey = async () => {
    try {
      const value = await AsyncStorage.getItem('session');
      if (value !== null) {
        let valueJson = JSON.parse(value);
        getMonthlyReadCount(valueJson.id);
        getMonthlyBookCount(valueJson.id);
        getMonthlyBookCategory(valueJson.id);

      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const getMonthlyReadCount = (userId) => {
    const year = selectedDate.substr(0, 4);

    axios.get(url + '/r1/statistic/monthly-read-count?userId=' + userId + '&year=' + year)

      .then((response) => {

        const readCount = response.data.map((item, index) => ({
          label: item.data+"월",
          value: item.key,
        }));

        setDataReadCount(readCount);

        console.log("readcount ::", response.data)
      }).catch(error => console.error(error));

  };
  const getMonthlyBookCount = (userId) => {
    const year = selectedDate.substr(0, 4);

    axios.get(url + '/r1/statistic/monthly-book-money?userId=' + userId + '&year=' + year)

      .then((response) => {

        const bookMoney = response.data.map((item, index) => ({
          label: item.key +"월",
          value: item.data,
        }));
        setDataBookMoney(bookMoney);


        console.log("bookMoney:::", response.data)
      }).catch(error => console.error(error));

  };

  const getMonthlyBookCategory = (userId) => {
    const year = selectedDate.substr(0, 4);

    axios.get(url + '/r1/statistic/monthly-book-category?userId=' + userId + '&year=' + year)

      .then((response) => {
        console.log(response.data)
        const bookCategory = response.data.map((item, index) => ({
          value: item.key,
          color: item.data,
          text:item.etc
        }));
        setDataBookCategory(bookCategory);

        console.log("dataBookCategory:::",dataBookCategory)

      }).catch(error => console.error(error));

  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          
          <View style={styles.item}>
            <BarChart data={dataReadCount}  style={styles.item}  />
          </View>
          <Text>월별 독서량</Text>
          
          <View style={styles.item}>
            <BarChart data={dataBookMoney}  style={styles.item} textFontSize={4} showValuesAsTopLabel={true}/>
          </View>
          <Text>월별 지식의 가격 :10_000원 단위</Text>
          
          <View style={styles.item}>
            <PieChart
              data={dataBookCategory}
              showText
              textColor="gray"
              radius={120}
              innerRadius={60}
            />
            <Text>카테고리별 통계량</Text>
          </View>
          {/*
          <View style={styles.item}>
            <BarChart data={data} vertical style={styles.item} />
          </View>
          */}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'col',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center', // 세로 중앙 정렬
    padding: 10,
  },
  item: {
    width: '100%',
    height: 300,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});

export default UserStatisticsScreen;


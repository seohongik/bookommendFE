import React, { useState, useEffect, useCallback } from 'react';
import { Text, StyleSheet, RefreshControl } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import axios from 'axios';


const TimelineScreen = ({ selectedDate }) => {
  const [timelineList, setTimelineList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const url = Platform.OS === 'android' ?
                'http://10.0.2.2:8080' : 'http://localhost:8080';

  const [createdAt,setCreatedAt] = useState([]);              

  const fetchTimeline = useCallback(() => {
    setRefreshing(true);

    axios.get(url+'/r1/timeline', {
      params: {
        userId: 1,
        date: selectedDate
      }
    }).then((response) => {
      const responseData = response.data;
      if (responseData.length > 0) {
        const timeline = responseData.map((item, index) => ({
          time: item.time + " 동안"+"\r\n",
          value: index,
          title: item.title + "\r\n" + item.author,
          description: (
            item.rating + "\r\n" +
            item.percent  + "\r\n" +
            item.fromPage + '  => ' + item.toPage + "\r\n" +
            item.comment + "\r\n" + item.opinion
          )
        }));

        const getTime = responseData.map((item, index) => ({
            createdAt:item.createdAt
        }));
        setCreatedAt(getTime);
        console.log(createdAt)
        
        setTimelineList(timeline);

        
      } else {
        setTimelineList([]); // 데이터 없을 경우 초기화
      }
    }).catch((error) => {
      console.error('Failed to fetch timeline:', error);
    }).finally(() => {
      setRefreshing(false);
    });
  }, [selectedDate]);

  useEffect(() => {
    fetchTimeline();
  }, [selectedDate]);

  return (
    <>
    <Timeline
      circleSize={20}
      separator={true}
      circleColor='rgb(45,156,219)'
      lineColor='rgb(45,156,219)'
      lineWidth={3}
      data={timelineList}
      descriptionStyle={styles.descriptionStyle}
      timeContainerStyle={styles.timeContainerStyle}
      timeStyle={styles.timeStyle}
      circleStyle={styles.circleStyle}
      titleStyle={styles.titleStyle}
      // ✅ pull to refresh 적용
      flatListProps={{
        refreshControl: (
          <RefreshControl refreshing={refreshing} onRefresh={fetchTimeline} />
        ),
        keyExtractor: (item, index) => index.toString()
      }}
    />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fe994a',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  descriptionStyle: {
    color: 'skyblue',
    backgroundColor:'black'
  },
  timeContainerStyle: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 90,
    borderRadius: 30,
  },
  timeStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  titleStyle: {
    color: 'black',
    backgroundColor:'skyblue',
    fontSize: 15,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 20,
  },
});

export default TimelineScreen;
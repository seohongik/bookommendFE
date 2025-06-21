import React, { useState, useEffect, useCallback } from 'react';
import { Text, StyleSheet, RefreshControl, ScrollView, TouchableOpacity,View } from 'react-native';
//import { View } from '@ant-design/react-native';
import { BarChart, LineChart, PieChart, PopulationPyramid, RadarChart } from "react-native-gifted-charts";
import AsyncStorage from '@react-native-async-storage/async-storage';
const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }]

const UserStatistics = ({ selectedDate }) => {

  return (
    <>
      <ScrollView>
        <View style={styles.container}>

          <View style={styles.item}>
            <BarChart data={data} style={styles.item} />
          </View>

          <View style={styles.item}>
            <LineChart data={data} style={styles.item} />
          </View>

          <View style={styles.item}>
            <PieChart data={data} donut style={styles.item} />
          </View>

          <View style={styles.item}>
            <BarChart data={data} vertical style={styles.item} />
          </View>

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

export default UserStatistics;


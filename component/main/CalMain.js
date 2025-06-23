import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const generateDates = (year, month) => {
  const dates = [];
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  // 앞쪽 빈 칸
  for (let i = 0; i < firstDay; i++) {
    dates.push(null);
  }

  // 날짜 채우기
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(day);
  }

  return dates;
};

const isToday = (year, month, day) => {
  const today = new Date();
  return (
    day &&
    year === today.getFullYear() &&
    month === today.getMonth() + 1 &&
    day === today.getDate()
  );
};

const isSelected = (selectedDate, year, month, day) => {
  return (
    selectedDate &&
    selectedDate.year === year &&
    selectedDate.month === month &&
    selectedDate.day === day
  );
};

const CalendarMain = ({ onDateSelect }) => {
  
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
    });
  // 오늘 날짜로 디폴트 선택
 const selectDateFunc = (item) =>{ 
   setSelectedDate({year:item.year , month:item.month , day:item.day })
   onDateSelect(item.year+"-"+item.month+"-"+item.day);
}

  useEffect(()=>{
    onDateSelect(new Date().getFullYear()+"-"+(new Date().getMonth() + 1)+"-"+new Date().getDate());
  },[])

  const dates = generateDates(currentYear, currentMonth);

  const handlePrev = () => {
    if (currentMonth === 1) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 12) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrev}>
          <Text style={styles.navBtn}>{'‹'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{currentYear}년 {currentMonth}월</Text>
        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.navBtn}>{'›'}</Text>
        </TouchableOpacity>
      </View>

      {/* 요일 */}
      <View style={styles.calendar}>
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <Text key={index} style={styles.weekday}>{day}</Text>
        ))}

        {/* 날짜들 */}
        {dates.map((date, index) => {
          const isTodayFlag = isToday(currentYear, currentMonth, date);
          const isSelectedFlag = isSelected(selectedDate, currentYear, currentMonth, date);

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateCell,
                isTodayFlag && styles.todayHighlight,
                isSelectedFlag && styles.selectedHighlight,
              ]}
              onPress={() => date && selectDateFunc({ year: currentYear, month: currentMonth, day: date })}
              disabled={!date}
            >
              {date ? (
                <Text style={styles.dateLabel}>{date}</Text>
              ) : (
                <View style={styles.emptyCell} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 선택된 날짜 출력 (선택했을 때만)
      {selectedDate && (
        <Text >
          선택한 날짜: {selectedDate.year}-{selectedDate.month}-{selectedDate.day}
        </Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flex: 1,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  navBtn: {
    fontSize: 28,
    color: '#333',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  weekday: {
    width: '14.28%',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateCell: {
    width: '14.28%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    paddingVertical: 6,
  },
  todayHighlight: {
    backgroundColor: '#ffeaa7',
    borderRadius: 8,
  },
  selectedHighlight: {
    backgroundColor: '#74b9ff',
    borderRadius: 8,
  },
  dateLabel: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 4,
    width: '95%',
    fontSize: 13,
    textAlign: 'center',
  },
  emptyCell: {
    height: 40,
  },
  selectedDateText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});

export default CalendarMain;

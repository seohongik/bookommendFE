import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView
} from 'react-native';

const FindAccountScreen = () => {
  const [mode, setMode] = useState('findId'); // 'findId' or 'findPassword'

  // 공통 입력값
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleFind = () => {
    if (mode === 'findId') {
      console.log('아이디 찾기 요청:', { fullName, phoneNumber });
    } else {
      console.log('비밀번호 찾기 요청:', { email, phoneNumber });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>아이디 / 비밀번호 찾기</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, mode === 'findId' && styles.activeTab]}
          onPress={() => setMode('findId')}
        >
          <Text style={[styles.tabText, mode === 'findId' && styles.activeTabText]}>
            아이디 찾기
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, mode === 'findPassword' && styles.activeTab]}
          onPress={() => setMode('findPassword')}
        >
          <Text style={[styles.tabText, mode === 'findPassword' && styles.activeTabText]}>
            비밀번호 찾기
          </Text>
        </TouchableOpacity>
      </View>

      {mode === 'findId' ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="이름"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="전화번호"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="이메일 (아이디)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="전화번호"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleFind}>
        <Text style={styles.buttonText}>{mode === 'findId' ? '아이디 찾기' : '비밀번호 찾기'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FindAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  tab: {
    flex: 1,
    padding: 12,
    backgroundColor: '#eee',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4
  },
  activeTab: {
    backgroundColor: '#4a90e2'
  },
  tabText: {
    color: '#555'
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 실제 로그인 처리 로직은 여기에 작성
    console.log('로그인 시도:', { email, password });

    axios.get(url + '/r1/login?email=' + email + "&password=" + password, {

    }).then((response) => {

      savaSession(response.data)

      Alert.alert("login 완료")
      navigation?.navigate?.('MainScreen')

    }).catch((error) => {
      console.log(error.response)
      Alert.alert(error.response.data);

    })
  };

  const savaSession = async (item) => {
    try {
      await AsyncStorage.setItem('session', JSON.stringify(item));
  
    } catch (error) {
    }
  }


    const url = Platform.OS === 'android' ?
      'http://10.0.2.2:8080' : 'http://localhost:8080';

    return (
      <View style={styles.container}>
        <Text style={styles.title}>로그인</Text>

        <TextInput
          style={styles.input}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpLink}
          onPress={() => navigation?.navigate?.('SignUp')} // React Navigation 사용 시
        >
          <Text style={styles.signUpText}>계정이 없으신가요? 회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FindAccount')}>
          <Text style={{ color: '#4a90e2', textAlign: 'center' }}>아이디 / 비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      justifyContent: 'center'
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center'
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 12,
      borderRadius: 8,
      marginBottom: 16
    },
    loginButton: {
      backgroundColor: '#4a90e2',
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 16
    },
    loginText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
    },
    signUpLink: {
      alignItems: 'center'
    },
    signUpText: {
      color: '#888',
      fontSize: 14
    }
  });

  export default LoginScreen;
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,
  Alert
} from 'react-native';
import axios from 'axios';
import { Button } from 'react-native-paper';

const FindAccountScreen = () => {
  const [mode, setMode] = useState('findId'); // 'findId' or 'findPassword'
  const [authNumber, setAuthNumber] = useState(0);
  const [showPasswordModifyFlag, setShowPasswordModifyFlag] = useState(false);
  const [flag, setFlag] = useState(false);
  // 공통 입력값
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUpId, setSignUpId] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const url = Platform.OS === 'android' ?
    'http://10.0.2.2:8080' : 'http://localhost:8080';



  const handleFind = () => {

    if (mode === 'findId') {

      axios.get(url + '/r1/isUserId?signUpId=' + signUpId + "&phoneNumber=" + phoneNumber, {

      }).then((response) => {
        Alert.alert(response.data.email + " 입니다");
      }).catch((error) => {
        Alert.alert(error.response.data);
      });

    } else {
      
        axios.get(url + '/r1/isUserPw?email=' + email + "&phoneNumber=" + phoneNumber, {

        }).then((response) => {
          Alert.alert(JSON.stringify(response.data.message))
          setFlag(response.data.flag)

        }).catch((error) => {
          Alert.alert(error.response.data);
        });
    }

  };

  const authMatching =()=>{
    
    axios.get(url + '/r1/verify?authNumber=' + authNumber + "&phoneNumber=" + phoneNumber +"&email="+email, {

        }).then((response) => {
          setShowPasswordModifyFlag(true);

        }).catch((error) => {
          Alert.alert(error.response.data);
        });
  }

  const modifyPassword = () => {

    if(password==confirmPassword){

      axios.put(url + '/u1/password/verified', {
        'email': email,
        'password': password,
        'confirmPassword': confirmPassword,
        'phoneNumber': phoneNumber, 
        'authNumber':authNumber,

      }).then((response) => {
        console.log("데이터 변경 완료")

      }).catch((error) => {
      })
    }else{
      Alert.alert("입력값을 확인해주세요");
    }
  }

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
            placeholder="닉네임"
            value={signUpId}
            onChangeText={(text) => setSignUpId(text)}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="전화번호"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="phone-pad"
          />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="이메일 (아이디)"
            value={email}
            onChangeText={(text)=>setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="전화번호"
            value={phoneNumber}
            onChangeText={(text)=>setPhoneNumber(text)}
            keyboardType="phone-pad"
          />
          {flag &&
          <>
            <TextInput
              style={styles.input}
              placeholder="인증번호"
              value={authNumber}
              onChangeText={(text)=>{setAuthNumber(text)}}
              keyboardType="numberic"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.buttonVerify} onPress={authMatching}>
              <Text style={styles.buttonTextVerify}>인증 확인</Text>
            </TouchableOpacity>
            </>}
          {showPasswordModifyFlag &&
            <>
              <TextInput style={styles.input} placeholder="비밀번호 입력" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" />
              <TextInput style={styles.input} placeholder="비밀번호 확인 입력" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry autoCapitalize="none" />
            </>
          }
        </>
      )}

      {showPasswordModifyFlag ? (
        <TouchableOpacity style={styles.button} onPress={modifyPassword}>
          <Text style={styles.buttonText}>비밀번호 변경</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleFind}>
          <Text style={styles.buttonText}>{mode === 'findId' ? '아이디 찾기' : '비밀번호 찾기'}</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView >
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
  },
  buttonVerify: {
    width:100,
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 6,
  },
  buttonTextVerify: {
    color: '#fff',
    fontWeight: 'bold',
  },

});
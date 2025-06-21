import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform,
  Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';

const SignUpScreen = () => {
  const [signUpId, setSignUpId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [gender, setGender] = useState('male'); // male or female
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDateOfBirth(selectedDate);
  };

  const url = Platform.OS === 'android' ?
    'http://10.0.2.2:8080' : 'http://localhost:8080';

  const handleSubmit = () => {
    // 실제 제출 로직
    /*console.log({
      signUpId, username, email, password, confirmPassword,
      fullName, dateOfBirth, gender, phoneNumber, address, detailAddress
    });*/

    axios.post(url + '/c1/user', {
      'signUpId': signUpId,
      'username': username,
      'email': email,
      'password': password,
      'confirmPassword' :confirmPassword,
      'fullName':fullName,
      'dateOfBirth':dateOfBirth,
      'gender':gender,
      'phoneNumber':phoneNumber,

    }).then((response) => {
      console.log("response",response)
    }).catch((error)=>{
      
      console.log(error.response)
      if(error.response.status==400){
        Alert.alert( error.response.data.field+ " : "+error.response.data.message);
      }
    })


  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <TextInput style={styles.input} placeholder="ID" value={signUpId} onChangeText={setSignUpId} />
      <TextInput style={styles.input} placeholder="사용자 이름" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="이메일" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="비밀번호" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="비밀번호 확인" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>생년월일: {dateOfBirth.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <View style={styles.genderContainer}>
        <Text>성별:</Text>
        <RadioButton.Group onValueChange={setGender} value={gender}>
          <View style={styles.radioRow}>
            <RadioButton value="male" />
            <Text>남자</Text>
            <RadioButton value="female" />
            <Text>여자</Text>
          </View>
        </RadioButton.Group>
      </View>

      <TextInput style={styles.input} placeholder="전화번호" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
      {/*<TextInput style={styles.input} placeholder="주소" value={address} onChangeText={setAddress} />
      <TextInput style={styles.input} placeholder="상세주소" value={detailAddress} onChangeText={setDetailAddress} />*/}

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>가입하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 40
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12
  },
  genderContainer: {
    marginBottom: 12
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  submitButton: {
    backgroundColor: '#4a90e2',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default SignUpScreen;
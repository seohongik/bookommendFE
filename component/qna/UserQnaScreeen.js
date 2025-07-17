import React, { useState, useEffect, useMemo } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Modal,
    Button,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    TouchableHighlight,
    Alert,
    FlatList,
    Linking,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios, { all } from 'axios';
const url = Platform.OS === 'android' ?
    'http://10.0.2.2:8080' : 'http://localhost:8080';

const UserBookScreen = () => {

    const [data, setData] = useState([]);

    const [title, setTitle] = useState();
    const [body, setBody] = useState();

    const [userId, setUserId] = useState();

    useEffect(() => {
        getKey();
    }, []);

    const getKey = async () => {
        try {
            const value = await AsyncStorage.getItem('session');
            if (value !== null) {
                let valueJson = JSON.parse(value);
                setUserId(valueJson.id);

            }
        } catch (e) {
            console.log(e.message);
        }
    };

    const fetchData =  async () => {
        try {
            const response = await axios.get(url + '/r1/qna', {
                params: {
                    'title': title,
                    'body': body,
                }

            })
            const entries = Object.entries(response.data); // [[url, text], ...]
            setData(entries);
        } catch (err) {
            console.error(err);
        }
    };

    const renderItem = ({ item }) => {
        const [url, text] = item;

        return (
            <>
            <View style={styles.txt}>
                <Text style={styles.url} onPress={() => Linking.openURL(url)}>
                    {url}
                </Text>
                <Text style={styles.txt}>
                    {text.length > 100 ? text.slice(0, 100) + '...' : text}
                </Text>
            </View>
            <View><Text>==========================================</Text></View>
            </>
        );
    };



    return (
        <>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ width: '100%' }} onPress={fetchData}>
                            {<Text style={{ textAlign: 'center', color: 'skyblue', fontSize: 20 }} >Search QnA!</Text>}
                        </TouchableOpacity>
                    </View>
                    <Text>  핵심어 : {title} && 질의 내용 : {body}으로 검색. </Text>

                    <View style={styles.container}>
                        <View>
                            <Text style={{ textAlign: 'left', marginBottom: 20 }}>책 제목</Text>
                            <TextInput style={styles.input} onChangeText={(text) => setTitle(text)} value={title} />
                        </View>
                        <View>
                            <Text style={{ textAlign: 'left', marginBottom: 20 }}>검색하고 싶은 내용</Text>
                            <TextInput style={styles.input} onChangeText={(text) => setBody(text)} value={body} />
                        </View>

                        <FlatList
                            data={data}
                            keyExtractor={([url]) => url}
                            renderItem={renderItem}
                            contentContainerStyle={styles.innerContainer}
                        />
                    </View>
                </View>
        </>
    );
};


const styles = StyleSheet.create({

    container: {
        width:300,
        height:'100%',
        backgroundColor: '#fff',
        padding: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center'
    },
    txt: {
        paddingTop: 10,
        paddingLeft: 10,
        dateText: {
            paddingLeft: 10,
            fontSize: 15
        }
    },innerContainer: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center'
    },


});



export default UserBookScreen;
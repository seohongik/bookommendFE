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
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios, { all } from 'axios';
const url = Platform.OS === 'android' ?
    'http://10.0.2.2:8080' : 'http://localhost:8080';


const data = [
    { 'label': '제목', 'value': 'title' },
    { 'label': '저자', 'value': 'author' },
]

const UserBookScreen = () => {

    const radioButtons = useMemo(() => ([
        {
            id: 1,
            label: '찾음',
            value: 1,
            //size: 14
            size: 14
        },
        {
            id: 2,
            label: '못찾음',
            value: 2,
            //size: 14
            size: 14
        },
        {
            id: 0,
            label: '초기화',
            value: 3,
            //size: 14
            size: 14
        }
    ]), []);

    


    const [query, setQuery] = useState();
    const [display, setDisplay] = useState(100)
    const [start, setStart] = useState(1);
    const [isFocus, setIsFocus] = useState();
    const [isFind, setIsFind] = useState(1);
    const [bookItms, setBookItems] = useState();
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
    



    const startChange = useMemo(() => {
        console.log('Calculating squaredCount');
        return display + start;
    }, [display], [start]);



    const handlePressSearchBook = () => {
        if (isFind == 2) {
            setStart(startChange + start)
        } else if (isFind == 1) {
            setStart(1);
        }
        axios.get(url + '/r1/searchBookInfo', {
            params: {
                'query': query,
                'start': start,
                'display': display,
            }

        })
            .then(function (response) {

                const bookItms = response.data.map((item) => {

                    let author = item.author ?? '';
                    let publisher = item.publisher ?? '';
                    let publishedDate = item.publishedDate ?? '';
                    let bookIsbn = item.bookIsbn ?? '';
                    let coverImageUrl = (item.coverImageUrl)

                    const saveItem = () => {

                        Alert.alert(
                            '저장',
                            '정말로 저장하시겠습니까?',
                            [
                                { text: '취소', onPress: () => { }, style: 'cencel' },
                                {
                                    text: '저장',
                                    onPress: () => {
                                        axios.post(url + '/c1/userBook', {
                                            'bookIsbn': bookIsbn,
                                            'userId': userId
                                        })
                                    },
                                    style: 'default',
                                },
                            ],
                            {
                                cancelable: true,
                                onDismiss: () => { },
                            },
                        );
                    };
                    return (
                        <View key={item.id} >
                            <TouchableOpacity onPress={() => saveItem()} style={{ flex: 1, alignItems: 'center' }}>
                                <Image
                                    style={{ width: 200, height: 300 }}
                                    source={{ uri: coverImageUrl }}
                                />
                            </TouchableOpacity >
                            <View style={{ flex: 1, alignItems: 'center' }} >
                                <Text>저자 :{author}</Text>
                                <Text>출판사 :{publisher}</Text>
                                <Text>출판일 :{publishedDate}</Text>
                                <Text>isbn :{bookIsbn}</Text>
                            </View>
                            <View>
                                <Text style={{ textAlign: 'center', marginBottom: 30, color: 'skyblue' }}>==============================</Text>
                            </View>
                        </View>

                    );

                });
                setBookItems(bookItms);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // always executed
            });


    };

    return (
        <>
            <KeyboardAwareScrollView style={styles.container}>
                <View style={{ flex: 1, alignItems: 'center' }}>


                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ width: '100%' }} onPress={handlePressSearchBook}>
                            {<Text style={{ textAlign: 'center', color: 'skyblue', fontSize: 20 }} >Search Book!</Text>}
                        </TouchableOpacity>
                    </View>
                    <Text>{start} 페이지 부터 검색. </Text>

                    <View style={styles.container}>

                        <View>
                            <Text style={{ textAlign: 'left', marginBottom: 20 }}>제목</Text>
                            <TextInput style={styles.input} onChangeText={(text) => setQuery(text)} value={query} />
                        </View>
                        <Text style={{ textAlign: 'left', marginBottom: 10 }} />
                        <RadioGroup
                            radioButtons={radioButtons}
                            onPress={setIsFind}
                            selectedId={isFind}
                            layout='row'
                        />
                        <View>
                            {bookItms}
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </>
    );
};


const styles = StyleSheet.create({

    container: {
        //width:300,
        backgroundColor: '#fff',
        padding: 16
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
    }
});



export default UserBookScreen;
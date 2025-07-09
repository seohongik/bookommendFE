import React, { useState, useEffect, useMemo, useId } from 'react';
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


const GenreBaseedRecommend = ({ userId }) => {

    const [recommend, setRecommend] = useState([]);

    useEffect(() => {

        axios.get(url + "/recommend/r1/genre-based-recommend/" + userId)
            .then((response) => {
                const recommendBook = response.data.map((item, index) => ({
                    label: item.title,
                    id: item.id,
                    image: item.image,
                    title: item.title,
                    author: item.author,
                    publisher: item.publisher,
                    publishedDate: item.publishedDate,
                    description: item.description,
                    bookIsbn: item.bookIsbn,
                    discount: item.discount,
                    category: item.bookCategory,
                    
                }));

                setRecommend(recommendBook);
            })


    }, []);

    console.log(recommend)

    return (
        <>
            <KeyboardAwareScrollView style={styles.container}>
                
               <View >
               {recommend.map((item) => (
                    <View key={item.id} style={styles.innerContainer}>
                        <Image
                            style={{ width: 200, height: 300 }}
                            source={{ uri: item.image }}
                        />
                        <Text >장르 : {item.category}</Text>
                        <Text >타이틀 : {item.title}</Text>
                        <Text >작가  : {item.author}</Text>
                        <Text >출판사 :{item.publisher}</Text>
                        <Text >가격  :{item.discount}</Text>
                        <Text >설명  : {item.description}</Text>
                    </View>
                ))}
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
    innerContainer: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center'
    },
});



export default GenreBaseedRecommend;
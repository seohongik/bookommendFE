import React, { useState, useEffect, useMemo } from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GenreBaseedRecommend from './GenreBasedRecommend';
import { ScrollView } from 'react-native-gesture-handler';


const UserRecommendScreeen = () => {

    const[userId, setUserId] = useState();

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

    return (
        <>
            <KeyboardAwareScrollView style={styles.container}>
            {userId ? (
                <>
                   
                    <Text>장르기반 추천</Text>
                    <GenreBaseedRecommend userId={userId} />
                
                </>
            ) : (
                <Text>로딩 중...</Text>
            )}
               
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



export default UserRecommendScreeen;
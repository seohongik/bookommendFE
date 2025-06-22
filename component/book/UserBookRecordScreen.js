import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, TouchableOpacity, Image, TextInput, StyleSheet,
    Alert, Button, Animated, Easing
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-element-dropdown';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Rating } from 'react-native-ratings';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDropdown from './CustomDropdown';
import { BlurView } from '@react-native-community/blur';
import Svg, { Path, Circle } from 'react-native-svg';

const UserBookRecordScreen = ({ selectedDate }) => {
    const [bookList, setBookList] = useState([]);
    const [pagesData, setPagesData] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [showPage, setShowPage] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [showOpinion, setShowOpinion] = useState(false);
    const [comment, setComment] = useState(null);
    const [opinion, setOpinion] = useState(null);
    const [allPage, setAllPage] = useState(0);
    const [rating, setRating] = useState(3);
    const [fromPage, setFromPage] = useState(0);
    const [userBookId, setUserBookId] = useState(1);
    const [showSaveBtn, setShowSaveBtn] = useState(false);
    const [bookIsbn, setBookIsbn] = useState();
    const [pageCount, setPageCount] = useState(0);
    const [toPage, setToPage] = useState(0);
    const [readDate, setReadDate] = useState();

    const [userId, setUserId] = useState();

    const [showTimer, setShowTimer] = useState(false);
    const increment = useRef(null);
    const url = Platform.OS === 'android' ?
        'http://10.0.2.2:8080' : 'http://localhost:8080';


    const resetStates = () => {

        setSelectedBook(null);
        setTimer(0);
        setIsActive(false);
        setShowPage(false);
        setShowComment(false);
        setShowOpinion(false);
        setOpinion(null);
        setToPage(0);
        setAllPage('');
        setRating(3);
        setFromPage(0);
        setPagesData([]);
        setShowSaveBtn(false);
    };



    const refreshData = async (userId) => {
        resetStates();

        try {

            console.log(userId)
            setUserId(userId);

            const savedBookIsbn = await AsyncStorage.getItem('selectedBookIsbn');
            const response = await axios.get(url + '/r1/userBooks/' + userId);
            const books = response.data.map((item, index) => ({
                label: item.title,
                value: index,
                image: item.coverImageUrl,
                title: item.title,
                author: item.author,
                publisher: item.publisher,
                publishedDate: item.publishedDate,
                description: item.description,
                bookIsbn: item.bookIsbn,
                pageCount: item.pageCount,
                fromPage: item.fromPage,
                userBookId: item.userBookId
            }));
            setBookList(books);

            // 저장된 책 복원
            if (savedBookIsbn) {
                const selected = books.find(b => b.bookIsbn === savedBookIsbn);
                if (selected) {
                    setSelectedBook(selected);
                    setSelectedPage(selected);
                    setFromPage(selected.fromPage);
                    setToPage(selected.pageCount);
                    setUserBookId(selected.userBookId);
                    setBookIsbn(selected.bookIsbn);
                    setPageCount(selected.pageCount);
                    isShowTimer(selected)
                }
                console.log("로딩될때 전체 페이지수", allPage)
            }
        } catch (error) {
            console.error(error);
            Alert.alert("책 목록을 불러오지 못했습니다.");
        }
    };

    useEffect(() => {
        // 셀렉티드 데이터가 미래면 오늘날자로 치환 로직 만들어야함)
        setReadDate(selectedDate)
        getKey();

        return () => {
            clearInterval(increment.current);
        };

    }, [selectedDate]);

    const getKey = async () => {
        try {
            const value = await AsyncStorage.getItem('session');
            if (value !== null) {
                let valueJson = JSON.parse(value);
                setUserId(valueJson.id)
                refreshData(valueJson.id);

            }
        } catch (e) {
            console.log(e.message);
        }
    };


    const formatTime = () => {
        const days = Math.floor(timer / (3600 * 24));
        const hours = Math.floor((timer % (3600 * 24)) / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = timer % 60;

        const getDays = `0${days}`.slice(-2);
        const getHours = `0${hours}`.slice(-2);
        const getMinutes = `0${minutes}`.slice(-2);
        const getSeconds = `0${seconds}`.slice(-2);

        return `${getDays}:${getHours}:${getMinutes}`;
    };

    const setSelectedPage = (item) => {
        const pages = [];
        const start = parseInt(item.fromPage);
        const end = parseInt(item.pageCount);
        for (let i = start; i <= end; i++) {
            pages.push({ label: i.toString(), value: i });
        }
        setPagesData(pages);
        setFromPage(start);
        setToPage(end);
    };

    const updateToPage = () => {

        if (toPage !== 0) {
            Alert.alert("페이지 수가 없어서 저장합니다.");
            axios.put(url + '/u1/userBookPageCount/' + userId + '/' + userBookId, {
                pageCount: toPage,
                fromPage: 0
            }).then(() => {
                refreshData(userId);
            }).catch(error => console.error(error));
        }
    };

    const [blurAnim] = useState(new Animated.Value(0));
    const [showBlur, setShowBlur] = useState(false);
    const animateBlurIn = () => {
        setShowBlur(true);
        blurAnim.setValue(0);
        Animated.timing(blurAnim, {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start();
    };

    const animateBlurOut = () => {
        Animated.timing(blurAnim, {
            toValue: 0,
            duration: 400,
            easing: Easing.in(Easing.circle),
            useNativeDriver: true,
        }).start(() => setShowBlur(false)); // 끝나면 제거
    };
    const handleStart = () => {
        const nextState = !isActive;
        setIsActive(nextState);

        if (nextState) {
            animateBlurIn(); // ✅ Start 시 블러 시작
            increment.current = setInterval(() => {
                setTimer(t => t + 1);
            }, 10);
            setShowPage(false);
        } else {
            animateBlurOut(); // ✅ Stop 시 블러 제거
            clearInterval(increment.current);
            setShowComment(true);
            setShowPage(true);
        }
    };

    const saveRecord = () => {

        if (toPage !== 0) {


            Alert.alert(
                '저장',
                '정말로 저장하시겠습니까?',
                [
                    { text: '취소', onPress: () => { }, style: 'cencel' },
                    {
                        text: '저장',
                        onPress: () => {
                            axios.post(url + '/c1/userBookRecordAndReview', {
                                'userId': userId,
                                'userBookId': selectedBook?.userBookId,
                                'rating': rating,
                                'record': {
                                    'bookIsbn': selectedBook?.bookIsbn,
                                    'date': selectedDate,
                                    'fromPage': fromPage,
                                    'toPage': toPage,
                                    'readAmountCount': (toPage - fromPage),
                                    'percent': ((fromPage / toPage) * 100),
                                    'opinion': opinion,
                                    'comment': comment,
                                    'time': formatTime()
                                },

                            }).then(() => {
                                refreshData(userId);

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
        }
    };

    const isShowTimer = (item) => {
        if (item.pageCount == 0) {
            setShowTimer(false);
        } else {
            setShowTimer(true);
        }
    }

    return (
        <KeyboardAwareScrollView style={styles.container}>

            <View >
                <Dropdown
                    style={styles.dropdown}
                    data={bookList}
                    labelField="label"
                    valueField="value"
                    placeholder="책 선택"
                    renderItem={(item) => (
                        <View style={styles.dropdownItem}>
                            <Image source={{ uri: item.image }} style={styles.thumbnail} />
                            <Text>{item.label}</Text>
                        </View>
                    )}
                    onChange={(item) => {
                        setSelectedBook(item);
                        setSelectedPage(item);
                        setUserBookId(item.userBookId)
                        isShowTimer(item);
                        AsyncStorage.setItem('selectedBookIsbn', item.bookIsbn).catch(console.error);
                    }}
                    value={selectedBook?.value}
                />

            </View>

            <Text>{selectedDate}</Text>

            <View style={{ flexDirection: 'row', width: '50%' }}>
                {selectedBook && (
                    <View style={styles.bookInfo}>
                        <Image source={{ uri: selectedBook.image }} style={styles.bookImage} />
                        <Text style={{ fontSize: 10 }} numberOfLines={2}>{selectedBook.title}</Text>
                    </View>
                )}
                {selectedBook && (
                    <AnimatedCircularProgress
                        size={150}
                        width={10}
                        fill={(fromPage / (toPage == 0 ? 1 : toPage)) * 100}
                        tintColor="skyblue"
                        backgroundColor="#3d5875"
                        style={{ alignSelf: 'center', marginVertical: 20 }}
                    >
                        {fill => <Text>{fill.toFixed(2)}%</Text>}
                    </AnimatedCircularProgress>
                )}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                {showPage &&
                    /*<Dropdown
                        style={styles.dropdownPage}
                        data={pagesData}
                        labelField="label"
                        valueField="value"
                        value={Number(fromPage)}
                        onChange={item => {
                            Alert.alert("한번 저장하면 못 되돌립니다.")
                            setFromPage(Number(item.value))}}
                        placeholder="시작 페이지"
                        search
                        maxHeight={300}
                        keyboardType="numeric"
                        mode="modal"
                    />*/


                    <CustomDropdown
                        style={styles.dropdownPage}
                        data={pagesData}
                        selectedValue={fromPage}
                        onSelect={item => {
                            Alert.alert("한번 저장하면 못 되돌립니다.")
                            setFromPage(Number(item.value))
                        }}
                        placeholder="시작페이지 선택하세요"
                    />}

                <TextInput
                    style={styles.dropdownPage}
                    data={pagesData}
                    labelField="label"
                    valueField="value"
                    value={toPage}
                    onChangeText={item => {
                        setToPage(item);
                    }}
                    onSubmitEditing={updateToPage}
                    placeholder={toPage === 0 ? "전체페이지지정" : toPage + ''}
                    keyboardType="numeric"
                    readOnly={selectedBook?.pageCount == 0 ? false : true}

                />
            </View>
            {showBlur && (
                <Animated.View
                    pointerEvents="none"
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            transform: [
                                {
                                    scale: blurAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.95, 1.05],
                                    }),
                                },
                            ],
                            opacity: blurAnim,
                            zIndex: 5,
                        },
                    ]}
                >
                    <BlurView
                        style={StyleSheet.absoluteFill}
                        blurType="light"     // ✅ tint → blurType 으로 변경
                        blurAmount={15}      // 블러 강도 조절
                        reducedTransparencyFallbackColor="white"
                    />
                </Animated.View>
            )}

            {showTimer &&
                <View style={styles.timerContainer}>

                    <TouchableOpacity onPress={handleStart}>
                        <Text style={styles.timerToggle}>{!showSaveBtn ?
                            <Text>{!isActive ? 'Reading Start' : 'Reading Stop'}</Text> :
                            <TouchableOpacity >
                                {showSaveBtn &&
                                    <View style={styles.saveButton}>
                                        <Button style={styles.buttonText}
                                            title="save me"
                                            onPress={saveRecord}
                                        />
                                    </View>}
                            </TouchableOpacity>}
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.timerText}>{formatTime()}</Text>
                </View>}

            {showComment && (
                <TextInput
                    style={styles.input}
                    maxLength={50}
                    placeholder="한줄평을 남겨주세요"
                    onChange={() => setShowOpinion(true)}
                    onChangeText={(text) => setComment(text)}
                    value={comment}
                    returnKeyType="done"
                />
            )}

            {showOpinion && (
                <TextInput
                    style={styles.textArea}
                    multiline
                    numberOfLines={4}
                    maxLength={100}
                    placeholder="자유롭게 의견을 적어주세요"
                    value={opinion}
                    onChangeText={(text) => setOpinion(text)}
                    onChange={() => {
                        setShowSaveBtn(true);
                    }}
                />
            )}

            {selectedBook && (
                <View style={styles.bookInfo}>
                    <Text style={[styles.bookText, styles.bookText.author]}>{selectedBook.author}</Text>
                    <Text style={[styles.bookText, styles.bookText.description]} numberOfLines={1} ellipsizeMode="tail">{selectedBook.description}</Text>
                </View>
            )}
            <View>
                <Rating
                    type="star"
                    ratingCount={5}
                    imageSize={30}
                    showRating
                    onFinishRating={setRating}
                    onChangeText={rating}
                />
            </View>

        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 10,
        marginBottom: 40
    },
    saveButton: {
        backgroundColor: 'wheat', // 버튼 배경색상 추가
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20,
        marginLeft: '30%',
        marginRight: '30%'
    },
    buttonText: {
        color: 'skyblue', // 버튼 글자색상 추가
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,
        marginVertical: 10
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,

    },
    dropdownPage: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 10,
        width: 100,
        margin: 10,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        zIndex: 1, // BlurView보다 뒤에 렌더링되게
    },
    thumbnail: {
        width: 30,
        height: 40,
        marginRight: 10,

    },
    bookInfo: {
        margin: 13,
        alignItems: 'center',
        marginBottom: 20,

    },
    bookImage: {
        width: 100,
        height: 150,
        marginBottom: 10,
        //zIndex: 1, // BlurView보다 뒤에 렌더링되게
    },
    bookText: {
        fontSize: 16,
        marginVertical: 2,
        author: {
            color: 'orange'
        },
        description: {
            color: 'brown'
        }

    },
    timerToggle: {
        fontSize: 24,
        color: 'green',
        textAlign: 'center'
    },
    timerText: {
        fontSize: 34,
        color: 'skyblue',
        textAlign: 'center',
        //marginVertical: 10

    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 10,
        marginVertical: 6,
        //zIndex: 1, // BlurView보다 뒤에 렌더링되게
    },
    textArea: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        textAlignVertical: 'top',
    },
    blurWrapper: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
    }
    , timerContainer: {
        zIndex: 10, // Blur 위에 올리기
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
});

export default UserBookRecordScreen;
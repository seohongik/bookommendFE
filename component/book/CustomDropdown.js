import React, { useState, useRef, useEffect } from 'react';
import {
    Modal,
    FlatList,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
const ITEM_HEIGHT = 50;
const CustomDropdown = ({ data, selectedValue, onSelect, placeholder }) => {
    const [visible, setVisible] = useState(false);
    const flatListRef = useRef(null);

    useEffect(() => {
        if (visible && flatListRef.current && selectedValue != null) {
            const index = data.findIndex(item => item.value === selectedValue);
            if (index >= 0) {
                setTimeout(() => {
                    flatListRef.current.scrollToIndex({ index, animated: true });
                }, 100); // 약간의 딜레이를 줘야 작동 안정적
            }
        }
    }, [visible]);


    

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => {
                onSelect(item);
                setVisible(false);
            }}
        >
            <Text style={styles.itemText}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <>
            <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setVisible(true)}
            >
                <Text>{data.find(d => d.value === selectedValue)?.label || placeholder}</Text>
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent
                animationType="slide"
                onRequestClose={() => setVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setVisible(false)}
                    activeOpacity={1}
                >
                    <View style={styles.modalContent}>
                        <FlatList
                            ref={flatListRef}
                            data={data}
                            keyExtractor={(item) => item.value.toString()}
                            renderItem={renderItem}
                            initialNumToRender={10}
                            getItemLayout={(data, index) => ({
                                length: ITEM_HEIGHT,
                                offset: ITEM_HEIGHT * index,
                                index,
                            })}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        backgroundColor: '#fff',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        maxHeight: 300,
    },
    item: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
    },
    itemText: {
        fontSize: 16,
    },
});

export default CustomDropdown;
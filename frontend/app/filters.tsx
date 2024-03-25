/*
    Screen with filters lists
*/

import { View, Text, StyleSheet, Pressable, Button } from "react-native";
import Colors from "../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react";
import SeparatorComponent from "../components/Separator";
import { Ionicons } from "@expo/vector-icons";
import Paragraph from "../components/Paragraph";
import { useAppSelector, useAppDispatch } from "../store/hooks";

import {
    storeMarkedCompanies,
    storeMarkedDeparments,
    filterCompanies,
    filterDepartments,
    clearFilter,
} from '../store/contactsSlice';

import { useNavigation } from "expo-router";

const Filters = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    const allContacts = useAppSelector((state) => state.contacts.allContacts);
    const allDepartments = useAppSelector((state) => state.contacts.allDepartments);
    const allCompanies = useAppSelector((state) => state.contacts.allCompanies);
    const markedDepartments = useAppSelector((state) => state.contacts.markedDepartments);
    const markedCompanies = useAppSelector((state) => state.contacts.markedCompanies);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => {
                    navigation.goBack();
                }} title="Готово" />
            ),
            headerLeft: () => (
                <Button onPress={() => {
                    dispatch(clearFilter());
                    navigation.goBack();
                }} title="Отмена" />
            ),
        });
    }, [navigation]);

    return (
        <ScrollView style={styles.container}>
            <View style={{ marginBottom: 70 }}>
                <View>
                    <Paragraph p="Фильтр по компании" />
                    <View style={styles.block}>
                        {allCompanies.map((item) => (
                            <Pressable key={item.id} onPress={() => {
                                if (!markedCompanies.includes(item.id)) {
                                    dispatch(storeMarkedCompanies([...markedCompanies, item.id]))
                                } else {
                                    dispatch(storeMarkedCompanies(markedCompanies.filter((i) => { return i !== item.id })))
                                }
                                dispatch(filterCompanies());
                            }}>
                                < View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text numberOfLines={1} style={styles.blockTitle}>{item.title}</Text>
                                    {markedCompanies.includes(item.id) &&
                                        <Ionicons name="ios-checkmark" size={24} color={Colors.tint} />
                                    }
                                </View>
                                {
                                    item.id !== allCompanies.length &&
                                    <SeparatorComponent />
                                }
                            </Pressable>
                        ))}
                    </View>
                </View>
                <View>
                    <Paragraph p="Фильтр по отрасли" />
                    <View style={styles.block}>
                        {allDepartments.map((item) => (
                            <Pressable key={item.id} onPress={() => {
                                if (!markedDepartments.includes(item.id)) {
                                    dispatch(storeMarkedDeparments([...markedDepartments, item.id]))
                                } else {
                                    dispatch(storeMarkedDeparments(markedDepartments.filter((i) => { return i !== item.id })))
                                }
                                dispatch(filterDepartments());
                            }}>
                                < View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text numberOfLines={1} style={styles.blockTitle}>{item.title}</Text>
                                    {markedDepartments.includes(item.id) &&
                                        <Ionicons name="ios-checkmark" size={24} color={Colors.tint} />
                                    }
                                </View>
                                {
                                    item.id !== markedDepartments.length &&
                                    <SeparatorComponent />
                                }
                            </Pressable>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Colors.altBg,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    block: {
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
    },
    blockTitle: {
        fontSize: 18,
        maxWidth: 250,
        paddingVertical: 14,
    },
    button: {
        width: '100%',
        paddingVertical: 13,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    buttonTitle: {
        color: Colors.tint,
        fontSize: 18,
        marginBottom: 2,
    },
});

export default Filters;
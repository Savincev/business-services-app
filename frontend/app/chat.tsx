import { useNavigation } from "expo-router";
import MessageInput from "../components/MessageInput"
import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { Button, Text, View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Image } from 'expo-image';
import { useRoute } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const chat = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const dispatch = useAppDispatch();

    const [query, setQuery] = useState();

    const handleInput = (query) => {
        setQuery(query);
        console.log(query);
    };

    const { name, company } = route.params;

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.headerTitle}>
                    <Image style={styles.itemImage} source={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fzultimate.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fdefault-profile.png&f=1&nofb=1&ipt=80ebd8f0a944ca70c7c35d19626e7b18d12ddb312667129d47e8a6039945a91e&ipo=images'} />
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.company}>{company}</Text>
                    </View>
                </View>
            ),
            headerStyle: {
                backgroundColor: Colors.altBg
            }
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <ScrollView style={styles.messages}>
            </ScrollView>
            <KeyboardAvoidingView
                behavior='position'
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
                keyboardVerticalOffset={50}
            >
                <View style={styles.inputContainer}>
                    <Ionicons name="ios-add" size={30} color={Colors.tint} />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#8e8e8e"
                        clearButtonMode='never'
                        autoCorrect={false}
                        value={query}
                        onChangeText={(query) => handleInput(query)}
                    />
                    <Ionicons name="ios-send" size={20} color={Colors.tint} style={{ paddingHorizontal: 4 }} />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    itemImage: {
        width: 35,
        height: 35,
        borderRadius: 30,
    },
    name: {
        fontSize: 18,
    },
    company: {
        color: Colors.inactive
    },

    container: {
        flex: 1,
    },
    messages: {
        flex: 1,

    },
    inputContainer: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: Colors.altBg,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        paddingBottom: 50
    },
    input: {
        flex: 1,
        height: 30,
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 20,
        paddingLeft: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 50,
        color: 'black',
        backgroundColor: '#fff',
    },
})

export default chat;
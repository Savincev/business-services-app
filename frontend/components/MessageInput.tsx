import { KeyboardAvoidingView, Pressable, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const MessageInput = () => {
    const [query, setQuery] = useState();

    const handleInput = (query) => {
        setQuery(query);
        console.log(query);
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Ionicons name="ios-add" size={30} color={Colors.tint} />
            <TextInput
                style={styles.input}
                placeholderTextColor="#8e8e8e"
                clearButtonMode='never'
                autoCorrect={false}
                value={query}
                onChangeText={(query) => handleInput(query)}
            />
            <Ionicons name="ios-send" size={20} color={Colors.tint} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: Colors.altBg,
        padding: 10,
        paddingBottom: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    input: {
        flex: 1,
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
});

export default MessageInput;
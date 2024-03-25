import {
    StyleSheet,
    Text,
    TextInput,
    Pressable,
    Keyboard,
} from 'react-native';

import Colors from '../constants/Colors';

let inputValue: string;

const ContactRequest = () => {

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.container}>
            <Text style={styles.p}>
                Прежде чем предоставить вам контакты,
                мы должны рассмотреть ваш запрос.
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Ваш запрос *'
                placeholderTextColor={Colors.inactive}
                multiline
                onChangeText={newValue => inputValue = newValue.trim()}
            />
            <Pressable
                style={[styles.block, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
                onPress={() => {
                    if (inputValue) console.log(inputValue);
                }}
            >
                <Text style={styles.blockTitle}>Запросить контакт</Text>
            </Pressable>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f6',
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 10,
    },
    p: {
        color: Colors.inactive,
        paddingHorizontal: 10,
    },
    input: {
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        height: 100,
    },
    button: {
        height: 50,
        borderRadius: 10,
        backgroundColor: '#0961d9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    block: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    blockTitle: {
        color: Colors.tint,
        fontSize: 18,
        marginBottom: 2,
    },

});

export default ContactRequest;
/*
    Screen with specific contact
*/

import {
    View,
    Text,
    StyleSheet,
    Pressable,
} from 'react-native';

import { Image } from 'expo-image';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import SeparatorComponent from '../components/Separator';
import Colors from '../constants/Colors';

import { useAppSelector } from '../store/hooks';

const Person = () => {
    const route = useRoute()
    const navigation = useNavigation();

    const allDepartments = useAppSelector((state) => state.contacts.allDepartments);

    interface ContactType {
        name: string;
        company: string;
        department_id: number;
        revenue: number;
        city: string;
    }

    const { name, company, revenue, department_id, city }: ContactType = route.params;

    return (
        <Pressable style={styles.container}>
            <View style={styles.head}>
                <Image style={styles.avatar} source="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fzultimate.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fdefault-profile.png&f=1&nofb=1&ipt=80ebd8f0a944ca70c7c35d19626e7b18d12ddb312667129d47e8a6039945a91e&ipo=images"></Image>
                <Text style={styles.name}>{name}</Text>
            </View>
            <Pressable
                style={[styles.block, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
                onPress={() => {
                    navigation.navigate('contactRequest', {
                        name: route.params.name
                    })
                }}
            >
                <Text style={styles.blockTitle}>Запросить контакт</Text>
                <Entypo name='chevron-right' size={18} color="#a2a2a2" />
            </Pressable>
            <View style={styles.block}>
                <View>
                    <Text style={styles.blockTitle}>Компания</Text>
                    <Text style={styles.blockText}>{company}</Text>
                </View>
                <SeparatorComponent />
                <View>
                    <Text style={styles.blockTitle}>Отрасль</Text>
                    <Text style={styles.blockText}>{allDepartments.find(item => item.id === department_id).title}</Text>
                </View>
                <SeparatorComponent />
                <View>
                    <Text style={styles.blockTitle}>Выручка</Text>
                    <Text style={styles.blockText}>{revenue}</Text>
                </View>
                <SeparatorComponent />
                <View>
                    <Text style={styles.blockTitle}>Город проживания</Text>
                    <Text style={styles.blockText}>{city}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f6',
        paddingVertical: 20,
        paddingHorizontal: 20,
        gap: 10,
    },
    head: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'center',
        gap: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 100,
    },
    name: {
        textAlign: 'center',
        fontSize: 22,
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
        fontSize: 18,
        marginBottom: 4,
    },
    blockText: {
        fontSize: 14,
        color: Colors.inactive,
    },
});

export default Person;

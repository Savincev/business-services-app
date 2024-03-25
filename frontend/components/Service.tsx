import {
    StyleSheet,
    Text,
    View,
    Pressable,
} from 'react-native';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Link, useNavigation } from 'expo-router';
import Colors from '../constants/Colors';

const Service = (props: {
    window: React.ComponentProps<typeof Link>['href'],
    icon: React.ComponentProps<typeof FontAwesome>['name'],
    text: string,
    color: string,
}) => {

    const navigation = useNavigation();
    return (
        <Pressable style={styles.service}
            onPress={() => {
                navigation.navigate(props.window);
            }}
        >
            <View style={styles.left}>
                <View style={[styles.iconContainer]}>
                    <Ionicons name={props.icon} size={26} color={Colors.tint} />
                </View>
                <Text style={styles.blockTitle}>{props.text}</Text>
            </View>
            <Entypo name='chevron-right' size={18} color="#a2a2a2" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    service: {
        display: 'flex',
        width: '100%',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    blockTitle: {
        fontSize: 18,
    },
    blockText: {
        fontSize: 14,
        color: Colors.inactive,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        borderRadius: 4,
    },
    left: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    }
});

export default Service;
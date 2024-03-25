import { Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

type ParagraphProps = {
    p: string
}

const Paragraph = (props: ParagraphProps) => {
    return (
        <Text style={styles.p}>{props.p}</Text>
    );
};

const styles = StyleSheet.create({
    p: {
        color: Colors.inactive,
        padding: 10,
    },
});

export default Paragraph;
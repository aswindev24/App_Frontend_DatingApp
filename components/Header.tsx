import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header() {
    return (
        <SafeAreaView edges={["top"]} style={styles.safe}>
            <View style={styles.header}>
                <Text style={styles.title}>Amora</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        backgroundColor: "#fff",
    },

    header: {
        paddingBottom: 6,
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#eee",
    },

    title: {
        fontSize: 25,
        fontFamily: "MomoSignature",
        color: "#111",
    }
});

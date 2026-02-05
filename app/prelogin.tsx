import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PreLogin() {
    const router = useRouter();

    const continueToLogin = async () => {
        await AsyncStorage.setItem("firstTime", "false");
        router.replace("/login");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Our App 🚀</Text>
            <Text style={styles.desc}>This screen appears only once.</Text>

            <TouchableOpacity style={styles.button} onPress={continueToLogin}>
                <Text style={styles.buttonText}>Proceed to login </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    title: { fontSize: 26, marginBottom: 10 },
    desc: { marginBottom: 20 },
    button: { backgroundColor: "#007AFF", padding: 12, borderRadius: 8 },
    buttonText: { color: "white" },
});

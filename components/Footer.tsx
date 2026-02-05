import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Footer() {
    const router = useRouter();
    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.iconBox} onPress={() => router.push("/")}>
                <Ionicons name="heart" size={26} color="#ff4d6d" />
                <Text style={styles.iconText}>Love</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBox} onPress={() => router.push("/messages")}>
                <Ionicons name="chatbubble" size={26} color="#555" />
                <Text style={styles.iconText}>Messages</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBox} onPress={() => router.push("/profile")}>
                <Ionicons name="person" size={26} color="#555" />
                <Text style={styles.iconText}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        bottom: 25,
        left: 20,
        right: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "white",
        paddingVertical: 14,
        borderRadius: 30,
        elevation: 10,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    iconBox: { alignItems: "center" },
    iconText: { fontSize: 12, marginTop: 3 },
});

import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function ChatScreen() {
    const router = useRouter();
    const { name } = useLocalSearchParams(); // we pass name from previous screen

    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there 👋", fromMe: false },
        { id: 2, text: "Hello!", fromMe: true },
    ]);

    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;

        setMessages([...messages, { id: Date.now(), text: input, fromMe: true }]);
        setInput("");
    };

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>

            {/* 🔝 HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={26} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{name}</Text>
            </View>

            {/* 💬 CHAT AREA */}
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ padding: 15 }}
                renderItem={({ item }) => (
                    <View style={[
                        styles.messageBubble,
                        item.fromMe ? styles.myMessage : styles.otherMessage
                    ]}>
                        <Text style={{ color: item.fromMe ? "#fff" : "#000" }}>
                            {item.text}
                        </Text>
                    </View>
                )}
            />

            {/* ✍ MESSAGE INPUT */}
            <View style={styles.inputContainer}>
                <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Type a message..."
                    style={styles.input}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Ionicons name="send" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 15,
    },

    messageBubble: {
        padding: 10,
        borderRadius: 12,
        marginVertical: 5,
        maxWidth: "70%",
    },

    myMessage: {
        backgroundColor: "#ff4d6d",
        alignSelf: "flex-end",
    },

    otherMessage: {
        backgroundColor: "#f2f2f2",
        alignSelf: "flex-start",
    },

    inputContainer: {
        flexDirection: "row",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#eee",
    },

    input: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        borderRadius: 20,
        paddingHorizontal: 15,
    },

    sendButton: {
        backgroundColor: "#ff4d6d",
        padding: 12,
        borderRadius: 50,
        marginLeft: 10,
    },
});

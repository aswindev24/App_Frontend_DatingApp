import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useEffect } from "react";

export default function ChatScreen() {
    const router = useRouter();
    const { name } = useLocalSearchParams();

    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there 👋", fromMe: false },
        { id: 2, text: "Hello!", fromMe: true },
    ]);

    const [input, setInput] = useState("");
    const flatListRef = useRef<FlatList>(null);


    const sendMessage = () => {
        if (!input.trim()) return;

        const newMsg = { id: Date.now(), text: input, fromMe: true };
        setMessages((prev) => [...prev, newMsg]);
        setInput("");
    };

    // 🔽 Auto scroll when new message added
    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={80}
            >

                {/* 🔝 HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={26} color="#111" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{name}</Text>
                </View>

                {/* 💬 CHAT AREA */}
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 15 }}
                    renderItem={({ item }) => (
                        <View
                            style={[
                                styles.messageBubble,
                                item.fromMe ? styles.myMessage : styles.otherMessage,
                            ]}
                        >
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
                        placeholderTextColor="#888"
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <Ionicons name="send" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
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
        borderRadius: 15,
        marginVertical: 5,
        maxWidth: "70%",
    },

    myMessage: {
        backgroundColor: "#3ca314ff",
        alignSelf: "flex-end",
    },

    otherMessage: {
        backgroundColor: "#f2f2f2",
        alignSelf: "flex-start",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderColor: "#eee",
        backgroundColor: "#ffff",
    },


    input: {
        flex: 1,
        height: 45,             // same height as button
        backgroundColor: "#f2f2f2",
        borderRadius: 25,
        paddingHorizontal: 20,
    },

    sendButton: {
        height: 42,             // match input height
        width: 42,
        borderRadius: 25,
        marginLeft: 10,
        backgroundColor: "#0b6613",
        justifyContent: "center",   // center icon
        alignItems: "center",
    },

});

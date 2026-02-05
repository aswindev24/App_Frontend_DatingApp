import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { currentUser, friends, chats } from "../data/DummyChats";

export default function Messages() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>

            {/* 🔝 HEADER */}
            <View style={styles.headerContainer}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={26} color="#111" />
                    </TouchableOpacity>

                    <Text style={styles.headerText}>{currentUser.name}</Text>
                </View>

                {/* 🔎 SEARCH BAR */}
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={18} color="#666" />
                    <TextInput
                        placeholder="Search messages"
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                    />
                </View>
            </View>

            {/* 👥 STORIES */}
            <View style={styles.storiesContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.storiesContent}
                >
                    {friends.map((friend) => (
                        <TouchableOpacity key={friend.id} style={styles.story}>
                            <View style={styles.storyImageWrapper}>
                                <Image source={{ uri: friend.avatar }} style={styles.storyImage} />
                            </View>
                            <Text style={styles.storyName} numberOfLines={1}>
                                {friend.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* 💬 SECTION HEADER */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Messages</Text>
                <TouchableOpacity>
                    <Ionicons name="filter" size={20} color="#666" />
                </TouchableOpacity>
            </View>

            {/* 💬 CHAT LIST */}
            <FlatList
                data={chats}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.chatItem}
                        activeOpacity={0.7}
                        onPress={() => router.push({ pathname: "/chat/[id]", params: { id: item.id, name: item.name } })}

                    >
                        <View style={styles.chatAvatarWrapper}>
                            <Image source={{ uri: item.avatar }} style={styles.chatAvatar} />
                            {item.online && <View style={styles.onlineDot} />}
                        </View>

                        <View style={styles.chatTextContainer}>
                            <View style={styles.chatTopRow}>
                                <Text style={styles.chatName}>{item.name}</Text>
                                <Text style={styles.chatTime}>2m</Text>
                            </View>
                            <Text style={styles.chatMessage} numberOfLines={1}>
                                {item.message}
                            </Text>
                        </View>

                        {item.unread && (
                            <View style={styles.unreadBadge}>
                                <Text style={styles.unreadText}>1</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    headerContainer: {
        paddingHorizontal: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderColor: "#f0f0f0",
        backgroundColor: "#fff",
    },

    headerTop: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    headerText: {
        fontSize: 24,
        fontWeight: "700",
        marginLeft: 16,
        color: "#111",
    },

    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },

    searchInput: {
        marginLeft: 10,
        flex: 1,
        fontSize: 15,
        color: "#111",
    },

    storiesContainer: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: "#f0f0f0",
        backgroundColor: "#fff",
    },

    storiesContent: {
        paddingHorizontal: 12,
    },

    story: {
        alignItems: "center",
        marginHorizontal: 8,
        width: 70,
    },

    storyImageWrapper: {
        padding: 3,
        borderRadius: 50,
        borderWidth: 2.5,
        borderColor: "#208507ff",
    },

    storyImage: {
        width: 62,
        height: 62,
        borderRadius: 31,
        backgroundColor: "#f0f0f0",
    },

    storyName: {
        fontSize: 12,
        marginTop: 6,
        color: "#333",
        textAlign: "center",
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#fafafa",
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111",
    },

    chatItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#fff",
    },

    chatAvatarWrapper: {
        position: "relative",
    },

    chatAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#f0f0f0",
    },

    onlineDot: {
        position: "absolute",
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: "#4CAF50",
        borderWidth: 2,
        borderColor: "#fff",
    },

    chatTextContainer: {
        marginLeft: 12,
        flex: 1,
    },

    chatTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },

    chatName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111",
    },

    chatTime: {
        fontSize: 13,
        color: "#999",
    },

    chatMessage: {
        fontSize: 14,
        color: "#666",
        lineHeight: 18,
    },

    unreadBadge: {
        backgroundColor: "#0a5a1eff",
        borderRadius: 12,
        minWidth: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 6,
        marginLeft: 8,
    },

    unreadText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
});
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { chats, currentUser, friends } from "../data/DummyChats";
import { DummyRequests } from "../data/DummyRequest";

export default function Messages() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'messages' | 'requests'>('messages');

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

            {/* 💬 TAB SWITCHER */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'messages' && styles.activeTab]}
                    onPress={() => setActiveTab('messages')}
                >
                    <Text style={[styles.tabText, activeTab === 'messages' && styles.activeTabText]}>Messages</Text>
                    {activeTab === 'messages' && <View style={styles.activeIndicator} />}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'requests' && styles.activeTab]}
                    onPress={() => setActiveTab('requests')}
                >
                    <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>Requests</Text>
                    {activeTab === 'requests' && <View style={styles.activeIndicator} />}
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{DummyRequests.length}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* 💬 CHAT LIST or REQUEST LIST */}
            {activeTab === 'messages' ? (
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
            ) : (
                <FlatList
                    data={DummyRequests}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.requestItem}>
                            <Image source={{ uri: item.avatar }} style={styles.requestAvatar} />
                            <View style={styles.requestInfo}>
                                <View style={styles.requestTop}>
                                    <Text style={styles.requestName}>{item.name}</Text>
                                    <Text style={styles.requestTime}>{item.time}</Text>
                                </View>
                                <Text style={styles.requestBio} numberOfLines={2}>{item.bio}</Text>

                                <View style={styles.actionButtons}>
                                    <TouchableOpacity style={styles.acceptButton} onPress={() => console.log('Accept', item.name)}>
                                        <Text style={styles.acceptButtonText}>Accept</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.declineButton} onPress={() => console.log('Decline', item.name)}>
                                        <Text style={styles.declineButtonText}>Decline</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.blockButton} onPress={() => console.log('Block', item.name)}>
                                        <Ionicons name="ban-outline" size={20} color="#FF6B6B" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
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

    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111",
    },

    tabContainer: {
        flexDirection: "row",
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: "#f0f0f0",
        backgroundColor: "#fff",
    },

    tabButton: {
        flex: 1,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        flexDirection: "row",
        gap: 6,
    },

    activeTab: {
        // borderBottomWidth: 2,
        // borderColor: "#FF4D6D",
    },

    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        height: 3,
        width: '40%',
        backgroundColor: '#0eb41cff',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },

    tabText: {
        fontSize: 16,
        color: "#999",
        fontWeight: "500",
    },

    activeTabText: {
        color: "#131111ff",
        fontWeight: "700",
    },

    badge: {
        backgroundColor: "#171868ff",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
    },

    badgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "700",
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

    // REQUEST LIST STYLES
    requestItem: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: "#f8f8f8",
        backgroundColor: "#fff",
    },

    requestAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#f0f0f0",
    },

    requestInfo: {
        marginLeft: 12,
        flex: 1,
    },

    requestTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },

    requestName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111",
    },

    requestTime: {
        fontSize: 12,
        color: "#999",
    },

    requestBio: {
        fontSize: 14,
        color: "#666",
        marginBottom: 12,
        lineHeight: 20,
    },

    actionButtons: {
        flexDirection: "row",
        gap: 10,
        alignItems: 'center',
    },

    acceptButton: {
        flex: 1,
        backgroundColor: "#1a8a3bff",
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: "center",
    },

    acceptButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },

    declineButton: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },

    declineButtonText: {
        color: "#333",
        fontWeight: "600",
        fontSize: 14,
    },

    blockButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: "#FFF5F5",
        justifyContent: 'center',
        alignItems: 'center',
    },
});
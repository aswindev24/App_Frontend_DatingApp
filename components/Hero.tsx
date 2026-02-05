import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { DummyUsers } from "../data/DummyUsers";
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.92;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.7;

export default function Hero() {
    const user = DummyUsers[0];

    return (
        <View style={styles.container}>
            {/* TINDER-STYLE CARD */}
            <View style={styles.card}>

                {/* IMAGE CAROUSEL */}
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={styles.imageContainer}
                >
                    {user.images.map((img, index) => (
                        <View key={index} style={styles.imageWrapper}>
                            <Image source={{ uri: img }} style={styles.image} />

                            {/* PAGE INDICATORS */}
                            <View style={styles.pageIndicators}>
                                {user.images.map((_, i) => (
                                    <View
                                        key={i}
                                        style={[
                                            styles.indicator,
                                            i === index && styles.activeIndicator
                                        ]}
                                    />
                                ))}
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* GRADIENT OVERLAY */}
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.gradient}
                />

                {/* USER INFO */}
                <View style={styles.infoBox}>
                    <View style={styles.userInfo}>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.age}>{user.age}</Text>
                    </View>

                    <View style={styles.hobbiesContainer}>
                        {user.hobbies.slice(0, 3).map((hobby, index) => (
                            <View key={index} style={styles.hobbyPill}>
                                <Text style={styles.hobbyText}>{hobby}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* ACTION BUTTONS */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={[styles.actionButton, styles.rewindButton]}>
                        <Text style={styles.actionIcon}>↶</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, styles.nopeButton]}>
                        <Text style={styles.actionIcon}>✕</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, styles.superLikeButton]}>
                        <Text style={styles.actionIcon}>★</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, styles.likeButton]}>
                        <Text style={styles.actionIcon}>❤</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, styles.boostButton]}>
                        <Text style={styles.actionIcon}>⚡</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start", // Changed from "center"
        backgroundColor: "#f5f5f5",
        paddingTop: 25, // Add some top spacing
    },

    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },

    imageContainer: {
        flex: 1,
    },

    imageWrapper: {
        width: CARD_WIDTH,
        height: 600,
    },

    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    pageIndicators: {
        position: "absolute",
        top: 12,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        gap: 6,
        paddingHorizontal: 12,
    },

    indicator: {
        flex: 1,
        height: 3,
        backgroundColor: "rgba(255,255,255,0.4)",
        borderRadius: 2,
    },

    activeIndicator: {
        backgroundColor: "#fff",
    },

    gradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
    },

    infoBox: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingBottom: 100,
    },

    userInfo: {
        flexDirection: "row",
        alignItems: "baseline",
        marginBottom: 12,
    },

    name: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "700",
        marginRight: 8,
    },

    age: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "400",
    },

    hobbiesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },

    hobbyPill: {
        backgroundColor: "rgba(255,255,255,0.2)",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.3)",
    },

    hobbyText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "500",
    },

    actionButtons: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 14,
        paddingHorizontal: 20,
    },

    actionButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },

    rewindButton: {
        backgroundColor: "#FFC107",
        width: 48,
        height: 48,
        borderRadius: 24,
    },

    nopeButton: {
        backgroundColor: "#fff",
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#FF6B6B",
    },

    superLikeButton: {
        backgroundColor: "#4FC3F7",
        width: 52,
        height: 52,
        borderRadius: 26,
    },

    likeButton: {
        backgroundColor: "#fff",
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: "#4CAF50",
    },

    boostButton: {
        backgroundColor: "#9C27B0",
        width: 48,
        height: 48,
        borderRadius: 24,
    },

    actionIcon: {
        fontSize: 28,
        fontWeight: "bold",
    },
});
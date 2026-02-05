import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DummyUsers } from "../data/DummyUsers";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.92;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.7;

interface User {
    id: number;
    name: string;
    age: number;
    location: string;
    images: string[];
    hobbies: string[];
}

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentUser = DummyUsers[currentIndex % DummyUsers.length];

    const handleNextPerson = () => {
        setCurrentIndex((prev) => (prev + 1) % DummyUsers.length);
    };

    const handleFriendRequest = () => {
        console.log("Friend Request sent to:", currentUser.name);
        // Add logic to send request
    };

    return (
        <View style={styles.container}>
            {/* SINGLE USER CARD */}
            <View style={styles.cardContainer}>
                <UserCard
                    card={currentUser}
                    onFriendRequest={handleFriendRequest}
                />
            </View>

            {/* NEXT BUTTON - Minimalist, aligned right */}
            <View style={styles.nextButtonContainer}>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNextPerson}
                >
                    <Ionicons name="arrow-forward" size={24} color="#666" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function UserCard({ card, onFriendRequest }: { card: User, onFriendRequest: () => void }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const scrollRef = useRef<FlatList>(null);

    // Auto-play logic
    useEffect(() => {
        const interval = setInterval(() => {
            if (card.images.length > 1) {
                const nextIndex = (currentImageIndex + 1) % card.images.length;
                setCurrentImageIndex(nextIndex);
                scrollRef.current?.scrollToIndex({
                    index: nextIndex,
                    animated: true,
                });
            }
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [currentImageIndex, card.images.length]);

    // Reset image index when user changes
    useEffect(() => {
        setCurrentImageIndex(0);
        scrollRef.current?.scrollToIndex({ index: 0, animated: false });
    }, [card.id]);

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentImageIndex(viewableItems[0].index);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    if (!card) return null;

    return (
        <View style={styles.card}>
            {/* PHOTO CAROUSEL */}
            <FlatList
                ref={scrollRef}
                data={card.images}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.image} />
                )}
            />

            {/* PAGE INDICATORS */}
            <View style={styles.pageIndicators}>
                {card.images.map((_, indicatorIndex) => (
                    <View
                        key={indicatorIndex}
                        style={[
                            styles.indicator,
                            indicatorIndex === currentImageIndex && styles.activeIndicator
                        ]}
                    />
                ))}
            </View>

            {/* DARK GRADIENT */}
            <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.85)"]}
                style={styles.gradient}
            />

            {/* USER INFO */}
            <View style={styles.infoBox}>
                <View style={styles.nameRow}>
                    <Text style={styles.name}>{card.name}</Text>
                    <Text style={styles.age}>{card.age}</Text>
                </View>

                {card.location && (
                    <View style={styles.locationRow}>
                        <Ionicons name="location" size={16} color="rgba(255,255,255,0.9)" />
                        <Text style={styles.location}>{card.location}</Text>
                    </View>
                )}

                <View style={styles.hobbiesContainer}>
                    {card.hobbies.slice(0, 3).map((hobbyItem, hobbyIndex) => (
                        <View key={hobbyIndex} style={styles.hobbyPill}>
                            <Text style={styles.hobbyText}>{hobbyItem}</Text>
                        </View>
                    ))}
                </View>

                {/* CONNECT BUTTON */}
                <TouchableOpacity
                    style={styles.connectButton}
                    onPress={onFriendRequest}
                >
                    <Ionicons name="person-add" size={22} color="#fff" />
                    <Text style={styles.connectButtonText}>Connect</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
    },
    connectButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#FF4D6D",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        gap: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },

    connectButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },

    cardContainer: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },

    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 24,
        overflow: "hidden",
        backgroundColor: "#fff",
    },

    image: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        resizeMode: "cover",
    },

    pageIndicators: {
        position: "absolute",
        top: 12,
        left: 12,
        right: 12,
        flexDirection: "row",
        gap: 6,
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
        bottom: 20,
        left: 20,
        right: 20,
    },

    nameRow: {
        flexDirection: "row",
        alignItems: "baseline",
        marginBottom: 6,
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

    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    location: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 15,
        marginLeft: 4,
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

    infoButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
    },

    actionButtons: {
        width: CARD_WIDTH,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        gap: 15,
    },

    actionButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 16,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        gap: 8,
    },

    friendRequestButton: {
        backgroundColor: "#FF4D6D", // Brand color
    },

    nextButtonContainer: {
        width: CARD_WIDTH,
        marginTop: 20,
        alignItems: 'flex-end',
    },

    nextButton: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        borderRadius: 30,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e0e0e0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    }
});

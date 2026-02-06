import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Settings from '@/components/Profile/Settings';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { POSTS } from '../data/DummyProfilePost';

const { width } = Dimensions.get('window');
const POST_SIZE = (width - 4) / 3;

interface Post {
    id: string;
    type: string;
    image: string;
}



export default function Profile() {
    const [isFollowing, setIsFollowing] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);
    const isFooterVisibleRef = useRef(true);
    const scrollOffset = useRef(0);
    const footerAnim = useRef(new Animated.Value(0)).current;

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const diff = currentOffset - scrollOffset.current;

        // Ignore bounce at top (negative offset) and ensure footer is shown
        if (currentOffset <= 0) {
            if (!isFooterVisibleRef.current) {
                showFooter();
            }
            scrollOffset.current = currentOffset;
            return;
        }

        // Add threshold to avoid jitter on small movements
        if (Math.abs(diff) < 10) return;

        if (diff > 0 && isFooterVisibleRef.current) {
            // Scrolling down
            hideFooter();
        } else if (diff < 0 && !isFooterVisibleRef.current) {
            // Scrolling up
            showFooter();
        }

        scrollOffset.current = currentOffset;
    };

    const showFooter = () => {
        isFooterVisibleRef.current = true;
        Animated.spring(footerAnim, {
            toValue: 0,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const hideFooter = () => {
        isFooterVisibleRef.current = false;
        Animated.spring(footerAnim, {
            toValue: 80,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };




    const renderPost = ({ item }: { item: Post }) => {
        if (!item) return null;
        return (
            <TouchableOpacity style={styles.postContainer}>
                <Image source={{ uri: item.image }} style={styles.postImage} />
                {item.type === 'video' && (
                    <View style={styles.videoIconContainer}>
                        <Ionicons name="play" size={16} color="white" />
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <Header />

            {/* Main Content with Scroll */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    {/* Profile Info Row */}
                    <View style={styles.profileInfoRow}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: 'https://picsum.photos/100/100?random=profile' }}
                                style={styles.avatar}
                            />
                            <TouchableOpacity style={styles.addStoryButton}>
                                <Ionicons name="add-circle" size={20} color="#0095f6" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.statsContainer}>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>{POSTS.length}</Text>
                                <Text style={styles.statLabel}>Posts</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>1,234</Text>
                                <Text style={styles.statLabel}>Followers</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>567</Text>
                                <Text style={styles.statLabel}>Following</Text>
                            </View>
                        </View>
                    </View>

                    {/* Bio Section */}
                    <View style={styles.bioSection}>
                        <Text style={styles.displayName}>Your Name</Text>
                        <Text style={styles.bio}>Digital creator • Photographer</Text>
                        <Text style={styles.bio}>📍 New York, NY</Text>
                        <Text style={styles.bio}>🌐 yourwebsite.com</Text>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={[styles.followButton, isFollowing && styles.followingButton]}
                            onPress={() => setIsFollowing(!isFollowing)}
                        >
                            <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
                                {isFollowing ? 'Following' : 'Edit Profile'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shareButton}>
                            <Text style={styles.shareButtonText}>Share Profile</Text>
                        </TouchableOpacity>

                    </View>

                    {/* Story Highlights */}

                </View>

                {/* Posts Navigation */}
                <View style={styles.postsNav}>
                    <TouchableOpacity style={styles.navItem}>
                        <MaterialIcons name="grid-on" size={24} color="#0095f6" />
                        <View style={styles.navIndicator} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <Ionicons name="play-circle-outline" size={24} color="#8e8e8e" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <Ionicons name="people-outline" size={24} color="#8e8e8e" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => setSettingsVisible(true)}
                    >
                        <Ionicons name="settings" size={24} color="#8e8e8e" />
                    </TouchableOpacity>
                </View>

                {/* Posts Grid */}
                <FlatList
                    data={POSTS}
                    renderItem={renderPost}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    scrollEnabled={false}
                    style={styles.postsGrid}
                    contentContainerStyle={styles.postsGridContent}
                />

                {/* Minimal padding for footer clearance */}
                <View style={{ height: 20 }} />
            </ScrollView>

            {/* Animated Footer */}
            <Animated.View
                style={[
                    styles.footerContainer,
                    {
                        transform: [{ translateY: footerAnim }],
                    }
                ]}
            >
                <Footer />
            </Animated.View>
            <Settings
                visible={settingsVisible}
                onClose={() => setSettingsVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
    },
    profileSection: {
        padding: 16,
    },
    profileInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 86,
        height: 86,
        borderRadius: 43,
        borderWidth: 2,
        borderColor: '#e0e0e0',
    },
    addStoryButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 12,
    },
    statsContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        marginLeft: 30,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: '700',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    bioSection: {
        marginTop: 12,
    },
    displayName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    bio: {
        fontSize: 14,
        color: '#262626',
        marginTop: 2,
    },
    actionButtons: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 8,
    },
    followButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    followingButton: {
        backgroundColor: '#0095f6',
    },
    followButtonText: {
        fontWeight: '600',
        fontSize: 14,
    },
    followingButtonText: {
        color: 'white',
    },
    shareButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    shareButtonText: {
        fontWeight: '600',
        fontSize: 14,
    },
    contactButton: {
        width: 36,
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    highlightsContainer: {
        marginTop: 20,
    },
    highlightsScroll: {
        paddingHorizontal: 4,
    },
    highlightItem: {
        alignItems: 'center',
        marginRight: 16,
    },
    highlightCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 1,
        borderColor: '#dbdbdb',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    highlightCircleFilled: {
        borderWidth: 2,
        borderColor: '#262626',
        padding: 2,
    },
    highlightImage: {
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    highlightText: {
        fontSize: 12,
        color: '#666',
    },
    postsNav: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#dbdbdb',
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        position: 'relative',
    },
    navIndicator: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 1,
        backgroundColor: '#262626',
    },
    postsGrid: {
        marginTop: 1,
    },
    postsGridContent: {
        paddingBottom: 0,
    },
    postContainer: {
        width: POST_SIZE,
        height: POST_SIZE,
        margin: 0.5,
        position: 'relative',
    },
    postImage: {
        width: '100%',
        height: '100%',
    },
    videoIconContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 12,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#dbdbdb',
    },
});
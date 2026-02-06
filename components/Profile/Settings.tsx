// D:\React_Application\proj\amora\components\Profile\settings.tsx
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface SettingsProps {
    visible: boolean;
    onClose: () => void;
}

export default function Settings({ visible, onClose }: SettingsProps) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [notifications, setNotifications] = useState({
        posts: true,
        stories: true,
        comments: true,
        messages: true,
    });
    const [privateAccount, setPrivateAccount] = useState(false);
    const [saveToGallery, setSaveToGallery] = useState(true);

    // Handle logout
    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => {
                        console.log('User logged out');
                        // Add your actual logout logic here
                        onClose();
                    }
                }
            ]
        );
    };

    // Handle change password
    const handleChangePassword = () => {
        Alert.alert(
            'Change Password',
            'This will navigate you to the change password screen',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Continue',
                    onPress: () => {
                        console.log('Navigate to change password screen');
                        onClose();
                        // navigation.navigate('ChangePassword')
                    }
                }
            ]
        );
    };

    // Handle account privacy
    const handlePrivacy = () => {
        Alert.alert(
            'Account Privacy',
            privateAccount
                ? 'Your account is currently private. Only approved followers can see your photos and videos.'
                : 'Your account is currently public. Anyone can see your photos and videos.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: privateAccount ? 'Switch to Public' : 'Switch to Private',
                    onPress: () => setPrivateAccount(!privateAccount)
                }
            ]
        );
    };

    // Handle clear cache
    const handleClearCache = () => {
        Alert.alert(
            'Clear Cache',
            'This will clear all cached data. This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear Cache',
                    style: 'destructive',
                    onPress: () => console.log('Cache cleared')
                }
            ]
        );
    };

    // Handle deactivate account
    const handleDeactivateAccount = () => {
        Alert.alert(
            'Deactivate Account',
            'Are you sure you want to deactivate your account? Your profile will be hidden until you reactivate.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Deactivate',
                    style: 'destructive',
                    onPress: () => console.log('Account deactivated')
                }
            ]
        );
    };

    // Handle delete account
    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account',
            'This will permanently delete your account and all data. This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete Account',
                    style: 'destructive',
                    onPress: () => console.log('Account deleted')
                }
            ]
        );
    };

    // Render setting item with switch
    const renderSwitchItem = (icon: string, title: string, value: boolean, onValueChange: (value: boolean) => void) => (
        <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
                <Ionicons name={icon as any} size={24} color="#262626" />
                <Text style={styles.settingText}>{title}</Text>
            </View>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: '#dbdbdb', true: '#0095f6' }}
                thumbColor={value ? '#fff' : '#f4f3f4'}
            />
        </View>
    );

    // Render setting item with arrow
    const renderArrowItem = (icon: string, title: string, onPress: () => void, color?: string) => (
        <TouchableOpacity style={styles.settingItem} onPress={onPress}>
            <View style={styles.settingLeft}>
                <Ionicons name={icon as any} size={24} color={color || '#262626'} />
                <Text style={styles.settingText}>{title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8e8e8e" />
        </TouchableOpacity>
    );

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={[styles.container, isDarkMode && styles.darkContainer]}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#fff' : '#000'} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, isDarkMode && styles.darkText]}>Settings</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {/* Account Section */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Account</Text>
                        {renderArrowItem('person-outline', 'Edit Profile', () => console.log('Edit Profile'))}
                        {renderArrowItem('lock-closed-outline', 'Change Password', handleChangePassword)}
                        {renderArrowItem('shield-checkmark-outline', 'Privacy', handlePrivacy)}
                        {renderSwitchItem('eye-outline', 'Private Account', privateAccount, setPrivateAccount)}
                        {renderArrowItem('people-outline', 'Blocked Accounts', () => console.log('Blocked Accounts'))}
                        {renderArrowItem('mail-outline', 'Email Notifications', () => console.log('Email Notifications'))}
                    </View>

                    {/* Preferences Section */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Preferences</Text>
                        {renderSwitchItem('moon-outline', 'Dark Mode', isDarkMode, setIsDarkMode)}
                        {renderSwitchItem('notifications-outline', 'Push Notifications', notifications.posts,
                            (value) => setNotifications({ ...notifications, posts: value }))}
                        {renderSwitchItem('chatbubble-outline', 'Message Requests', notifications.messages,
                            (value) => setNotifications({ ...notifications, messages: value }))}
                        {renderSwitchItem('download-outline', 'Save to Gallery', saveToGallery, setSaveToGallery)}
                        {renderArrowItem('language-outline', 'Language', () => console.log('Language'))}
                        {renderArrowItem('time-outline', 'Screen Time', () => console.log('Screen Time'))}
                    </View>

                    {/* Content Section */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Content</Text>
                        {renderArrowItem('archive-outline', 'Archive', () => console.log('Archive'))}
                        {renderArrowItem('bookmark-outline', 'Saved', () => console.log('Saved'))}
                        {renderArrowItem('heart-outline', 'Liked Posts', () => console.log('Liked Posts'))}
                        {renderArrowItem('trash-outline', 'Recently Deleted', () => console.log('Recently Deleted'))}
                    </View>

                    {/* About Section */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>About</Text>
                        {renderArrowItem('help-circle-outline', 'Help Center', () => console.log('Help Center'))}
                        {renderArrowItem('alert-circle-outline', 'Report a Problem', () => console.log('Report Problem'))}
                        {renderArrowItem('information-circle-outline', 'About', () => console.log('About'))}
                        {renderArrowItem('document-text-outline', 'Terms of Service', () => console.log('Terms'))}
                        {renderArrowItem('shield-outline', 'Privacy Policy', () => console.log('Privacy Policy'))}
                        {renderArrowItem('trash-bin-outline', 'Clear Cache', handleClearCache)}
                    </View>

                    {/* Account Actions */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Actions</Text>
                        {renderArrowItem('log-out-outline', 'Logout', handleLogout, '#ff3b30')}
                        {renderArrowItem('eye-off-outline', 'Deactivate Account', handleDeactivateAccount, '#ff9500')}
                        {renderArrowItem('close-circle-outline', 'Delete Account', handleDeleteAccount, '#ff3b30')}
                    </View>

                    {/* App Version */}
                    <View style={styles.versionContainer}>
                        <Text style={[styles.versionText, isDarkMode && styles.darkText]}>Amora v1.0.0</Text>
                        <Text style={[styles.copyrightText, isDarkMode && styles.darkSubText]}>© 2024 Amora Inc.</Text>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    darkContainer: {
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#dbdbdb',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#262626',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingText: {
        fontSize: 16,
        marginLeft: 16,
        color: '#262626',
        flex: 1,
    },
    versionContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 30,
        paddingHorizontal: 16,
    },
    versionText: {
        fontSize: 14,
        color: '#8e8e8e',
        marginBottom: 4,
    },
    copyrightText: {
        fontSize: 12,
        color: '#8e8e8e',
    },
    // Dark mode styles
    darkText: {
        color: '#fff',
    },
    darkSubText: {
        color: '#8e8e8e',
    },
});
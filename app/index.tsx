import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        checkFirstTime();
    }, []);

    const checkFirstTime = async () => {
        await AsyncStorage.clear();     // Rmove this on production time. Else the pre login page will pop up after every app close
        const isFirstTime = await AsyncStorage.getItem("firstTime");
        console.log(isFirstTime);

        if (isFirstTime === null) {
            router.replace("/prelogin");
        } else {
            router.replace("/login");
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" />
        </View>
    );
}

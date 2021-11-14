import AsyncStorage from '@react-native-async-storage/async-storage'

const BIOMETRIC_STORAGE_KEY = "ASYNC_STORAGE_BIOMETRIC_DATA";

const getBiometricData = async () => {
    try {
        const data = await AsyncStorage.getItem(BIOMETRIC_STORAGE_KEY);
        if (data !== null) {
            let userData = JSON.parse(data);
            return userData;
        }
    } catch (e) {
        console.error('Failed to load biometric data.')
        return null;
    }
}

const saveBiometricData = async (ud) => {
    try {
        let userData = JSON.stringify(ud);
        await AsyncStorage.setItem(BIOMETRIC_STORAGE_KEY, userData);
        return true;
    } catch (e) {
        console.error('Failed to save biometric data.')
        return false;
    }
}

const resetBiometricData = async () => {
    try {
        await AsyncStorage.removeItem(BIOMETRIC_STORAGE_KEY);
        return true;
    } catch (e) {
        console.error('Failed to remove biometric data.')
        return false;
    }
}

export { getBiometricData, saveBiometricData, resetBiometricData };
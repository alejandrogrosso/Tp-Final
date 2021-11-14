import { hasHardwareAsync, isEnrolledAsync, authenticateAsync } from 'expo-local-authentication';

const checkDeviceBiometricCompatible = async () => {
    try {
        const compatible = await hasHardwareAsync();
        const enrolled = await isEnrolledAsync();
        //if (!compatible) throw 'El dispositivo no es compatible con biometria'
        //if (!enrolled) throw 'El dispositivo no tiene biometria habilitada'

        return compatible && enrolled;
    } catch {
        return false;
    }
}

const biometricsAuth = async () => {
    try {
        //return await checkDeviceBiometricCompatible() && (await authenticateAsync()).success;

        if (await checkDeviceBiometricCompatible()) {
            const result = await authenticateAsync();
            return result.success;
        }

        return false;
    } catch {
        return false;
    }
}

export { checkDeviceBiometricCompatible, biometricsAuth };
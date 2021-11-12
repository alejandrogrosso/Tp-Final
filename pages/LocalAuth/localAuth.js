import { hasHardwareAsync, isEnrolledAsync, authenticateAsync } from 'expo-local-authentication';

const biometricsAuth = async () => {
    const compatible = await hasHardwareAsync()
    if (!compatible) throw 'El dispositivo no es compatible con biometria'
    const enrolled = await isEnrolledAsync()
    if (!enrolled) throw 'El dispositivo no tiene biometria habilitada'
    const result = await authenticateAsync()
    if (!result.success) throw `${result.error} - Authentication unsuccessful`
    return
}

export default biometricsAuth
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import GlobalContext from '../../components/globals/context.js';

const printToFile = async (html) => {
    const { uri } = await Print.printToFileAsync({
        html
        //resultsGlobal
    });
    console.log('El archivo se guardo en :', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
}

export { printToFile }
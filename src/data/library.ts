import { Language } from './translations';
import { getFullRevelation } from './revelation_full';
import { BookData } from './gnosis'; // Importing type

const createLibrary = (lang: string): BookData[] => {

    const revelation: BookData = {
        id: 'revelation',
        title: "THE BOOK OF REVELATION",
        description: "The Complete Apocalypse of St. John",
        pdfUrl: '',
        content: getFullRevelation(lang as Language)
    };

    return [revelation];
};

export const libraryData: Record<Language, BookData[]> = {
    EN: createLibrary('EN'),
    ES: createLibrary('ES'),
    DE: createLibrary('DE'),
    AM: createLibrary('AM'),
    HE: createLibrary('HE'),
    LA: createLibrary('LA'),
    GR: createLibrary('GR'),
    AR: createLibrary('AR'),
    SA: createLibrary('SA'),
    HI: createLibrary('HI'),
    NO: createLibrary('NO'),
    ZH: createLibrary('ZH'),
};


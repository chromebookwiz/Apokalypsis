export type Language = 'HE' | 'GR' | 'AM' | 'HI' | 'NO' | 'SA' | 'LA' | 'AR' | 'DE' | 'ES' | 'FA';

export const LANG_NAMES: Record<Language, string> = {
    'HE': 'עִבְרִית', // Hebrew
    'GR': 'ΕΛΛΗΝΙΚΑ', // Greek
    'AM': 'አማርኛ', // Amharic
    'HI': 'Mdw Nṯr', // Hieroglyphs
    'NO': 'Rúnar', // Norse Runes
    'SA': 'संस्कृत', // Sanskrit
    'LA': 'Latina', // Latin
    'AR': 'العربية', // Arabic
    'DE': 'Deutsch', // German
    'ES': 'Español', // Spanish
    'FA': 'فارسی' // Persian (Farsi)
};

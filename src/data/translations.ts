export type Language = 'HE' | 'GR' | 'AM' | 'HI' | 'NO' | 'SA' | 'LA' | 'AR' | 'DE' | 'ES' | 'FA';

export const LANG_NAMES: Record<Language, string> = {
    'HE': 'עִבְרִית', // Hebrew
    'GR': 'ΕΛΛΗΝΙΚΑ', // Greek
    'AM': 'አማርኛ', // Amharic
    'HI': 'हिन्दी', // Hindi
    'NO': 'Rúnar', // Norse Runes
    'SA': 'संस्कृत', // Sanskrit
    'LA': 'Latina', // Latin
    'AR': 'العربية', // Arabic
    'DE': 'Deutsch', // German
    'ES': 'Español', // Spanish
    'FA': 'فارسی' // Persian (Farsi)
};

export const UI_STRINGS: Record<Language, any> = {
    'HE': {
        hide_ui: "הסתר ממשק",
        show_ui: "הצג ממשק",
        info: "אגדת השור והסריג",
        lock_parallel: "רתום את המרכבה",
        unlock_parallel: "שחרר את המרכבה",
        mute_tones: "השתק את המקהלה",
        enable_tones: "עורר את המקהלה",
        scale: "סולם קדוש",
        disable_varied: "בטל פעימות",
        enable_varied: "הפעל פעימות",
        prev: "פנה אחורה",
        reset: "מרכז",
        next: "פנה קדימה",
        toggle_text: "החלף כתובות",
        toggle_dark: "יום / לילה"
    },
    'GR': {
        hide_ui: "Κάλυψις Διεπαφῆς",
        show_ui: "Ἐμφάνισις Διεπαφῆς",
        info: "Ὁ Θρύλος τοῦ Ταύρου",
        lock_parallel: "Κλείδωμα τοῦ Ἅρματος",
        unlock_parallel: "Λύσις τοῦ Ἅρματος",
        mute_tones: "Σίγασις τῆς Χορείας",
        enable_tones: "Ἐγρήγορσις τῆς Χορείας",
        scale: "Ἱερὰ Κλίμαξ",
        disable_varied: "Παῦσις Βημάτων",
        enable_varied: "Ἔναρξις Βημάτων",
        prev: "Στροφὴ Παλαιά",
        reset: "Κέντρον",
        next: "Στροφὴ Νέα",
        toggle_text: "Ἐναλλαγή Γραφῆς",
        toggle_dark: "Ἡμέρα / Νύξ"
    },
    'AM': {
        hide_ui: "መሸፈኛ",
        show_ui: "መግለጫ",
        info: "የበሬው አፈ ታሪክ",
        lock_parallel: "ሰረገላውን እሰር",
        unlock_parallel: "ሰረገላውን ፍታ",
        mute_tones: "መዘምራኑን ዝም አሰኝ",
        enable_tones: "መዘምራኑን ቀስቅስ",
        scale: "የተቀደሰ ልኬት",
        prev: "ወደ ኋላ ተመለስ",
        reset: "መሃል",
        next: "ወደ ፊት ሂድ",
        toggle_text: "ጽሑፉን ቀይር",
        toggle_dark: "ቀን / ሌሊት"
    },
    'HI': {
        hide_ui: "पर्दा छुपाएं",
        show_ui: "पर्दा दिखाएं",
        info: "बैल की कथा",
        lock_parallel: "रथ को जकड़ें",
        unlock_parallel: "रथ को मुक्त करें",
        mute_tones: "गायन शांत करें",
        enable_tones: "गायन जगाएं",
        scale: "पवित्र पैमाना",
        prev: "पीछे मुड़ें",
        reset: "केंद्र",
        next: "आगे मुड़ें",
        toggle_text: "रून्स बदलें",
        toggle_dark: "दिन / रात"
    },
    'NO': {
        hide_ui: "ᚺᛁᛞᛖ ᚢᛖᛁᛚ",
        show_ui: "ᛋᚺᚩᚹ ᚢᛖᛁᛚ",
        info: "ᛋᚪᚷᚪ ᚢᚠ ᚦᛖ ᛒᚢᛚᛚ",
        lock_parallel: "ᛒᛁᚾᛞ ᚦᛖ ᚲᚺᚪᚱᛁᚩᛏ",
        unlock_parallel: "ᚠᚱᛖᛖ ᚦᛖ ᚲᚺᚪᚱᛁᚩᛏ",
        mute_tones: "ᛋᛁᛚᛖᚾᚲᛖ ᚦᛖ ᚲᚺᚩᛁᚱ",
        enable_tones: "ᚹᚪᚲᛖ ᚦᛖ ᚲᚺᚩᛁᚱ",
        scale: "ᛋᚲᚪᛚᛖ",
        prev: "ᛒᚪᚲᚲ",
        reset: "ᚺᚩᛗᛖ",
        next: "ᚠᚩᚱᚦ",
        toggle_text: "ᚱᚢᚾᛖᛋ",
        toggle_dark: "ᛞᚪᚤ / ᚾᛁᚷᚺᛏ"
    },
    'SA': {
        hide_ui: "पटलम् अपवारयतु",
        show_ui: "पटलम् दर्शयतु",
        info: "वृषभस्य कथा",
        lock_parallel: "रथं बध्नातु",
        unlock_parallel: "रथं मोचयतु",
        mute_tones: "गानं शान्तं करोतु",
        enable_tones: "गानं प्रबोधयतु",
        scale: "पवित्रमानदण्डः",
        prev: "पश्चात्",
        reset: "मध्यम्",
        next: "पुरतः",
        toggle_text: "लेखं परिवर्तयतु",
        toggle_dark: "दिनं / रात्रिः"
    },
    'LA': {
        hide_ui: "Abde Velum",
        show_ui: "Monstra Velum",
        info: "Fabula Tauri et Reticuli",
        lock_parallel: "Iunge Currum",
        unlock_parallel: "Solve Currum",
        mute_tones: "Sile Chorum",
        enable_tones: "Awake Chorum",
        scale: "Scala Sacra",
        prev: "Reverte",
        reset: "Medium",
        next: "Procede",
        toggle_text: "Muta Inscriptionem",
        toggle_dark: "Dies / Nox"
    },
    'AR': {
        hide_ui: "إخفاء الحجاب",
        show_ui: "إظهار الحجاب",
        info: "أسطورة الثور والشبكة",
        lock_parallel: "ربط المركبة",
        unlock_parallel: "فك المركبة",
        mute_tones: "إسكات الجوقة",
        enable_tones: "إيقاظ الجوقة",
        scale: "المقام المقدس",
        prev: "رجوع",
        reset: "المركز",
        next: "تقدم",
        toggle_text: "تبديل النقوش",
        toggle_dark: "نهار / ليل"
    },
    'DE': {
        hide_ui: "Schleier verbergen",
        show_ui: "Schleier zeigen",
        info: "Legende vom Stier",
        lock_parallel: "Den Wagen fesseln",
        unlock_parallel: "Den Wagen lösen",
        mute_tones: "Chor verstummen",
        enable_tones: "Chor erwecken",
        scale: "Heilige Skala",
        prev: "Zurück",
        reset: "Zentrum",
        next: "Vorwärts",
        toggle_text: "Runen wechseln",
        toggle_dark: "Tag / Nacht"
    },
    'ES': {
        hide_ui: "Ocultar Velo",
        show_ui: "Mostrar Velo",
        info: "Leyenda del Toro",
        lock_parallel: "Sujetar el Carro",
        unlock_parallel: "Soltar el Carro",
        mute_tones: "Silenciar el Coro",
        enable_tones: "Despertar el Coro",
        scale: "Escala Sagrada",
        prev: "Atrás",
        reset: "Centro",
        next: "Adelante",
        toggle_text: "Cambiar Runas",
        toggle_dark: "Día / Noche"
    },
    'FA': {
        hide_ui: "پنهان کردن حجاب",
        show_ui: "نمایش حجاب",
        info: "افسانه گاو و شبکه",
        lock_parallel: "بستن ارابه",
        unlock_parallel: "رها کردن ارابه",
        mute_tones: "خاموشی گروه کر",
        enable_tones: "بیداری گروه کر",
        scale: "گام مقدس",
        prev: "بازگשת",
        reset: "مرکز",
        next: "پیشروی",
        toggle_text: "تغییر کتیبه",
        toggle_dark: "روز / شب"
    }
};

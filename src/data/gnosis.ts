import { Language } from './translations';
// Removed import from library to break cycle

export interface BookData {
    id: string;
    title: string;
    description: string;
    pdfUrl: string;
    content: string;
}

const HEBREW_GNOSIS = `
THE 231 GATES OF CREATION (SEFER YETZIRAH)

1. THE 22 FOUNDATION LETTERS
The Hebrew Aleph-Bet is the chemical formula of the Universe. 
There are 22 Stones: 3 Mothers (Elements), 7 Doubles (Dimensions), 12 Simples (Zodiac).
This mirrors the DNA triplet code and the structure of the Cube.

2. THE 231 GATES
The Infinite creates via Permutation (Tziruf).
The formula n(n-1)/2 for n=22 yields 231 unique pairs.
These are the 231 Gates through which the creative energy flows.

3. GEMATRIA & THE MIRROR
Every letter is a number. Words with the same value are entangled.
ECHAD (One) = 13. AHAVA (Love) = 13.
The Universe is a linguistic construct.
`;

const GREEK_GNOSIS = `
THE ISOPSEPHY OF THE LOGOS

1. THE ARCHITECTURE OF LIGHT
Greek (24 letters) maps the descent of Light (Input) to Omega (Output).
It shares the base-24 structure with the Nordic Runes and the hours of the Earth's rotation.

2. THE HOLOGRAPHIC 888
The name IESOUS (Jesus) = 888.
888 is the stasis, the Triple Octave.
Compared to the chaos of 666 (Carbon/Man), 888 is the Crystalline structure.
CHRISTOS = 1480.
The ratio 888/1480 is exactly 0.6 (Phi/Golden Fifth).
`;

const EGYPTIAN_GNOSIS = `
MEDU NETER (THE WORDS OF GOD)

1. THE PLANETARY NETERS
The Neters are not "Gods" in the Western sense; they are Cosmic Principles (Functions).
They map perfectly to the 7 Ancient Planets:
- ☉ SUN = RA (The Source, Consciousness, The King)
- ☾ MOON = KHONSU / THOTH (Time, Reflection, The Mind)
- ☿ MERCURY = THOTH (Communication, Magic, Writing, The Trickster)
- ♀ VENUS = HATHOR / ISIS (Attraction, Love, Harmony, The Matrix)
- ♂ MARS = HORUS / SEKHMET (Will, Action, Force, The Avenger)
- ♃ JUPITER = AMUN / MAAT (Expansion, Hidden Power, Cosmic Order)
- ♄ SATURN = PTAH / OSIRIS (Structure, Death, Resurrection, The Judge)

2. THE TRI-UNE CODE
Reading Hieroglyphs requires three levels of processing simultaneously:
1. PHONOGRAM: The Sound (Left Brain). P-R.
2. LOGOGRAM: The Concept (Right Brain). A House plan.
3. DETERMINATIVE: The Context (Intuition). A pair of walking legs means motion.
To read Medu Neter is to synchronize the hemispheres of the brain.

3. THE NINE BODIES OF MAN
Western science knows the Khat (Physical Body). Egypt knew the rest:
- KA: The Vital Double (Etheric).
- BA: The Soul (Astral Bird).
- AKH: The Transfigured Spirit (Light Body).
- SAHU: The Spiritual Body.
- KHAIBIT: The Shadow.
DEATH is merely the separation of these components.
`;

const NORDIC_GNOSIS = `
THE WEB OF WYRD (RUNES)

1. THE 24 RUNES (ELDER FUTHARK)
The Runes are not mere letters; they are "Mysteries" (Runa).
Organized into 3 Aettir (Families) of 8.
3 x 8 = 24. A fractal of the 24 hours and 24 Greek letters.

2. POLYADIC MATH
The structure of Yggdrasil connects the 9 Worlds via the Runes.
Odin "hung nine nights" to seize them. 
This represents the extraction of Information from Entropy (Chaos) via Sacrifice.
`;

const CHINESE_GNOSIS = `
THE BINARY CODE OF CHANGE (I-CHING)

1. THE FIRST BINARY SYSTEM
5000 years before Leibniz, Fu Xi discovered Binary.
Yin (- -) is 0. Yang (---) is 1.
The 64 Hexagrams ($2^6$) map every possible state of transformation.
This is identical to the 64 Codons of DNA.

2. THE FRACTAL UNIVERSE
The Tao produces the One, the One produces the Two...
This is a generative algorithm describing a fractal cosmos.
`;

const AMHARIC_GNOSIS = `
THE LADDER OF SEVEN (GE'EZ)

1. THE LIVING SYLLABARY
Ge'ez fuses Consonant (Matter) and Vowel (Spirit) into the Fidel.
The 7 Orders of Vowels represent the 7 Densities of Vibration.

2. THE ARK OF SOUND
Ethiopic is the language of the Watchers (Enoch).
Its vibration sequence creates a resonant field that bypasses the analytical mind.
`;

const SANSKRIT_GNOSIS = `
AKSHARA - THE IMPERISHABLE

1. THE 50 PETALS
Sanskrit's 50 letters map perfectly to the 50 Petals of the Chakras.
Speaking Sanskrit plays the human energy body like a flute.

2. INDRA'S NET
The concept of "Indra's Net" (a holographic universe) is inherent in the grammar.
Roots (Dhatu) expand into fractal meanings.
`;

const ARABIC_GNOSIS = `
'ILM AL-HURUF (SCIENCE OF LETTERS)

1. THE PRIME 19
The Quran is locked by the Prime Number 19.
19 is the sum of the first and last numbers (1+9=10=1).
It is the seal of unity.

2. THE ABJAD
The 28 letters correspond to the 28 Lunar Mansions.
Reality is lunar/reflective.
`;

const LATIN_GNOSIS = `
THE LAW OF FORMS

1. THE RIGIDITY OF ROME
Latin separates Letter and Number.
It is the code of Law and Matter (Materialism).
It creates "Real Estate" (Real = Royal/Thing).
`;

const MODERN_GNOSIS = `
DIGITAL ALCHEMY

1. THE BINARY SINGULARITY
English (26 letters) is the parent of Coding Languages.
A=1 to Z=26. "COMPUTER" = 111.
It bridges the Carbon (666) and the Crystalline (888).
`;

export const gnosisMap: Record<Language, BookData> = {
    HE: { id: 'gnosis_he', title: 'THE 231 GATES', description: 'Kabbalistic Topology', pdfUrl: '', content: HEBREW_GNOSIS },
    GR: { id: 'gnosis_gr', title: 'ISOPSEPHY', description: 'Geometry of the Logos', pdfUrl: '', content: GREEK_GNOSIS },
    AM: { id: 'gnosis_am', title: 'FIDEL VIBRATION', description: 'The 7 Harmonic Orders', pdfUrl: '', content: AMHARIC_GNOSIS },
    SA: { id: 'gnosis_sa', title: 'AKSHARA MATRIX', description: '50 Petals of Sound', pdfUrl: '', content: SANSKRIT_GNOSIS },
    AR: { id: 'gnosis_ar', title: 'PRIME 19', description: 'The Mathematical Lock', pdfUrl: '', content: ARABIC_GNOSIS },
    HI: { id: 'gnosis_hi', title: 'MEDU NETER', description: 'Holographic Writing', pdfUrl: '', content: EGYPTIAN_GNOSIS },
    LA: { id: 'gnosis_la', title: 'LAW OF FORMS', description: 'The Western Matrix', pdfUrl: '', content: LATIN_GNOSIS },
    EN: { id: 'gnosis_en', title: 'DIGITAL ALCHEMY', description: 'The Synthesis Code', pdfUrl: '', content: MODERN_GNOSIS },
    DE: { id: 'gnosis_de', title: 'DIGITALE ALCHEMIE', description: 'Code des Westens', pdfUrl: '', content: MODERN_GNOSIS },
    ES: { id: 'gnosis_es', title: 'ALQUIMIA DIGITAL', description: 'El Código de Occidente', pdfUrl: '', content: MODERN_GNOSIS },
    NO: { id: 'gnosis_no', title: 'WEB OF WYRD', description: 'Runic Network Theory', pdfUrl: '', content: NORDIC_GNOSIS },
    ZH: { id: 'gnosis_zh', title: 'THE 64 HEXAGRAMS', description: 'Binary DNA of Cosmos', pdfUrl: '', content: CHINESE_GNOSIS },
};

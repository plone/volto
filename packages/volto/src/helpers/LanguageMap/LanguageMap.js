const langmap = new Proxy(
  {
    aa: { nativeName: 'магIарул мацI', englishName: 'Afar' },
    ab: { nativeName: 'бызшәа', englishName: 'Abkhazian' },
    ach: {
      nativeName: 'Lwo',
      englishName: 'Acholi',
    },
    ady: {
      nativeName: 'Адыгэбзэ',
      englishName: 'Adyghe',
    },
    ae: { nativeName: 'avesta', englishName: 'Avestan' },
    af: {
      nativeName: 'Afrikaans',
      englishName: 'Afrikaans',
    },
    'af-NA': {
      nativeName: 'Afrikaans (Namibia)',
      englishName: 'Afrikaans (Namibia)',
    },
    'af-ZA': {
      nativeName: 'Afrikaans (South Africa)',
      englishName: 'Afrikaans (South Africa)',
    },
    ak: {
      nativeName: 'Tɕɥi',
      englishName: 'Akan',
    },
    am: { nativeName: 'አማርኛ', englishName: 'Amharic' },
    an: { nativeName: 'aragonés', englishName: 'Aragonese' },
    ar: {
      nativeName: 'العربية',
      englishName: 'Arabic',
    },
    'ar-AR': {
      nativeName: 'العربية',
      englishName: 'Arabic',
    },
    'ar-MA': {
      nativeName: 'العربية',
      englishName: 'Arabic (Morocco)',
    },
    'ar-SA': {
      nativeName: 'العربية (السعودية)',
      englishName: 'Arabic (Saudi Arabia)',
    },
    as: { nativeName: 'অসমিয়া', englishName: 'Assamese' },
    ay: { nativeName: 'Aymara', englishName: 'Aymara' },
    'ay-BO': {
      nativeName: 'Aymar aru',
      englishName: 'Aymara',
    },
    az: {
      nativeName: 'Azərbaycan dili',
      englishName: 'Azerbaijani',
    },
    'az-AZ': {
      nativeName: 'Azərbaycan dili',
      englishName: 'Azerbaijani',
    },
    ba: { nativeName: 'Bashkir', englishName: 'Bashkir' },
    'be-BY': {
      nativeName: 'Беларуская',
      englishName: 'Belarusian',
    },
    bg: {
      nativeName: 'Български',
      englishName: 'Bulgarian',
    },
    'bg-BG': {
      nativeName: 'Български',
      englishName: 'Bulgarian',
    },
    be: { nativeName: 'Беларускі', englishName: 'Belarussian' },
    bh: { nativeName: 'Bihari', englishName: 'Bihari' },
    bi: { nativeName: 'Bislama', englishName: 'Bislama' },
    bm: { nativeName: 'bamanankan', englishName: 'Bambara' },
    bn: {
      nativeName: 'বাংলা',
      englishName: 'Bengali',
    },
    'bn-IN': {
      nativeName: 'বাংলা (ভারত)',
      englishName: 'Bengali (India)',
    },
    'bn-BD': {
      nativeName: 'বাংলা(বাংলাদেশ)',
      englishName: 'Bengali (Bangladesh)',
    },
    bo: { nativeName: 'བོད་སྐད་', englishName: 'Tibetan' },
    br: {
      nativeName: 'Brezhoneg',
      englishName: 'Breton',
    },
    bs: {
      nativeName: 'Bosanski',
      englishName: 'Bosnian',
    },
    'bs-BA': {
      nativeName: 'Bosanski',
      englishName: 'Bosnian',
    },
    ca: {
      nativeName: 'Català',
      englishName: 'Catalan',
    },
    'ca-ES': {
      nativeName: 'Català',
      englishName: 'Catalan',
    },
    cak: {
      nativeName: 'Maya Kaqchikel',
      englishName: 'Kaqchikel',
    },
    'ck-US': {
      nativeName: 'ᏣᎳᎩ (tsalagi)',
      englishName: 'Cherokee',
    },
    ce: { nativeName: 'нохчийн мотт', englishName: 'Chechen' },
    ch: { nativeName: 'Chamoru', englishName: 'Chamorro' },
    co: { nativeName: 'Corsu', englishName: 'Corsican' },
    cr: { nativeName: 'ᓀᐦᐃᔭᐍᐏᐣ', englishName: 'Cree' },
    cs: {
      nativeName: 'Čeština',
      englishName: 'Czech',
    },
    'cs-CZ': {
      nativeName: 'Čeština',
      englishName: 'Czech',
    },
    cu: { nativeName: 'ѩзыкъ словѣньскъ', englishName: 'Old Church Slavonic' },
    cv: { nativeName: 'чӑваш чӗлхи', englishName: 'Chuvash' },
    cy: {
      nativeName: 'Cymraeg',
      englishName: 'Welsh',
    },
    'cy-GB': {
      nativeName: 'Cymraeg',
      englishName: 'Welsh',
    },
    da: {
      nativeName: 'Dansk',
      englishName: 'Danish',
    },
    'da-DK': {
      nativeName: 'Dansk',
      englishName: 'Danish',
    },
    de: {
      nativeName: 'Deutsch',
      englishName: 'German',
    },
    'de-AT': {
      nativeName: 'Deutsch (Österreich)',
      englishName: 'German (Austria)',
    },
    'de-DE': {
      nativeName: 'Deutsch (Deutschland)',
      englishName: 'German (Germany)',
    },
    'de-CH': {
      nativeName: 'Deutsch (Schweiz)',
      englishName: 'German (Switzerland)',
    },
    dsb: {
      nativeName: 'Dolnoserbšćina',
      englishName: 'Lower Sorbian',
    },
    dv: { nativeName: 'Divehi', englishName: 'Maldivian' },
    dz: { nativeName: 'Bhutani', englishName: 'Indian Bhutani' },
    ee: { nativeName: 'Eʋegbe', englishName: 'Ewe' },
    el: {
      nativeName: 'Ελληνικά',
      englishName: 'Greek',
    },
    'el-GR': {
      nativeName: 'Ελληνικά',
      englishName: 'Greek (Greece)',
    },
    en: {
      nativeName: 'English',
      englishName: 'English',
    },
    'en-GB': {
      nativeName: 'English (UK)',
      englishName: 'English (UK)',
    },
    'en-AU': {
      nativeName: 'English (Australia)',
      englishName: 'English (Australia)',
    },
    'en-CA': {
      nativeName: 'English (Canada)',
      englishName: 'English (Canada)',
    },
    'en-IE': {
      nativeName: 'English (Ireland)',
      englishName: 'English (Ireland)',
    },
    'en-IN': {
      nativeName: 'English (India)',
      englishName: 'English (India)',
    },
    'en-PI': {
      nativeName: 'English (Pirate)',
      englishName: 'English (Pirate)',
    },
    'en-UD': {
      nativeName: 'English (Upside Down)',
      englishName: 'English (Upside Down)',
    },
    'en-US': {
      nativeName: 'English (US)',
      englishName: 'English (US)',
    },
    'en-ZA': {
      nativeName: 'English (South Africa)',
      englishName: 'English (South Africa)',
    },
    'en@pirate': {
      nativeName: 'English (Pirate)',
      englishName: 'English (Pirate)',
    },
    eo: {
      nativeName: 'Esperanto',
      englishName: 'Esperanto',
    },
    'eo-EO': {
      nativeName: 'Esperanto',
      englishName: 'Esperanto',
    },
    es: {
      nativeName: 'Español',
      englishName: 'Spanish',
    },
    'es-AR': {
      nativeName: 'Español (Argentine)',
      englishName: 'Spanish (Argentina)',
    },
    'es-419': {
      nativeName: 'Español (Latinoamérica)',
      englishName: 'Spanish (Latin America)',
    },
    'es-CL': {
      nativeName: 'Español (Chile)',
      englishName: 'Spanish (Chile)',
    },
    'es-CO': {
      nativeName: 'Español (Colombia)',
      englishName: 'Spanish (Colombia)',
    },
    'es-EC': {
      nativeName: 'Español (Ecuador)',
      englishName: 'Spanish (Ecuador)',
    },
    'es-ES': {
      nativeName: 'Español (España)',
      englishName: 'Spanish (Spain)',
    },
    'es-LA': {
      nativeName: 'Español (Latinoamérica)',
      englishName: 'Spanish (Latin America)',
    },
    'es-NI': {
      nativeName: 'Español (Nicaragua)',
      englishName: 'Spanish (Nicaragua)',
    },
    'es-MX': {
      nativeName: 'Español (México)',
      englishName: 'Spanish (Mexico)',
    },
    'es-US': {
      nativeName: 'Español (Estados Unidos)',
      englishName: 'Spanish (United States)',
    },
    'es-VE': {
      nativeName: 'Español (Venezuela)',
      englishName: 'Spanish (Venezuela)',
    },
    et: {
      nativeName: 'eesti keel',
      englishName: 'Estonian',
    },
    'et-EE': {
      nativeName: 'Eesti (Estonia)',
      englishName: 'Estonian (Estonia)',
    },
    eu: {
      nativeName: 'Euskara',
      englishName: 'Basque',
    },
    'eu-ES': {
      nativeName: 'Euskara',
      englishName: 'Basque',
    },
    fa: {
      nativeName: 'فارسی',
      englishName: 'Persian',
    },
    'fa-IR': {
      nativeName: 'فارسی',
      englishName: 'Persian',
    },
    'fb-LT': {
      nativeName: 'Leet Speak',
      englishName: 'Leet',
    },
    ff: {
      nativeName: 'Fulah',
      englishName: 'Fulah',
    },
    fi: {
      nativeName: 'Suomi',
      englishName: 'Finnish',
    },
    'fi-FI': {
      nativeName: 'Suomi',
      englishName: 'Finnish',
    },
    fj: { nativeName: 'Fiji', englishName: 'Fiji' },
    fo: { nativeName: 'Føroyska', englishName: 'Faroese' },
    'fo-FO': {
      nativeName: 'Føroyskt',
      englishName: 'Faroese',
    },
    fr: {
      nativeName: 'Français',
      englishName: 'French',
    },
    'fr-CA': {
      nativeName: 'Français (Canada)',
      englishName: 'French (Canada)',
    },
    'fr-FR': {
      nativeName: 'Français (France)',
      englishName: 'French (France)',
    },
    'fr-BE': {
      nativeName: 'Français (Belgique)',
      englishName: 'French (Belgium)',
    },
    'fr-CH': {
      nativeName: 'Français (Suisse)',
      englishName: 'French (Switzerland)',
    },
    fy: { nativeName: 'Frysk', englishName: 'Frisian' },
    'fy-NL': {
      nativeName: 'Frysk',
      englishName: 'Frisian (West)',
    },
    ga: {
      nativeName: 'Gaeilge',
      englishName: 'Irish',
    },
    'ga-IE': {
      nativeName: 'Gaeilge',
      englishName: 'Irish',
    },
    gd: {
      nativeName: 'Gàidhlig',
      englishName: 'Gaelic',
    },
    gl: {
      nativeName: 'Galego',
      englishName: 'Galician',
    },
    'gl-ES': {
      nativeName: 'Galego',
      englishName: 'Galician',
    },
    gn: { nativeName: 'Guarani', englishName: 'Guarani' },
    'gn-PY': {
      nativeName: "Avañe'ẽ",
      englishName: 'Guarani',
    },
    gu: { nativeName: 'ગુજરાતી', englishName: 'Gujarati' },
    'gu-IN': {
      nativeName: 'ગુજરાતી',
      englishName: 'Gujarati',
    },
    gv: {
      nativeName: 'Gaelg',
      englishName: 'Manx',
    },
    'gx-GR': {
      nativeName: 'Ἑλληνική ἀρχαία',
      englishName: 'Classical Greek',
    },
    ha: { nativeName: 'هَوُس', englishName: 'Hausa' },
    he: {
      nativeName: 'עברית‏',
      englishName: 'Hebrew',
    },
    'he-IL': {
      nativeName: 'עברית‏',
      englishName: 'Hebrew',
    },
    hi: {
      nativeName: 'हिन्दी',
      englishName: 'Hindi',
    },
    'hi-IN': {
      nativeName: 'हिन्दी',
      englishName: 'Hindi',
    },
    ho: { nativeName: 'Hiri Motu', englishName: 'Hiri Motu' },
    hr: {
      nativeName: 'Hrvatski',
      englishName: 'Croatian',
    },
    'hr-HR': {
      nativeName: 'Hrvatski',
      englishName: 'Croatian',
    },
    hsb: {
      nativeName: 'Hornjoserbšćina',
      englishName: 'Upper Sorbian',
    },
    ht: {
      nativeName: 'Kreyòl',
      englishName: 'Haitian Creole',
    },
    hu: {
      nativeName: 'Magyar',
      englishName: 'Hungarian',
    },
    'hu-HU': {
      nativeName: 'Magyar',
      englishName: 'Hungarian',
    },
    hy: { nativeName: 'Հայերէն', englishName: 'Armenian' },
    'hy-AM': {
      nativeName: 'Հայերեն',
      englishName: 'Armenian',
    },
    hz: { nativeName: 'Otjiherero', englishName: 'Herero' },
    ia: { nativeName: 'Interlingua', englishName: 'Interlingua' },
    id: {
      nativeName: 'Bahasa Indonesia',
      englishName: 'Indonesian',
    },
    'id-ID': {
      nativeName: 'Bahasa Indonesia',
      englishName: 'Indonesian',
    },
    ie: { nativeName: 'Interlingue', englishName: 'Interlingue' },
    ig: { nativeName: 'Asụsụ Igbo', englishName: 'Igbo' },
    ii: { nativeName: 'Nuosu', englishName: 'Nuosu' },
    ik: { nativeName: 'Iñupiaq', englishName: 'Inupiak' },
    io: { nativeName: 'Ido', englishName: 'Ido' },
    is: {
      nativeName: 'Íslenska',
      englishName: 'Icelandic',
    },
    'is-IS': {
      nativeName: 'Íslenska (Iceland)',
      englishName: 'Icelandic (Iceland)',
    },
    it: {
      nativeName: 'Italiano',
      englishName: 'Italian',
    },
    'it-IT': {
      nativeName: 'Italiano',
      englishName: 'Italian',
    },
    iu: { nativeName: 'ᐃᓄᒃᑎᑐᑦ', englishName: 'Inuktitut' },
    ja: {
      nativeName: '日本語',
      englishName: 'Japanese',
    },
    'ja-JP': {
      nativeName: '日本語 (日本)',
      englishName: 'Japanese (Japan)',
    },
    jv: { nativeName: 'Javanese', englishName: 'basa Jawa' },
    'jv-ID': {
      nativeName: 'Basa Jawa',
      englishName: 'Javanese',
    },
    ka: { nativeName: 'ქართული', englishName: 'Georgian' },
    'ka-GE': {
      nativeName: 'ქართული',
      englishName: 'Georgian',
    },
    kab: {
      nativeName: 'Taqbaylit',
      englishName: 'Kabyle',
    },
    kg: { nativeName: 'KiKongo', englishName: 'Kongo' },
    ki: { nativeName: 'Gĩkũyũ', englishName: 'Kikuyu' },
    kj: { nativeName: 'Kuanyama', englishName: 'Kwanyama' },
    kk: { nativeName: 'ﻗﺎﺯﺍﻗﺸﺎ', englishName: 'Kazakh' },
    'kk-KZ': {
      nativeName: 'Қазақша',
      englishName: 'Kazakh',
    },
    kl: { nativeName: 'Greenlandic', englishName: 'Greenlandic' },
    km: {
      nativeName: 'ភាសាខ្មែរ',
      englishName: 'Khmer',
    },
    'km-KH': {
      nativeName: 'ភាសាខ្មែរ',
      englishName: 'Khmer',
    },
    kn: {
      nativeName: 'ಕನ್ನಡ',
      englishName: 'Kannada',
    },
    'kn-IN': {
      nativeName: 'ಕನ್ನಡ (India)',
      englishName: 'Kannada (India)',
    },
    ko: {
      nativeName: '한국어',
      englishName: 'Korean',
    },
    'ko-KR': {
      nativeName: '한국어 (한국)',
      englishName: 'Korean (Korea)',
    },
    kr: { nativeName: 'Kanuri', englishName: 'Kanuri' },
    ks: { nativeName: 'काऽशुर', englishName: 'Kashmiri' },
    ku: { nativeName: 'Kurdí', englishName: 'Kurdish' },
    'ku-TR': {
      nativeName: 'Kurdî',
      englishName: 'Kurdish',
    },
    kv: { nativeName: 'коми кыв', englishName: 'Komi' },
    kw: {
      nativeName: 'Kernewek',
      englishName: 'Cornish',
    },
    ky: { nativeName: 'Кыргыз', englishName: 'Kirghiz' },
    la: {
      nativeName: 'Latin',
      englishName: 'Latin',
    },
    'la-VA': {
      nativeName: 'Latin',
      englishName: 'Latin',
    },
    lb: {
      nativeName: 'Lëtzebuergesch',
      englishName: 'Luxembourgish',
    },
    lg: { nativeName: 'Luganda', englishName: 'Ganda' },
    li: { nativeName: 'Limburgs', englishName: 'Limburgish' },
    'li-NL': {
      nativeName: 'Lèmbörgs',
      englishName: 'Limburgish',
    },
    ln: { nativeName: 'Lingala', englishName: 'Lingala' },
    lo: { nativeName: 'ພາສາລາວ', englishName: 'Laotian' },
    lt: {
      nativeName: 'Lietuvių',
      englishName: 'Lithuanian',
    },
    'lt-LT': {
      nativeName: 'Lietuvių',
      englishName: 'Lithuanian',
    },
    lu: { nativeName: 'Tshiluba', englishName: 'Luba-Katanga' },
    lv: {
      nativeName: 'Latviešu',
      englishName: 'Latvian',
    },
    'lv-LV': {
      nativeName: 'Latviešu',
      englishName: 'Latvian',
    },
    mai: {
      nativeName: 'मैथिली, মৈথিলী',
      englishName: 'Maithili',
    },
    mg: { nativeName: 'Malagasy', englishName: 'Madagascarian' },
    'mg-MG': {
      nativeName: 'Malagasy',
      englishName: 'Malagasy',
    },
    mh: { nativeName: 'Kajin M̧ajeļ', englishName: 'Marshallese' },
    mi: { nativeName: 'Maori', englishName: 'Maori' },
    mk: {
      nativeName: 'Македонски',
      englishName: 'Macedonian',
    },
    'mk-MK': {
      nativeName: 'Македонски (Македонски)',
      englishName: 'Macedonian (Macedonian)',
    },
    ml: {
      nativeName: 'മലയാളം',
      englishName: 'Malayalam',
    },
    'ml-IN': {
      nativeName: 'മലയാളം',
      englishName: 'Malayalam',
    },
    mn: { nativeName: 'Монгол', englishName: 'Mongolian' },
    'mn-MN': {
      nativeName: 'Монгол',
      englishName: 'Mongolian',
    },
    mo: { nativeName: 'Moldavian', englishName: 'Moldavian' },
    mr: {
      nativeName: 'मराठी',
      englishName: 'Marathi',
    },
    'mr-IN': {
      nativeName: 'मराठी',
      englishName: 'Marathi',
    },
    ms: {
      nativeName: 'Bahasa Melayu',
      englishName: 'Malay',
    },
    'ms-MY': {
      nativeName: 'Bahasa Melayu',
      englishName: 'Malay',
    },
    mt: {
      nativeName: 'Malti',
      englishName: 'Maltese',
    },
    'mt-MT': {
      nativeName: 'Malti',
      englishName: 'Maltese',
    },
    my: {
      nativeName: 'ဗမာစကာ',
      englishName: 'Burmese',
    },
    na: { nativeName: 'Nauru', englishName: 'Nauruan' },
    nb: {
      nativeName: 'Norsk (bokmål)',
      englishName: 'Norwegian (bokmal)',
    },
    'nb-NO': {
      nativeName: 'Norsk (bokmål)',
      englishName: 'Norwegian (bokmal)',
    },
    nd: { nativeName: 'Ndebele (North)', englishName: 'Ndebele (North)' },
    ne: {
      nativeName: 'नेपाली',
      englishName: 'Nepali',
    },
    'ne-NP': {
      nativeName: 'नेपाली',
      englishName: 'Nepali',
    },
    ng: { nativeName: 'Owambo', englishName: 'Ndonga' },

    nl: {
      nativeName: 'Nederlands',
      englishName: 'Dutch',
    },
    'nl-BE': {
      nativeName: 'Nederlands (België)',
      englishName: 'Dutch (Belgium)',
    },
    'nl-NL': {
      nativeName: 'Nederlands (Nederland)',
      englishName: 'Dutch (Netherlands)',
    },
    nn: { nativeName: 'Nynorsk', englishName: 'Nynorsk' },
    'nn-NO': {
      nativeName: 'Norsk (nynorsk)',
      englishName: 'Norwegian (nynorsk)',
    },
    no: {
      nativeName: 'Norsk',
      englishName: 'Norwegian',
    },
    nr: { nativeName: 'IsiNdebele', englishName: 'Ndebele (South)' },
    nv: { nativeName: 'Diné bizaad', englishName: 'Navajo' },
    ny: { nativeName: 'chiCheŵa', englishName: 'Chichewa' },
    oc: {
      nativeName: 'Occitan',
      englishName: 'Occitan',
    },
    oj: { nativeName: 'ᐊᓂᔑᓈᐯᒧᐎᓐ', englishName: 'Ojibwe' },
    om: { nativeName: 'Oromo', englishName: 'Oromo' },
    or: { nativeName: 'ଓଡ଼ିଆ', englishName: 'Oriya' },
    'or-IN': {
      nativeName: 'ଓଡ଼ିଆ',
      englishName: 'Oriya',
    },
    os: { nativeName: 'ирон æвзаг', englishName: 'Ossetian' },
    pa: {
      nativeName: 'ਪੰਜਾਬੀ',
      englishName: 'Punjabi',
    },
    'pa-IN': {
      nativeName: 'ਪੰਜਾਬੀ (ਭਾਰਤ ਨੂੰ)',
      englishName: 'Punjabi (India)',
    },
    pi: { nativeName: 'पाऴि', englishName: 'Pāli' },
    pl: {
      nativeName: 'Polski',
      englishName: 'Polish',
    },
    'pl-PL': {
      nativeName: 'Polski',
      englishName: 'Polish',
    },
    ps: { nativeName: 'پښتو', englishName: 'Pashto' },
    'ps-AF': {
      nativeName: 'پښتو',
      englishName: 'Pashto',
    },
    pt: {
      nativeName: 'Português',
      englishName: 'Portuguese',
    },
    'pt-BR': {
      nativeName: 'Português (Brasil)',
      englishName: 'Portuguese (Brazil)',
    },
    'pt-PT': {
      nativeName: 'Português (Portugal)',
      englishName: 'Portuguese (Portugal)',
    },
    qu: { nativeName: 'Quechua', englishName: 'Quechua' },
    'qu-PE': {
      nativeName: 'Qhichwa',
      englishName: 'Quechua',
    },
    'rm-CH': {
      nativeName: 'Rumantsch',
      englishName: 'Romansh',
    },
    ro: {
      nativeName: 'Română',
      englishName: 'Romanian',
    },
    'ro-RO': {
      nativeName: 'Română',
      englishName: 'Romanian',
    },
    rm: { nativeName: 'Rhaeto-Romance', englishName: 'Rhaeto-Romance' },
    rn: { nativeName: 'Kirundi', englishName: 'Kirundi' },
    ru: {
      nativeName: 'Русский',
      englishName: 'Russian',
    },
    'ru-RU': {
      nativeName: 'Русский',
      englishName: 'Russian',
    },
    rw: { nativeName: 'Kinyarwanda', englishName: 'Kinyarwanda' },
    sa: { nativeName: 'संस्कृत', englishName: 'Sanskrit' },
    'sa-IN': {
      nativeName: 'संस्कृतम्',
      englishName: 'Sanskrit',
    },
    sc: { nativeName: 'sardu', englishName: 'Sardinian' },
    sd: { nativeName: 'سنڌي', englishName: 'Sindhi' },
    se: { nativeName: 'Northern Sámi', englishName: 'Northern Sámi' },
    'se-NO': {
      nativeName: 'Davvisámegiella',
      englishName: 'Northern Sámi',
    },
    sg: { nativeName: 'Sangho', englishName: 'Sangho' },
    sh: {
      nativeName: 'српскохрватски',
      englishName: 'Serbo-Croatian',
    },
    si: { nativeName: 'Singhalese', englishName: 'Singhalese' },
    'si-LK': {
      nativeName: 'පළාත',
      englishName: 'Sinhala (Sri Lanka)',
    },
    sk: {
      nativeName: 'Slovenčina',
      englishName: 'Slovak',
    },
    'sk-SK': {
      nativeName: 'Slovenčina (Slovakia)',
      englishName: 'Slovak (Slovakia)',
    },
    sl: {
      nativeName: 'Slovenščina',
      englishName: 'Slovenian',
    },
    'sl-SI': {
      nativeName: 'Slovenščina',
      englishName: 'Slovenian',
    },
    sm: { nativeName: 'Samoan', englishName: 'Samoan' },
    sn: { nativeName: 'Shona', englishName: 'Shona' },
    'so-SO': {
      nativeName: 'Soomaaliga',
      englishName: 'Somali',
    },
    so: { nativeName: 'Somali', englishName: 'Somali' },
    sq: {
      nativeName: 'Shqip',
      englishName: 'Albanian',
    },
    'sq-AL': {
      nativeName: 'Shqip',
      englishName: 'Albanian',
    },
    sr: {
      nativeName: 'Српски',
      englishName: 'Serbian',
    },
    'sr-RS': {
      nativeName: 'Српски (Serbia)',
      englishName: 'Serbian (Serbia)',
    },
    ss: { nativeName: 'SiSwati', englishName: 'Swati' },
    st: { nativeName: 'Sesotho', englishName: 'Southern Sotho' },
    su: {
      nativeName: 'Basa Sunda',
      englishName: 'Sundanese',
    },
    sv: {
      nativeName: 'Svenska',
      englishName: 'Swedish',
    },
    'sv-SE': {
      nativeName: 'Svenska',
      englishName: 'Swedish',
    },
    sw: {
      nativeName: 'Kiswahili',
      englishName: 'Swahili',
    },
    'sw-KE': {
      nativeName: 'Kiswahili',
      englishName: 'Swahili (Kenya)',
    },
    ta: {
      nativeName: 'தமிழ்',
      englishName: 'Tamil',
    },
    'ta-IN': {
      nativeName: 'தமிழ்',
      englishName: 'Tamil',
    },
    te: {
      nativeName: 'తెలుగు',
      englishName: 'Telugu',
    },
    'te-IN': {
      nativeName: 'తెలుగు',
      englishName: 'Telugu',
    },
    tg: {
      nativeName: 'забо́ни тоҷикӣ́',
      englishName: 'Tajik',
    },
    'tg-TJ': {
      nativeName: 'тоҷикӣ',
      englishName: 'Tajik',
    },
    th: {
      nativeName: 'ภาษาไทย',
      englishName: 'Thai',
    },
    'th-TH': {
      nativeName: 'ภาษาไทย (ประเทศไทย)',
      englishName: 'Thai (Thailand)',
    },
    ti: { nativeName: 'ትግርኛ', englishName: 'Tigrinya' },
    tk: { nativeName: 'түркmенче', englishName: 'Turkmen' },
    tl: {
      nativeName: 'Filipino',
      englishName: 'Filipino',
    },
    'tl-PH': {
      nativeName: 'Filipino',
      englishName: 'Filipino',
    },
    tlh: {
      nativeName: 'tlhIngan-Hol',
      englishName: 'Klingon',
    },
    tn: { nativeName: 'Setswana', englishName: 'Tswana' },
    to: { nativeName: 'Tonga', englishName: 'Tonga' },
    tr: {
      nativeName: 'Türkçe',
      englishName: 'Turkish',
    },
    'tr-TR': {
      nativeName: 'Türkçe',
      englishName: 'Turkish',
    },
    ts: { nativeName: 'Xitsonga', englishName: 'Tsonga' },
    tt: { nativeName: 'татарча', englishName: 'Tatar' },
    'tt-RU': {
      nativeName: 'татарча',
      englishName: 'Tatar',
    },
    tw: { nativeName: 'Twi', englishName: 'Twi' },
    ty: { nativeName: 'Reo Tahiti', englishName: 'Tahitian' },
    uk: {
      nativeName: 'Українська',
      englishName: 'Ukrainian',
    },
    'uk-UA': {
      nativeName: 'Українська',
      englishName: 'Ukrainian',
    },
    ug: { nativeName: 'Uigur', englishName: 'Uigur' },
    ur: {
      nativeName: 'اردو',
      englishName: 'Urdu',
    },
    'ur-PK': {
      nativeName: 'اردو',
      englishName: 'Urdu',
    },
    uz: {
      nativeName: "O'zbek",
      englishName: 'Uzbek',
    },
    'uz-UZ': {
      nativeName: "O'zbek",
      englishName: 'Uzbek',
    },
    ve: { nativeName: 'Tshivenḓa', englishName: 'Venda' },
    vi: {
      nativeName: 'Tiếng Việt',
      englishName: 'Vietnamese',
    },
    'vi-VN': {
      nativeName: 'Tiếng Việt',
      englishName: 'Vietnamese',
    },
    vk: { nativeName: 'Ovalingo', englishName: 'Viking' },
    vo: { nativeName: 'Volapük', englishName: 'Volapük' },
    wa: { nativeName: 'Walon', englishName: 'Walloon' },
    wo: { nativeName: 'Wolof', englishName: 'Wolof' },
    xh: { nativeName: 'IsiXhosa', englishName: 'Xhosa' },
    'xh-ZA': {
      nativeName: 'isiXhosa',
      englishName: 'Xhosa',
    },
    yi: {
      nativeName: 'ייִדיש',
      englishName: 'Yiddish',
    },
    'yi-DE': {
      nativeName: 'ייִדיש (German)',
      englishName: 'Yiddish (German)',
    },
    yo: { nativeName: 'Yorùbá', englishName: 'Yorouba' },
    za: { nativeName: 'Zhuang', englishName: 'Zhuang' },
    zh: {
      nativeName: '中文',
      englishName: 'Chinese',
    },
    'zh-Hans': {
      nativeName: '中文简体',
      englishName: 'Chinese Simplified',
    },
    'zh-Hant': {
      nativeName: '中文繁體',
      englishName: 'Chinese Traditional',
    },
    'zh-CN': {
      nativeName: '中文（中国）',
      englishName: 'Chinese Simplified (China)',
    },
    'zh-HK': {
      nativeName: '中文（香港）',
      englishName: 'Chinese Traditional (Hong Kong)',
    },
    'zh-SG': {
      nativeName: '中文（新加坡）',
      englishName: 'Chinese Simplified (Singapore)',
    },
    'zh-TW': {
      nativeName: '中文（台灣）',
      englishName: 'Chinese Traditional (Taiwan)',
    },
    zu: { nativeName: 'IsiZulu', englishName: 'Zulu' },
    'zu-ZA': {
      nativeName: 'isiZulu',
      englishName: 'Zulu',
    },
  },
  {
    get: function (obj, lang) {
      if (lang.includes('-')) {
        lang = lang.split('-');
        lang = `${lang[0]}-${lang[1].toUpperCase()}`;
      } else if (lang.includes('_')) {
        lang = lang.split('_');
        lang = `${lang[0]}-${lang[1].toUpperCase()}`;
      }
      return obj[lang];
    },
  },
);

export default langmap;

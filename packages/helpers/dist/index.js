// src/primitives.ts
var isEmpty = (obj) => (Array.isArray(obj) || obj instanceof Object) && !Object.entries(obj || {}).length;
function isDeepEqual(left, right) {
  if (Object.is(left, right)) return true;
  if (typeof left !== "object" || typeof right !== "object" || left === null || right === null) {
    return false;
  }
  if (Array.isArray(left) || Array.isArray(right)) {
    if (!Array.isArray(left) || !Array.isArray(right)) return false;
    if (left.length !== right.length) return false;
    for (let i = 0; i < left.length; i += 1) {
      if (!isDeepEqual(left[i], right[i])) return false;
    }
    return true;
  }
  const leftEntries = Object.entries(left);
  const rightEntries = Object.entries(right);
  if (leftEntries.length !== rightEntries.length) return false;
  for (const [key, value] of leftEntries) {
    if (!(key in right)) return false;
    if (!isDeepEqual(value, right[key])) {
      return false;
    }
  }
  return true;
}

// src/atoms.ts
import { useCallback } from "react";
import { useHydrateAtoms } from "jotai/utils";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { focusAtom } from "jotai-optics";
var InitAtoms = ({
  atomValues,
  children
}) => {
  useHydrateAtoms(new Map(atomValues));
  return children;
};
function useFieldFocusAtom(anAtom, field) {
  return focusAtom(
    anAtom,
    // @ts-expect-error https://github.com/jotaijs/jotai-optics/issues/6
    useCallback((optic) => optic.prop(field), [field])
  );
}
function useFieldFocusedAtom(atom, field) {
  return useAtom(
    focusAtom(
      atom,
      // @ts-expect-error https://github.com/jotaijs/jotai-optics/issues/6
      useCallback(
        (optic) => optic.prop(field),
        [field]
      )
    )
  );
}
function useSetFieldFocusedAtom(atom, field) {
  return useSetAtom(
    focusAtom(
      atom,
      // @ts-expect-error https://github.com/jotaijs/jotai-optics/issues/6
      useCallback(
        (optic) => optic.prop(field),
        [field]
      )
    )
  );
}
function useFieldValueFocusedAtom(atom, field) {
  return useAtomValue(
    focusAtom(
      atom,
      // @ts-expect-error https://github.com/jotaijs/jotai-optics/issues/6
      useCallback(
        (optic) => optic.prop(field),
        [field]
      )
    )
  );
}

// src/blocks.ts
function hasBlocksData(content) {
  return Object.keys(content).find(
    (key) => key !== "volto.blocks" && key.endsWith("blocks")
  ) !== void 0;
}

// src/contents.ts
import config from "@plone/registry";
var getContentIcon = (contentType, isFolderish = false) => {
  const { settings } = config;
  const { contentIcons = {} } = settings;
  let icon = isFolderish ? contentIcons.Folder : contentIcons.File;
  if (contentType in contentIcons) icon = contentIcons[contentType];
  return icon;
};

// src/flattenToAppURL.ts
import config2 from "@plone/registry";
function flattenToAppURL(data) {
  let stringData = JSON.stringify(data);
  stringData = stringData.replaceAll(`${config2.settings.apiPath}/`, "/");
  stringData = stringData.replaceAll(config2.settings.apiPath, "/");
  return JSON.parse(stringData);
}

// src/isInternalURL.ts
import config3 from "@plone/registry";
function isInternalURL(url) {
  if (!url) return false;
  if (url.startsWith("/") || url.startsWith(".") || url.startsWith("#")) {
    return true;
  }
  const settings = config3.settings ?? {};
  const apiPath = settings.apiPath;
  if (apiPath) {
    try {
      const urlOrigin = new URL(url).origin;
      const apiOrigin = new URL(apiPath).origin;
      return urlOrigin === apiOrigin;
    } catch {
      return false;
    }
  }
  return false;
}

// src/languageMap.ts
var langmap = new Proxy(
  {
    aa: { nativeName: "\u043C\u0430\u0433I\u0430\u0440\u0443\u043B \u043C\u0430\u0446I", englishName: "Afar" },
    ab: { nativeName: "\u0431\u044B\u0437\u0448\u04D9\u0430", englishName: "Abkhazian" },
    ach: { nativeName: "Lwo", englishName: "Acholi" },
    ady: { nativeName: "\u0410\u0434\u044B\u0433\u044D\u0431\u0437\u044D", englishName: "Adyghe" },
    ae: { nativeName: "avesta", englishName: "Avestan" },
    af: { nativeName: "Afrikaans", englishName: "Afrikaans" },
    "af-NA": {
      nativeName: "Afrikaans (Namibia)",
      englishName: "Afrikaans (Namibia)"
    },
    "af-ZA": {
      nativeName: "Afrikaans (South Africa)",
      englishName: "Afrikaans (South Africa)"
    },
    ak: { nativeName: "T\u0255\u0265i", englishName: "Akan" },
    am: { nativeName: "\u12A0\u121B\u122D\u129B", englishName: "Amharic" },
    an: { nativeName: "aragon\xE9s", englishName: "Aragonese" },
    ar: { nativeName: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", englishName: "Arabic" },
    "ar-AR": { nativeName: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", englishName: "Arabic" },
    "ar-MA": { nativeName: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", englishName: "Arabic (Morocco)" },
    "ar-SA": {
      nativeName: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629)",
      englishName: "Arabic (Saudi Arabia)"
    },
    as: { nativeName: "\u0985\u09B8\u09AE\u09BF\u09DF\u09BE", englishName: "Assamese" },
    ay: { nativeName: "Aymara", englishName: "Aymara" },
    "ay-BO": { nativeName: "Aymar aru", englishName: "Aymara" },
    az: { nativeName: "Az\u0259rbaycan dili", englishName: "Azerbaijani" },
    "az-AZ": { nativeName: "Az\u0259rbaycan dili", englishName: "Azerbaijani" },
    ba: { nativeName: "Bashkir", englishName: "Bashkir" },
    "be-BY": { nativeName: "\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F", englishName: "Belarusian" },
    bg: { nativeName: "\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438", englishName: "Bulgarian" },
    "bg-BG": { nativeName: "\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438", englishName: "Bulgarian" },
    be: { nativeName: "\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0456", englishName: "Belarussian" },
    bh: { nativeName: "Bihari", englishName: "Bihari" },
    bi: { nativeName: "Bislama", englishName: "Bislama" },
    bm: { nativeName: "bamanankan", englishName: "Bambara" },
    bn: { nativeName: "\u09AC\u09BE\u0982\u09B2\u09BE", englishName: "Bengali" },
    "bn-IN": { nativeName: "\u09AC\u09BE\u0982\u09B2\u09BE (\u09AD\u09BE\u09B0\u09A4)", englishName: "Bengali (India)" },
    "bn-BD": {
      nativeName: "\u09AC\u09BE\u0982\u09B2\u09BE(\u09AC\u09BE\u0982\u09B2\u09BE\u09A6\u09C7\u09B6)",
      englishName: "Bengali (Bangladesh)"
    },
    bo: { nativeName: "\u0F56\u0F7C\u0F51\u0F0B\u0F66\u0F90\u0F51\u0F0B", englishName: "Tibetan" },
    br: { nativeName: "Brezhoneg", englishName: "Breton" },
    bs: { nativeName: "Bosanski", englishName: "Bosnian" },
    "bs-BA": { nativeName: "Bosanski", englishName: "Bosnian" },
    ca: { nativeName: "Catal\xE0", englishName: "Catalan" },
    "ca-ES": { nativeName: "Catal\xE0", englishName: "Catalan" },
    cak: { nativeName: "Maya Kaqchikel", englishName: "Kaqchikel" },
    "ck-US": { nativeName: "\u13E3\u13B3\u13A9 (tsalagi)", englishName: "Cherokee" },
    ce: { nativeName: "\u043D\u043E\u0445\u0447\u0438\u0439\u043D \u043C\u043E\u0442\u0442", englishName: "Chechen" },
    ch: { nativeName: "Chamoru", englishName: "Chamorro" },
    co: { nativeName: "Corsu", englishName: "Corsican" },
    cr: { nativeName: "\u14C0\u1426\u1403\u152D\u140D\u140F\u1423", englishName: "Cree" },
    cs: { nativeName: "\u010Ce\u0161tina", englishName: "Czech" },
    "cs-CZ": { nativeName: "\u010Ce\u0161tina", englishName: "Czech" },
    cu: { nativeName: "\u0469\u0437\u044B\u043A\u044A \u0441\u043B\u043E\u0432\u0463\u043D\u044C\u0441\u043A\u044A", englishName: "Old Church Slavonic" },
    cv: { nativeName: "\u0447\u04D1\u0432\u0430\u0448 \u0447\u04D7\u043B\u0445\u0438", englishName: "Chuvash" },
    cy: { nativeName: "Cymraeg", englishName: "Welsh" },
    "cy-GB": { nativeName: "Cymraeg", englishName: "Welsh" },
    da: { nativeName: "Dansk", englishName: "Danish" },
    "da-DK": { nativeName: "Dansk", englishName: "Danish" },
    de: { nativeName: "Deutsch", englishName: "German" },
    "de-AT": {
      nativeName: "Deutsch (\xD6sterreich)",
      englishName: "German (Austria)"
    },
    "de-DE": {
      nativeName: "Deutsch (Deutschland)",
      englishName: "German (Germany)"
    },
    "de-CH": {
      nativeName: "Deutsch (Schweiz)",
      englishName: "German (Switzerland)"
    },
    dsb: { nativeName: "Dolnoserb\u0161\u0107ina", englishName: "Lower Sorbian" },
    dv: { nativeName: "Divehi", englishName: "Maldivian" },
    dz: { nativeName: "Bhutani", englishName: "Indian Bhutani" },
    ee: { nativeName: "E\u028Begbe", englishName: "Ewe" },
    el: { nativeName: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC", englishName: "Greek" },
    "el-GR": { nativeName: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC", englishName: "Greek (Greece)" },
    en: { nativeName: "English", englishName: "English" },
    "en-GB": { nativeName: "English (UK)", englishName: "English (UK)" },
    "en-AU": {
      nativeName: "English (Australia)",
      englishName: "English (Australia)"
    },
    "en-CA": {
      nativeName: "English (Canada)",
      englishName: "English (Canada)"
    },
    "en-IE": {
      nativeName: "English (Ireland)",
      englishName: "English (Ireland)"
    },
    "en-IN": { nativeName: "English (India)", englishName: "English (India)" },
    "en-PI": {
      nativeName: "English (Pirate)",
      englishName: "English (Pirate)"
    },
    "en-UD": {
      nativeName: "English (Upside Down)",
      englishName: "English (Upside Down)"
    },
    "en-US": { nativeName: "English (US)", englishName: "English (US)" },
    "en-ZA": {
      nativeName: "English (South Africa)",
      englishName: "English (South Africa)"
    },
    "en@pirate": {
      nativeName: "English (Pirate)",
      englishName: "English (Pirate)"
    },
    eo: { nativeName: "Esperanto", englishName: "Esperanto" },
    "eo-EO": { nativeName: "Esperanto", englishName: "Esperanto" },
    es: { nativeName: "Espa\xF1ol", englishName: "Spanish" },
    "es-AR": {
      nativeName: "Espa\xF1ol (Argentine)",
      englishName: "Spanish (Argentina)"
    },
    "es-419": {
      nativeName: "Espa\xF1ol (Latinoam\xE9rica)",
      englishName: "Spanish (Latin America)"
    },
    "es-CL": { nativeName: "Espa\xF1ol (Chile)", englishName: "Spanish (Chile)" },
    "es-CO": {
      nativeName: "Espa\xF1ol (Colombia)",
      englishName: "Spanish (Colombia)"
    },
    "es-EC": {
      nativeName: "Espa\xF1ol (Ecuador)",
      englishName: "Spanish (Ecuador)"
    },
    "es-ES": { nativeName: "Espa\xF1ol (Espa\xF1a)", englishName: "Spanish (Spain)" },
    "es-LA": {
      nativeName: "Espa\xF1ol (Latinoam\xE9rica)",
      englishName: "Spanish (Latin America)"
    },
    "es-NI": {
      nativeName: "Espa\xF1ol (Nicaragua)",
      englishName: "Spanish (Nicaragua)"
    },
    "es-MX": {
      nativeName: "Espa\xF1ol (M\xE9xico)",
      englishName: "Spanish (Mexico)"
    },
    "es-US": {
      nativeName: "Espa\xF1ol (Estados Unidos)",
      englishName: "Spanish (United States)"
    },
    "es-VE": {
      nativeName: "Espa\xF1ol (Venezuela)",
      englishName: "Spanish (Venezuela)"
    },
    "et-EE": {
      nativeName: "Eesti (Estonia)",
      englishName: "Estonian (Estonia)"
    },
    eu: { nativeName: "Euskara", englishName: "Basque" },
    "eu-ES": { nativeName: "Euskara", englishName: "Basque" },
    fa: { nativeName: "\u0641\u0627\u0631\u0633\u06CC", englishName: "Persian" },
    "fa-IR": { nativeName: "\u0641\u0627\u0631\u0633\u06CC", englishName: "Persian" },
    "fb-LT": { nativeName: "Leet Speak", englishName: "Leet" },
    ff: { nativeName: "Fulah", englishName: "Fulah" },
    fi: { nativeName: "Suomi", englishName: "Finnish" },
    "fi-FI": { nativeName: "Suomi", englishName: "Finnish" },
    fj: { nativeName: "Fiji", englishName: "Fiji" },
    fo: { nativeName: "F\xF8royska", englishName: "Faroese" },
    "fo-FO": { nativeName: "F\xF8royskt", englishName: "Faroese" },
    fr: { nativeName: "Fran\xE7ais", englishName: "French" },
    "fr-CA": {
      nativeName: "Fran\xE7ais (Canada)",
      englishName: "French (Canada)"
    },
    "fr-FR": {
      nativeName: "Fran\xE7ais (France)",
      englishName: "French (France)"
    },
    "fr-BE": {
      nativeName: "Fran\xE7ais (Belgique)",
      englishName: "French (Belgium)"
    },
    "fr-CH": {
      nativeName: "Fran\xE7ais (Suisse)",
      englishName: "French (Switzerland)"
    },
    fy: { nativeName: "Frysk", englishName: "Frisian" },
    "fy-NL": { nativeName: "Frysk", englishName: "Frisian (West)" },
    ga: { nativeName: "Gaeilge", englishName: "Irish" },
    "ga-IE": { nativeName: "Gaeilge", englishName: "Irish" },
    gd: { nativeName: "G\xE0idhlig", englishName: "Gaelic" },
    gl: { nativeName: "Galego", englishName: "Galician" },
    "gl-ES": { nativeName: "Galego", englishName: "Galician" },
    gn: { nativeName: "Guarani", englishName: "Guarani" },
    "gn-PY": { nativeName: "Ava\xF1e'\u1EBD", englishName: "Guarani" },
    gu: { nativeName: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0", englishName: "Gujarati" },
    "gu-IN": { nativeName: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0", englishName: "Gujarati" },
    gv: { nativeName: "Gaelg", englishName: "Manx" },
    "gx-GR": { nativeName: "\u1F19\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AE \u1F00\u03C1\u03C7\u03B1\u03AF\u03B1", englishName: "Classical Greek" },
    ha: { nativeName: "\u0647\u064E\u0648\u064F\u0633", englishName: "Hausa" },
    he: { nativeName: "\u05E2\u05D1\u05E8\u05D9\u05EA\u200F", englishName: "Hebrew" },
    "he-IL": { nativeName: "\u05E2\u05D1\u05E8\u05D9\u05EA\u200F", englishName: "Hebrew" },
    hi: { nativeName: "\u0939\u093F\u0928\u094D\u0926\u0940", englishName: "Hindi" },
    "hi-IN": { nativeName: "\u0939\u093F\u0928\u094D\u0926\u0940", englishName: "Hindi" },
    ho: { nativeName: "Hiri Motu", englishName: "Hiri Motu" },
    hr: { nativeName: "Hrvatski", englishName: "Croatian" },
    "hr-HR": { nativeName: "Hrvatski", englishName: "Croatian" },
    hsb: { nativeName: "Hornjoserb\u0161\u0107ina", englishName: "Upper Sorbian" },
    ht: { nativeName: "Krey\xF2l", englishName: "Haitian Creole" },
    hu: { nativeName: "Magyar", englishName: "Hungarian" },
    "hu-HU": { nativeName: "Magyar", englishName: "Hungarian" },
    hy: { nativeName: "\u0540\u0561\u0575\u0565\u0580\u0567\u0576", englishName: "Armenian" },
    "hy-AM": { nativeName: "\u0540\u0561\u0575\u0565\u0580\u0565\u0576", englishName: "Armenian" },
    hz: { nativeName: "Otjiherero", englishName: "Herero" },
    ia: { nativeName: "Interlingua", englishName: "Interlingua" },
    id: { nativeName: "Bahasa Indonesia", englishName: "Indonesian" },
    "id-ID": { nativeName: "Bahasa Indonesia", englishName: "Indonesian" },
    ie: { nativeName: "Interlingue", englishName: "Interlingue" },
    ig: { nativeName: "As\u1EE5s\u1EE5 Igbo", englishName: "Igbo" },
    ii: { nativeName: "Nuosu", englishName: "Nuosu" },
    ik: { nativeName: "I\xF1upiaq", englishName: "Inupiak" },
    io: { nativeName: "Ido", englishName: "Ido" },
    is: { nativeName: "\xCDslenska", englishName: "Icelandic" },
    "is-IS": {
      nativeName: "\xCDslenska (Iceland)",
      englishName: "Icelandic (Iceland)"
    },
    it: { nativeName: "Italiano", englishName: "Italian" },
    "it-IT": { nativeName: "Italiano", englishName: "Italian" },
    iu: { nativeName: "\u1403\u14C4\u1483\u144E\u1450\u1466", englishName: "Inuktitut" },
    ja: { nativeName: "\u65E5\u672C\u8A9E", englishName: "Japanese" },
    "ja-JP": { nativeName: "\u65E5\u672C\u8A9E (\u65E5\u672C)", englishName: "Japanese (Japan)" },
    jv: { nativeName: "Javanese", englishName: "basa Jawa" },
    "jv-ID": { nativeName: "Basa Jawa", englishName: "Javanese" },
    ka: { nativeName: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8", englishName: "Georgian" },
    "ka-GE": { nativeName: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8", englishName: "Georgian" },
    kab: { nativeName: "Taqbaylit", englishName: "Kabyle" },
    kg: { nativeName: "KiKongo", englishName: "Kongo" },
    ki: { nativeName: "G\u0129k\u0169y\u0169", englishName: "Kikuyu" },
    kj: { nativeName: "Kuanyama", englishName: "Kwanyama" },
    kk: { nativeName: "\uFED7\uFE8E\uFEAF\uFE8D\uFED7\uFEB8\uFE8E", englishName: "Kazakh" },
    "kk-KZ": { nativeName: "\u049A\u0430\u0437\u0430\u049B\u0448\u0430", englishName: "Kazakh" },
    kl: { nativeName: "Greenlandic", englishName: "Greenlandic" },
    km: { nativeName: "\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A", englishName: "Khmer" },
    "km-KH": { nativeName: "\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A", englishName: "Khmer" },
    kn: { nativeName: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1", englishName: "Kannada" },
    "kn-IN": { nativeName: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1 (India)", englishName: "Kannada (India)" },
    ko: { nativeName: "\uD55C\uAD6D\uC5B4", englishName: "Korean" },
    "ko-KR": { nativeName: "\uD55C\uAD6D\uC5B4 (\uD55C\uAD6D)", englishName: "Korean (Korea)" },
    kr: { nativeName: "Kanuri", englishName: "Kanuri" },
    ks: { nativeName: "\u0915\u093E\u093D\u0936\u0941\u0930", englishName: "Kashmiri" },
    ku: { nativeName: "Kurd\xED", englishName: "Kurdish" },
    "ku-TR": { nativeName: "Kurd\xEE", englishName: "Kurdish" },
    kv: { nativeName: "\u043A\u043E\u043C\u0438 \u043A\u044B\u0432", englishName: "Komi" },
    kw: { nativeName: "Kernewek", englishName: "Cornish" },
    ky: { nativeName: "\u041A\u044B\u0440\u0433\u044B\u0437", englishName: "Kirghiz" },
    la: { nativeName: "Latin", englishName: "Latin" },
    "la-VA": { nativeName: "Latin", englishName: "Latin" },
    lb: { nativeName: "L\xEBtzebuergesch", englishName: "Luxembourgish" },
    lg: { nativeName: "Luganda", englishName: "Ganda" },
    li: { nativeName: "Limburgs", englishName: "Limburgish" },
    "li-NL": { nativeName: "L\xE8mb\xF6rgs", englishName: "Limburgish" },
    ln: { nativeName: "Lingala", englishName: "Lingala" },
    lo: { nativeName: "\u0E9E\u0EB2\u0EAA\u0EB2\u0EA5\u0EB2\u0EA7", englishName: "Laotian" },
    lt: { nativeName: "Lietuvi\u0173", englishName: "Lithuanian" },
    "lt-LT": { nativeName: "Lietuvi\u0173", englishName: "Lithuanian" },
    lu: { nativeName: "Tshiluba", englishName: "Luba-Katanga" },
    lv: { nativeName: "Latvie\u0161u", englishName: "Latvian" },
    "lv-LV": { nativeName: "Latvie\u0161u", englishName: "Latvian" },
    mai: { nativeName: "\u092E\u0948\u0925\u093F\u0932\u0940, \u09AE\u09C8\u09A5\u09BF\u09B2\u09C0", englishName: "Maithili" },
    mg: { nativeName: "Malagasy", englishName: "Madagascarian" },
    "mg-MG": { nativeName: "Malagasy", englishName: "Malagasy" },
    mh: { nativeName: "Kajin M\u0327aje\u013C", englishName: "Marshallese" },
    mi: { nativeName: "Maori", englishName: "Maori" },
    mk: { nativeName: "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438", englishName: "Macedonian" },
    "mk-MK": {
      nativeName: "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438 (\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438)",
      englishName: "Macedonian (Macedonian)"
    },
    ml: { nativeName: "\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02", englishName: "Malayalam" },
    "ml-IN": { nativeName: "\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02", englishName: "Malayalam" },
    mn: { nativeName: "\u041C\u043E\u043D\u0433\u043E\u043B", englishName: "Mongolian" },
    "mn-MN": { nativeName: "\u041C\u043E\u043D\u0433\u043E\u043B", englishName: "Mongolian" },
    mo: { nativeName: "Moldavian", englishName: "Moldavian" },
    mr: { nativeName: "\u092E\u0930\u093E\u0920\u0940", englishName: "Marathi" },
    "mr-IN": { nativeName: "\u092E\u0930\u093E\u0920\u0940", englishName: "Marathi" },
    ms: { nativeName: "Bahasa Melayu", englishName: "Malay" },
    "ms-MY": { nativeName: "Bahasa Melayu", englishName: "Malay" },
    mt: { nativeName: "Malti", englishName: "Maltese" },
    "mt-MT": { nativeName: "Malti", englishName: "Maltese" },
    my: { nativeName: "\u1017\u1019\u102C\u1005\u1000\u102C", englishName: "Burmese" },
    na: { nativeName: "Nauru", englishName: "Nauruan" },
    nb: { nativeName: "Norsk (bokm\xE5l)", englishName: "Norwegian (bokmal)" },
    "nb-NO": {
      nativeName: "Norsk (bokm\xE5l)",
      englishName: "Norwegian (bokmal)"
    },
    nd: { nativeName: "Ndebele (North)", englishName: "Ndebele (North)" },
    ne: { nativeName: "\u0928\u0947\u092A\u093E\u0932\u0940", englishName: "Nepali" },
    "ne-NP": { nativeName: "\u0928\u0947\u092A\u093E\u0932\u0940", englishName: "Nepali" },
    ng: { nativeName: "Owambo", englishName: "Ndonga" },
    nl: { nativeName: "Nederlands", englishName: "Dutch" },
    "nl-BE": {
      nativeName: "Nederlands (Belgi\xEB)",
      englishName: "Dutch (Belgium)"
    },
    "nl-NL": {
      nativeName: "Nederlands (Nederland)",
      englishName: "Dutch (Netherlands)"
    },
    nn: { nativeName: "Nynorsk", englishName: "Nynorsk" },
    "nn-NO": {
      nativeName: "Norsk (nynorsk)",
      englishName: "Norwegian (nynorsk)"
    },
    no: { nativeName: "Norsk", englishName: "Norwegian" },
    nr: { nativeName: "IsiNdebele", englishName: "Ndebele (South)" },
    nv: { nativeName: "Din\xE9 bizaad", englishName: "Navajo" },
    ny: { nativeName: "chiChe\u0175a", englishName: "Chichewa" },
    oc: { nativeName: "Occitan", englishName: "Occitan" },
    oj: { nativeName: "\u140A\u14C2\u1511\u14C8\u142F\u14A7\u140E\u14D0", englishName: "Ojibwe" },
    om: { nativeName: "Oromo", englishName: "Oromo" },
    or: { nativeName: "\u0B13\u0B5C\u0B3F\u0B06", englishName: "Oriya" },
    "or-IN": { nativeName: "\u0B13\u0B21\u0B3C\u0B3F\u0B06", englishName: "Oriya" },
    os: { nativeName: "\u0438\u0440\u043E\u043D \xE6\u0432\u0437\u0430\u0433", englishName: "Ossetian" },
    pa: { nativeName: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40", englishName: "Punjabi" },
    "pa-IN": {
      nativeName: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40 (\u0A2D\u0A3E\u0A30\u0A24 \u0A28\u0A42\u0A70)",
      englishName: "Punjabi (India)"
    },
    pi: { nativeName: "\u092A\u093E\u0934\u093F", englishName: "P\u0101li" },
    pl: { nativeName: "Polski", englishName: "Polish" },
    "pl-PL": { nativeName: "Polski", englishName: "Polish" },
    ps: { nativeName: "\u067E\u069A\u062A\u0648", englishName: "Pashto" },
    "ps-AF": { nativeName: "\u067E\u069A\u062A\u0648", englishName: "Pashto" },
    pt: { nativeName: "Portugu\xEAs", englishName: "Portuguese" },
    "pt-BR": {
      nativeName: "Portugu\xEAs (Brasil)",
      englishName: "Portuguese (Brazil)"
    },
    "pt-PT": {
      nativeName: "Portugu\xEAs (Portugal)",
      englishName: "Portuguese (Portugal)"
    },
    qu: { nativeName: "Quechua", englishName: "Quechua" },
    "qu-PE": { nativeName: "Qhichwa", englishName: "Quechua" },
    "rm-CH": { nativeName: "Rumantsch", englishName: "Romansh" },
    ro: { nativeName: "Rom\xE2n\u0103", englishName: "Romanian" },
    "ro-RO": { nativeName: "Rom\xE2n\u0103", englishName: "Romanian" },
    rm: { nativeName: "Rhaeto-Romance", englishName: "Rhaeto-Romance" },
    rn: { nativeName: "Kirundi", englishName: "Kirundi" },
    ru: { nativeName: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439", englishName: "Russian" },
    "ru-RU": { nativeName: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439", englishName: "Russian" },
    rw: { nativeName: "Kinyarwanda", englishName: "Kinyarwanda" },
    sa: { nativeName: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924", englishName: "Sanskrit" },
    "sa-IN": { nativeName: "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D", englishName: "Sanskrit" },
    sc: { nativeName: "sardu", englishName: "Sardinian" },
    sd: { nativeName: "\u0633\u0646\u068C\u064A", englishName: "Sindhi" },
    se: { nativeName: "Northern S\xE1mi", englishName: "Northern S\xE1mi" },
    "se-NO": { nativeName: "Davvis\xE1megiella", englishName: "Northern S\xE1mi" },
    sg: { nativeName: "Sangho", englishName: "Sangho" },
    sh: { nativeName: "\u0441\u0440\u043F\u0441\u043A\u043E\u0445\u0440\u0432\u0430\u0442\u0441\u043A\u0438", englishName: "Serbo-Croatian" },
    si: { nativeName: "Singhalese", englishName: "Singhalese" },
    "si-LK": { nativeName: "\u0DB4\u0DC5\u0DCF\u0DAD", englishName: "Sinhala (Sri Lanka)" },
    sk: { nativeName: "Sloven\u010Dina", englishName: "Slovak" },
    "sk-SK": {
      nativeName: "Sloven\u010Dina (Slovakia)",
      englishName: "Slovak (Slovakia)"
    },
    sl: { nativeName: "Sloven\u0161\u010Dina", englishName: "Slovenian" },
    "sl-SI": { nativeName: "Sloven\u0161\u010Dina", englishName: "Slovenian" },
    sm: { nativeName: "Samoan", englishName: "Samoan" },
    sn: { nativeName: "Shona", englishName: "Shona" },
    "so-SO": { nativeName: "Soomaaliga", englishName: "Somali" },
    so: { nativeName: "Somali", englishName: "Somali" },
    sq: { nativeName: "Shqip", englishName: "Albanian" },
    "sq-AL": { nativeName: "Shqip", englishName: "Albanian" },
    sr: { nativeName: "\u0421\u0440\u043F\u0441\u043A\u0438", englishName: "Serbian" },
    "sr-RS": { nativeName: "\u0421\u0440\u043F\u0441\u043A\u0438 (Serbia)", englishName: "Serbian (Serbia)" },
    ss: { nativeName: "SiSwati", englishName: "Swati" },
    st: { nativeName: "Sesotho", englishName: "Southern Sotho" },
    su: { nativeName: "Basa Sunda", englishName: "Sundanese" },
    sv: { nativeName: "Svenska", englishName: "Swedish" },
    "sv-SE": { nativeName: "Svenska", englishName: "Swedish" },
    sw: { nativeName: "Kiswahili", englishName: "Swahili" },
    "sw-KE": { nativeName: "Kiswahili", englishName: "Swahili (Kenya)" },
    ta: { nativeName: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD", englishName: "Tamil" },
    "ta-IN": { nativeName: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD", englishName: "Tamil" },
    te: { nativeName: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41", englishName: "Telugu" },
    "te-IN": { nativeName: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41", englishName: "Telugu" },
    tg: { nativeName: "\u0437\u0430\u0431\u043E\u0301\u043D\u0438 \u0442\u043E\u04B7\u0438\u043A\u04E3\u0301", englishName: "Tajik" },
    "tg-TJ": { nativeName: "\u0442\u043E\u04B7\u0438\u043A\u04E3", englishName: "Tajik" },
    th: { nativeName: "\u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22", englishName: "Thai" },
    "th-TH": {
      nativeName: "\u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22 (\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28\u0E44\u0E17\u0E22)",
      englishName: "Thai (Thailand)"
    },
    ti: { nativeName: "\u1275\u130D\u122D\u129B", englishName: "Tigrinya" },
    tk: { nativeName: "\u0442\u04AF\u0440\u043Am\u0435\u043D\u0447\u0435", englishName: "Turkmen" },
    tl: { nativeName: "Filipino", englishName: "Filipino" },
    "tl-PH": { nativeName: "Filipino", englishName: "Filipino" },
    tlh: { nativeName: "tlhIngan-Hol", englishName: "Klingon" },
    tn: { nativeName: "Setswana", englishName: "Tswana" },
    to: { nativeName: "Tonga", englishName: "Tonga" },
    tr: { nativeName: "T\xFCrk\xE7e", englishName: "Turkish" },
    "tr-TR": { nativeName: "T\xFCrk\xE7e", englishName: "Turkish" },
    ts: { nativeName: "Xitsonga", englishName: "Tsonga" },
    tt: { nativeName: "\u0442\u0430\u0442\u0430\u0440\u0447\u0430", englishName: "Tatar" },
    "tt-RU": { nativeName: "\u0442\u0430\u0442\u0430\u0440\u0447\u0430", englishName: "Tatar" },
    tw: { nativeName: "Twi", englishName: "Twi" },
    ty: { nativeName: "Reo Tahiti", englishName: "Tahitian" },
    uk: { nativeName: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430", englishName: "Ukrainian" },
    "uk-UA": { nativeName: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430", englishName: "Ukrainian" },
    ug: { nativeName: "Uigur", englishName: "Uigur" },
    ur: { nativeName: "\u0627\u0631\u062F\u0648", englishName: "Urdu" },
    "ur-PK": { nativeName: "\u0627\u0631\u062F\u0648", englishName: "Urdu" },
    uz: { nativeName: "O'zbek", englishName: "Uzbek" },
    "uz-UZ": { nativeName: "O'zbek", englishName: "Uzbek" },
    ve: { nativeName: "Tshiven\u1E13a", englishName: "Venda" },
    vi: { nativeName: "Ti\u1EBFng Vi\u1EC7t", englishName: "Vietnamese" },
    "vi-VN": { nativeName: "Ti\u1EBFng Vi\u1EC7t", englishName: "Vietnamese" },
    vk: { nativeName: "Ovalingo", englishName: "Viking" },
    vo: { nativeName: "Volap\xFCk", englishName: "Volap\xFCk" },
    wa: { nativeName: "Walon", englishName: "Walloon" },
    wo: { nativeName: "Wolof", englishName: "Wolof" },
    xh: { nativeName: "IsiXhosa", englishName: "Xhosa" },
    "xh-ZA": { nativeName: "isiXhosa", englishName: "Xhosa" },
    yi: { nativeName: "\u05D9\u05D9\u05B4\u05D3\u05D9\u05E9", englishName: "Yiddish" },
    "yi-DE": { nativeName: "\u05D9\u05D9\u05B4\u05D3\u05D9\u05E9 (German)", englishName: "Yiddish (German)" },
    yo: { nativeName: "Yor\xF9b\xE1", englishName: "Yorouba" },
    za: { nativeName: "Zhuang", englishName: "Zhuang" },
    zh: { nativeName: "\u4E2D\u6587", englishName: "Chinese" },
    "zh-Hans": { nativeName: "\u4E2D\u6587\u7B80\u4F53", englishName: "Chinese Simplified" },
    "zh-Hant": { nativeName: "\u4E2D\u6587\u7E41\u9AD4", englishName: "Chinese Traditional" },
    "zh-CN": {
      nativeName: "\u4E2D\u6587\uFF08\u4E2D\u56FD\uFF09",
      englishName: "Chinese Simplified (China)"
    },
    "zh-HK": {
      nativeName: "\u4E2D\u6587\uFF08\u9999\u6E2F\uFF09",
      englishName: "Chinese Traditional (Hong Kong)"
    },
    "zh-SG": {
      nativeName: "\u4E2D\u6587\uFF08\u65B0\u52A0\u5761\uFF09",
      englishName: "Chinese Simplified (Singapore)"
    },
    "zh-TW": {
      nativeName: "\u4E2D\u6587\uFF08\u53F0\u7063\uFF09",
      englishName: "Chinese Traditional (Taiwan)"
    }
  },
  {
    get: function(obj, lang) {
      if (typeof lang === "string") {
        let processedLang = lang;
        if (processedLang.includes("-")) {
          const parts = processedLang.split("-");
          if (parts.length > 1) {
            processedLang = `${parts[0]}-${parts[1].toUpperCase()}`;
          }
        } else if (processedLang.includes("_")) {
          const parts = processedLang.split("_");
          if (parts.length > 1) {
            processedLang = `${parts[0]}-${parts[1].toUpperCase()}`;
          }
        }
        return obj[processedLang];
      }
      return void 0;
    }
  }
);

// src/styleFields.ts
import registryModule from "@plone/registry";
var config4 = registryModule.getUtility ? registryModule : registryModule.default;
var isRecord = (value) => !!value && typeof value === "object" && !Array.isArray(value);
var isStyleFieldMarker = (value) => value === true || isRecord(value);
var splitPath = (path) => path?.split(".").filter((segment) => !!segment) ?? [];
var getPathValue = (data, path) => {
  const segments = splitPath(path);
  if (!segments.length) return void 0;
  let current = data;
  for (const segment of segments) {
    if (!isRecord(current)) return void 0;
    current = current[segment];
  }
  return current;
};
var setPathValue = (data, path, value) => {
  const segments = splitPath(path);
  if (!segments.length) return;
  let current = data;
  segments.forEach((segment, index) => {
    if (index === segments.length - 1) {
      current[segment] = value;
      return;
    }
    const next = current[segment];
    if (!isRecord(next)) {
      current[segment] = {};
    }
    current = current[segment];
  });
};
var getBlockType = (data) => {
  const plateType = data.type;
  const ploneType = data["@type"];
  if (typeof plateType === "string" && plateType !== "unknown")
    return plateType;
  if (typeof ploneType === "string") return ploneType;
  return void 0;
};
var findStyleDefinitionByName = (definitions, name) => definitions.find((definition) => definition.name === name);
var getStyleFieldValue = (data, fieldName, fieldConfig) => {
  const configuredValue = typeof fieldConfig?.path === "string" ? getPathValue(data, fieldConfig.path) : void 0;
  if (typeof configuredValue === "string") return configuredValue;
  const rootValue = data[fieldName];
  if (typeof rootValue === "string") return rootValue;
  const legacyStyles = data.styles;
  if (isRecord(legacyStyles) && typeof legacyStyles[fieldName] === "string") {
    return legacyStyles[fieldName];
  }
  return void 0;
};
var setStyleFieldValue = (data, fieldName, value, fieldConfig) => {
  if (typeof fieldConfig?.path === "string") {
    setPathValue(data, fieldConfig.path, value);
    return;
  }
  if (fieldName in data || !isRecord(data.styles)) {
    data[fieldName] = value;
    return;
  }
  const styles = data.styles;
  styles[fieldName] = value;
};
var getCandidateFields = (fieldConfigs) => Object.keys(fieldConfigs ?? {});
var isAllowedValue = (definitions, value, fieldConfig) => {
  const allowedValues = fieldConfig?.values?.length ? fieldConfig.values : definitions.map((definition) => definition.name).filter((name) => !!name);
  return allowedValues.includes(value);
};
var getValuesFromSchemaProperty = (property) => {
  if (Array.isArray(property.choices)) {
    return property.choices.map(
      (choice) => Array.isArray(choice) && typeof choice[0] === "string" ? choice[0] : void 0
    ).filter((choice) => !!choice);
  }
  if (Array.isArray(property.actions)) {
    return property.actions.filter(
      (action) => typeof action === "string"
    );
  }
  return void 0;
};
var getStyleFieldsFromSchema = (schema) => {
  if (!schema || !isRecord(schema.properties)) return {};
  return Object.entries(schema.properties).reduce(
    (acc, [fieldName, property]) => {
      if (!isRecord(property) || !isStyleFieldMarker(property.styleField)) {
        return acc;
      }
      acc[fieldName] = {
        defaultValue: typeof property.default === "string" ? property.default : void 0,
        values: getValuesFromSchemaProperty(property),
        path: property.styleField === true ? void 0 : typeof property.styleField.path === "string" ? property.styleField.path : void 0
      };
      return acc;
    },
    {}
  );
};
var getStyleFieldsFromBlockSchema = (blockConfig, formData) => {
  if (!blockConfig?.blockSchema) return {};
  try {
    const schema = typeof blockConfig.blockSchema === "function" ? blockConfig.blockSchema({ formData, data: formData }) : blockConfig.blockSchema;
    return getStyleFieldsFromSchema(schema);
  } catch {
    return {};
  }
};
var resolveStyleFields = ({
  data,
  fieldConfigs,
  container,
  resolveDefinitions
}) => {
  const style = {};
  const values = {};
  const blockType = getBlockType(data);
  getCandidateFields(fieldConfigs).forEach((fieldName) => {
    const definitions = resolveDefinitions(fieldName, {
      data,
      container,
      blockType,
      fieldName
    });
    if (!definitions.length) return;
    const fieldConfig = fieldConfigs?.[fieldName];
    const rawValue = getStyleFieldValue(data, fieldName, fieldConfig);
    const effectiveValue = typeof rawValue === "string" && isAllowedValue(definitions, rawValue, fieldConfig) ? rawValue : fieldConfig?.defaultValue;
    if (!effectiveValue) return;
    const definition = findStyleDefinitionByName(definitions, effectiveValue);
    if (!definition?.style) return;
    values[fieldName] = effectiveValue;
    Object.assign(style, definition.style);
  });
  return { style, values };
};
var applyStyleFieldDefaultsInData = ({
  data,
  fieldConfigs,
  container,
  resolveDefinitions
}) => {
  const blockType = getBlockType(data);
  getCandidateFields(fieldConfigs).forEach((fieldName) => {
    const definitions = resolveDefinitions(fieldName, {
      data,
      container,
      blockType,
      fieldName
    });
    if (!definitions.length) return;
    const fieldConfig = fieldConfigs?.[fieldName];
    const currentValue = getStyleFieldValue(data, fieldName, fieldConfig);
    const defaultValue = fieldConfig?.defaultValue;
    if (!defaultValue) return;
    if (typeof currentValue === "string" && isAllowedValue(definitions, currentValue, fieldConfig)) {
      return;
    }
    setStyleFieldValue(data, fieldName, defaultValue, fieldConfig);
  });
  return data;
};
var getStyleFieldDefinitionsFromRegistry = (fieldName, args) => {
  const utility = config4.getUtility({
    type: "styleFieldDefinition",
    name: fieldName
  });
  return utility.method?.(args) ?? [];
};
export {
  InitAtoms,
  applyStyleFieldDefaultsInData,
  findStyleDefinitionByName,
  flattenToAppURL,
  getContentIcon,
  getStyleFieldDefinitionsFromRegistry,
  getStyleFieldValue,
  getStyleFieldsFromBlockSchema,
  getStyleFieldsFromSchema,
  hasBlocksData,
  isDeepEqual,
  isEmpty,
  isInternalURL,
  langmap,
  resolveStyleFields,
  setStyleFieldValue,
  useFieldFocusAtom,
  useFieldFocusedAtom,
  useFieldValueFocusedAtom,
  useSetFieldFocusedAtom
};

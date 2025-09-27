// Currency utilities for location-based formatting
export interface CurrencyConfig {
  code: string;
  symbol: string;
  locale: string;
  name: string;
}

// Common currencies used in car marketplace
export const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', locale: 'en-US', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', locale: 'de-DE', name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', locale: 'en-GB', name: 'British Pound' },
  JPY: { code: 'JPY', symbol: '¥', locale: 'ja-JP', name: 'Japanese Yen' },
  CAD: { code: 'CAD', symbol: 'C$', locale: 'en-CA', name: 'Canadian Dollar' },
  AUD: { code: 'AUD', symbol: 'A$', locale: 'en-AU', name: 'Australian Dollar' },
  CHF: { code: 'CHF', symbol: 'CHF', locale: 'de-CH', name: 'Swiss Franc' },
  SEK: { code: 'SEK', symbol: 'kr', locale: 'sv-SE', name: 'Swedish Krona' },
  NOK: { code: 'NOK', symbol: 'kr', locale: 'nb-NO', name: 'Norwegian Krone' },
  DKK: { code: 'DKK', symbol: 'kr', locale: 'da-DK', name: 'Danish Krone' },
};

// Country to currency mapping
export const COUNTRY_CURRENCY_MAP: Record<string, string> = {
  'US': 'USD',
  'DE': 'EUR',
  'FR': 'EUR',
  'IT': 'EUR',
  'ES': 'EUR',
  'NL': 'EUR',
  'BE': 'EUR',
  'AT': 'EUR',
  'PT': 'EUR',
  'IE': 'EUR',
  'FI': 'EUR',
  'LU': 'EUR',
  'GB': 'GBP',
  'JP': 'JPY',
  'CA': 'CAD',
  'AU': 'AUD',
  'CH': 'CHF',
  'SE': 'SEK',
  'NO': 'NOK',
  'DK': 'DKK',
  'MX': 'USD', // Mexico often uses USD for imports
  'BR': 'USD', // Brazil often uses USD for imports
  'AR': 'USD', // Argentina often uses USD for imports
  'CL': 'USD', // Chile often uses USD for imports
  'CO': 'USD', // Colombia often uses USD for imports
  'PE': 'USD', // Peru often uses USD for imports
  'UY': 'USD', // Uruguay often uses USD for imports
  'ZA': 'USD', // South Africa often uses USD for imports
  'NG': 'USD', // Nigeria often uses USD for imports
  'KE': 'KES', // Kenya uses KES
  'EG': 'USD', // Egypt often uses USD for imports
  'MA': 'USD', // Morocco often uses USD for imports
  'TN': 'USD', // Tunisia often uses USD for imports
  'DZ': 'USD', // Algeria often uses USD for imports
  'IN': 'USD', // India often uses USD for imports
  'PK': 'USD', // Pakistan often uses USD for imports
  'BD': 'USD', // Bangladesh often uses USD for imports
  'LK': 'USD', // Sri Lanka often uses USD for imports
  'TH': 'USD', // Thailand often uses USD for imports
  'MY': 'USD', // Malaysia often uses USD for imports
  'SG': 'USD', // Singapore often uses USD for imports
  'PH': 'USD', // Philippines often uses USD for imports
  'ID': 'USD', // Indonesia often uses USD for imports
  'VN': 'USD', // Vietnam often uses USD for imports
  'KR': 'USD', // South Korea often uses USD for imports
  'TW': 'USD', // Taiwan often uses USD for imports
  'HK': 'USD', // Hong Kong often uses USD for imports
  'CN': 'USD', // China often uses USD for imports
  'RU': 'USD', // Russia often uses USD for imports
  'UA': 'USD', // Ukraine often uses USD for imports
  'PL': 'USD', // Poland often uses USD for imports
  'CZ': 'USD', // Czech Republic often uses USD for imports
  'HU': 'USD', // Hungary often uses USD for imports
  'RO': 'USD', // Romania often uses USD for imports
  'BG': 'USD', // Bulgaria often uses USD for imports
  'HR': 'USD', // Croatia often uses USD for imports
  'SI': 'USD', // Slovenia often uses USD for imports
  'SK': 'USD', // Slovakia often uses USD for imports
  'LT': 'USD', // Lithuania often uses USD for imports
  'LV': 'USD', // Latvia often uses USD for imports
  'EE': 'USD', // Estonia often uses USD for imports
  'TR': 'USD', // Turkey often uses USD for imports
  'GR': 'USD', // Greece often uses USD for imports
  'CY': 'USD', // Cyprus often uses USD for imports
  'MT': 'USD', // Malta often uses USD for imports
  'IS': 'USD', // Iceland often uses USD for imports
  'IL': 'USD', // Israel often uses USD for imports
  'AE': 'USD', // UAE often uses USD for imports
  'SA': 'USD', // Saudi Arabia often uses USD for imports
  'KW': 'USD', // Kuwait often uses USD for imports
  'QA': 'USD', // Qatar often uses USD for imports
  'BH': 'USD', // Bahrain often uses USD for imports
  'OM': 'USD', // Oman often uses USD for imports
  'JO': 'USD', // Jordan often uses USD for imports
  'LB': 'USD', // Lebanon often uses USD for imports
  'IQ': 'USD', // Iraq often uses USD for imports
  'IR': 'USD', // Iran often uses USD for imports
  'AF': 'USD', // Afghanistan often uses USD for imports
  'KZ': 'USD', // Kazakhstan often uses USD for imports
  'UZ': 'USD', // Uzbekistan often uses USD for imports
  'KG': 'USD', // Kyrgyzstan often uses USD for imports
  'TJ': 'USD', // Tajikistan often uses USD for imports
  'TM': 'USD', // Turkmenistan often uses USD for imports
  'AZ': 'USD', // Azerbaijan often uses USD for imports
  'GE': 'USD', // Georgia often uses USD for imports
  'AM': 'USD', // Armenia often uses USD for imports
  'BY': 'USD', // Belarus often uses USD for imports
  'MD': 'USD', // Moldova often uses USD for imports
  'MN': 'USD', // Mongolia often uses USD for imports
  'NP': 'USD', // Nepal often uses USD for imports
  'BT': 'USD', // Bhutan often uses USD for imports
  'MV': 'USD', // Maldives often uses USD for imports
  'MM': 'USD', // Myanmar often uses USD for imports
  'LA': 'USD', // Laos often uses USD for imports
  'KH': 'USD', // Cambodia often uses USD for imports
  'BN': 'USD', // Brunei often uses USD for imports
  'TL': 'USD', // Timor-Leste often uses USD for imports
  'FJ': 'USD', // Fiji often uses USD for imports
  'PG': 'USD', // Papua New Guinea often uses USD for imports
  'SB': 'USD', // Solomon Islands often uses USD for imports
  'VU': 'USD', // Vanuatu often uses USD for imports
  'NC': 'USD', // New Caledonia often uses USD for imports
  'PF': 'USD', // French Polynesia often uses USD for imports
  'WS': 'USD', // Samoa often uses USD for imports
  'TO': 'USD', // Tonga often uses USD for imports
  'KI': 'USD', // Kiribati often uses USD for imports
  'TV': 'USD', // Tuvalu often uses USD for imports
  'NR': 'USD', // Nauru often uses USD for imports
  'PW': 'USD', // Palau often uses USD for imports
  'FM': 'USD', // Micronesia often uses USD for imports
  'MH': 'USD', // Marshall Islands often uses USD for imports
  'CK': 'USD', // Cook Islands often uses USD for imports
  'NU': 'USD', // Niue often uses USD for imports
  'TK': 'USD', // Tokelau often uses USD for imports
  'AS': 'USD', // American Samoa often uses USD for imports
  'GU': 'USD', // Guam often uses USD for imports
  'MP': 'USD', // Northern Mariana Islands often uses USD for imports
  'VI': 'USD', // US Virgin Islands often uses USD for imports
  'PR': 'USD', // Puerto Rico often uses USD for imports
  'DO': 'USD', // Dominican Republic often uses USD for imports
  'HT': 'USD', // Haiti often uses USD for imports
  'CU': 'USD', // Cuba often uses USD for imports
  'JM': 'USD', // Jamaica often uses USD for imports
  'TT': 'USD', // Trinidad and Tobago often uses USD for imports
  'BB': 'USD', // Barbados often uses USD for imports
  'BS': 'USD', // Bahamas often uses USD for imports
  'BZ': 'USD', // Belize often uses USD for imports
  'CR': 'USD', // Costa Rica often uses USD for imports
  'GT': 'USD', // Guatemala often uses USD for imports
  'HN': 'USD', // Honduras often uses USD for imports
  'NI': 'USD', // Nicaragua often uses USD for imports
  'PA': 'USD', // Panama often uses USD for imports
  'SV': 'USD', // El Salvador often uses USD for imports
  'GY': 'USD', // Guyana often uses USD for imports
  'SR': 'USD', // Suriname often uses USD for imports
  'GF': 'USD', // French Guiana often uses USD for imports
  'VE': 'USD', // Venezuela often uses USD for imports
  'EC': 'USD', // Ecuador often uses USD for imports
  'BO': 'USD', // Bolivia often uses USD for imports
  'PY': 'USD', // Paraguay often uses USD for imports
  'UY': 'USD', // Uruguay often uses USD for imports
  'FK': 'USD', // Falkland Islands often uses USD for imports
  'GS': 'USD', // South Georgia and South Sandwich Islands often uses USD for imports
  'BV': 'USD', // Bouvet Island often uses USD for imports
  'HM': 'USD', // Heard Island and McDonald Islands often uses USD for imports
  'TF': 'USD', // French Southern Territories often uses USD for imports
  'AQ': 'USD', // Antarctica often uses USD for imports
  'UM': 'USD', // United States Minor Outlying Islands often uses USD for imports
  'EH': 'USD', // Western Sahara often uses USD for imports
  'PS': 'USD', // Palestine often uses USD for imports
  'XK': 'USD', // Kosovo often uses USD for imports
  'TW': 'USD', // Taiwan often uses USD for imports
  'HK': 'USD', // Hong Kong often uses USD for imports
  'MO': 'USD', // Macau often uses USD for imports
  'CX': 'USD', // Christmas Island often uses USD for imports
  'CC': 'USD', // Cocos Islands often uses USD for imports
  'NF': 'USD', // Norfolk Island often uses USD for imports
  'PN': 'USD', // Pitcairn Islands often uses USD for imports
  'SH': 'USD', // Saint Helena often uses USD for imports
  'AC': 'USD', // Ascension Island often uses USD for imports
  'TA': 'USD', // Tristan da Cunha often uses USD for imports
  'GG': 'USD', // Guernsey often uses USD for imports
  'IM': 'USD', // Isle of Man often uses USD for imports
  'JE': 'USD', // Jersey often uses USD for imports
  'AX': 'USD', // Åland Islands often uses USD for imports
  'FO': 'USD', // Faroe Islands often uses USD for imports
  'GL': 'USD', // Greenland often uses USD for imports
  'SJ': 'USD', // Svalbard and Jan Mayen often uses USD for imports
  'YT': 'USD', // Mayotte often uses USD for imports
  'RE': 'USD', // Réunion often uses USD for imports
  'MQ': 'USD', // Martinique often uses USD for imports
  'GP': 'USD', // Guadeloupe often uses USD for imports
  'BL': 'USD', // Saint Barthélemy often uses USD for imports
  'MF': 'USD', // Saint Martin often uses USD for imports
  'PM': 'USD', // Saint Pierre and Miquelon often uses USD for imports
  'WF': 'USD', // Wallis and Futuna often uses USD for imports
  'AD': 'USD', // Andorra often uses USD for imports
  'LI': 'USD', // Liechtenstein often uses USD for imports
  'MC': 'USD', // Monaco often uses USD for imports
  'SM': 'USD', // San Marino often uses USD for imports
  'VA': 'USD', // Vatican City often uses USD for imports
  'GI': 'USD', // Gibraltar often uses USD for imports
  'BM': 'USD', // Bermuda often uses USD for imports
  'KY': 'USD', // Cayman Islands often uses USD for imports
  'TC': 'USD', // Turks and Caicos Islands often uses USD for imports
  'VG': 'USD', // British Virgin Islands often uses USD for imports
  'AI': 'USD', // Anguilla often uses USD for imports
  'MS': 'USD', // Montserrat often uses USD for imports
  'KN': 'USD', // Saint Kitts and Nevis often uses USD for imports
  'AG': 'USD', // Antigua and Barbuda often uses USD for imports
  'DM': 'USD', // Dominica often uses USD for imports
  'LC': 'USD', // Saint Lucia often uses USD for imports
  'VC': 'USD', // Saint Vincent and the Grenadines often uses USD for imports
  'GD': 'USD', // Grenada often uses USD for imports
  'AW': 'USD', // Aruba often uses USD for imports
  'CW': 'USD', // Curaçao often uses USD for imports
  'SX': 'USD', // Sint Maarten often uses USD for imports
  'BQ': 'USD', // Caribbean Netherlands often uses USD for imports
  'GP': 'USD', // Guadeloupe often uses USD for imports
  'MQ': 'USD', // Martinique often uses USD for imports
  'RE': 'USD', // Réunion often uses USD for imports
  'YT': 'USD', // Mayotte often uses USD for imports
  'TF': 'USD', // French Southern Territories often uses USD for imports
  'PF': 'USD', // French Polynesia often uses USD for imports
  'NC': 'USD', // New Caledonia often uses USD for imports
  'WF': 'USD', // Wallis and Futuna often uses USD for imports
  'CK': 'USD', // Cook Islands often uses USD for imports
  'NU': 'USD', // Niue often uses USD for imports
  'TK': 'USD', // Tokelau often uses USD for imports
  'AS': 'USD', // American Samoa often uses USD for imports
  'GU': 'USD', // Guam often uses USD for imports
  'MP': 'USD', // Northern Mariana Islands often uses USD for imports
  'VI': 'USD', // US Virgin Islands often uses USD for imports
  'PR': 'USD', // Puerto Rico often uses USD for imports
  'DO': 'USD', // Dominican Republic often uses USD for imports
  'HT': 'USD', // Haiti often uses USD for imports
  'CU': 'USD', // Cuba often uses USD for imports
  'JM': 'USD', // Jamaica often uses USD for imports
  'TT': 'USD', // Trinidad and Tobago often uses USD for imports
  'BB': 'USD', // Barbados often uses USD for imports
  'BS': 'USD', // Bahamas often uses USD for imports
  'BZ': 'USD', // Belize often uses USD for imports
  'CR': 'USD', // Costa Rica often uses USD for imports
  'GT': 'USD', // Guatemala often uses USD for imports
  'HN': 'USD', // Honduras often uses USD for imports
  'NI': 'USD', // Nicaragua often uses USD for imports
  'PA': 'USD', // Panama often uses USD for imports
  'SV': 'USD', // El Salvador often uses USD for imports
  'GY': 'USD', // Guyana often uses USD for imports
  'SR': 'USD', // Suriname often uses USD for imports
  'GF': 'USD', // French Guiana often uses USD for imports
  'VE': 'USD', // Venezuela often uses USD for imports
  'EC': 'USD', // Ecuador often uses USD for imports
  'BO': 'USD', // Bolivia often uses USD for imports
  'PY': 'USD', // Paraguay often uses USD for imports
  'UY': 'USD', // Uruguay often uses USD for imports
  'FK': 'USD', // Falkland Islands often uses USD for imports
  'GS': 'USD', // South Georgia and South Sandwich Islands often uses USD for imports
  'BV': 'USD', // Bouvet Island often uses USD for imports
  'HM': 'USD', // Heard Island and McDonald Islands often uses USD for imports
  'TF': 'USD', // French Southern Territories often uses USD for imports
  'AQ': 'USD', // Antarctica often uses USD for imports
  'UM': 'USD', // United States Minor Outlying Islands often uses USD for imports
  'EH': 'USD', // Western Sahara often uses USD for imports
  'PS': 'USD', // Palestine often uses USD for imports
  'XK': 'USD', // Kosovo often uses USD for imports
  'TW': 'USD', // Taiwan often uses USD for imports
  'HK': 'USD', // Hong Kong often uses USD for imports
  'MO': 'USD', // Macau often uses USD for imports
  'CX': 'USD', // Christmas Island often uses USD for imports
  'CC': 'USD', // Cocos Islands often uses USD for imports
  'NF': 'USD', // Norfolk Island often uses USD for imports
  'PN': 'USD', // Pitcairn Islands often uses USD for imports
  'SH': 'USD', // Saint Helena often uses USD for imports
  'AC': 'USD', // Ascension Island often uses USD for imports
  'TA': 'USD', // Tristan da Cunha often uses USD for imports
  'GG': 'USD', // Guernsey often uses USD for imports
  'IM': 'USD', // Isle of Man often uses USD for imports
  'JE': 'USD', // Jersey often uses USD for imports
  'AX': 'USD', // Åland Islands often uses USD for imports
  'FO': 'USD', // Faroe Islands often uses USD for imports
  'GL': 'USD', // Greenland often uses USD for imports
  'SJ': 'USD', // Svalbard and Jan Mayen often uses USD for imports
  'YT': 'USD', // Mayotte often uses USD for imports
  'RE': 'USD', // Réunion often uses USD for imports
  'MQ': 'USD', // Martinique often uses USD for imports
  'GP': 'USD', // Guadeloupe often uses USD for imports
  'BL': 'USD', // Saint Barthélemy often uses USD for imports
  'MF': 'USD', // Saint Martin often uses USD for imports
  'PM': 'USD', // Saint Pierre and Miquelon often uses USD for imports
  'WF': 'USD', // Wallis and Futuna often uses USD for imports
  'AD': 'USD', // Andorra often uses USD for imports
  'LI': 'USD', // Liechtenstein often uses USD for imports
  'MC': 'USD', // Monaco often uses USD for imports
  'SM': 'USD', // San Marino often uses USD for imports
  'VA': 'USD', // Vatican City often uses USD for imports
  'GI': 'USD', // Gibraltar often uses USD for imports
  'BM': 'USD', // Bermuda often uses USD for imports
  'KY': 'USD', // Cayman Islands often uses USD for imports
  'TC': 'USD', // Turks and Caicos Islands often uses USD for imports
  'VG': 'USD', // British Virgin Islands often uses USD for imports
  'AI': 'USD', // Anguilla often uses USD for imports
  'MS': 'USD', // Montserrat often uses USD for imports
  'KN': 'USD', // Saint Kitts and Nevis often uses USD for imports
  'AG': 'USD', // Antigua and Barbuda often uses USD for imports
  'DM': 'USD', // Dominica often uses USD for imports
  'LC': 'USD', // Saint Lucia often uses USD for imports
  'VC': 'USD', // Saint Vincent and the Grenadines often uses USD for imports
  'GD': 'USD', // Grenada often uses USD for imports
  'AW': 'USD', // Aruba often uses USD for imports
  'CW': 'USD', // Curaçao often uses USD for imports
  'SX': 'USD', // Sint Maarten often uses USD for imports
  'BQ': 'USD', // Caribbean Netherlands often uses USD for imports
};

// Detect user's currency based on browser locale
export const detectCurrencyFromLocale = (): string => {
  const locale = navigator.language || 'en-US';
  const countryCode = locale.split('-')[1] || 'US';
  return COUNTRY_CURRENCY_MAP[countryCode] || 'KES'; // Default to KES for Kenya
};

// Detect user's currency based on IP geolocation (async)
export const detectCurrencyFromIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return COUNTRY_CURRENCY_MAP[data.country_code] || 'USD';
  } catch (error) {
    console.warn('Failed to detect currency from IP, falling back to locale detection');
    return detectCurrencyFromLocale();
  }
};

// Format currency based on location
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  const currencyConfig = SUPPORTED_CURRENCIES[currency];
  if (!currencyConfig) {
    console.warn(`Unsupported currency: ${currency}, falling back to USD`);
    return formatCurrency(amount, 'USD', 'en-US');
  }

  try {
    return new Intl.NumberFormat(currencyConfig.locale, {
      style: 'currency',
      currency: currencyConfig.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    console.warn(`Failed to format currency ${currency}, falling back to USD`);
    return formatCurrency(amount, 'USD', 'en-US');
  }
};

// Parse currency string to number
export const parseCurrency = (value: string, currency: string = 'USD'): number => {
  if (!value) return 0;
  
  // Remove currency symbols and non-numeric characters except decimal point
  const cleanValue = value.replace(/[^\d.-]/g, '');
  return parseFloat(cleanValue) || 0;
};

// Get currency symbol
export const getCurrencySymbol = (currency: string): string => {
  return SUPPORTED_CURRENCIES[currency]?.symbol || '$';
};

// Get currency name
export const getCurrencyName = (currency: string): string => {
  return SUPPORTED_CURRENCIES[currency]?.name || 'US Dollar';
};

// Get all supported currencies
export const getSupportedCurrencies = (): CurrencyConfig[] => {
  return Object.values(SUPPORTED_CURRENCIES);
};

// Check if currency is supported
export const isCurrencySupported = (currency: string): boolean => {
  return currency in SUPPORTED_CURRENCIES;
};

// Auto-detect and format currency
export const autoFormatCurrency = async (amount: number): Promise<string> => {
  try {
    const currency = await detectCurrencyFromIP();
    return formatCurrency(amount, currency);
  } catch (error) {
    const currency = detectCurrencyFromLocale();
    return formatCurrency(amount, currency);
  }
};

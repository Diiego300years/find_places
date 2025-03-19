export interface TranslationsInterface {
  header: string;
  description?: string;
  copy_button?: string;
  message_copy_button?: string;
  navigation: string;
  search: string;
  city: string;
  name: string;
}


export interface LanguageInterface {
  languages: Array<'pl' | 'en' | 'de'>;
}

/**
 * Type representing supported language keys.
 */
export type SupportedLanguages = 'pl' | 'en' | 'de';

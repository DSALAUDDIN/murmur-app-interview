import { createContext, useContext, useState, ReactNode } from 'react';

type Languages = 'en' | 'ja';

const translations = {
  en: {
    timeline: 'Timeline',
    discover: 'Discover',
    myProfile: 'My Profile',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
    search: 'Search',
    searchPlaceholder: 'Search users…',
    brand: 'Murmur',
  },
  ja: {
    timeline: 'タイムライン',
    discover: '発見',
    myProfile: 'マイページ',
    logout: 'ログアウト',
    login: 'ログイン',
    register: '登録',
    search: '検索',
    searchPlaceholder: 'ユーザー検索…',
    brand: 'マーマー',
  }
};

const LanguageContext = createContext<{
  lang: Languages,
  setLang: (l: Languages) => void,
  t: typeof translations['en']
}>({
  lang: 'en',
  setLang: () => {},
  t: translations['en']
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Languages>('en');
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

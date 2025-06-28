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
    murmurButton: 'Murmur',
    murmurPlaceholder: "What's happening?",
    murmurEmptyError: 'Murmur cannot be empty.',
    murmurPostError: 'Failed to post murmur. Please try again.',
    followingTitle: 'Following',
    followersTitle: 'Followers',
    loading: 'Loading...',
    noUsersToDisplay: 'No users to display.',
    like: 'Like',
    unlike: 'Unlike',
    likes: 'Likes',
    you: 'You',
    postedAt: 'Posted at',
    notifications: 'Notifications',
    notificationMurmur: 'posted a new murmur.',
    noNotifications: 'No notifications yet.',
    previous: 'Previous',
    next: 'Next',
    pageInfo: 'Page {current} of {last}',
    discoverPageTitle: 'Discover Murmurs',
    discoverFetchError: 'Failed to fetch the global feed. Please try again later.',
    noMurmursFound: 'No murmurs found.',
    loginTitle: 'Log in to Murmur',
    loginEmailLabel: 'Email',
    loginEmailPlaceholder: 'Email',
    loginPasswordLabel: 'Password',
    loginPasswordPlaceholder: 'Password',
    loginButton: 'Log In',
    loginError: 'Invalid email or password. Please try again.',
    notRegisteredPrompt: "Not registered?",
    registerHere: "Register here",
    registerTitle: "Create your Murmur account",
    registerUsernamePlaceholder: "Username",
    registerEmailPlaceholder: "Email",
    registerPasswordPlaceholder: "Password",
    registerButton: "Sign Up",
    registerSuccess: "Registration successful! Redirecting to login...",
    registerUnexpectedError: "An unexpected error occurred. Please try again.",
    alreadyRegisteredPrompt: "Already signed up?",
    loginHere: "Login here",
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
    murmurButton: 'つぶやく',
    murmurPlaceholder: 'いまどうしてる？',
    murmurEmptyError: 'つぶやきを入力してください。',
    murmurPostError: '投稿に失敗しました。もう一度お試しください。',
    followingTitle: 'フォロー中',
    followersTitle: 'フォロワー',
    loading: '読み込み中…',
    noUsersToDisplay: '表示するユーザーがいません。',
    like: 'いいね',
    unlike: 'いいねを取り消す',
    likes: 'いいね',
    you: 'あなた',
    postedAt: '投稿日',
    notifications: '通知',
    notificationMurmur: 'さんが新しいつぶやきを投稿しました。',
    noNotifications: '通知はまだありません。',
    previous: '前へ',
    next: '次へ',
    pageInfo: '{current}ページ／全{last}ページ',
    discoverPageTitle: 'みんなのつぶやき',
    discoverFetchError: 'グローバルフィードの取得に失敗しました。時間をおいて再度お試しください。',
    noMurmursFound: 'つぶやきが見つかりません。',
    loginTitle: 'Murmurにログイン',
    loginEmailLabel: 'メールアドレス',
    loginEmailPlaceholder: 'メールアドレス',
    loginPasswordLabel: 'パスワード',
    loginPasswordPlaceholder: 'パスワード',
    loginButton: 'ログイン',
    loginError: 'メールアドレスまたはパスワードが正しくありません。',
    notRegisteredPrompt: "まだ登録していませんか？",
    registerHere: "新規登録はこちら",
    registerTitle: "Murmurアカウントを作成",
    registerUsernamePlaceholder: "ユーザー名",
    registerEmailPlaceholder: "メールアドレス",
    registerPasswordPlaceholder: "パスワード",
    registerButton: "新規登録",
    registerSuccess: "登録が完了しました！ログイン画面に移動します…",
    registerUnexpectedError: "予期しないエラーが発生しました。もう一度お試しください。",
    alreadyRegisteredPrompt: "すでに登録済みですか？",
    loginHere: "ログインはこちら",
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

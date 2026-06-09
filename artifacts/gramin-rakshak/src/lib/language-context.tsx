import { createContext, useContext, useState } from "react";
import { t, type Lang } from "./translations";

type Translations = typeof t[Lang];

type LanguageContextType = {
  lang: Lang;
  toggle: () => void;
  tr: Translations;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggle: () => {},
  tr: t.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggle = () => setLang((prev) => (prev === "en" ? "te" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, toggle, tr: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

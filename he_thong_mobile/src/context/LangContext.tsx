import React, { createContext, useContext, useEffect, useState } from 'react';
import { languageApi } from '../api/endpoints';
import { Language } from '../types';
import { storage } from '../utils/storage';

interface LangValue {
  lang: string;            // ngon ngu thuyet minh dang chon
  languages: Language[];   // danh sach ngon ngu backend ho tro
  setLang: (code: string) => void;
}

const LangContext = createContext<LangValue>(null as unknown as LangValue);
export const useLang = () => useContext(LangContext);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState('vi');
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    storage.get('lang').then((v) => v && setLangState(v));
    languageApi.list().then((l) => l && setLanguages(l)).catch(() => {});
  }, []);

  const setLang = (code: string) => { setLangState(code); storage.set('lang', code); };
  return <LangContext.Provider value={{ lang, languages, setLang }}>{children}</LangContext.Provider>;
}

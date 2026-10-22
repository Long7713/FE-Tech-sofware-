import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../api/endpoints';
import { setAuthToken } from '../api/client';
import { UserInfo } from '../types';
import { storage } from '../utils/storage';

interface AuthValue {
  user: UserInfo | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string, lang: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthValue>(null as unknown as AuthValue);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Khoi phuc phien dang nhap cu
  useEffect(() => {
    (async () => {
      const token = await storage.get('token');
      if (token) {
        setAuthToken(token);
        try { setUser(await authApi.me()); } catch { setAuthToken(null); await storage.remove('token'); }
      }
      setLoading(false);
    })();
  }, []);

  const apply = async (res: { token: string; user: UserInfo } | null) => {
    if (!res) return;
    setAuthToken(res.token);
    await storage.set('token', res.token);
    setUser(res.user);
  };

  const value: AuthValue = {
    user,
    loading,
    login: async (email, password) => apply(await authApi.login(email, password)),
    register: async (email, password, name, lang) => apply(await authApi.register(email, password, name, lang)),
    logout: async () => { setAuthToken(null); await storage.remove('token'); setUser(null); },
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

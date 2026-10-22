import { api } from './client';
import { Animal, AnimalDetail, AuthResponse, GpsZone, Language, NearbyResult, UserInfo, Zone } from '../types';

export const authApi = {
  login: (email: string, password: string) =>
    api<AuthResponse>('/api/auth/login', { method: 'POST', body: { email, password } }),
  register: (email: string, password: string, fullName: string, preferredLanguage: string) =>
    api<AuthResponse>('/api/auth/register', { method: 'POST', body: { email, password, fullName, preferredLanguage } }),
  me: () => api<UserInfo>('/api/me'),
};

export const languageApi = {
  list: () => api<Language[]>('/api/languages'),
};

export const zoneApi = {
  list: () => api<Zone[]>('/api/zones'),
};

export const animalApi = {
  list: () => api<Animal[]>('/api/animals'),
  detail: (id: number, lang: string) => api<AnimalDetail>(`/api/animals/${id}?lang=${lang}`),
};

export const gpsApi = {
  list: () => api<GpsZone[]>('/api/gps-zones'),
  nearby: (lat: number, lng: number, lang: string) =>
    api<NearbyResult>(`/api/gps-zones/nearby?lat=${lat}&lng=${lng}&lang=${lang}`),
};

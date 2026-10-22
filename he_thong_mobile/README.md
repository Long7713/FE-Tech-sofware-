# Zoo Guide - Mobile (Expo / React Native)

## Cau truc
```
src/
  api/         client.ts (fetch + JWT), endpoints.ts (goi tung API backend)
  config/      env.ts (API_URL)
  context/     AuthContext (dang nhap), LangContext (ngon ngu thuyet minh)
  components/  Button, Field, ScreenHeader, StateView
  navigation/  Tab + Stack
  screens/     home, map, animals, translate, account
  theme/       mau sac
  types/       kieu du lieu khop backend
  utils/       speech (TTS), storage
```

## Chay
1. Chay backend Spring Boot (`../he_thong`), cung mang Wi-Fi voi dien thoai.
2. Dat dia chi backend (IP may tinh, khong dung localhost):
   `EXPO_PUBLIC_API_URL=http://192.168.1.58:8080 npx expo start`
3. Mo Expo Go tren dien thoai, quet ma QR.

Man Ban do co cong tat/bat "GPS mo phong" de thu vao vung dau tien ngay trong nha.

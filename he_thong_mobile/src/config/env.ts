// Dia chi backend Spring Boot. Dien thoai va may chay backend phai cung mang Wi-Fi.
// Doi bang bien moi truong: EXPO_PUBLIC_API_URL=http://<ip-may>:8080 npx expo start
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://172.20.10.2:8080';

// Toa do mac dinh khi chua co vung GPS nao (Thao Cam Vien Sai Gon)
export const DEFAULT_REGION = { latitude: 10.7879, longitude: 106.705, latitudeDelta: 0.002, longitudeDelta: 0.002 };

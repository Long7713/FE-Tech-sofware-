import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Button from '../../components/Button';
import StateView from '../../components/StateView';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LangContext';
import { colors } from '../../theme';

export default function AccountScreen({ navigation }: any) {
  const { user, loading, logout } = useAuth();
  const { lang, languages } = useLang();
  if (loading) return <View style={styles.screen}><ScreenHeader /><StateView loading /></View>;

  const initials = user?.fullName.split(' ').map((w) => w[0]).slice(-2).join('').toUpperCase();
  const langName = languages.find((l) => l.code === lang)?.name ?? lang;

  return (
    <View style={styles.screen}>
      <ScreenHeader />
      <View style={{ padding: 24 }}>
        <Text style={styles.title}>Tài khoản</Text>
        {user ? (
          <>
            <View style={styles.profile}>
              <View style={styles.avatar}><Text style={styles.avatarText}>{initials}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{user.fullName}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.role}>Vai trò: {user.role}</Text>
              </View>
            </View>
            <View style={styles.row}><Text style={styles.rowText}>Ngôn ngữ thuyết minh</Text><Text style={styles.rowValue}>{langName}</Text></View>
            <View style={styles.row}><Text style={styles.rowText}>Ngôn ngữ ưu tiên</Text><Text style={styles.rowValue}>{user.preferredLanguage ?? '—'}</Text></View>
            <Button title="Đăng xuất" variant="outline" onPress={logout} style={{ marginTop: 24 }} />
          </>
        ) : (
          <>
            <View style={styles.guest}>
              <Ionicons name="person-circle-outline" size={64} color={colors.primary} />
              <Text style={styles.sub}>Bạn chưa đăng nhập. Đăng nhập để lưu ngôn ngữ ưu tiên.</Text>
            </View>
            <Button title="Đăng nhập" onPress={() => navigation.navigate('Login')} />
            <Button title="Tạo tài khoản" variant="link" onPress={() => navigation.navigate('Register')} />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  title: { fontSize: 28, fontWeight: '800', color: colors.primaryDark, marginBottom: 16 },
  profile: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 24, fontWeight: '700', color: colors.primary },
  name: { fontSize: 20, fontWeight: '700', color: colors.primaryDark },
  email: { color: colors.text, marginTop: 2 },
  role: { color: colors.muted, marginTop: 2, fontSize: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.line },
  rowText: { fontSize: 16, color: colors.text },
  rowValue: { color: colors.primary },
  guest: { alignItems: 'center', marginVertical: 24 },
  sub: { color: colors.muted, textAlign: 'center', marginTop: 8 },
});

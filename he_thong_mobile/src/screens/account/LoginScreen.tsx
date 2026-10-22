import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import Field from '../../components/Field';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../theme';

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!email || !password) { setError('Vui lòng nhập email và mật khẩu'); return; }
    setBusy(true); setError(null);
    try { await login(email.trim(), password); navigation.popToTop(); } catch (e: any) { setError(e.message); }
    setBusy(false);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 24 }} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Đăng nhập</Text>
      <Text style={styles.sub}>Chào mừng bạn trở lại.</Text>
      <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="Nhập email" />
      <Field label="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry placeholder="Nhập mật khẩu" />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Đăng nhập" onPress={submit} loading={busy} />
      <Button title="Chưa có tài khoản? Tạo tài khoản" variant="link" onPress={() => navigation.replace('Register')} />
      <Button title="Tiếp tục với tư cách khách" variant="link" onPress={() => navigation.popToTop()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  title: { fontSize: 28, fontWeight: '800', color: colors.primaryDark },
  sub: { color: colors.muted, marginTop: 6, marginBottom: 24 },
  error: { color: colors.danger, marginBottom: 12 },
});

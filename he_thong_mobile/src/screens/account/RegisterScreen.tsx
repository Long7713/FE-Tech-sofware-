import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import Field from '../../components/Field';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LangContext';
import { colors } from '../../theme';

export default function RegisterScreen({ navigation }: any) {
  const { register } = useAuth();
  const { lang, languages, setLang } = useLang();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!fullName || !email || password.length < 6) { setError('Nhập đủ họ tên, email và mật khẩu từ 6 ký tự'); return; }
    if (!agree) { setError('Vui lòng đồng ý Chính sách và Điều khoản'); return; }
    setBusy(true); setError(null);
    try { await register(email.trim(), password, fullName.trim(), lang); navigation.popToTop(); } catch (e: any) { setError(e.message); }
    setBusy(false);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 24 }} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Tạo tài khoản</Text>
      <Field label="Họ và tên" value={fullName} onChangeText={setFullName} autoCapitalize="words" placeholder="Nguyễn Văn A" />
      <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="email@example.com" />
      <Field label="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry placeholder="Ít nhất 6 ký tự" />

      <Text style={styles.label}>Ngôn ngữ ưu tiên</Text>
      <View style={styles.langs}>
        {languages.map((l) => (
          <Pressable key={l.id} onPress={() => setLang(l.code)} style={[styles.chip, l.code === lang && styles.chipOn]}>
            <Text style={[styles.chipText, l.code === lang && { color: colors.white }]}>{l.name}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.agree} onPress={() => setAgree(!agree)}>
        <Ionicons name={agree ? 'checkbox' : 'square-outline'} size={26} color={agree ? colors.primary : colors.danger} />
        <Text style={styles.agreeText}>Tôi đồng ý với Chính sách bảo mật và Điều khoản sử dụng.</Text>
      </Pressable>

      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Tạo tài khoản" onPress={submit} loading={busy} />
      <Button title="Đã có tài khoản? Đăng nhập" variant="link" onPress={() => navigation.replace('Login')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  title: { fontSize: 28, fontWeight: '800', color: colors.primaryDark, marginBottom: 24 },
  label: { fontWeight: '600', color: colors.primaryDark, marginBottom: 8 },
  langs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: colors.line },
  chipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.text },
  agree: { flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 16 },
  agreeText: { flex: 1, color: colors.text },
  error: { color: colors.danger, marginBottom: 12 },
});

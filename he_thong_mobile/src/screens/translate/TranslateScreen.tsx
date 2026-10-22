import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import ScreenHeader from '../../components/ScreenHeader';
import Button from '../../components/Button';
import { useLang } from '../../context/LangContext';
import { colors } from '../../theme';

// Man hinh phien dich: hien chi la giao dien mo phong.
// Khi service Python (STT + dich + TTS) xong se noi vao day qua WebSocket.
const SAMPLE = {
  original: 'Loài hổ là một trong những loài thú ăn thịt lớn nhất...',
  translated: 'Tigers are among the largest carnivorous mammals...',
};

export default function TranslateScreen() {
  const { languages } = useLang();
  const [listening, setListening] = useState(false);
  const [textOnly, setTextOnly] = useState(false);
  const names = languages.map((l) => l.name).join(' · ') || '—';

  return (
    <View style={styles.screen}>
      <ScreenHeader />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={styles.title}>Phiên dịch</Text>
        <Text style={styles.demo}>Phiên dịch mô phỏng · chưa kết nối dịch vụ giọng nói. Mục tiêu độ trễ 1–3 giây.</Text>
        <Text style={styles.label}>Ngôn ngữ hỗ trợ: {names}</Text>

        <Text style={styles.cap}>BẢN GỐC</Text>
        <Text style={styles.text}>{listening ? SAMPLE.original : 'Chưa có giọng nói'}</Text>
        <View style={styles.divider} />
        <Text style={styles.cap}>BẢN DỊCH</Text>
        <Text style={styles.text}>{listening ? SAMPLE.translated : 'Bản dịch sẽ hiện ở đây'}</Text>

        <View style={styles.switchRow}><Text style={styles.switchText}>Chỉ đọc chữ</Text><Switch value={textOnly} onValueChange={setTextOnly} /></View>
        <Button title={listening ? 'Dừng nghe' : 'Bắt đầu nghe'} onPress={() => setListening(!listening)} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  title: { fontSize: 28, fontWeight: '800', color: colors.primaryDark },
  demo: { color: colors.muted, marginTop: 6 },
  label: { color: colors.primary, marginVertical: 16 },
  cap: { fontSize: 12, fontWeight: '700', color: colors.primary, marginTop: 8 },
  text: { fontSize: 20, color: colors.text, marginTop: 6, minHeight: 60 },
  divider: { height: 1, backgroundColor: colors.line, marginVertical: 12 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16 },
  switchText: { fontSize: 16, color: colors.text },
});

import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StateView from '../../components/StateView';
import Button from '../../components/Button';
import { animalApi } from '../../api/endpoints';
import { useLang } from '../../context/LangContext';
import { AnimalDetail } from '../../types';
import { speak, stopSpeaking } from '../../utils/speech';
import { colors } from '../../theme';

export default function AnimalDetailScreen({ route }: any) {
  const { id, autoPlay } = route.params;
  const { lang } = useLang();
  const [animal, setAnimal] = useState<AnimalDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    try { setAnimal(await animalApi.detail(id, lang)); } catch (e: any) { setError(e.message); }
  }, [id, lang]);
  useEffect(() => { load(); return () => stopSpeaking(); }, [load]);

  const narration = animal && (animal.narration ?? [animal.name, animal.description, animal.behavior, animal.history].filter(Boolean).join('. '));
  const toggle = () => {
    if (playing) { stopSpeaking(); setPlaying(false); return; }
    if (!narration) return;
    setPlaying(true);
    speak(narration, animal!.lang, () => setPlaying(false));
  };
  useEffect(() => { if (autoPlay && animal && narration) toggle(); }, [animal?.id]); // eslint-disable-line

  if (!animal) return <View style={styles.screen}><StateView loading={!error} error={error} onRetry={load} /></View>;

  const rows: [string, string | null | undefined][] = [
    ['Tên', animal.name], ['Giới', animal.kingdom], ['Ngành', animal.phylum], ['Lớp', animal.className],
    ['Bộ', animal.orderName], ['Họ', animal.family], ['Chi', animal.genus], ['Loài', animal.scientificName],
    ['Kích thước & cân nặng', animal.sizeWeight], ['Tuổi thọ', animal.lifespan], ['Khu vực', animal.zoneName],
  ];
  const texts: [string, string | null | undefined][] = [
    ['Mô tả', animal.description], ['Tập tính sinh hoạt', animal.behavior], ['Lịch sử hình thành và phát triển', animal.history],
  ];

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 140 }}>
        <Text style={styles.title}>Hồ sơ loài</Text>
        {!animal.narration && <Text style={styles.warn}>Chưa có bản thuyết minh ngôn ngữ "{lang}"; đang dùng nội dung mặc định.</Text>}
        {rows.filter(([, v]) => v).map(([k, v]) => (
          <View key={k} style={styles.row}><Text style={styles.key}>{k}</Text><Text style={styles.val}>{v}</Text></View>
        ))}
        {texts.filter(([, v]) => v).map(([k, v]) => (
          <View key={k} style={{ marginTop: 20 }}><Text style={styles.heading}>{k}</Text><Text style={styles.body}>{v}</Text></View>
        ))}
      </ScrollView>
      <View style={styles.player}>
        <View style={styles.playerRow}>
          <Ionicons name="headset-outline" size={20} color={colors.primary} />
          <Text style={styles.playerText}>{playing ? 'Đang phát thuyết minh' : 'Thuyết minh toàn bộ hồ sơ'}</Text>
        </View>
        <Button title={playing ? 'Dừng' : 'Nghe thuyết minh'} onPress={toggle} disabled={!narration} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  title: { fontSize: 26, fontWeight: '800', color: colors.primaryDark },
  warn: { color: '#9A4B2F', marginTop: 8, marginBottom: 8 },
  row: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.line },
  key: { width: 120, color: colors.muted, fontSize: 16 },
  val: { flex: 1, color: colors.text, fontSize: 16 },
  heading: { fontSize: 18, fontWeight: '700', color: colors.primaryDark, marginBottom: 6 },
  body: { fontSize: 16, color: colors.text, lineHeight: 24 },
  player: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: colors.card, padding: 16, gap: 12 },
  playerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  playerText: { fontWeight: '700', color: colors.primaryDark },
});

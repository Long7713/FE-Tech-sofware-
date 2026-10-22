import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import StateView from '../../components/StateView';
import { animalApi } from '../../api/endpoints';
import { Animal } from '../../types';
import { colors } from '../../theme';

export default function AnimalListScreen({ navigation }: any) {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try { setAnimals((await animalApi.list()) ?? []); } catch (e: any) { setError(e.message); }
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? animals.filter((a) => `${a.name} ${a.scientificName ?? ''}`.toLowerCase().includes(q)) : animals;
  }, [animals, query]);

  return (
    <View style={styles.screen}>
      <ScreenHeader />
      <FlatList
        data={filtered}
        keyExtractor={(a) => String(a.id)}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Khám phá muôn loài</Text>
            <Text style={styles.sub}>Gặp gỡ, lắng nghe và hiểu thêm.</Text>
            <View style={styles.search}>
              <Ionicons name="search-outline" size={20} color={colors.primary} />
              <TextInput value={query} onChangeText={setQuery} placeholder="Tìm tên hoặc khoa học"
                placeholderTextColor={colors.muted} style={styles.input} />
            </View>
            <Text style={styles.count}>{filtered.length} loài</Text>
          </View>
        }
        ListEmptyComponent={<StateView loading={loading} error={error} empty="Chưa có động vật nào" onRetry={load} />}
        renderItem={({ item }) => (
          <Pressable style={styles.item} onPress={() => navigation.navigate('AnimalDetail', { id: item.id, name: item.name })}>
            {item.imageUrl ? <Image source={{ uri: item.imageUrl }} style={styles.thumb} /> :
              <View style={[styles.thumb, styles.thumbEmpty]}><Ionicons name="paw" size={28} color={colors.primary} /></View>}
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.latin}>{item.scientificName}</Text>
              <Text style={styles.zone}>{item.className ?? ''}{item.zone ? ` · ${item.zone.name}` : ''}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.primary} />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  title: { fontSize: 28, fontWeight: '800', color: colors.primaryDark },
  sub: { color: colors.muted, marginTop: 4, marginBottom: 16, fontSize: 16 },
  search: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: colors.line, borderRadius: 10, paddingHorizontal: 14, height: 48, backgroundColor: '#FBFAF6' },
  input: { flex: 1, fontSize: 16, color: colors.text },
  count: { color: colors.muted, marginVertical: 12 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.line },
  thumb: { width: 80, height: 80, borderRadius: 4 },
  thumbEmpty: { backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 20, fontWeight: '700', color: colors.primaryDark },
  latin: { color: colors.muted, marginTop: 2, fontStyle: 'italic' },
  zone: { color: colors.primary, marginTop: 6 },
});

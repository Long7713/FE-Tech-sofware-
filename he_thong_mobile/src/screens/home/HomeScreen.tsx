import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Button from '../../components/Button';
import { colors } from '../../theme';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.screen}>
      <ScreenHeader />
      <ScrollView>
        <View style={styles.hero}><Ionicons name="paw" size={64} color={colors.primary} /></View>
        <View style={styles.body}>
          <Text style={styles.title}>Gần gũi thiên nhiên, kết nối muôn loài.</Text>
          <Text style={styles.sub}>Một hành trình xanh, muôn điều khám phá.</Text>
          <Button title="Khám phá thảo cầm viên" onPress={() => navigation.navigate('Animals')} style={{ marginTop: 24 }} />
          <Button title="Mở bản đồ" variant="link" onPress={() => navigation.navigate('Map')} />
          <Text style={styles.section}>Trước khi bạn đến</Text>
          {[['time-outline', 'Giờ mở cửa'], ['ticket-outline', 'Giá vé'], ['car-outline', 'Đường đi']].map(([icon, label]) => (
            <View key={label} style={styles.row}>
              <Ionicons name={icon as any} size={22} color={colors.primary} />
              <Text style={styles.rowText}>{label}</Text>
              <Text style={styles.rowValue}>Đang cập nhật</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  hero: { height: 200, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  body: { padding: 24 },
  title: { fontSize: 32, fontWeight: '800', color: colors.primaryDark, lineHeight: 40 },
  sub: { fontSize: 16, color: colors.muted, marginTop: 12 },
  section: { fontSize: 24, fontWeight: '700', color: colors.primaryDark, marginTop: 24, marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.line },
  rowText: { flex: 1, fontSize: 16, color: colors.text },
  rowValue: { color: colors.muted },
});

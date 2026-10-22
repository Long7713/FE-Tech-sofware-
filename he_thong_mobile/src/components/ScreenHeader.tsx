import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { useLang } from '../context/LangContext';

/** Thanh tren cung: logo Zoo Guide + chon ngon ngu thuyet minh. */
export default function ScreenHeader() {
  const insets = useSafeAreaInsets();
  const { lang, languages, setLang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <View style={[styles.bar, { paddingTop: insets.top + 8 }]}>
      <View style={styles.brand}>
        <Ionicons name="leaf-outline" size={26} color={colors.primary} />
        <Text style={styles.brandText}>Zoo Guide</Text>
      </View>
      <Pressable style={styles.lang} onPress={() => setOpen(true)}>
        <Ionicons name="globe-outline" size={20} color={colors.primary} />
        <Text style={styles.langText}>{lang.toUpperCase()}</Text>
        <Ionicons name="chevron-down" size={14} color={colors.primary} />
      </Pressable>

      <Modal transparent animationType="fade" visible={open} onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Ngôn ngữ thuyết minh</Text>
            {languages.map((l) => (
              <Pressable key={l.id} style={styles.item} onPress={() => { setLang(l.code); setOpen(false); }}>
                <Text style={[styles.itemText, l.code === lang && styles.itemActive]}>{l.name}</Text>
                {l.code === lang && <Ionicons name="checkmark-circle-outline" size={22} color={colors.primary} />}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingBottom: 12, backgroundColor: colors.bg },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandText: { fontSize: 22, color: colors.primaryDark },
  lang: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  langText: { fontWeight: '700', color: colors.primary },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 32 },
  sheet: { backgroundColor: colors.bg, borderRadius: 16, padding: 20 },
  sheetTitle: { fontSize: 18, fontWeight: '700', color: colors.primaryDark, marginBottom: 8 },
  item: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.line },
  itemText: { fontSize: 16, color: colors.text },
  itemActive: { fontWeight: '700', color: colors.primary },
});

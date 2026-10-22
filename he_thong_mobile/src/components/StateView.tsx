import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import Button from './Button';

/** Hien thi trang thai dang tai / loi / rong cho cac man hinh goi API. */
export default function StateView({ loading, error, empty, onRetry }:
  { loading?: boolean; error?: string | null; empty?: string; onRetry?: () => void }) {
  if (loading) return <View style={styles.box}><ActivityIndicator color={colors.primary} /></View>;
  if (error) return (
    <View style={styles.box}>
      <Text style={styles.error}>{error}</Text>
      {onRetry && <Button title="Thử lại" variant="outline" onPress={onRetry} style={{ marginTop: 12 }} />}
    </View>
  );
  if (empty) return <View style={styles.box}><Text style={styles.empty}>{empty}</Text></View>;
  return null;
}

const styles = StyleSheet.create({
  box: { padding: 24, alignItems: 'center' },
  error: { color: colors.danger, textAlign: 'center' },
  empty: { color: colors.muted, textAlign: 'center' },
});

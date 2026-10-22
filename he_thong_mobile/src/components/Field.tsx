import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '../theme';

export default function Field({ label, ...props }: TextInputProps & { label: string }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholderTextColor={colors.muted} autoCapitalize="none" style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontWeight: '600', color: colors.primaryDark, marginBottom: 8 },
  input: { height: 48, borderWidth: 1, borderColor: colors.line, borderRadius: 10, paddingHorizontal: 12, fontSize: 16, color: colors.text, backgroundColor: '#FBFAF6' },
});

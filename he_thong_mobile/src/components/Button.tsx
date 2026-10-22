import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../theme';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'link';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function Button({ title, onPress, variant = 'primary', loading, disabled, style }: Props) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      style={[styles.base, variant === 'primary' && styles.primary, variant === 'outline' && styles.outline,
        variant === 'link' && styles.link, (disabled || loading) && styles.disabled, style]}
    >
      {loading ? <ActivityIndicator color={isPrimary ? colors.white : colors.primary} /> : (
        <Text style={[styles.text, isPrimary && { color: colors.white }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  primary: { backgroundColor: colors.primary },
  outline: { borderWidth: 1, borderColor: colors.line, backgroundColor: colors.bg },
  link: { height: 40 },
  disabled: { opacity: 0.5 },
  text: { fontSize: 16, fontWeight: '700', color: colors.primary },
});

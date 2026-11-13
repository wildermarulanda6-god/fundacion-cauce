import { Controller } from 'react-hook-form';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '@/theme';

interface FormFieldProps<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChangeText' | 'onBlur'> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
}

export function FormField<T extends FieldValues>({ control, name, label, ...inputProps }: FormFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View style={styles.wrap}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            {...inputProps}
            value={String(value ?? '')}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor={COLORS.pizarra}
            style={[styles.input, error && styles.inputError]}
            accessibilityLabel={label}
          />
          {error ? <Text style={styles.error}>{error.message}</Text> : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrap: { gap: SPACING.xs },
  label: { ...TYPOGRAPHY.label, color: COLORS.cauce },
  input: {
    backgroundColor: COLORS.papel,
    borderWidth: 1,
    borderColor: COLORS.linea,
    borderRadius: RADIUS.card,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    fontSize: 15,
    color: COLORS.ink,
  },
  inputError: { borderColor: COLORS.coral },
  error: { ...TYPOGRAPHY.label, color: COLORS.coral },
});
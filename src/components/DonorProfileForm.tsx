import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FormField } from '@/components/FormField';
import { donorProfileSchema, EMPTY_PROFILE } from '@/schemas/donorProfile';
import type { DonorProfile } from '@/schemas/donorProfile';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '@/theme';

interface DonorProfileFormProps {
  defaultValues: DonorProfile;
  onSave: (values: DonorProfile) => Promise<void>;
  onClear: () => Promise<void>;
}

export function DonorProfileForm({ defaultValues, onSave, onClear }: DonorProfileFormProps) {
  const [message, setMessage] = useState('');
  const { control, handleSubmit, reset } = useForm<DonorProfile>({
    resolver: zodResolver(donorProfileSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const submit = handleSubmit(async (values) => {
    await onSave(values);
    setMessage('Datos guardados de forma cifrada en este teléfono');
  });

  const handleSave = () => {
    void submit();
  };

  const handleClear = () => {
    void onClear().then(() => {
      reset(EMPTY_PROFILE);
      setMessage('Datos borrados');
    });
  };

  return (
    <View style={styles.wrap}>
      <FormField control={control} name="name" label="Nombre" placeholder="Tu nombre completo" />
      <FormField
        control={control}
        name="email"
        label="Correo"
        placeholder="tucorreo@ejemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <FormField
        control={control}
        name="document"
        label="Documento"
        placeholder="Solo números"
        keyboardType="number-pad"
      />
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <Pressable
        onPress={handleSave}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Guardar perfil</Text>
      </Pressable>
      <Pressable onPress={handleClear} style={styles.clear} accessibilityRole="button">
        <Text style={styles.clearText}>Borrar mis datos</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: SPACING.lg },
  message: { ...TYPOGRAPHY.label, color: COLORS.agua },
  button: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.cauce,
  },
  pressed: { opacity: 0.7 },
  buttonText: { ...TYPOGRAPHY.label, color: COLORS.papel },
  clear: { alignItems: 'center', paddingVertical: SPACING.sm },
  clearText: { ...TYPOGRAPHY.label, color: COLORS.coral },
});
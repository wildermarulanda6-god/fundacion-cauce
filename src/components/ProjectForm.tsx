import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FormField } from '@/components/FormField';
import { projectFormSchema } from '@/schemas/project';
import type { ProjectFormValues } from '@/schemas/project';
import { COLORS, RADIUS, SPACING, STATUS_LABEL, TYPOGRAPHY } from '@/theme';
import type { ProjectStatus } from '@/types';

const STATUS_OPTIONS: ProjectStatus[] = ['active', 'paused', 'completed'];

interface ProjectFormProps {
  defaultValues: ProjectFormValues;
  submitLabel: string;
  isSubmitting: boolean;
  serverError?: string;
  onSubmit: (values: ProjectFormValues) => void;
}

export function ProjectForm({ defaultValues, submitLabel, isSubmitting, serverError, onSubmit }: ProjectFormProps) {
  const { control, handleSubmit } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
    mode: 'onTouched',
  });

    const submit = handleSubmit(onSubmit);
  const handlePress = () => {
    void submit();
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <FormField control={control} name="title" label="Título" placeholder="Ej. Agua limpia para Cazucá" />
        <FormField control={control} name="location" label="Lugar" placeholder="Ej. Soacha, Cundinamarca" />
        <FormField
          control={control}
          name="summary"
          label="Resumen"
          placeholder="Cuenta en una o dos frases de qué trata"
          multiline
        />
        <FormField
          control={control}
          name="goalAmount"
          label="Meta en pesos"
          placeholder="Ej. 8000000"
          keyboardType="number-pad"
        />

        <Controller
          control={control}
          name="status"
          render={({ field: { value, onChange } }) => (
            <View style={styles.group}>
              <Text style={styles.label}>Estado</Text>
              <View style={styles.chips}>
                {STATUS_OPTIONS.map((option) => {
                  const selected = option === value;
                  return (
                    <Pressable
                      key={option}
                      onPress={() => onChange(option)}
                      style={[styles.chip, selected && styles.chipSelected]}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                    >
                      <Text style={selected ? styles.chipTextSelected : styles.chipText}>
                        {STATUS_LABEL[option]}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}
        />

        {serverError ? <Text style={styles.serverError}>{serverError}</Text> : null}

        <Pressable
          onPress={handlePress}
          disabled={isSubmitting}
          style={({ pressed }) => [styles.button, (pressed || isSubmitting) && styles.buttonPressed]}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>{isSubmitting ? 'Guardando…' : submitLabel}</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.niebla },
  content: { padding: SPACING.lg, gap: SPACING.lg, paddingBottom: SPACING.xxl },
  group: { gap: SPACING.xs },
  label: { ...TYPOGRAPHY.label, color: COLORS.cauce },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  chip: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.badge,
    borderWidth: 1,
    borderColor: COLORS.linea,
    backgroundColor: COLORS.papel,
  },
  chipSelected: { backgroundColor: COLORS.cauce, borderColor: COLORS.cauce },
  chipText: { ...TYPOGRAPHY.label, color: COLORS.cauce },
  chipTextSelected: { ...TYPOGRAPHY.label, color: COLORS.papel },
  serverError: { ...TYPOGRAPHY.label, color: COLORS.coral },
  button: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.cauce,
  },
  buttonPressed: { opacity: 0.7 },
  buttonText: { ...TYPOGRAPHY.label, color: COLORS.papel },
});
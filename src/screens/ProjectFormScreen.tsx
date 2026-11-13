import { useCallback } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCreateProject, useProject, useUpdateProject } from '@/api/queries';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';
import { ProjectForm } from '@/components/ProjectForm';
import type { RootStackParamList } from '@/navigation/types';
import type { ProjectFormValues } from '@/schemas/project';
import type { ProjectInput } from '@/types';

type ProjectFormScreenProps = NativeStackScreenProps<RootStackParamList, 'ProjectForm'>;

const EMPTY_VALUES: ProjectFormValues = {
  title: '',
  location: '',
  summary: '',
  goalAmount: '',
  status: 'active',
};

function toInput(values: ProjectFormValues): ProjectInput {
  return {
    title: values.title,
    location: values.location,
    summary: values.summary,
    goalAmount: Number(values.goalAmount),
    status: values.status,
  };
}

interface ViewProps {
  onDone: () => void;
}

function CreateProjectView({ onDone }: ViewProps) {
  const { mutate, isPending, error } = useCreateProject();

  const handleSubmit = useCallback(
    (values: ProjectFormValues) => mutate(toInput(values), { onSuccess: onDone }),
    [mutate, onDone],
  );

  return (
    <ProjectForm
      defaultValues={EMPTY_VALUES}
      submitLabel="Crear proyecto"
      isSubmitting={isPending}
      serverError={error?.message}
      onSubmit={handleSubmit}
    />
  );
}

interface EditViewProps extends ViewProps {
  projectId: string;
}

function EditProjectView({ projectId, onDone }: EditViewProps) {
  const { data: project, isPending, isError, error, refetch } = useProject(projectId);
  const { mutate, isPending: isSaving, error: saveError } = useUpdateProject(projectId);

  const handleSubmit = useCallback(
    (values: ProjectFormValues) => mutate(toInput(values), { onSuccess: onDone }),
    [mutate, onDone],
  );

  const handleRetry = useCallback(() => {
    void refetch();
  }, [refetch]);

  if (isPending) {
    return <LoadingState />;
  }
  if (isError) {
    return <ErrorState message={error.message} onRetry={handleRetry} />;
  }

  return (
    <ProjectForm
      defaultValues={{
        title: project.title,
        location: project.location,
        summary: project.summary,
        goalAmount: String(project.goalAmount),
        status: project.status,
      }}
      submitLabel="Guardar cambios"
      isSubmitting={isSaving}
      serverError={saveError?.message}
      onSubmit={handleSubmit}
    />
  );
}

export function ProjectFormScreen({ route, navigation }: ProjectFormScreenProps) {
  const projectId = route.params?.projectId;
  const handleDone = useCallback(() => navigation.goBack(), [navigation]);

  if (projectId === undefined) {
    return <CreateProjectView onDone={handleDone} />;
  }
  return <EditProjectView projectId={projectId} onDone={handleDone} />;
}
import type { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Projects: undefined;
  Favorites: undefined;
  Donors: undefined;
  Beneficiaries: undefined;
  Reports: undefined;
};

export type RootStackParamList = {
  Settings: undefined;
  Tabs: NavigatorScreenParams<TabParamList>;
  ProjectDetail: { projectId: string };
  ProjectForm: { projectId?: string } | undefined;
};
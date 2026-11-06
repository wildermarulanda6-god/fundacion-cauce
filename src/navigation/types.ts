import type { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Projects: undefined;
  Donors: undefined;
  Beneficiaries: undefined;
  Reports: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  ProjectDetail: { projectId: string };
};
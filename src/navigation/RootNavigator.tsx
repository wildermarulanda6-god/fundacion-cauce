import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BeneficiariesScreen } from '@/screens/BeneficiariesScreen';
import { DonorsScreen } from '@/screens/DonorsScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { ProjectDetailScreen } from '@/screens/ProjectDetailScreen';
import { ReportsScreen } from '@/screens/ReportsScreen';
import { COLORS } from '@/theme';
import type { RootStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const headerOptions = {
  headerStyle: { backgroundColor: COLORS.cauce },
  headerTintColor: COLORS.papel,
  headerTitleStyle: { fontWeight: '700' as const },
};

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        ...headerOptions,
        tabBarActiveTintColor: COLORS.cauce,
        tabBarInactiveTintColor: COLORS.pizarra,
        tabBarIcon: () => null,
        tabBarIconStyle: styles.hiddenIcon,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen name="Projects" component={HomeScreen} options={{ title: 'Proyectos', headerShown: false }} />
      <Tab.Screen name="Donors" component={DonorsScreen} options={{ title: 'Donantes' }} />
      <Tab.Screen name="Beneficiaries" component={BeneficiariesScreen} options={{ title: 'Beneficiarios' }} />
      <Tab.Screen name="Reports" component={ReportsScreen} options={{ title: 'Informes' }} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={headerOptions}>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} options={{ title: 'Proyecto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  hiddenIcon: { display: 'none' },
  tabLabel: { fontSize: 13, fontWeight: '600', paddingBottom: 6 },
});
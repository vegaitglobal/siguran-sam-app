import AlertScreen from '@/domain/alert/screens';
import ContactsScreen from '@/domain/contacts/screens';
import EducationScreen from '@/domain/education/screens';
import Icon, { IconName } from '@/shared/components/icon';
import { AppScreen } from '@/shared/constants';
import { Colors } from '@/shared/styles';
import { BottomTabsParamList } from '@/shared/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styles } from './bottom-tabs.style';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

const BottomTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarActiveTintColor: Colors.RED.SECONDARY,
				tabBarInactiveTintColor: Colors.WHITE.SECONDARY,
				tabBarStyle: styles.tabBarStyle,
				tabBarLabelStyle: styles.labelStyle,
				tabBarIcon: ({ color }) => (
					<TabBarIcon routeName={route.name} color={color} />
				),
				unmountOnBlur: true,
			})}
		>
			<Tab.Screen name={AppScreen.ALERT} component={AlertScreen} />
			<Tab.Screen name={AppScreen.CONTACTS} component={ContactsScreen} />
			<Tab.Screen name={AppScreen.EDUCATION} component={EducationScreen} />
		</Tab.Navigator>
	);
};

export default BottomTabs;

interface TabBarIconProps {
	routeName: keyof BottomTabsParamList;
	color: string;
}

const TabBarIcon = ({ routeName, color }: TabBarIconProps) => {
	const availableIcons: Partial<Record<keyof BottomTabsParamList, IconName>> = {
		[AppScreen.ALERT]: 'home',
		[AppScreen.CONTACTS]: 'star-outline',
		[AppScreen.EDUCATION]: 'education-hat',
	};

	const iconName = availableIcons[routeName];

	if (!iconName) return null;

	return <Icon pointerEvents='none' name={iconName} color={color} />;
};

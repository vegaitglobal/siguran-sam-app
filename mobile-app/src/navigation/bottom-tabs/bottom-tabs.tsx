import AlertScreen from '@/domain/alert/screens';
import ContactsScreen from '@/domain/contacts/screens';
import EducationScreen from '@/domain/education/screens';
import { AppScreen } from '@/shared/constants';
import { BottomTabsParamList } from '@/shared/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

const BottomTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={() => ({
				headerShown: false,
			})}
		>
			<Tab.Screen name={AppScreen.ALERT} component={AlertScreen} />
			<Tab.Screen name={AppScreen.CONTACTS} component={ContactsScreen} />
			<Tab.Screen name={AppScreen.EDUCATION} component={EducationScreen} />
		</Tab.Navigator>
	);
};

export default BottomTabs;
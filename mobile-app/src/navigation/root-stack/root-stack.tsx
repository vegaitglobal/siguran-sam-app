import { AppScreen } from '@/shared/constants';
import { RootStackParamList } from '@/shared/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../bottom-tabs';
import { useAppInit } from '@/shared/hooks';
import SplashScreen from '@/domain/splash/screens/splash-screen';
import { styles } from './root-stack.style';
import BlogPostListScreen from '@/domain/education/screens/blog-post-list';
import BlogPostScreen from '@/domain/education/screens/blog-post';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
	const initialized = useAppInit();
	return (
		<Stack.Navigator
			initialRouteName={!initialized ? AppScreen.SPLASH : AppScreen.BOTTOM_TABS}
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
				contentStyle: styles.contentStyle,
			}}
		>
			{!initialized ? (
				<Stack.Screen name={AppScreen.SPLASH} component={SplashScreen} />
			) : (
				<>
					<Stack.Group>
						<Stack.Screen name={AppScreen.BOTTOM_TABS} component={BottomTabs} />
						<Stack.Screen name={AppScreen.BLOGPOSTLIST}>
							{(props) => <BlogPostListScreen {...props} />}
						</Stack.Screen>
						<Stack.Screen name={AppScreen.BLOGPOST}>
							{(props) => <BlogPostScreen {...props} />}
						</Stack.Screen>
					</Stack.Group>
				</>
			)}
		</Stack.Navigator>
	);
};

export default RootStack;

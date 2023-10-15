import { ScreenTemplate } from '@/shared/components';
import { Header } from '@/shared/components/header';
import Label from '@/shared/components/label';
import { View } from 'react-native';
import { styles } from './more-options.screen.style';
import Icon, { IconName } from '@/shared/components/icon';
import { Text } from 'react-native';
import { Pressable } from 'react-native';
import { PressableProps } from 'react-native';
import { AppScreen } from '@/shared/constants';

interface LinkProps extends PressableProps {
	title: string;
	icon: IconName;
	screen: AppScreen;
}

const Link = ({ title, icon, ...props }: LinkProps) => {
	const handlePress = () => {
		alert('¯\\_(ツ)_/¯');
	};

	return (
		<Pressable style={styles.link} onPress={handlePress} {...props}>
			<View style={styles.linkTitleGroup}>
				<Icon size={30} name={icon} />
				<Text style={styles.linkTitle}>{title}</Text>
			</View>
			<Icon name='arrow-small-right' size={10} />
		</Pressable>
	);
};

export const MoreOptionsScreen = () => {
	return (
		<ScreenTemplate>
			<Header hideRightComponent />
			<View style={styles.container}>
				<Link icon='terms' title='Uslovi korišćenja' screen={AppScreen.TERMS} />
				<Link
					icon='edit-data'
					title='Izmeni podatke'
					screen={AppScreen.TERMS}
				/>
				<Link icon='about-us' title='O nama' screen={AppScreen.TERMS} />
				<Link
					icon='contact-us'
					title='Kontaktirajte nas'
					screen={AppScreen.TERMS}
				/>
				<Link icon='follow-us' title='Zapratite nas' screen={AppScreen.TERMS} />
				<Link icon='tutorial' title='Tutorial' screen={AppScreen.TERMS} />
			</View>
		</ScreenTemplate>
	);
};

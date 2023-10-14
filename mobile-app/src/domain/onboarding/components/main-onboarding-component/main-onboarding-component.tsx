import { memo } from 'react';
import Tutorial from '../tutorial';
import { StyleSheet } from 'react-native';
import AppInput from '@/shared/components/app-input';
import Label from '@/shared/components/label';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface Props {
	step: number;
	name: string;
	onChangeName: (newName: string) => void;
}

const MainOnboardingComponent = ({ step, name, onChangeName }: Props) => {
	if (step <= 6) return <Tutorial step={step} />;

	if (step === 7)
		return (
			<Animated.View
				entering={FadeIn}
				exiting={FadeOut}
				style={styles.container}
			>
				<Label type='h1' style={styles.labelStyle}>
					Ime i prezime
				</Label>
				<AppInput
					value={name}
					onChangeText={onChangeName}
					placeholder='Unesite Vaše ime i prezime'
				/>
			</Animated.View>
		);
	return null;
};

export default memo(MainOnboardingComponent);

export const styles = StyleSheet.create({
	container: {
		marginTop: 64,
	},
	labelStyle: {
		marginBottom: 12,
	},
});

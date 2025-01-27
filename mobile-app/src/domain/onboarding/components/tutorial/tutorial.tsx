import Tutorial1Svg from '@/shared/assets/images/tutorial-1.svg';
import Tutorial2Svg from '@/shared/assets/images/tutorial-2.svg';
import Tutorial3Svg from '@/shared/assets/images/tutorial-3.svg';
import Tutorial4Svg from '@/shared/assets/images/tutorial-4.svg';
import Tutorial5Svg from '@/shared/assets/images/tutorial-5.svg';
import Tutorial6Svg from '@/shared/assets/images/tutorial-6.svg';
import Label from '@/shared/components/label';
import { Colors } from '@/shared/styles';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
	FadeIn,
	FadeOut,
	ZoomIn,
	ZoomOut,
} from 'react-native-reanimated';

interface Props {
	step: number;
}

const Tutorial = ({ step }: Props) => {
	return (
		<View style={styles.container}>
			{step === 1 ? (
				<>
					<Animated.View
						entering={FadeIn}
						exiting={FadeOut}
						style={styles.labelContainer}
					>
						<Label type='h1' style={styles.text} color={Colors.WHITE.SECONDARY}>
							Na početnoj strani nalazi se{' '}
							<Label type='h1'>sigurnosno dugme.</Label>
						</Label>
					</Animated.View>
					<Animated.View entering={ZoomIn} exiting={ZoomOut}>
						<Tutorial1Svg />
					</Animated.View>
				</>
			) : null}
			{step === 2 ? (
				<>
					<Animated.View
						entering={FadeIn}
						exiting={FadeOut}
						style={styles.labelContainer}
					>
						<Label type='h1' style={styles.text} color={Colors.WHITE.SECONDARY}>
							<Label type='h1'>{`Držanjem dugmeta 2s\n`}</Label>
							Vaši sigurnosni kontakti biće obavešteni.
						</Label>
					</Animated.View>
					<Animated.View entering={ZoomIn} exiting={ZoomOut}>
						<Tutorial2Svg />
					</Animated.View>
				</>
			) : null}
			{step === 3 ? (
				<>
					<Animated.View
						entering={FadeIn}
						exiting={FadeOut}
						style={styles.labelContainer}
					>
						<Label type='h1' style={styles.text} color={Colors.WHITE.SECONDARY}>
							Korišćenje ove funkcije možda će se{' '}
							<Label type='h1'>naplaćivati</Label>.
						</Label>
					</Animated.View>
					<Animated.View entering={ZoomIn} exiting={ZoomOut}>
						<Tutorial3Svg />
					</Animated.View>
				</>
			) : null}
			{step === 4 ? (
				<>
					<Animated.View
						entering={FadeIn}
						exiting={FadeOut}
						style={styles.labelContainer}
					>
						<Label type='h1' style={styles.text} color={Colors.WHITE.SECONDARY}>
							Sekcija <Label type='h1'>Moji brojevi</Label> služi za naknadnu
							izmenu sigurnosnih kontakata.
						</Label>
					</Animated.View>
					<Animated.View entering={ZoomIn} exiting={ZoomOut}>
						<Tutorial4Svg />
					</Animated.View>
				</>
			) : null}
			{step === 5 ? (
				<>
					<Animated.View
						entering={FadeIn}
						exiting={FadeOut}
						style={styles.labelContainer}
					>
						<Label type='h1' style={styles.text} color={Colors.WHITE.SECONDARY}>
							U sekciji <Label type='h1'>Moja poruka</Label> možete pregledati
							Vašu sigurnosnu poruku.
						</Label>
					</Animated.View>
					<Animated.View entering={ZoomIn} exiting={ZoomOut}>
						<Tutorial5Svg />
					</Animated.View>
				</>
			) : null}
			{step === 6 ? (
				<>
					<Animated.View
						entering={FadeIn}
						exiting={FadeOut}
						style={styles.labelContainer}
					>
						<Label type='h1' style={styles.text} color={Colors.WHITE.SECONDARY}>
							U sekciji <Label type='h1'>Edukacija</Label> možete pronaći
							sadržaj edukativnog karaktera.
						</Label>
					</Animated.View>
					<Animated.View entering={ZoomIn} exiting={ZoomOut}>
						<Tutorial6Svg />
					</Animated.View>
				</>
			) : null}
		</View>
	);
};

export default memo(Tutorial);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: { textAlign: 'center' },
	labelContainer: {
		position: 'absolute',
		top: 34,
	},
});

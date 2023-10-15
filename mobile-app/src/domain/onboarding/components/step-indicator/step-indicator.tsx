import { StyleSheet, View } from 'react-native';

import Bar from '../bar';
import { memo } from 'react';

interface Props {
	step: number;
}

const StepIndicator = ({ step }: Props) => {
	return (
		<View style={styles.container}>
			<Bar isActive={step > 0} expanded={step < 7} />
			<View style={styles.spacing} />
			<Bar isActive={step > 6} expanded={step === 7} />
			<View style={styles.spacing} />
			<Bar isActive={step > 7} expanded={step === 8} />
		</View>
	);
};

export default memo(StepIndicator);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	spacing: {
		width: 6,
	},
});

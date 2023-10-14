import { memo } from 'react';
import Tutorial from '../tutorial';

interface Props {
	step: number;
}

const MainOnboardingComponent = ({ step }: Props) => {
	if (step <= 6) return <Tutorial step={step} />;
	return null;
};

export default memo(MainOnboardingComponent);

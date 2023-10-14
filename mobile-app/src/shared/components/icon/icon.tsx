import { Pressable, PressableProps } from 'react-native';
import { IconName, iconComponents } from './icon.data';

interface Props extends PressableProps {
	name: IconName;
	size?: number;
	color?: string;
}

const Icon = ({ name, size = 20, color = 'maroon', ...otherProps }: Props) => {
	const SvgComponent = iconComponents[name];

	if (!SvgComponent) return null;

	return (
		<Pressable {...otherProps}>
			<SvgComponent color={color} width={size} height={size} />
		</Pressable>
	);
};

export default Icon;

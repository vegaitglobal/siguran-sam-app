import Home from '@/shared/assets/icons/home.svg';
import StarOutline from '@/shared/assets/icons/star-outline.svg';
import EducationHat from '@/shared/assets/icons/education-hat.svg';
import Hamburger from '@/shared/assets/icons/hamburger.svg';
import ArrowBack from '@/shared/assets/icons/arrow-back.svg';
import ArrowDown from '@/shared/assets/icons/arrow-down.svg';
import TrashCan from '@/shared/assets/icons/trash-can.svg';
import AddUser from '@/shared/assets/icons/add-user.svg';

export const iconComponents = {
	home: Home,
	'star-outline': StarOutline,
	'education-hat': EducationHat,
	hamburger: Hamburger,
	'arrow-back': ArrowBack,
	'arrow-down': ArrowDown,
	'trash-can': TrashCan,
	'add-user': AddUser,
};

export type IconName = keyof typeof iconComponents;

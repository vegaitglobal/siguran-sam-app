import Home from '@/shared/assets/icons/home.svg';
import StarOutline from '@/shared/assets/icons/star-outline.svg';
import EducationHat from '@/shared/assets/icons/education-hat.svg';
import Hamburger from '@/shared/assets/icons/hamburger.svg';
import ArrowBack from '@/shared/assets/icons/arrow-back.svg';
import ArrowDown from '@/shared/assets/icons/arrow-down.svg';
import TrashCan from '@/shared/assets/icons/trash-can.svg';
import AddUser from '@/shared/assets/icons/add-user.svg';
import ArrowBigLeft from '@/shared/assets/icons/arrow-big-left.svg';
import ArrowBigRight from '@/shared/assets/icons/arrow-big-right.svg';
import ArrowSmallRight from '@/shared/assets/icons/arrow-small-right.svg';
import ContactUs from '@/shared/assets/icons/contact-us.svg';
import EditData from '@/shared/assets/icons/edit-data.svg';
import FollowUs from '@/shared/assets/icons/follow-us.svg';
import Tutorial from '@/shared/assets/icons/tutorial.svg';
import AboutUs from '@/shared/assets/icons/about-us.svg';
import Terms from '@/shared/assets/icons/terms.svg';
import Phone from '@/shared/assets/icons/phone.svg';
import Website from '@/shared/assets/icons/website.svg';
import Instagram from '@/shared/assets/icons/instagram-icon.svg';
import Facebook from '@/shared/assets/icons/facebook-icon.svg';
import Twitter from '@/shared/assets/icons/twitter-icon.svg';
import Linkedin from '@/shared/assets/icons/linkedin-icon.svg';

export const iconComponents = {
  home: Home,
  'star-outline': StarOutline,
  'education-hat': EducationHat,
  hamburger: Hamburger,
  'arrow-back': ArrowBack,
  'arrow-down': ArrowDown,
  'trash-can': TrashCan,
  'add-user': AddUser,
  'arrow-big-left': ArrowBigLeft,
  'arrow-big-right': ArrowBigRight,
  tutorial: Tutorial,
  'arrow-small-right': ArrowSmallRight,
  'contact-us': ContactUs,
  'edit-data': EditData,
  'follow-us': FollowUs,
  'about-us': AboutUs,
  terms: Terms,
  phone: Phone,
  website: Website,
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
};

export type IconName = keyof typeof iconComponents;

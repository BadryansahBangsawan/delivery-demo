import React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Circle, Path } from 'react-native-svg';
import {
  ArchiveBoxIcon,
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  MinusIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  PlusIcon,
  QrCodeIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  StarIcon as OutlineStarIcon,
  TruckIcon,
  UserIcon,
  WalletIcon,
} from 'react-native-heroicons/outline';
import { StarIcon as SolidStarIcon } from 'react-native-heroicons/solid';

type IconProps = SvgProps & {
  size?: number;
};

function mapProps({ size = 24, ...props }: IconProps): SvgProps {
  return {
    width: size,
    height: size,
    ...props,
  };
}

function fromIcon(
  Component: React.ComponentType<SvgProps>
): React.FC<IconProps> {
  return function Icon(props: IconProps) {
    return <Component {...mapProps(props)} />;
  };
}

export const ArrowLeft = fromIcon(ArrowLeftIcon);
export const ArrowRight = fromIcon(ArrowRightIcon);
export const Bell = fromIcon(BellIcon);
export const QrCode = fromIcon(QrCodeIcon);
export const Search = fromIcon(MagnifyingGlassIcon);
export const Clock = fromIcon(ClockIcon);
export const Clock3 = fromIcon(ClockIcon);
export const MapPin = fromIcon(MapPinIcon);
export const ChevronRight = fromIcon(ChevronRightIcon);
export const ChevronDown = fromIcon(ChevronDownIcon);
export const Home = fromIcon(HomeIcon);
export const ShoppingBag = fromIcon(ShoppingBagIcon);
export const Wallet = fromIcon(WalletIcon);
export const MessageCircle = fromIcon(ChatBubbleLeftRightIcon);
export const CheckCircle = fromIcon(CheckCircleIcon);
export const User = fromIcon(UserIcon);
export const CreditCard = fromIcon(CreditCardIcon);
export const HelpCircle = fromIcon(QuestionMarkCircleIcon);
export const LogOut = fromIcon(ArrowLeftOnRectangleIcon);
export const Settings = fromIcon(Cog6ToothIcon);
export const Phone = fromIcon(PhoneIcon);
export const Send = fromIcon(PaperAirplaneIcon);
export function Bike(props: IconProps) {
  const { size = 24, color = '#1A1A1A', strokeWidth = 2, ...rest } = props;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...rest}>
      <Circle cx="6.5" cy="17" r="3" stroke={color} strokeWidth={strokeWidth} />
      <Circle cx="17.5" cy="17" r="3" stroke={color} strokeWidth={strokeWidth} />
      <Path
        d="M7.5 17h3.2l2.5-5.2h2.1l2.2 5.2M10.7 17l-2.2-5h3.8M13.2 11.8l-1.1-2.3h2.7M15.4 9.5h2.1"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 12h2.7M16.5 12.1l1.8-1.7"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
}
export const Car = fromIcon(TruckIcon);
export const Package = fromIcon(ArchiveBoxIcon);
export const Plus = fromIcon(PlusIcon);
export const Minus = fromIcon(MinusIcon);

export function Star(props: IconProps) {
  const { fill, ...rest } = props;
  const baseProps = mapProps(rest);

  if (fill && fill !== 'transparent' && fill !== 'none') {
    return <SolidStarIcon {...baseProps} fill={fill} />;
  }

  return <OutlineStarIcon {...baseProps} />;
}

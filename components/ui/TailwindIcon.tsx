import React from 'react';
import type { SvgProps } from 'react-native-svg';
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
export const Bike = fromIcon(TruckIcon);
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

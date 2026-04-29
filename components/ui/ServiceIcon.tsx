import { Image, type ImageStyle, type StyleProp } from 'react-native';

export type ServiceIconName =
  | 'ride'
  | 'car'
  | 'delivery'
  | 'food'
  | 'send'
  | 'package'
  | 'mart';

const SERVICE_ICON_SOURCE = {
  ride: require('../../assets/service-icons/ride.png'),
  car: require('../../assets/service-icons/car.png'),
  delivery: require('../../assets/service-icons/delivery.png'),
  food: require('../../assets/service-icons/food.png'),
  send: require('../../assets/service-icons/send.png'),
  package: require('../../assets/service-icons/package.png'),
  mart: require('../../assets/service-icons/mart.png'),
} as const;

interface ServiceIconProps {
  name: ServiceIconName;
  size?: number;
  style?: StyleProp<ImageStyle>;
}

export function ServiceIcon({ name, size = 24, style }: ServiceIconProps) {
  return (
    <Image
      source={SERVICE_ICON_SOURCE[name]}
      style={[{ width: size, height: size }, style]}
      resizeMode="contain"
    />
  );
}

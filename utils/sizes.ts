import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const scale = (size: number) => (width / 375) * size; // Assuming 375px is your base screen width
export const verticalScale = (size: number) => (height / 812) * size; // Assuming 812px is your base screen height
export const moderateScale = (size: number, factor: number = 0.5) =>
  size + (scale(size) - size) * factor;

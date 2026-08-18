import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';

export type IconType = 'google' | 'apple' | 'discord' ;

export interface AppIconProps {
  /** Accepts "google" | "discord" | "apple" */
  icon: IconType;
  /** Size of the icon in DP. Default: 30 */
  size?: number;
  /** Optional container style */
  style?: StyleProp<ViewStyle>;
  /** Optional callback triggered when the animation completes */
  onAnimationEnd?: () => void;
}

const BRAND_CONFIG = {
  google: {
    label: 'Google',
    renderIcon: (size: number) => (
      <FontAwesome6 name="google" size={size} color="#DB4437" />
    ),
  },
  apple: {
    label: 'Apple',
    renderIcon: (size: number) => (
      <Ionicons name="logo-apple" size={size} color="#000000" />
    ),
  },
  discord: {
    label: 'Discord',
    renderIcon: (size: number) => (
      <Ionicons name="logo-discord" size={size} color="#5865F2" />
    ),
  },
} as const;

export const AppIcon: React.FC<AppIconProps> = ({
  icon,
  size = 30,
  style,
  onAnimationEnd,
}) => {
  const config = BRAND_CONFIG[icon];

  // Animation values
  const iconScale = useSharedValue(0);
  const iconRotate = useSharedValue(-20);
  const iconTranslateX = useSharedValue(40); // Starts shifted right, settles to 0 (left of text)
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    // 1. Icon Pops in and Rotates to normal
    iconScale.value = withSpring(1, { damping: 12, stiffness: 100 });
    iconRotate.value = withSpring(0, { damping: 10 });

    // 2. Icon moves left to reveal the brand name next to it
    iconTranslateX.value = withSequence(
      withTiming(40, { duration: 300 }), // hold center briefly
      withTiming(0, { duration: 500, easing: Easing.out(Easing.back(1.5)) }, (finished) => {
        if (finished && onAnimationEnd) {
          runOnJS(onAnimationEnd)();
        }
      })
    );

    // 3. Text fades in as icon settles to its left
    textOpacity.value = withSequence(
      withTiming(0, { duration: 350 }),
      withTiming(1, { duration: 450 })
    );
  }, []);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: iconTranslateX.value },
      { scale: iconScale.value },
      { rotate: `${iconRotate.value}deg` },
    ],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  if (!config) return null;

  return (
    <View style={[styles.container, style]}>
      {/* Animated Icon (Sits at the left once animation finishes) */}
      <Animated.View
        style={[styles.iconWrapper, { width: size, height: size }, animatedIconStyle]}
      >
        {config.renderIcon(size)}
      </Animated.View>

      {/* Brand Text */}
      <Animated.View style={animatedTextStyle}>
        <Text style={[styles.label, { fontSize: size * 0.65 }]}>
          {config.label}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '700',
    color: '#111827',
  },
});

export default AppIcon;
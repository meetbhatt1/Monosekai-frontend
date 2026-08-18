// src/theme/responsive.js

import { useWindowDimensions } from "react-native";

const BREAKPOINTS = {
  compact: 0,
  phone: 360,
  largePhone: 430,
  tablet: 768,
  desktop: 1024,
};

export const getDeviceType = (width) => {
  if (width >= BREAKPOINTS.desktop) return "desktop";
  if (width >= BREAKPOINTS.tablet) return "tablet";
  if (width >= BREAKPOINTS.largePhone) return "largePhone";
  if (width >= BREAKPOINTS.phone) return "phone";

  return "compact";
};

export const responsiveValue = (width, values) => {
  const device = getDeviceType(width);

  return (
    values[device] ??
    values.phone ??
    values.compact ??
    Object.values(values)[0]
  );
};

export const wp = (width, percentage) =>
  width * (percentage / 100);

export const hp = (height, percentage) =>
  height * (percentage / 100);

export const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max);

export const getLayoutMetrics = (width) => {
  const device = getDeviceType(width);

  const horizontalPadding = responsiveValue(width, {
    compact: 16,
    phone: 20,
    largePhone: 24,
    tablet: 32,
    desktop: 48,
  });

  const columns = responsiveValue(width, {
    compact: 2,
    phone: 2,
    largePhone: 3,
    tablet: 4,
    desktop: 5,
  });

  const gap = responsiveValue(width, {
    compact: 12,
    phone: 14,
    largePhone: 16,
    tablet: 20,
  });

  const contentWidth =
    width - horizontalPadding * 2;

  const columnWidth =
    (contentWidth - gap * (columns - 1)) / columns;

  return {
    device,
    width,
    horizontalPadding,
    columns,
    gap,
    contentWidth,
    columnWidth,

    posterWidth: columnWidth,
    posterHeight: columnWidth / 0.7,

    heroHeight: clamp(width * 0.55, 210, 420),
  };
};

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();

  return {
    ...getLayoutMetrics(width),
    height,
    isCompact: width < 360,
    isTablet: width >= 768,
    isDesktop: width >= 1024,
  };
};
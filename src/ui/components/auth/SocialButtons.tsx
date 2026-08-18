import React from "react";

import { AppButton } from "../../primitives/AppButton";
import { AppIcon } from "../../primitives/AppIcon";
import { theme, useResponsive } from "../../../theme";

type SocialProvider =
  | "google"
  | "apple"
  | "discord";

interface SocialButtonsProps {
  provider: SocialProvider;
  onPress: () => void;
}

const PROVIDERS = {
  google: {
    title: "Google",
    icon: "google",
  },
  apple: {
    title: "Apple",
    icon: "apple",
  },
  discord: {
    title: "Discord",
    icon: "discord",
  },
} as const;

export default function SocialButtons({
  provider,
  onPress,
}: SocialButtonsProps) {

  const { title, icon } = PROVIDERS[provider];
  const { width, height } = useResponsive();

  return (
    <AppButton
      title=""
      variant="outline"
      leftIcon= {
      <AppIcon icon={icon} size={25} /> }
      style={{
        height: height/14,
        width: width/3.45,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        paddingHorizontal: 18
      }}
      onPress={onPress}
    />
  );
}
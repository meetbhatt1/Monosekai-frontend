import React from "react";
import { Switch, SwitchProps } from "react-native";

import { useTheme } from "../../theme";

export function AppSwitch({ value, ...props }) {
  const theme = useTheme();

  return (
    <Switch
      {...props}
      value={value}
      trackColor={{
        false: theme.colors.border,
        true: theme.colors.primary
      }}
      thumbColor={theme.colors.white}
      ios_backgroundColor={theme.colors.border} />);


}
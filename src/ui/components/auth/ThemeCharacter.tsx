import { StyleProp, ViewStyle } from "react-native";
import { AppImage } from "../../media/AppImage";
import { ThemeRegistry } from "../../registry/ThemeRegistry";

interface Props {
  page: "onboarding" | "login";
  visible?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ThemeCharacter({
  page,
  visible = true,
  style,
}: Props) {

  if (!visible) return null;

  return (
    <AppImage
      source={ThemeRegistry.getCharacter(page)}
      fit="contain"
      containerStyle={style}
    />
  );
}
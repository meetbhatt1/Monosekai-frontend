import { ImageSourcePropType } from "react-native";
import { AppImage } from "../../media/AppImage";
import { ThemeRegistry } from "../../registry/ThemeRegistry";

interface Props {
  name: "sakura" | "petals";
  position?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  width?: number;
  opacity?: number;
  rotation?: string;
  visible?: boolean;
}

export function ThemeDecoration({
  name,
  position,
  width = 100,
  opacity = 1,
  rotation = "0deg",
  visible = true,
}: Props) {
  if (!visible) return null;

  return (
    <AppImage
      source={ThemeRegistry.getDecoration(name) as ImageSourcePropType}
      fit="contain"
      containerStyle={{
        position: "absolute",
        width,
        opacity,
        transform: [{ rotate: rotation }],
        ...position,
      }}
    />
  );
}

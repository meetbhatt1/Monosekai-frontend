
import { AppImage } from "../../media/AppImage";
import { ThemeRegistry } from "../../registry/ThemeRegistry";















export function ThemeDecoration({
  name,
  position,
  width = 100,
  opacity = 1,
  rotation = "0deg",
  visible = true
}) {
  if (!visible) return null;

  return (
    <AppImage
      source={ThemeRegistry.getDecoration(name)}
      fit="contain"
      containerStyle={{
        position: "absolute",
        width,
        opacity,
        transform: [{ rotate: rotation }],
        ...position
      }} />);


}
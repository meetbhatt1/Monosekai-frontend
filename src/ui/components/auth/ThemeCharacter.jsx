
import { AppImage } from "../../media/AppImage";
import { ThemeRegistry } from "../../registry/ThemeRegistry";







export function ThemeCharacter({
  page,
  visible = true,
  style
}) {

  if (!visible) return null;

  return (
    <AppImage
      source={ThemeRegistry.getCharacter(page)}
      fit="contain"
      containerStyle={style} />);


}
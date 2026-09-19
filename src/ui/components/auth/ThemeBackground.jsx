import { AppImage } from "../../media/AppImage";
import { ThemeRegistry } from "../../registry/ThemeRegistry";






export function ThemeBackground({ page, variant }) {
  return (
    variant === "none" ? null :
    <AppImage
      source={ThemeRegistry.getBackground(page)}
      fit="cover"
      containerStyle={{
        position: "absolute",
        width: "100%",
        height: "100%"
      }} />);



}
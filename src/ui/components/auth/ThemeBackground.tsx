import { AppImage } from "../../media/AppImage";
import { ThemeRegistry } from "../../registry/ThemeRegistry";

interface Props {
  page: "onboarding" | "login";
  variant?: "none" | "image";
}

export function ThemeBackground({ page, variant }: Props) {
  return (
        variant === "none" ? null : (
            <AppImage
            source={ThemeRegistry.getBackground(page)}
            fit="cover"
            containerStyle={{
                position: "absolute",
                width: "100%",
                height: "100%",
            }}
            />
        )
  );
}
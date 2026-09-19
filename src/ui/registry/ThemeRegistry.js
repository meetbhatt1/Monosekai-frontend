import { AssetRegistry } from "./AssetRegistry";

class ThemeRegistryClass {
  theme = "sakura";
  variant = "default";

  setTheme(theme) {
    this.theme = theme;
  }

  setVariant(variant) {
    this.variant = variant;
  }

  getBackground(
  page)
  {
    return AssetRegistry[this.theme][this.variant].backgrounds[page];
  }

  getCharacter(
  page)
  {
    return AssetRegistry[this.theme][this.variant].characters[page];
  }
  getDecoration(
  name)
  {
    return AssetRegistry[this.theme][this.variant].decorations[name];
  }
}

export const ThemeRegistry = new ThemeRegistryClass();
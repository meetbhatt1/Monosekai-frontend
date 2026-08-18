import { AssetRegistry } from "./AssetRegistry";

class ThemeRegistryClass {
  private theme = "sakura" as const;
  private variant = "default" as const;

  setTheme(theme: keyof typeof AssetRegistry) {
    this.theme = theme;
  }

  setVariant(variant: "default") {
    this.variant = variant;
  }

  getBackground(
    page: keyof typeof AssetRegistry.sakura.default.backgrounds
  ) {
    return AssetRegistry[this.theme][this.variant].backgrounds[page];
  }

  getCharacter(
    page: keyof typeof AssetRegistry.sakura.default.characters
  ) {
    return AssetRegistry[this.theme][this.variant].characters[page];
  }
  getDecoration(
    name: keyof typeof AssetRegistry.sakura.default.decorations
  ) {
    return AssetRegistry[this.theme][this.variant].decorations[name];
  }
}

export const ThemeRegistry = new ThemeRegistryClass();
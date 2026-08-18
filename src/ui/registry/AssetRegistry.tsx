import OnboardingBackground from "../../../assets/themes/sakura/default/backgrounds/City_Background.png";
import LoginBackground from "../../../assets/themes/sakura/default/backgrounds/City_Background_1.png";

import OnboardingCharacter from "../../../assets/themes/sakura/default/characters/Onboarding_Character.png";
import LoginCharacter from "../../../assets/themes/sakura/default/characters/Login_Character.png";

import SakuraDecoration from "../../../assets/themes/sakura/default/decorations/Sakura_Decoration.png";
import SakuraPetalsOverlay from "../../../assets/themes/sakura/default/empty-states/Sakura_Petals_Overlay.png";

export const AssetRegistry = {
  sakura: {
    default: {
      backgrounds: {
        onboarding: OnboardingBackground,
        login: LoginBackground,
      },

      characters: {
        onboarding: OnboardingCharacter,
        login: LoginCharacter,
      },

      decorations: {
        sakura: SakuraDecoration,
        petals: SakuraPetalsOverlay,
      },
    },
  },

  mint: {
    default: {
      backgrounds: {},

      characters: {},

      decorations: {},
    },
  },
} as const;

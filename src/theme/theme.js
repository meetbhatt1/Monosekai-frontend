// src/theme/theme.js

export const theme = {
  meta: {
    id: "monosekai-main",
    version: "1.0.0",
  },

  brand: {
    studioIntro: {
      background: "#040506",
      foreground: "#FFFFFF",
    },
  },

  colors: {
  // Foundation
  background: "#FFFCFA",      // near-white, barely warm
  surface: "#FFFFFF",         // cards
  surfaceSoft: "#FFF7EE",     // original cream, now secondary
  surfaceWarm: "#FFF1E8",

  // Brand
  coral: "#FF6B6B",
  purple: "#6C4BD3",
  teal: "#22C1A8",
  yellow: "#FFD166",
  charcoal: "#2E2D35",

  primary: "#6C4BD3",
  primarySoft: "#F1EDFF",

  accent: "#FF6B6B",
  accentSoft: "#FFE8E5",

  success: "#22C1A8",
  successSoft: "#DDF8F2",

  warning: "#FFD166",
  warningSoft: "#FFF4D1",

  text: "#2E2D35",
  textSecondary: "#69666F",
  textMuted: "#9A969F",

  border: "#ECE8E5",
  divider: "#F2EFED",

  overlay: "rgba(46,45,53,0.52)",
  overlaySoft: "rgba(46,45,53,0.24)",

  white: "#FFFFFF",
},

  gradients: {
    primary: ["#6C4BD3", "#FF6B6B"],

    warm: ["#FFD166", "#FF6B6B"],

    fresh: ["#22C1A8", "#FFD166"],

    hero: ["#EEE9FF", "#FFE5E2"],

    artworkFade: [
      "rgba(46,45,53,0)",
      "rgba(46,45,53,0.72)",
    ],
  },

  typography: {
    logo: {
      family: "Sora",
      weight: "800",
    },

    body: {
      family: "Inter",
    },

    sizes: {
      xs: 11,
      sm: 13,
      md: 15,
      lg: 18,
      xl: 22,
      xxl: 28,
      hero: 36,
    },

    weights: {
      regular: "400",
      medium: "500",
      semiBold: "600",
      bold: "700",
      extraBold: "800",
    },

    lineHeight: {
      compact: 1.15,
      normal: 1.4,
      relaxed: 1.6,
    },
  },

  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
  },

  radius: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    pill: 999,
  },

  shadows: {
    sm: {
      shadowColor: "#2E2D35",
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      elevation: 2,
    },

    md: {
      shadowColor: "#2E2D35",
      shadowOpacity: 0.09,
      shadowRadius: 16,
      shadowOffset: {
        width: 0,
        height: 6,
      },
      elevation: 4,
    },

    floating: {
      shadowColor: "#2E2D35",
      shadowOpacity: 0.14,
      shadowRadius: 24,
      shadowOffset: {
        width: 0,
        height: 10,
      },
      elevation: 8,
    },
  },

  components: {
    screen: {
      horizontalPadding: 20,
      sectionGap: 28,
    },

    card: {
      radius: 20,
      padding: 16,
      background: "surface",
    },

    poster: {
      radius: 16,
      aspectRatio: 0.7,
    },

    hero: {
      radius: 28,
      heightRatio: 0.48,
    },

    button: {
      radius: 999,
      height: 48,
    },

    iconButton: {
      size: 44,
      radius: 999,
    },

    input: {
      radius: 16,
      height: 52,
    },

    bottomNav: {
      radius: 28,
      height: 68,
    },
  },

  animation: {
    fast: 160,
    normal: 260,
    slow: 420,

    spring: {
      damping: 16,
      stiffness: 180,
    },
  },
};
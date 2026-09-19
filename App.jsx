import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "./src/theme";

import FoundationTest from "./src/screens/dev/FoundationalTest";
import LoginScreen from "./src/screens/auth/LoginScreen";
import SignupScreen from "./src/screens/auth/SignupScreen";
import OTPScreen from "./src/screens/auth/OTPScreen";
import OnboardingScreen from "./src/screens/onboarding/OnboardingScreen";
import HomeScreen from "./src/screens/home/HomeScreen";
import BrowseScreen from "./src/screens/browse/BrowseScreen";
import DetailsScreen from "./src/screens/details/DetailsScreen";
import PlayerScreen from "./src/screens/player/PlayerScreen";
import SearchScreen from "./src/screens/search/SearchScreen";
import WatchlistScreen from "./src/screens/watchlist/WatchlistScreen";
import DownloadsScreen from "./src/screens/downloads/DownloadsScreen";
import ProfileScreen from "./src/screens/profile/ProfileScreen";
import SettingsScreen from "./src/screens/settings/SettingsScreen";
import PremiumScreen from "./src/screens/premium/PremiumScreen";

/**
 * Flip this to preview any screen. Navigation comes later.
 *
 * Auth:        login | signup | otp | onboarding
 * Main:        home | browse | details | player | search
 * Library:     watchlist | downloads
 * Account:     profile | settings | premium
 * Dev:         foundation
 */
const PREVIEW =














"player";

const SCREENS = {
  foundation: FoundationTest,
  login: LoginScreen,
  signup: SignupScreen,
  otp: OTPScreen,
  onboarding: OnboardingScreen,
  home: HomeScreen,
  browse: BrowseScreen,
  details: DetailsScreen,
  player: PlayerScreen,
  search: SearchScreen,
  watchlist: WatchlistScreen,
  downloads: DownloadsScreen,
  profile: ProfileScreen,
  settings: SettingsScreen,
  premium: PremiumScreen
};

export default function App() {
  const Screen = SCREENS[PREVIEW];

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Screen />
      </ThemeProvider>
    </SafeAreaProvider>);

}
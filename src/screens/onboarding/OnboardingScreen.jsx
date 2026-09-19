import React from "react";
import { View } from "react-native";

import {
  AppButton,
  AppImage,
  AppText,
  Icon,
  Screen,
  Stack } from
"../../ui";

import { ThemeCharacter } from "../../ui/components/auth/ThemeCharacter";

import SakuraDecoration from "../../../assets/themes/sakura/default/decorations/Sakura_Decoration.png";
import SakuraPetalsOverlay from "../../../assets/themes/sakura/default/empty-states/Sakura_Petals_Overlay.png";

import { theme, useResponsive } from "../../theme";
import { hp } from "../../theme/responsive";

const PAGE_COUNT = 4;
const ACTIVE_PAGE = 0;

const petalsSource = SakuraPetalsOverlay;
const sakuraSource = SakuraDecoration;






/**
 * Onboarding — aligned to monosekai+ reference (screen 1):
 * brand top-left, floral accents, hero character, copy, CTAs, 4-dot pager.
 */
export default function OnboardingScreen({
  onGetStarted,
  onExplore
} = {}) {
  const { width, height, horizontalPadding } = useResponsive();

  const heroHeight = Math.min(hp(height, 42), width * 1.05);

  return (
    <Screen
      style={{ backgroundColor: theme.colors.surfaceSoft }}
      contentStyle={{
        paddingHorizontal: horizontalPadding,
        paddingTop: hp(height, 2),
        paddingBottom: hp(height, 3)
      }}>
      
      {/* Soft floral accents — top right */}
      <AppImage
        source={petalsSource}
        fit="contain"
        showLoader={false}
        containerStyle={{
          position: "absolute",
          top: -hp(height, 2),
          right: -width * 0.08,
          width: width * 0.72,
          height: width * 0.72,
          opacity: 0.55,
          zIndex: 0
        }} />
      
      <AppImage
        source={sakuraSource}
        fit="contain"
        showLoader={false}
        containerStyle={{
          position: "absolute",
          top: hp(height, 6),
          right: horizontalPadding * 0.2,
          width: width * 0.28,
          height: width * 0.28,
          opacity: 0.9,
          zIndex: 0
        }} />
      

      <Stack
        flex={1}
        justify="space-between"
        style={{ zIndex: 1, flexWrap: "nowrap" }}>
        
        {/* Brand — top left */}
        <Stack gap={0} align="flex-start" style={{ alignSelf: "stretch" }}>
          <Stack direction="horizontal" align="center" gap={1}>
            <AppText
              variant="h2"
              style={{
                letterSpacing: -0.6,
                fontWeight: "700",
                color: theme.colors.charcoal
              }}>
              
              monosekai
            </AppText>
            <AppText
              variant="h2"
              style={{
                color: theme.colors.primary,
                fontWeight: "700"
              }}>
              
              +
            </AppText>
          </Stack>
          <AppText
            variant="caption"
            style={{ color: theme.colors.textMuted, marginTop: 2 }}>
            
            ものせかい
          </AppText>
        </Stack>

        {/* Dominant character */}
        <View
          style={{
            alignSelf: "stretch",
            height: heroHeight,
            alignItems: "center",
            justifyContent: "flex-end",
            marginVertical: theme.spacing[2]
          }}>
          
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              width: width * 0.7,
              height: width * 0.7,
              borderRadius: 999,
              backgroundColor: theme.colors.primarySoft,
              opacity: 0.65,
              top: "12%"
            }} />
          
          <ThemeCharacter
            page="onboarding"
            style={{
              width: width * 0.88,
              height: heroHeight
            }} />
          
        </View>

        {/* Copy + actions */}
        <Stack gap={5} style={{ alignSelf: "stretch" }}>
          <Stack gap={2} align="center">
            <AppText
              variant="h1"
              align="center"
              style={{
                letterSpacing: -0.4,
                lineHeight: 34,
                color: theme.colors.charcoal
              }}>
              
              More anime.{"\n"}More moments.{"\n"}
              <AppText
                variant="h1"
                style={{ color: theme.colors.primary, letterSpacing: -0.4 }}>
                
                More Monosekai.
              </AppText>
            </AppText>

            <AppText
              variant="body"
              tone="secondary"
              align="center"
              style={{ maxWidth: width * 0.85, lineHeight: 22 }}>
              
              Stream, explore and experience a universe of anime.
            </AppText>
          </Stack>

          <Stack gap={3} style={{ alignSelf: "stretch" }}>
            <AppButton
              title="Get Started"
              variant="primary"
              size="lg"
              fullWidth
              onPress={onGetStarted}
              rightIcon={
              <Icon name="arrow-forward" size={18} tone="inverse" />
              }
              style={{
                borderRadius: theme.radius.pill,
                height: 54
              }} />
            

            <AppButton
              title="Explore"
              variant="outline"
              size="lg"
              fullWidth
              onPress={onExplore}
              style={{
                borderRadius: theme.radius.pill,
                height: 54,
                borderColor: theme.colors.charcoal,
                backgroundColor: "transparent"
              }}
              textStyle={{ color: theme.colors.charcoal }} />
            
          </Stack>

          <Stack
            direction="horizontal"
            gap={2}
            align="center"
            justify="center"
            style={{ paddingTop: theme.spacing[1] }}>
            
            {Array.from({ length: PAGE_COUNT }).map((_, index) =>
            <View
              key={index}
              style={{
                width: index === ACTIVE_PAGE ? 22 : 8,
                height: 8,
                borderRadius: theme.radius.pill,
                backgroundColor:
                index === ACTIVE_PAGE ?
                theme.colors.primary :
                theme.colors.border
              }} />

            )}
          </Stack>
        </Stack>
      </Stack>
    </Screen>);

}
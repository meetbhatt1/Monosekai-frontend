import React from "react";

import { Screen } from "../../ui/primitives/Screen";
import { Stack } from "../../ui/primitives/Stack";
import { AppText } from "../../ui/primitives/AppText";
import { AppButton } from "../../ui/primitives/AppButton";
import { ThemeBackground } from "../../ui/components/auth/ThemeBackground";
import { ThemeCharacter } from "../../ui/components/auth/ThemeCharacter";
import { hp, useResponsive, wp } from "../../theme/responsive";

export default function FoundationTest() {

    
      const {
        width,
        height,
        horizontalPadding,
    } = useResponsive();

    return (

        <Screen>
            <ThemeBackground
                page="onboarding"
            />
            <ThemeCharacter
                page="onboarding"
                style={{
        position: "absolute",
        right: -wp(width, 6),
        bottom: -hp(height, 6),
        width: wp(width, 100),
        height: hp(height, 50),
    }}
            />
            <Stack
                flex={1}
                justify="space-between"
            >
                <Stack>
                    <AppText variant="h1">
                        Foundation Test
                    </AppText>
                    <AppText variant="body">
                        ThemeProvider
                    </AppText>
                    <AppText variant="body">
                        Registry
                    </AppText>
                    <AppText variant="body">
                        Assets
                    </AppText>
                </Stack>

                <AppButton title="Continue" />
            </Stack>

        </Screen>

    );

}
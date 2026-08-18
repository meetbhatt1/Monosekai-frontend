import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MotiView, MotiText } from 'moti'; 
import { Easing } from 'react-native-reanimated'; 
import Svg, { Polygon, Path } from 'react-native-svg';

// Custom Play Button Points Configuration
const CUSTOM_PLAY_BUTTON_POINTS = "25,20 85,50 25,80";
const DIAMOND_SPARKLE = "M 6 0 C 6 3.5 3.5 6 0 6 C 3.5 6 6 8.5 6 12 C 6 8.5 8.5 6 12 6 C 8.5 6 6 3.5 6 0 Z";

const JAGGED_MANGA_BLAST = `
  M 150 150 
  L 40 20 L 95 85 L 10 70 L 110 115 L -20 140 L 90 155 L 20 220 L 120 180 L 70 280 L 140 195 
  L 160 320 L 170 200 L 250 290 L 190 165 L 310 210 L 210 145 L 330 110 L 195 125 L 270 40 
  L 170 100 L 210 -10 L 150 80 L 110 -30 L 130 90 Z
`;

const HIGH_DENSITY_PARTICLES = Array.from({ length: 24 }).map((_, i) => {
  const angle = (i * 15 * Math.PI) / 180;
  const velocityRadius = Math.floor(Math.random() * 45) + 65; 
  return {
    id: i,
    x: Math.cos(angle) * velocityRadius,
    y: Math.sin(angle) * velocityRadius,
    scale: Math.random() * 0.35 + 0.35,
    delay: Math.random() * 100 + 350,
  };
});

export default function PerfectStudioIdentity() {
  const [timelineStep, setTimelineStep] = useState(0);

  useEffect(() => {
    const blastTrigger = setTimeout(() => setTimelineStep(1), 350);
    const layoutShiftTrigger = setTimeout(() => setTimelineStep(2), 800);

    return () => {
      clearTimeout(blastTrigger);
      clearTimeout(layoutShiftTrigger);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.canvasArea}>

        {/* ================= LAYER 1: RADIAL MANGA IMPACT BLAST ================= */}
        {timelineStep === 1 && (
          <View style={[StyleSheet.absoluteFill, styles.absoluteCenter]} pointerEvents="none">
            <MotiView
              from={{ scale: 0.05, opacity: 1, rotate: '0deg' }}
              animate={{ scale: 1.9, opacity: 0, rotate: '12deg' }}
              transition={{ type: 'timing', duration: 380 }}
              style={styles.absolutePositioner}
            >
              <Svg height="300" width="300" viewBox="0 0 300 300">
                <Path d={JAGGED_MANGA_BLAST} fill="#FFFFFF" opacity={0.9} />
              </Svg>
            </MotiView>
          </View>
        )}

        {/* ================= LAYER 2: MASTER MOVEMENT ROW ================= */}
        <MotiView
          animate={{
            // COMPRESSED HORIZONTAL AXIS CONSTANTS: Shifted inward to prevent wide layout gaps
            translateX: timelineStep === 2 ? -95 : 0,
          }}
          transition={{ 
            type: 'timing', 
            duration: 500, 
            easing: Easing.out(Easing.quad) 
          }}
          style={styles.logoAnchorFrame}
        >
          {/* THE CORE LIQUID STRETCH PLAY SHAPE */}
          <MotiView
            from={{ translateY: -500, scaleY: 1, scaleX: 1, opacity: 0 }}
            animate={{
              translateY: timelineStep === 0 ? -500 : 0,
              scaleY: 1, // Completely stripped away shape distortion and fluid tracking fields
              scaleX: 1,
              opacity: 1,
            }}
            transition={{ 
              translateY: { 
                type: 'timing', 
                duration: 350, 
                easing: Easing.in(Easing.quad) 
              } 
            }}
            style={styles.vectorLogoWrapper}
          >
            {/* REPLACE THIS SVG CONTEXT BLOCK WITH YOUR EMBEDDED CUSTOM VECTOR ASSET PATHS */}
            <Svg height="100%" width="100%" viewBox="0 0 100 100">
              <Polygon
                points={CUSTOM_PLAY_BUTTON_POINTS}
                fill="#FFFFFF"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>

            {/* ================= LAYER 3: 24 MICRO-SPARKLE DEBRIS GENERATOR ================= */}
            <View style={styles.localParticleEmitter} pointerEvents="none">
              {HIGH_DENSITY_PARTICLES.map((sparkle) => (
                <MotiView
                  key={sparkle.id}
                  from={{ opacity: 0, scale: 0, translateX: 0, translateY: 0 }}
                  animate={{
                    opacity: timelineStep >= 1 ? 1 : 0,
                    scale: timelineStep >= 1 ? [0, sparkle.scale, sparkle.scale * 1.2, 0] : 0,
                    translateX: timelineStep >= 1 ? sparkle.x : 0,
                    translateY: timelineStep >= 1 ? sparkle.y : 0,
                  }}
                  transition={{ type: 'timing', duration: 450, delay: sparkle.delay - 350 }}
                  style={styles.absolutePositioner}
                >
                  <Svg height="12" width="12" viewBox="0 0 12 12">
                    <Path d={DIAMOND_SPARKLE} fill="#FFFFFF" />
                  </Svg>
                </MotiView>
              ))}
            </View>
          </MotiView>
        </MotiView>

        {/* ================= LAYER 4: SEPARATED BRAND TEXT CONTAINER ================= */}
        <MotiView
          from={{ opacity: 0, translateX: 30 }}
          animate={{
            opacity: timelineStep === 2 ? 1 : 0,
            // COMPRESSED TEXT SNAP VALUE: Aligns right next to the left-shifted logo asset boundary
            translateX: timelineStep === 2 ? 45 : 30, 
          }}
          transition={{ type: 'timing', duration: 450 }}
          style={styles.typographyContainer}
        >
          <MotiText style={styles.headlineText}>Monosekai</MotiText>
        </MotiView>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040506',
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvasArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  absoluteCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolutePositioner: {
    position: 'absolute',
  },
  logoAnchorFrame: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 30,
  },
  vectorLogoWrapper: {
    width: 65, // Snug structural profile settings to lock neat geometric balance 
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  localParticleEmitter: {
    position: 'absolute',
    width: 1,
    height: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typographyContainer: {
    position: 'absolute',
    height: 60,
    justifyContent: 'center',
    zIndex: 20,
  },
  headlineText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
});

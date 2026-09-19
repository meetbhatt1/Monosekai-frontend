import { View } from "react-native";
import { StyleSheet } from "react-native";








export function AppLogo({
  size = "md",
  showsubtitle = true,
  centered = false
}) {
  const logoSize = {
    sm: 24,
    md: 48,
    lg: 72
  }[size];

  return (
    <View
      style={[
      {
        alignItems: centered ? "center" : "flex-start"
      },
      styles.logoContainer]
      }>
      
            <View
        style={[
        {
          width: logoSize,
          height: logoSize
        },
        styles.logoImage]
        }>
        
            </View>
        </View>);

}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  logoImage: {
    width: 100,
    height: 100
  },
  subtitle: {
    fontSize: 16,
    color: "#888"
  }
});
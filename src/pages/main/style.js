import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.Background,
  },
  HighScoreContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 64,
  },
  HighScoreTextContainer: {
    flexDirection: "row",
    position: "relative",
  },
  HighScoreText: {
    color: COLORS.Light,
    fontSize: 28,
    fontWeight: "800",
  },
  GeniusContainer: {
    shadowColor: "#000",
    shadowOpacity: 0.35,
    width: windowWidth - 24,
    height: windowWidth - 24,
    backgroundColor: "#1D1D1D",
    borderRadius: 100000,
    position: "relative",
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 32,
  },
  UsualSvg: {
    position: "absolute",
    opacity: 0.9,
  },
  PlayButton: {
    position: "absolute",
    alignSelf: "center",
    top: "42%",
    zIndex: 2,
  },
  MomentColor: {
    backgroundColor: "#1D1D1D",
    height: 64,
    width: 64,
    borderRadius: 100,
    shadowOpacity: 1,
    shadowColor: "#1D1D1D",
    shadowOffset: { width: 0, height: 0 },
  },
});

export default styles;

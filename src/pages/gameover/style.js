import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../colors";

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.58)",
    zIndex: 10,
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  GameOverContainer: {
    paddingVertical: 36,
    paddingHorizontal: 32,
    backgroundColor: COLORS.Background,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  GameOverContainerText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  GameOverTitleText: {
    color: COLORS.Light,
    fontSize: 26,
    fontWeight: "800",
  },
  GameOverScoreText: {
    color: COLORS.Light,
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
  },
  OkayButton: {
    backgroundColor: COLORS.Light,
    paddingHorizontal: 48,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 48,
  },
  OkayText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default styles;

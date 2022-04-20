import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import COLORS from "../../colors";
import styles from "./style";

// import { Container } from './styles';

const GameOver = ({ onOkay, score }) => {
  useState(() => {
    console.log(score);
  }, []);
  return (
    <View style={styles.Container}>
      <View style={styles.GameOverContainer}>
        <View style={styles.GameOverContainerText}>
          <Text style={[styles.GameOverTitleText, { color: COLORS.Blue }]}>
            G
          </Text>
          <Text style={[styles.GameOverTitleText, { color: COLORS.Red }]}>
            A
          </Text>
          <Text style={[styles.GameOverTitleText, { color: COLORS.Yellow }]}>
            M
          </Text>
          <Text style={[styles.GameOverTitleText, { color: COLORS.Green }]}>
            E{" "}
          </Text>
          <Text style={styles.GameOverTitleText}>OVER</Text>
        </View>
        <Text style={styles.GameOverScoreText}>{`Score: ${score}`}</Text>
        <TouchableOpacity
          style={styles.OkayButton}
          activeOpacity={0.8}
          onPress={onOkay}
        >
          <Text style={styles.OkayText}>Okay!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GameOver;

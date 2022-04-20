import { View, Text, Vibration } from "react-native";
import COLORS from "../../colors";
import styles from "./style";
import { SvgXml } from "react-native-svg";
import blueSvg from "../Assets/blue";
import redSvg from "../Assets/red";
import yellowSvg from "../Assets/yellow";
import greenSvg from "../Assets/green";
import { useEffect, useState } from "react";
import playbutton from "../Assets/playbutton";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Audio } from "expo-av";
import GameOver from "../gameover";
import soundSvg from "../Assets/soundsvg";
import noSoundSvg from "../Assets/nosoundsvg";

export default function Main() {
  const [buttonPressed, setButtonPressed] = useState(null);
  const [started, setStarted] = useState(false);

  const [sound, setSound] = useState();

  const [gameOver, setGameOver] = useState(false);

  const [gameOverCache, setGameOverCache] = useState(1);

  const [playerTurn, setPlayerTurn] = useState(false);

  const [highScore, setHighScore] = useState(0);

  const [activeButton, setActiveButton] = useState(0);
  const [score, setScore] = useState(0);
  const [userActual, setUserActual] = useState(0);

  const [muted, setMuted] = useState(false);

  const [order, setOrder] = useState([
    Math.floor(Math.random() * (4 - 1 + 1) + 1),
  ]);

  useEffect(() => {
    setScore(0);

    console.log(`\n\n\n USE EFFECT!!`);

    getHighScore();
    let array = [];
    for (let i = 0; i < 1000; i++) {
      array.push(Math.floor(Math.random() * (4 - 1 + 1) + 1));
    }
    setOrder(array);

    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [gameOverCache]);

  const saveHighScoreOnDevice = async (score) => {
    if (score > highScore) {
      await AsyncStorage.setItem("highscore", `${score}`);
    }
  };

  const getHighScore = async () => {
    const topScore = await AsyncStorage.getItem("highscore");
    console.log(topScore);
    setHighScore(topScore);
  };

  async function playSound(color) {
    // console.log("Loading Sound");
    if (!muted) {
      if (color === 1) {
        const { sound } = await Audio.Sound.createAsync(
          require("../Assets/blue.mp3")
        );
        setSound(sound);
        await sound.playAsync();
      }
      if (color === 2) {
        const { sound } = await Audio.Sound.createAsync(
          require("../Assets/red.mp3")
        );
        setSound(sound);
        await sound.playAsync();
      }
      if (color === 3) {
        const { sound } = await Audio.Sound.createAsync(
          require("../Assets/yellow.mp3")
        );
        setSound(sound);
        await sound.playAsync();
      }
      if (color === 4) {
        const { sound } = await Audio.Sound.createAsync(
          require("../Assets/green.mp3")
        );
        setSound(sound);
        await sound.playAsync();
      }
    }
  }

  const userOrderHandle = (button) => {
    playSound(button);
    // verificar se o que ele digitou bate com a ordem
    console.log(`Apertou ${button} - resposta: ${order[userActual]}`);
    console.log(
      `\n\n${button} === ${order[userActual]}\n e ${userActual} == ${score}??`
    );
    if (button == order[userActual]) {
      if (userActual == score) {
        console.log("passou de nivel");
        displayItem(score + 1);
        setScore(score + 1);
        setUserActual(0);
      } else {
        setUserActual(userActual + 1);
      }
    } else {
      console.log("game over!");
      saveHighScoreOnDevice(score);
      setGameOver(true);
      setPlayerTurn(false);
      setStarted(false);
      setUserActual(0);
    }
  };

  const callButtonPress = (button) => {
    setButtonPressed(button);
    userOrderHandle(button);
    setTimeout(() => {
      setButtonPressed(null);
    }, 100);
  };

  const startGame = () => {
    displayItem();
  };

  const displayItem = (pontosTotal) => {
    console.log("player turn false");
    setPlayerTurn(false);
    const PontosTotal = pontosTotal ? pontosTotal : 0;
    //console.log(`pontos total: ${PontosTotal}`);

    var i = 0;

    function clearAll() {
      setTimeout(() => {
        setActiveButton(0);
        setPlayerTurn(true);
        console.log("clear and playerturn!");
      }, 900);
    }

    if (PontosTotal == 0) {
      setTimeout(() => {
        setActiveButton(order[0]);
        playSound(order[0]);
      }, 900);
      setTimeout(() => {
        clearAll();
      }, 1100);
    } else {
      function changeColors() {
        setTimeout(function () {
          // console.log(`Actual: ${i} // order: ${order[i]}`);
          setActiveButton(order[i]);
          playSound(order[i]);

          i++;
          if (i <= PontosTotal) {
            changeColors();
            setTimeout(() => {
              console.log("remover a cor ");
              setActiveButton(0);
            }, 600);
          } else {
            setTimeout(() => {
              console.log("remover a oor 2 - player turn");
              setActiveButton(0);
              setPlayerTurn(true);
            }, 600);
          }
        }, 1100);
      }

      changeColors();
    }
  };

  return (
    <View style={styles.Container}>
      {gameOver && (
        <GameOver
          onOkay={() => {
            setGameOver(false);
            setGameOverCache(gameOverCache + 1);
          }}
          score={score}
        />
      )}

      {/** HEADER ANTES DE INICIAR*/}
      {!started && (
        <View style={styles.HighScoreContainer}>
          <View style={styles.HighScoreTextContainer}>
            <SvgXml
              xml={!muted ? soundSvg : noSoundSvg}
              width={32}
              height={32}
              style={{ position: "absolute", left: "55%", top: 0 }}
              onPress={() => {
                setMuted(!muted);
              }}
            />
            <Text style={[styles.HighScoreText, { color: COLORS.Blue }]}>
              H
            </Text>
            <Text style={[styles.HighScoreText, { color: COLORS.Red }]}>I</Text>
            <Text style={[styles.HighScoreText, { color: COLORS.Yellow }]}>
              G
            </Text>
            <Text style={[styles.HighScoreText, { color: COLORS.Green }]}>
              H{" "}
            </Text>
            <Text style={styles.HighScoreText}>SCORE</Text>
          </View>
          <Text style={[styles.HighScoreText, { fontSize: 24, marginTop: 8 }]}>
            {highScore >= 0 ? highScore : "..."}
          </Text>
        </View>
      )}

      {/** HEADER DEPOIS DE INICIAR*/}
      {started && (
        <View style={styles.HighScoreContainer}>
          <View style={styles.HighScoreTextContainer}>
            <Text
              style={[
                styles.HighScoreText,
                {
                  fontSize: 24,
                  fontWeight: "600",
                  marginBottom: 2,
                  marginTop: 4,
                },
              ]}
            >
              Score:
            </Text>
            <SvgXml
              xml={!muted ? soundSvg : noSoundSvg}
              width={32}
              height={32}
              style={{ position: "absolute", left: "40%", top: 2 }}
              onPress={() => {
                setMuted(!muted);
              }}
            />
          </View>
          <Text
            style={[
              styles.HighScoreText,
              { fontSize: 24, marginTop: 8, fontWeight: "500" },
            ]}
          >
            {score}
          </Text>
        </View>
      )}

      {/** GAME  */}
      <View style={styles.GeniusContainer}>
        <SvgXml
          xml={blueSvg}
          width="45%"
          height="45%"
          style={[
            styles.UsualSvg,
            { top: 12, left: 12 },
            buttonPressed === 1
              ? { opacity: 0.9 }
              : activeButton == 1
              ? { opacity: 1 }
              : playerTurn
              ? { opacity: 0.8 }
              : { opacity: 0.7 },

            ,
          ]}
          onPress={
            playerTurn
              ? () => {
                  callButtonPress(1);
                }
              : () => {}
          }
        />

        <SvgXml
          xml={redSvg}
          width="45%"
          height="45%"
          style={[
            styles.UsualSvg,
            { top: 12, right: 12 },
            buttonPressed === 2
              ? { opacity: 0.9 }
              : activeButton == 2
              ? { opacity: 1 }
              : playerTurn
              ? { opacity: 0.8 }
              : { opacity: 0.7 },
          ]}
          onPress={
            playerTurn
              ? () => {
                  callButtonPress(2);
                }
              : () => {}
          }
        />

        <SvgXml
          xml={yellowSvg}
          width="45%"
          height="45%"
          style={[
            styles.UsualSvg,
            { bottom: 12, left: 12 },
            buttonPressed === 3
              ? { opacity: 0.9 }
              : activeButton == 3
              ? { opacity: 1 }
              : playerTurn
              ? { opacity: 0.8 }
              : { opacity: 0.7 },

            ,
          ]}
          onPress={
            playerTurn
              ? () => {
                  callButtonPress(3);
                }
              : () => {}
          }
        />

        <SvgXml
          xml={greenSvg}
          width="45%"
          height="45%"
          style={[
            styles.UsualSvg,
            { bottom: 12, right: 12 },
            buttonPressed === 4
              ? { opacity: 0.9 }
              : activeButton == 4
              ? { opacity: 1 }
              : playerTurn
              ? { opacity: 0.8 }
              : playerTurn
              ? { opacity: 0.8 }
              : { opacity: 0.7 },

            ,
          ]}
          onPress={
            playerTurn
              ? () => {
                  callButtonPress(4);
                }
              : () => {}
          }
        />

        {/* PLAY! */}
        {!started && (
          <View style={styles.PlayButton}>
            <SvgXml
              xml={playbutton}
              width="64px"
              height="64px"
              onPress={() => {
                setStarted(true);
                startGame();
              }}
            />
          </View>
        )}
        {started && (
          <View style={styles.PlayButton}>
            <View
              style={[
                styles.MomentColor,

                activeButton == 1
                  ? { backgroundColor: COLORS.Blue, shadowColor: COLORS.Blue }
                  : {},
                activeButton == 2
                  ? { backgroundColor: COLORS.Red, shadowColor: COLORS.Red }
                  : {},
                activeButton == 3
                  ? {
                      backgroundColor: COLORS.Yellow,
                      shadowColor: COLORS.Yellow,
                    }
                  : {},
                activeButton == 4
                  ? { backgroundColor: COLORS.Green, shadowColor: COLORS.Green }
                  : {},
              ]}
            />
          </View>
        )}
      </View>
    </View>
  );
}

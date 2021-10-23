import React from "react";
import { View, StyleSheet, Image } from "react-native";
import LoginForm from "../components/LogInscreen/LoginForm";

const INSTAGRAM_LOGO =
  "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-128.png";

const LogInscreen = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={styles.Container}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: INSTAGRAM_LOGO,
              height: 100,
              width: 100,
            }}
          />
        </View>
      </View>
      <LoginForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});

export default LogInscreen;

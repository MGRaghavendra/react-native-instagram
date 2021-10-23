import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import firebase from "firebase";
const Header = ({ navigation }) => {
  return (
    <View style={styles.Container}>
      <TouchableOpacity
        onPress={async () => {
          try {
            const { email } = firebase.auth().currentUser;
            await firebase.auth().signOut();
            console.log(email, " log out successfullyy...");
          } catch (e) {
            console.log(e.message);
          }
        }}
      >
        <Image
          source={require("../../assets/header-logo.png")}
          alt=""
          style={styles.logo}
        />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.push("NewPostscreen")}>
          <Image
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png",
            }}
            alt=""
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.unreadmessages}>
            <Text style={styles.unreadmessagecount}>11</Text>
          </View>
          <Image
            source={{
              uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png",
            }}
            alt=""
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 4,
  },
  logo: {
    height: 50,
    width: 100,
    resizeMode: "contain",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  icon: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
    resizeMode: "contain",
  },
  unreadmessages: {
    position: "absolute",
    backgroundColor: "red",
    zIndex: 100,
    top: -3,
    left: 14,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 8,
    justifyContent: "center",
    alignContent: "center",
  },
  unreadmessagecount: { color: "white", fontWeight: "600", fontSize: 11 },
});
export default Header;
